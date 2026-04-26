from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers import device_registry, entity_registry
from homeassistant.util import slugify
from homeassistant.const import CONF_NAME, CONF_DEVICE_ID
from .const import DOMAIN
from .panel import async_register_panel, async_unregister_panel
from .websocket import async_register_websocket, remove_notification
from .storage import HomeMaintananceStorage
from .coordinator import MaintananceCoordinator
from homeassistant.core import ServiceCall
import voluptuous as vol

import logging

_LOGGER = logging.getLogger("custom_components.maintenance_manager")

async def async_setup(hass: HomeAssistant, config: dict):
    """Initial setup of the integration (empty if only Config Flow)."""
    # Inicializácia dátového priestoru
    await async_register_websocket(hass)
    
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):

    entry.async_on_unload(
        entry.add_update_listener(update_listener)
    )

    deviceReg = device_registry.async_get(hass)
    device = deviceReg.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(DOMAIN, "main_device")},
        manufacturer="Task Manager",
        name=entry.data.get(CONF_NAME, "Task Manager"),
    )
    coordinator = MaintananceCoordinator(hass)
    storage = HomeMaintananceStorage(hass)
    
    await storage.async_load()
    
    device_to_notify = await get_device_id(hass, entry)
    if device_to_notify is None:
        _LOGGER.error("Device %s not found", entry.data[CONF_DEVICE_ID])
        return False
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN] = {
        "device_id": device.id,
        "storage": storage,
        "coordinator": coordinator,
        "mobile_app_entity_id": slugify(device_to_notify.name),
        "notifications_enabled": entry.options.get("notifications_enabled", True)
    }
    await hass.config_entries.async_forward_entry_setups(entry, ["binary_sensor"])
    await async_register_panel(hass, entry)
    await coordinator.async_config_entry_first_refresh()
    register_services(hass)
    
    return True

async def update_listener(hass, entry):
    hass.data[DOMAIN]["notifications_enabled"] = entry.options.get("notifications_enabled", True)
    new_device_to_notify = get_device_id(hass, entry)
    if new_device_to_notify is None:
        _LOGGER.error("Device %s not found", entry.data[CONF_DEVICE_ID])
        return False
    hass.data[DOMAIN]["mobile_app_entity_id"] = slugify(new_device_to_notify.name)

async def get_device_id(hass: HomeAssistant, entry: ConfigEntry):
    dev_reg = device_registry.async_get(hass)
    device_to_notify = dev_reg.devices.get(entry.options.get(CONF_DEVICE_ID, entry.data.get(CONF_DEVICE_ID)))

    if device_to_notify is None:
        _LOGGER.error("Device %s not found", entry.data[CONF_DEVICE_ID])
        return False
    return device_to_notify

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry):
    unload_ok = await hass.config_entries.async_unload_platforms(
        entry,
        ["binary_sensor"],
    )
    if unload_ok:
        await async_unregister_panel(hass)
    return unload_ok

async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry):
    storage = hass.data.get(DOMAIN, {}).get("storage")
    if storage:
        storage.async_clear_all()
    hass.data.pop(DOMAIN, None)

def register_services(hass: HomeAssistant):
    async def handle_complete_task(call: ServiceCall):
        entity_id = call.data.get("task_id")
        note = call.data.get("note")
        ent_reg = entity_registry.async_get(hass)
        entity = ent_reg.async_get(entity_id)
        if not entity:
            _LOGGER.error("Entity with ID %s not found", entity_id)
            return
        task_id = entity.unique_id
        storage = hass.data[DOMAIN].get("storage")
        if not storage:
            _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
            return
        if task_id in storage.tasks:
            if task_id in storage.history:
                storage.async_add_completion_date(task_id, note)
            else:
                storage.async_create_history(task_id, note)
                
            await remove_notification(hass, task_id)

        else:
            _LOGGER.warning("Task not found for completion: %s", task_id)
    
    hass.services.async_register(
        DOMAIN,
        "complete_task",
        handle_complete_task,
        schema=vol.Schema({
            vol.Required("task_id"): str,
            vol.Optional("note", default="No notes provided."): str
        })
    )