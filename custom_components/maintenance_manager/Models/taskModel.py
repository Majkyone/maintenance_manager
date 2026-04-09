from typing import ClassVar

import attrs

@attrs.define
class HomeMaintananceTask:
    id: str
    name: str
    type: str
    
    value: int = 0
    control: str = ""
    sensor: str = ""
    operator: str = "equal"
    location: str = "N/A"
    description: str = "No description"
    notified: bool = False #nezabudnut
    next_notification: str = None
    seasonal: bool = False
    seasonal_interval: int = 0 # pri intervalovych to je ako casto sa opakuju
    seasonal_type: str = "" # pri intervalovych to je typ intervalu
    reactivate: str = None
    duration_condition: bool = False
    duration: int = 0
    duration_start: str = None
    duration_type: str = ""
    fixed: bool = False
    next_due: str = ""
    last_completed: str = ""
    option: str = ""

    EDITABLE_FIELDS: ClassVar[tuple[str, ...]] = (
        "name",
        "value",
        "sensor",
        "operator",
        "location",
        "description",
        "seasonal",
        "seasonal_interval",
        "seasonal_type",
        "last_completed",
        "control",
        "duration_condition",
        "duration_type",
        "duration",
        "fixed",
        "option",
        "next_due",
    )

    @staticmethod
    def from_dict(data: dict):
        return HomeMaintananceTask(
            id=data["id"],
            name=data["name"],
            type=data["type"],

            value=data.get("value", 0),
            control=data.get("control", ""),
            sensor=data.get("sensor", ""),
            operator=data.get("operator", "equal"),
            notified=data.get("notified", False),
            next_notification=data.get("next_notification", None),
            location=data.get("location", "N/A"),
            description=data.get("description", "No description"),
            seasonal=data.get("seasonal", False),
            seasonal_interval=data.get("seasonal_interval", 0),
            seasonal_type=data.get("seasonal_type", ""),
            reactivate=data.get("reactivate", None),
            duration_condition=data.get("duration_condition", False),
            duration=data.get("duration", 0),
            duration_start=data.get("duration_start", None),
            duration_type=data.get("duration_type", ""),
            fixed=data.get("fixed", False),
            next_due=data.get("next_due", ""),
            last_completed=data.get("last_completed", ""),
            option=data.get("option", "")
        )