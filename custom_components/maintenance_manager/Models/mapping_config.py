MAPPING = [
    # select
    {
        "domain": ["select", "sensor"],
        "option": "current_option",
        "search": "options",
        "control": "select",
        "options_list": []
    },
    # vacuum
    {
        "domain": ["vacuum"],
        "option": "fan_speed",
        "search": "fan_speed_list",
        "control": "select",
        "options_list": []
    },
    {
        "domain": ["vacuum"],
        "option": "activity",
        "search": "",
        "control": "select",
        "options_list": ["cleaning", "docked", "idle", "paused", "returning", "error"]
    },
    # remote
    {
        "domain": ["remote"],
        "option": "current_activity",
        "search": "activity_list",
        "control": "select",
        "options_list": []
    },
    # climate
    {
        "domain": ["climate", "humidifier"],
        "option": "current_humidity",
        "search": "current_humidity",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["climate", "water_heater"],
        "option": "current_temperature",
        "search": "current_temperature",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["climate"],
        "option": "fan_mode",
        "search": "fan_modes",
        "control": "select",
        "options_list": []
    },
    {
        "domain": ["climate"],
        "option": "hvac_action",
        "search": "",
        "control": "select",
        "options_list": ["off", "preheating", "heating", "cooling", "drying", "fan", "idle", "defrosting"]
    },
    {
        "domain": ["climate"],
        "option": "hvac_mode",
        "search": "hvac_modes",
        "control": "select",
        "options_list": []
    },
    {
        "domain": ["climate", "fan"],
        "option": "preset_mode",
        "search": "preset_modes",
        "control": "select",
        "options_list": []
    },
    {
        "domain": ["climate"],
        "option": "swing_mode",
        "search": "swing_modes",
        "control": "select",
        "options_list": []
    },
    {
        "domain": ["climate"],
        "option": "swing_horizontal_mode",
        "search": "swing_horizontal_modes",
        "control": "select",
        "options_list": []
    },
    {
        "domain": ["climate", "humidifier"],
        "option": "target_humidity",
        "search": "target_humidity",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["climate", "water_heater"],
        "option": "target_temperature",
        "search": "target_temperature",
        "control": "number",
        "options_list": []
    },
    # cover
    {
        "domain": ["cover"],
        "option": "current_cover_position",
        "search": "current_cover_position",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["cover"],
        "option": "current_cover_tilt_position",
        "search": "current_cover_tilt_position",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["cover"],
        "option": "states",
        "search": "",
        "control": "select",
        "options_list": ["closed", "closing", "opening", "open"]
    },
    # fan
    {
        "domain": ["fan"],
        "option": "current_direction",
        "search": "current_direction",
        "control": "number",
        "options_list": []
    },
    # humidifier
    {
        "domain": ["humidifier"],
        "option": "action",
        "search": "",
        "control": "select",
        "options_list": ["humidifying", "drying", "idle", "off"]
    },
    {
        "domain": ["humidifier"],
        "option": "mode",
        "search": "available_modes",
        "control": "select",
        "options_list": []
    },
    # lawnmower
    {
        "domain": ["lawn_mower"],
        "option": "activity",
        "search": "",
        "control": "select",
        "options_list": ["mowing", "docked", "paused", "returning", "error"]
    },
    # lock
    {
        "domain": ["lock"],
        "option": "states",
        "search": "",
        "control": "select",
        "options_list": ["locked", "locking", "unlocking", "unlocked", "jammed", "opening", "open"]
    },
    # mediaplayer
    {
        "domain": ["media_player"],
        "option": "states",
        "search": "",
        "control": "select",
        "options_list": ["off", "onn", "idle", "playing", "paused", "buffering"]
    },
    # sensor
    {
        "domain": ["sensor"],
        "option": "units",
        "search": "unit_of_measurement",
        "control": "number",
        "options_list": []
    },
    # valve
    {
        "domain": ["valve"],
        "option": "current_valve_position",
        "search": "current_valve_position",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["valve"],
        "option": "states",
        "search": "",
        "control": "select",
        "options_list": ["oppening", "open", "closing", "closed"]
    },
    # waterheater
    {
        "domain": ["water_heater"],
        "option": "states",
        "search": "",
        "control": "select",
        "options_list": ["state_eco", "state_electric", "state_performance", "state_high_demand", "state_heat_pump", "state_gas", "state_off"]
    },
    {
        "domain": ["water_heater"],
        "option": "current_operation",
        "search": "operation_list",
        "control": "select",
        "options_list": []
    },
    # weather
    {
        "domain": ["weather"],
        "option": "condition",
        "search": "",
        "control": "select",
        "options_list": ["clear-night", "cloudy", "exceptional", "fog", "hail", "lightning", "lightning-rainy",
                         "partlycloudy", "pouring", "rainy", "snowy", "snowy-rainy", "sunny", "windy", "windy-variant"]
    },
    {
        "domain": ["weather"],
        "option": "humidity",
        "search": "humidity",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["weather"],
        "option": "native_temperature",
        "search": "native_temperature",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["weather"],
        "option": "native_pressure",
        "search": "native_pressure",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["weather"],
        "option": "pressure",
        "search": "pressure",
        "control": "number",
        "options_list": []
    },
    {
        "domain": ["weather"],
        "option": "temperature",
        "search": "temperature",
        "control": "number",
        "options_list": []
    },
    # binarysensor
    {
        "domain": ["switch", "binary_sensor", "camera", "fan", "humidifier", "remote", "siren"],
        "option": "turn_on",
        "search": "",
        "control": "select",
        "options_list": ["on", "off"]
    },
    # number
    {
        "domain": ["number"],
        "option": "number",
        "search": "",
        "control": "number",
        "options_list": []
    },
    # camera
    {
        "domain": ["camera"],
        "option": "states",
        "search": "",
        "control": "select",
        "options_list": ["recording", "streaming", "idle"]
    },
    # is_on
    {
        "domain": ["camera", "fan", "humidifier", "remote", "siren"],
        "option": "is_on",
        "search": "is_on",
        "control": "select",
        "options_list": ["true", "false"]
    },
]
