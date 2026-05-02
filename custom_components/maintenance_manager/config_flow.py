"""
Author: Marián Šuľa
Description: Configuration flow allowing users to set up and manage the integration through the Home Assistant UI.
"""

from homeassistant import config_entries
from homeassistant.helpers import selector
import voluptuous as vol
from homeassistant.const import CONF_NAME, CONF_DEVICE_ID
from .const import DOMAIN
from typing import Any


class MyIntegrationFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for the integration."""
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        """Handle the initial step of the config flow."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(
                title=user_input[CONF_NAME],
                data=user_input
            )
        data_schema = vol.Schema({
            vol.Required(CONF_NAME, default="Task Manager"): str,
            vol.Required(CONF_DEVICE_ID): selector.DeviceSelector(
                selector.DeviceSelectorConfig(
                    integration="mobile_app",
                    multiple=False,
                )
            ),
        })
        return self.async_show_form(
            step_id="user",
            data_schema=data_schema
        )

    def async_get_options_flow(config_entry):
        """Return the options flow for this config entry."""
        return MyIntegrationOptionsFlow()


class MyIntegrationOptionsFlow(config_entries.OptionsFlow):
    """Handle the options flow for the integration."""
    async def async_step_init(self, user_input: dict[str, Any] | None = None):
        """Handle the initial step of the options flow."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)
        original = self.config_entry.data
        current = self.config_entry.options

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema({
                vol.Required(CONF_DEVICE_ID, default=current.get(CONF_DEVICE_ID, original.get(CONF_DEVICE_ID))): selector.DeviceSelector(
                    selector.DeviceSelectorConfig(
                        integration="mobile_app",
                        multiple=False,
                    )
                ),
                vol.Optional(
                    "notifications_enabled",
                    default=current.get("notifications_enabled", True)
                ): bool,
            }),
        )
