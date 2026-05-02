"""
Author: Marián Šuľa
Description: Evaluation of the maintenance tasks and notification logic for the Device Maintenance Manager integration.
"""

from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.core import HomeAssistant
from .const import DOMAIN
from datetime import datetime, timedelta
import logging

_LOGGER = logging.getLogger("custom_components.maintenance_manager")


class MaintananceCoordinator(DataUpdateCoordinator):
    """Coordinator for evaluating maintenance tasks and handling notifications."""
    def __init__(self, hass: HomeAssistant):
        super().__init__(
            hass,
            logger=_LOGGER,
            name=f"{DOMAIN}_coordinator",
            update_interval=timedelta(minutes=1),
        )
        self.notify_service = None
        self.storage = None
        self.notificatons_enabled = None

    async def _async_update_data(self):
        """Evaluate maintenance tasks and send notifications if needed."""
        self.notify_service = self.hass.data[DOMAIN].get("mobile_app_entity_id")
        self.storage = self.hass.data[DOMAIN].get("storage")
        self.notificatons_enabled = self.hass.data[DOMAIN].get("notifications_enabled")
        tasks = self.storage.get_all_tasks()
        
        for task in tasks:
            # Seasonal task
            if task.reactivate is not None and datetime.fromisoformat(task.reactivate) >= datetime.now():
                continue
            # Notify again
            if task.notified and task.next_notification is not None and datetime.fromisoformat(task.next_notification) <= datetime.now():
                await self.notify_user(task)
                continue
            # Skip
            if task.notified:
                continue
            # Interval check
            if task.type == "interval" and task.seasonal_type != "runtime":
                if datetime.fromisoformat(task.next_due) + timedelta(hours=9) <= datetime.now():
                    await self.notify_user(task)
                continue
            condition_met = False
            # Get sensor value to check
            state_obj = self.hass.states.get(task.sensor)
            if state_obj is None:
                _LOGGER.warning("Sensor %s not found for task %s", task.sensor, task.name)
                continue
            value_to_check = state_obj.attributes.get(task.option)
            # Value is not available in attributes, use state value
            if value_to_check in ("unknown", "unavailable", None):
                value_to_check = state_obj.state
            # Evaluate condition
            if task.control == "number":
                try:
                    value_to_check = float(value_to_check)
                except (ValueError, TypeError):
                    _LOGGER.warning("Value for sensor %s is not a number: %s", task.sensor, value_to_check)
                    continue

                if task.operator == "below" and value_to_check < task.value:
                    condition_met = True
                elif task.operator == "above" and value_to_check > task.value:
                    condition_met = True
                elif task.operator == "equal" and value_to_check == task.value:
                    condition_met = True
            else:
                if isinstance(task.value, list):
                    if value_to_check in task.value:
                        condition_met = True
                else:
                    if task.value == value_to_check:
                        condition_met = True
            # Handle runtime-based interval tasks
            if task.type == "interval":
                if task.duration_start == None or not condition_met:
                    task.duration_start = datetime.now().isoformat()
                if condition_met:
                    task.next_due = timedelta(seconds=task.next_due)
                    delta_interval = datetime.now() - datetime.fromisoformat(task.duration_start)
                    task.next_due -= delta_interval
                    task.next_due = int(task.next_due.total_seconds())
                    task.duration_start = datetime.now().isoformat()
                    
                if task.next_due > 0:
                    self.storage._async_save_task_history()
                else:
                    await self.notify_user(task)
                continue
            # Reset duration start if condition is not met
            if not condition_met and task.duration_condition:
                task.duration_start = None
                self.storage._async_save_task_history()
            # Notify if condition is met
            if condition_met:
                if task.duration_condition and not self._duration_check(task):
                    continue
                await self.notify_user(task)

    def _duration_check(self, task):
        """Check if the duration condition is met for a task."""
        if task.duration_start is None:
            task.duration_start = datetime.now().isoformat()
            self.storage._async_save_task_history()
        if datetime.now() >= datetime.fromisoformat(task.duration_start) + timedelta(seconds=task.duration):
            return True
        return False
    async def notify_user(self, task):
        """Notify the user about a maintenance task."""
        self.storage.async_notified_task(task.id, True, (datetime.now() + timedelta(days=1)).replace(hour=9, minute=0, second=0, microsecond=0).isoformat())
        if self.notificatons_enabled:
            await self.hass.services.async_call(
                "notify",
                f"mobile_app_{self.notify_service}",
                {
                    "title": f"Home Maintenance: {task.name}",
                    "message": f"{task.description}",
                    "data": {
                        "actions": [
                            {
                                "action": "acknowledge",
                                "title": "Acknowledge"
                            },
                        ],
                        "notification_icon": "mdi:wrench",
                    }
                },
            )
            await self.hass.services.async_call(
                "persistent_notification",
                "create",
                {
                    "title": f"Home Maintenance: {task.name}",
                    "message": f"{task.description}",
                    "notification_id": f"maintenance_manager_{task.id}",
                },
            )
