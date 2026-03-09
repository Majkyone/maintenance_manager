import os
import time
from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from .const import API_PATH, API_URL, ICON, PANEL_PATH
async def async_register_panel(hass: HomeAssistant, entry: ConfigEntry):
    """Register the custom panel for the integration."""
    web_dir = os.path.join(
        os.path.dirname(__file__),
        "dist"
    )

    if not hass.data.setdefault("maintenance_manager_panel_registered", False):
        await hass.http.async_register_static_paths([
            StaticPathConfig(API_PATH, web_dir, cache_headers=False)
        ])
        hass.data["maintenance_manager_panel_registered"] = True

        await panel_custom.async_register_panel(
            hass,
            frontend_url_path=PANEL_PATH,
            webcomponent_name="maintenance-manager-panel",
            sidebar_title="Maintenance Manager",
            sidebar_icon=ICON,
            module_url=API_URL + f"?v={int(time.time())}",
            config={}
        )
async def async_unregister_panel(hass: HomeAssistant):
    """Unregister the custom panel for the integration."""
    if hass.data.get("maintenance_manager_panel_registered", False):
        hass.data["maintenance_manager_panel_registered"] = False
        frontend.async_remove_panel(
            hass,
            PANEL_PATH
        )