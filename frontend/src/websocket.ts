// Author: Marián Šuľa
// Description: WebSocket API functions for the Device Maintenance Manager Home Assistant integration.
import type { HomeAssistant } from "custom-card-helpers";

interface History {
    Name: string,
    Location: string,
    completion_dates: CompletionRecord[],
}

interface CompletionRecord {
    date: string,
    notes?: string,
}

interface Note {
    Notes?: string,
}

interface Attributes {
  "control": string
}
// WebSocket API functions for the Device Maintenance Manager integration.
export const getTasks = (hass: HomeAssistant): Promise<any> =>
    hass.callWS({
        type: 'maintenance_manager/get_tasks',
    });

export const createTask = (hass: HomeAssistant, payload: any): Promise<any> =>
    hass.callWS({
        type: 'maintenance_manager/create_task',
        ...payload,
    });

export const deleteTask = (hass: HomeAssistant, taskId: string): Promise<any> =>
    hass.callWS({
        type: 'maintenance_manager/delete_task',
        task_id: taskId,
    });

export const completeTask = (hass: HomeAssistant, taskId: string, payload: Note): Promise<any> =>
    hass.callWS({
        type: 'maintenance_manager/complete_task',
        task_id: taskId,
        ...payload
    });

export const getHistory = (hass: HomeAssistant): Promise<History[]> =>
    hass.callWS({
        type: 'maintenance_manager/get_history',
    });

export const getAttributes = (hass: HomeAssistant, taskSensor: string): Promise<Attributes[]> =>
    hass.callWS({
        type: 'maintenance_manager/get_attributes',
        task_sensor: taskSensor
    });

export const editTask = (hass: HomeAssistant, payload: any): Promise<any> =>
    hass.callWS({
        type: 'maintenance_manager/edit_task',
        ...payload,
    });