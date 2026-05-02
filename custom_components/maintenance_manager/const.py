"""
Author: Marián Šuľa
Description: Constants for the Device Maintenance Manager integration.
"""

from typing import Final
DOMAIN: Final = "maintenance_manager"
API_PATH: Final = "/maintenance_manager"
API_URL: Final = API_PATH + "/main.js"
ICON: Final = "mdi:hammer-wrench"
PANEL_PATH: Final = "maintenance_manager_panel"
SIGNAL_TASK_CREATED: Final = f"{DOMAIN}_task_created"
