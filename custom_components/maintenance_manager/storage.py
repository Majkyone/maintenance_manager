from homeassistant.core import HomeAssistant
from homeassistant.helpers import storage, entity_registry, area_registry
from homeassistant.helpers.dispatcher import async_dispatcher_send
import attrs
from .Models.taskModel import HomeMaintananceTask
from .Models.historyModel import HomeMaintananceHistory, CompletionRecord
from .const import DOMAIN, SIGNAL_TASK_CREATED
from logging import getLogger
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import attrs
from .Models.mapping_config import MAPPING

_LOGGER = getLogger("custom_components.maintenance_manager")


class HomeMaintananceStorage:
    def __init__(self, hass: HomeAssistant):
        self.hass = hass
        self.store = storage.Store(hass, 1, f"{DOMAIN}.storage")
        self.tasks: dict[str, HomeMaintananceTask] = {}
        self.history: dict[str, HomeMaintananceHistory] = {}

    async def async_load(self):
        data = await self.store.async_load()
        if data:
            for task_data in data.get("tasks", []):
                task = HomeMaintananceTask.from_dict(task_data)
                self.tasks[task.id] = task
            for history_data in data.get("history", []):
                history = HomeMaintananceHistory.from_dict(history_data)
                self.history[history.id] = history

    def get_all_tasks_frontend(self):
        result = []
        for task in self.tasks.values():
            result.append(self._add_location_name(task))
        return result

    def get_all_tasks(self):
        return list(self.tasks.values())

    def get_all_history(self):
        result = []
        for history in self.history.values():
            result.append(self._add_location_name(history))
        return result

    def async_clear_all(self):
        self.history.clear()
        self.tasks.clear()
        self._async_save_task_history()

    def async_create_task(self, task: HomeMaintananceTask):
        self.tasks[task.id] = task
        async_dispatcher_send(self.hass, SIGNAL_TASK_CREATED, task)
        self._async_save_task_history()

    def async_notified_task(self, task_id: str, notified: bool = False, next_notification: str = None):
        if task_id not in self.tasks:
            _LOGGER.warning("Attempted to update notification state for non-existent task_id: %s", task_id)
            return False
        
        task = self.tasks[task_id]
        if not notified:
            if task.seasonal:
                interval = task.seasonal_interval
                unit = task.seasonal_type

                task.reactivate = str(
                    datetime.now() + relativedelta(**{unit: interval})
                )
            if task.type == "interval":
                interval = task.seasonal_interval
                unit = task.seasonal_type
                if task.seasonal_type == "runtime":
                    task.next_due = timedelta(hours=interval).total_seconds() # prepisat na hours
                else:
                    time_to_add = datetime.now() if not task.fixed else datetime.fromisoformat(task.next_due)
                    task.next_due = str(
                        (time_to_add + relativedelta(**{unit: interval})).strftime("%Y.%m.%d")
                    ).replace(".","-")
                task.last_completed = str(datetime.now().strftime("%Y.%m.%d")).replace(".","-")

        task.notified = notified
        task.next_notification = next_notification
        task.duration_start = None

        self._async_save_task_history()
        

    def async_create_history(self, history_id: str, note: str):
        task = self.tasks[history_id]
        history = HomeMaintananceHistory(
            id=task.id,
            name=task.name,
            location=task.location,
            completion_dates=[]  # začneme s prázdnym zoznamom
        )
        history.completion_dates.append(CompletionRecord(datetime.now().replace(microsecond=0), note))
        self.history[history.id] = history
        self.async_notified_task(history_id, False)

    def async_add_completion_date(self, history_id: str, note: str):
        self.history[history_id].completion_dates.append(
            CompletionRecord(datetime.now().replace(microsecond=0), note))
        self.async_notified_task(history_id, False)

    def async_delete_task(self, task_id: str):
        if task_id not in self.tasks:
            _LOGGER.warning("Attempted to delete non-existent task_id: %s", task_id)
            return False
        self.tasks.pop(task_id)
        if task_id in self.history:
            self.history.pop(task_id)
        er = entity_registry.async_get(self.hass)

        task_to_remove = next(
            (
                entry
                for entry in er.entities.values()
                if entry.unique_id == task_id and entry.platform == DOMAIN
            ),
            None,
        )

        if task_to_remove is None:
            _LOGGER.warning("Failed to find entity to remove for task_id: %s", task_id)
        else:
            er.async_remove(task_to_remove.entity_id)

        self._async_save_task_history()

    def async_edit_task(self, task: HomeMaintananceTask):
        existing = self.tasks[task.id]
        old_interval = existing.seasonal_interval
        for field in HomeMaintananceTask.EDITABLE_FIELDS:
            new_value = getattr(task, field)
            if field == "next_due" and existing.notified:
                continue
            if field == "next_due" and existing.seasonal_type == "runtime":
                if isinstance(existing.next_due, (int, float)):
                    delta = task.seasonal_interval - old_interval
                    existing.next_due += delta * 3600 # prepisat na hours * 3600
                    continue
            if getattr(existing, field) != new_value:
                if field == "name" and task.id in self.history:
                    self.history[task.id].name = new_value
                if field == "location" and task.id in self.history:
                    self.history[task.id].location = new_value
                setattr(existing, field, new_value)
        self._async_save_task_history()

    def _async_save_task_history(self):
        self.hass.async_create_task(
            self.store.async_save({
                "tasks": [attrs.asdict(task) for task in self.tasks.values()],
                "history": [attrs.asdict(history, recurse=True) for history in self.history.values()]
            })
        )

    def _add_location_name(self, dict):
        copy = attrs.asdict(dict)
        registry = area_registry.async_get(self.hass)
        area = registry.async_get_area(copy["location"])
        copy["location_name"] = area.name if area else copy["location"]
        return copy

    def describe_entity(self, sensor):
        state = self.hass.states.get(sensor)
        if state is None:
            _LOGGER.warning("Entity %s not found", sensor)
            return [{
                "control": "None"
            }]

        domain = state.entity_id.split(".")[0]
        attrs = state.attributes

        found = [
            item for item in MAPPING
            if domain in item["domain"] and (
                (item["search"] and item["search"] in attrs)
                or not item["search"]
            )
        ]

        if len(found) > 1:
            return [
                {
                    "control": item["control"],
                    "option": item["option"],
                    "options": attrs.get(item["search"]) or item["options_list"],
                }
                for item in found
            ]
        elif len(found) == 1:
            item = found[0]
            return [{
                "control": item["control"],
                "option": item["option"],
                "options": attrs.get(item["search"]) or item["options_list"],
            }]
        
        return [{
            "control": "text"
        }]