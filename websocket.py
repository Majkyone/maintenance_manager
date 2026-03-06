import uuid
import attrs
from typing import Any
import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import connection, messages
from homeassistant.core import HomeAssistant
from .const import DOMAIN
from .storage import HomeMaintananceTask
from dateutil.relativedelta import relativedelta
from datetime import datetime, timedelta
import logging

_LOGGER = logging.getLogger("custom_components.maintenance_manager")

VALID_INTERVAL_TYPES = {"days", "weeks", "months", "years", "runtime", ""}
VALID_SEASONAL_TYPES = {"minutes", "weeks", "months", "years", ""}
VALID_DURATION_TYPES = {"minutes", "hours", "seconds", ""}
VALID_OPERATORS = {"equal", "above", "below", ""}
VALID_TASK_TYPES = {"interval", "conditional"}


def _validate_positive_int(value: int) -> int:
    if value < 0:
        raise vol.Invalid(f"Value must be greater or equal to 0, got {value}.")
    return value


def _validate_non_empty_string(value: str) -> str:
    if not value or not value.strip():
        raise vol.Invalid("Value must not be empty.")
    return value.strip()


def _validate_task_type(value: str) -> str:
    if value not in VALID_TASK_TYPES:
        raise vol.Invalid(
            f"Invalid Type '{value}'. Allowed values: {sorted(VALID_TASK_TYPES)}."
        )
    return value


def _validate_operator(value: str) -> str:
    if value not in VALID_OPERATORS:
        raise vol.Invalid(
            f"Invalid Operator '{value}'. Allowed values: {sorted(VALID_OPERATORS)}."
        )
    return value


def _validate_interval_type(value: str) -> str:
    if value not in VALID_INTERVAL_TYPES:
        raise vol.Invalid(
            f"Invalid Interval Type '{value}'. Allowed values: {sorted(VALID_INTERVAL_TYPES)}."
        )
    return value


def _validate_seasonal_type(value: str) -> str:
    if value not in VALID_INTERVAL_TYPES:
        raise vol.Invalid(
            f"Invalid Interval Type '{value}'. Allowed values: {sorted(VALID_SEASONAL_TYPES)}."
        )
    return value


def _validate_duration_type(value: str) -> str:
    if value not in VALID_DURATION_TYPES:
        raise vol.Invalid(
            f"Invalid Duration Type '{value}'. Allowed values: {sorted(VALID_DURATION_TYPES)}."
        )
    return value


TASK_FIELDS_SCHEMA = {
    vol.Optional("Description"): str,
    vol.Required("Type"): _validate_task_type,
    vol.Required("Task Name"): _validate_non_empty_string,
    vol.Optional("Sensor"): str,
    vol.Optional("Control"): str,
    vol.Optional("Value"): vol.Any(int, str),
    vol.Optional("Location"): str,
    vol.Optional("Operator"): _validate_operator,
    vol.Optional("Seasonal Task"): bool,
    vol.Optional("Seasonal Interval"): _validate_positive_int,
    vol.Optional("Seasonal Type"): _validate_seasonal_type,
    vol.Optional("Condition Duration"): bool,
    vol.Optional("Duration"): vol.All(int, vol.Range(min=0)),
    vol.Optional("Duration Type"): _validate_duration_type,
    vol.Optional("Last Completed"): str,
    vol.Optional("Repeat Every"): _validate_positive_int,
    vol.Optional("Interval Type"): _validate_interval_type,
    vol.Optional("Fixed Interval"): bool,
    vol.Optional("Attribute"): str,
}


