from homeassistant import config_entries
from homeassistant.helpers import selector
import voluptuous as vol
from homeassistant.const import CONF_NAME, CONF_DEVICE_ID
from .const import DOMAIN
from typing import Any


class MyIntegrationFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):

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
        return MyIntegrationOptionsFlow()


class MyIntegrationOptionsFlow(config_entries.OptionsFlow):
    async def async_step_init(self, user_input: dict[str, Any] | None = None):
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
