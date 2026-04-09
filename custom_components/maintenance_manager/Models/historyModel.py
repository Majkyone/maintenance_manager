import attrs
from datetime import datetime
from dataclasses import dataclass

@dataclass
class CompletionRecord:
    date: datetime
    note: str


@attrs.define
class HomeMaintananceHistory:
    id: str
    name: str
    location: str
    completion_dates: list[CompletionRecord]

    @staticmethod
    def from_dict(data: dict):
        return HomeMaintananceHistory(
            id=data["id"],
            name=data["name"],
            location=data["location"],
            completion_dates=[
                CompletionRecord(
                    date=datetime.fromisoformat(item["date"]),
                    note=item.get("note", "No notes provided.")
                )
                for item in data["completion_dates"]
            ],
        )