def web_socket_get_tasks(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    storage = hass.data[DOMAIN].get("storage")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        connection.send_result(
            msg["id"], {"success": False, "message": "Storage not found"}
        )
        return
    tasks = storage.get_all_tasks()

    result = [attrs.asdict(task) for task in tasks]
    connection.send_result(msg["id"], result)


def web_socket_get_history(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    storage = hass.data[DOMAIN].get("storage")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        connection.send_result(
            msg["id"], {"success": False, "message": "Storage not found"}
        )
        return
    history = storage.get_all_history()

    result = [attrs.asdict(task) for task in history]
    connection.send_result(msg["id"], result)


def web_socket_create_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):

    storage = hass.data[DOMAIN].get("storage")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        connection.send_result(
            msg["id"], {"success": False, "message": "Storage not found"}
        )
        return
    storage.async_create_task(describeTask(msg))
    connection.send_result(msg["id"], {"success": True})


def web_socket_detete_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    task_id = msg["task_id"]
    storage = hass.data[DOMAIN].get("storage")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        connection.send_result(
            msg["id"], {"success": False, "message": "Storage not found"}
        )
        return
    if task_id in storage.tasks:
        storage.async_delete_task(task_id)
        connection.send_result(msg["id"], {"success": True})
    else:
        _LOGGER.warning("Failed storage async")
        connection.send_result(
            msg["id"], {"success": False, "message": "Task not found"})


def web_socket_complete_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    task_id = msg["task_id"]
    storage = hass.data[DOMAIN].get("storage")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        connection.send_result(
            msg["id"], {"success": False, "message": "Storage not found"}
        )
        return
    if task_id in storage.tasks:
        if task_id in storage.history:
            storage.async_add_completion_date(task_id, msg.get(
                "Completion Notes", "No notes provided."))
        else:
            storage.async_create_history(task_id, msg.get(
                "Completion Notes", "No notes provided."))
        connection.send_result(msg["id"], {"success": True, "message": msg.get(
            "Completion Notes", "No notes provided.")})
    else:
        _LOGGER.warning("Failed storage async")
        connection.send_result(
            msg["id"], {"success": False, "message": "Task not found"})


def web_socket_get_attributes(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    storage = hass.data[DOMAIN].get("storage")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        connection.send_result(
            msg["id"], {"success": False, "message": "Storage not found"}
        )
        return
    result = storage.describe_entity(msg["task_sensor"])

    connection.send_result(msg["id"], result)


def web_socket_edit_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):

    storage = hass.data[DOMAIN].get("storage")
    if not storage:
        _LOGGER.error("Storage not found in hass.data for domain %s", DOMAIN)
        connection.send_result(
            msg["id"], {"success": False, "message": "Storage not found"}
        )
        return
    storage.async_edit_task(describeTask(msg))
    connection.send_result(msg["id"], msg)


def describeTask(msg: dict[str, Any]):
    type = msg["Type"]
    duration = msg.get("Duration", 0)

    duration_type = msg.get("Duration Type", "")
    last_completed = msg.get("Last Completed", ""),
    last_completed_str = last_completed[0] if last_completed else None
    next_due = ""
    if duration_type == "minutes":
        duration = duration * 60
    elif duration_type == "hours":
        duration = duration * 3600

    if type == "interval":
        interval = msg["Repeat Every"]
        unit = msg["Interval Type"]
        if unit != "runtime":
            base_date = datetime.fromisoformat(
                last_completed_str) if last_completed_str else datetime.now()
            next_due = str(
                (base_date + relativedelta(**
                 {unit: interval})).strftime("%Y.%m.%d")
            ).replace(".", "-")
        else:
            # prepisat na hours
            next_due = timedelta(hours=interval).total_seconds()
    task = HomeMaintananceTask(
        id=msg.get("task_id") or str(uuid.uuid4()),
        name=msg["Task Name"],
        type=type,

        description=msg.get("Description", "No description"),
        value=msg.get("Value", 0),
        control=msg.get("Control", ""),
        sensor=msg.get("Sensor", ""),
        location=msg.get("Location", "N/A"),
        operator=msg.get("Operator", "equal"),
        seasonal=msg.get("Seasonal Task", False),
        seasonal_interval=msg.get(
            "Seasonal Interval") or msg.get("Repeat Every") or 0,
        seasonal_type=msg.get("Seasonal Type") or msg.get(
            "Interval Type") or "",
        duration_condition=msg.get("Condition Duration", False),
        duration_type=msg.get("Duration Type", ""),
        duration=duration,
        last_completed=last_completed_str,
        fixed=msg.get("Fixed Interval", False),
        option=msg.get("Attribute", ""),
        next_due=next_due,
    )
    return task


async def async_register_websocket(hass: HomeAssistant):
    websocket_api.async_register_command(
        hass,
        "maintenance_manager/get_tasks",
        web_socket_get_tasks,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "maintenance_manager/get_tasks",
        })
    )

    websocket_api.async_register_command(
        hass,
        "maintenance_manager/get_history",
        web_socket_get_history,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "maintenance_manager/get_history",
        })
    )

    websocket_api.async_register_command(
        hass,
        "maintenance_manager/create_task",
        web_socket_create_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "maintenance_manager/create_task",
            **TASK_FIELDS_SCHEMA,
        })
    )

    websocket_api.async_register_command(
        hass,
        "maintenance_manager/delete_task",
        web_socket_detete_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "maintenance_manager/delete_task",
            vol.Required("task_id"): str,
        })
    )

    websocket_api.async_register_command(
        hass,
        "maintenance_manager/complete_task",
        web_socket_complete_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "maintenance_manager/complete_task",
            vol.Required("task_id"): str,
            vol.Optional("Completion Notes"): str,
        })
    )

    websocket_api.async_register_command(
        hass,
        "maintenance_manager/get_attributes",
        web_socket_get_attributes,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "maintenance_manager/get_attributes",
            vol.Required("task_sensor"): str,
        })
    )

    websocket_api.async_register_command(
        hass,
        "maintenance_manager/edit_task",
        web_socket_edit_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "maintenance_manager/edit_task",
            **TASK_FIELDS_SCHEMA,
            vol.Required("task_id"): str,
        })
    )
