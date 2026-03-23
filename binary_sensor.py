from homeassistant.components.binary_sensor import BinarySensorEntity
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from .const import DOMAIN, SIGNAL_TASK_CREATED
from .storage import HomeMaintananceTask
from .coordinator import MaintananceCoordinator
from logging import getLogger

_LOGGER = getLogger("custom_components.maintenance_manager")


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities):

    storage = hass.data[DOMAIN].get("storage")
    coordinator = hass.data[DOMAIN].get("coordinator")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        return

    if not coordinator:
        _LOGGER.error("Coordinator not found in hass.data for domain %s", DOMAIN)
        return

    for task in storage.get_all_tasks():
        sensor = TaskSensor(hass, coordinator, task)
        async_add_entities([sensor])

    async def handle_new_task(task):
        sensor = TaskSensor(hass, coordinator, task)
        async_add_entities([sensor])

    entry.async_on_unload(
        async_dispatcher_connect(hass, SIGNAL_TASK_CREATED, handle_new_task)
    )

class TaskSensor(CoordinatorEntity, BinarySensorEntity):

    def __init__(self, hass: HomeAssistant, coordinator: MaintananceCoordinator, task: HomeMaintananceTask):
        super().__init__(coordinator)
        self.hass = hass
        self._id = task.id
        self._friendly_name = task.name
        self._attr_is_on = task.notified
        self._attr_next_due = task.next_due

    async def async_added_to_hass(self):
        await super().async_added_to_hass()
    @property
    def name(self):
        return self._friendly_name
    @property
    def is_on(self):
        return self._attr_is_on
    @property
    def unique_id(self):
        return self._id
    @property
    def device_info(self):
        return DeviceInfo(
            identifiers={(DOMAIN, "main_device")},
        )
    @property
    def extra_state_attributes(self):
        return {
            "next_due": self._attr_next_due
        }

    def _handle_coordinator_update(self):
        task = self.hass.data[DOMAIN].get("storage").tasks.get(self._id)
        self._attr_is_on = task.notified
        self._attr_next_due = task.next_due
        self.schedule_update_ha_state()
        