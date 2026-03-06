from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers import device_registry
from homeassistant.util import slugify
from homeassistant.const import CONF_NAME, CONF_DEVICE_ID
from .const import DOMAIN
from .panel import async_register_panel, async_unregister_panel
from .websocket import async_register_websocket
from .storage import HomeMaintananceStorage
from .coordinator import MaintananceCoordinator
import logging

_LOGGER = logging.getLogger("custom_components.maintenance_manager")


async def async_setup(hass: HomeAssistant, config: dict):
    """Initial setup of the integration (empty if only Config Flow)."""
    # Inicializácia dátového priestoru
    
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):

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
    
    dev_reg = device_registry.async_get(hass)
    device_to_notify = dev_reg.devices.get(entry.data[CONF_DEVICE_ID])

    if device_to_notify is None:
        _LOGGER.error("Device %s not found", entry.data[CONF_DEVICE_ID])
        return False

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN] = {
        "device_id": device.id,
        "storage": storage,
        "coordinator": coordinator,
        "entities": {},
        "mobile_app_entity_id": slugify(device_to_notify.name),
    }
    await hass.config_entries.async_forward_entry_setups(entry, ["binary_sensor"])
    await async_register_panel(hass, entry)
    await async_register_websocket(hass)
    await coordinator.async_config_entry_first_refresh()
    return True

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