// Author: Marián Šuľa
// Description: Main component of the Device Maintenance Manager custom card.
// It manages the state of the application, handles user interactions, and communicates with the backend via WebSocket.
<script setup lang="ts">
import { watch } from 'vue';
import InfoCards from './components/InfoCards.vue';
import { getTasks, createTask, deleteTask, completeTask, getHistory, getAttributes, editTask } from "@/websocket.ts";
import type { HomeAssistant } from "custom-card-helpers";
import { ref, computed } from 'vue';
import Header from './components/Header.vue';
import ConditionalTaskCard from './components/ConditionalTaskCard.vue';
import Dialog from './components/Dialog.vue';
import IntervalTaskCard from './components/IntervalTaskCard.vue';
import { useSchemaConditional, useNotesSchema, useSchemaInterval, useSchemaFilter } from './schema';

const props = defineProps<{
  hass?: HomeAssistant,
  narrow?: boolean
}>();

interface Attributes {
  "control"?: string
  "options"?: string[],
  "unit"?: string,
  "option"?: string
}
// State variables
const formData = ref<any>({});
const notesData = ref<any>({});
const tasks = ref<Array<any>>([]);
const tasksToShow = ref<Array<any>>([]);
const filter = ref()
const history = ref<Array<any>>([]);
const showDialog = ref(false);
const deleteDialog = ref(false);
const completeDialog = ref(false);
const editDialog = ref(false)
const completedTaskId = ref("null");
const deletedTaskId = ref("null");
const seasonal = ref(false);
const duration = ref(false);
const runtime = ref(false);
const requiredFields = new Set(["Task Name"]);
const totalTasks = computed(() => tasks.value.length);
const overdueTasks = computed(() => tasks.value.filter(task => task.notified).length);
const upcomingTasks = computed(() => tasks.value.filter(task => task.warning && !task.notified).length);
const infoToShow = ref("interval");
const showTaskHistory = ref(<any>(""));
const showCreateFormular = ref("interval");
const sensorAttributes = ref<Attributes[] | null>(null);
const currentAttribute = ref<Attributes | null>(null);
const { schemaFilter } = useSchemaFilter();
const { schemaConditional } = useSchemaConditional(sensorAttributes, currentAttribute, duration, seasonal);
const { schemaInterval } = useSchemaInterval(sensorAttributes, currentAttribute, runtime);
const { schemaNotes } = useNotesSchema()

// Watch for changes in the Home Assistant object and fetch tasks and history when it changes
watch(
  () => props.hass,
  async (hass) => {
    if (!hass) return;
    try {
      const ts = await getTasks(hass);
      const hi = await getHistory(hass);
      history.value = hi;
      tasks.value = filterTasks(ts);
      tasksToShow.value = tasks.value
      groupTasks()

    } catch (e) {
      console.error('Failed to get devices:', e);
    }

  },
  { immediate: true }
);
// Filter tasks to determine which ones are upcoming or overdue, and sort them accordingly
const filterTasks = (tasks: any[]) => {
  return tasks.map((task: any) => {
    if (task.type == "interval") {
      if (task.seasonal_type === "runtime") {
        return { ...task, warning: task.next_due <= 3600 }
      }
      const nextDue = new Date(task.next_due)
      const now = new Date()
      const diffDays = (nextDue.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      return { ...task, warning: diffDays <= 0.5 }
    } else {
      return { ...task, warning: false }
    }
  })
    .sort((a: any, b: any) => {
      if (b.notified !== a.notified) return b.notified - a.notified
      if (b.warning !== a.warning) return Number(b.warning) - Number(a.warning)
      return 0
    })
}

const groupTasks = () => {
  if (filter.value == "areas") {
    groupByAreas()
  }
}

const closeDialog = () => {
  showDialog.value = false
  editDialog.value = false
  seasonal.value = false
  duration.value = false
  runtime.value = false
  sensorAttributes.value = []
  currentAttribute.value = {}
  formData.value = {}
}
// Handle form submission, validate required fields and send the data to the backend
const submitForm = async () => {
  formData.value["Type"] = showCreateFormular.value;
  formData.value["Control"] = currentAttribute.value?.control
  if (formData.value["Condition Duration"] === true) {
    requiredFields.add("Duration");
    requiredFields.add("Duration Type");
  } else {
    requiredFields.delete("Duration");
    requiredFields.delete("Duration Type");
    formData.value["Duration"] = 0;
    formData.value["Duration Type"] = "";
  }
  if (formData.value["Seasonal Task"] === true) {
    requiredFields.add("Seasonal Interval");
    requiredFields.add("Seasonal Type");
  } else {
    requiredFields.delete("Seasonal Interval");
    requiredFields.delete("Seasonal Type");
    formData.value["Seasonal Interval"] = 0;
    formData.value["Seasonal Type"] = "";
  }
  if (formData.value["Type"] == "conditional" || formData.value["Interval Type"] == "runtime") {
    requiredFields.add("Sensor");
    if (currentAttribute.value?.control == "number") {
      requiredFields.add("Operator");
    } else {
      requiredFields.delete("Operator");
    }
    requiredFields.add("Value");
  } else {
    requiredFields.delete("Sensor");
    requiredFields.delete("Operator");
    requiredFields.delete("Value");
    formData.value["Sensor"] = "";
    formData.value["Operator"] = "";
    formData.value["Value"] = "";
  }

  if (formData.value["Type"] == "interval") {
    requiredFields.add("Interval Type");
    requiredFields.add("Repeat Every");
  } else {
    requiredFields.delete("Interval Type");
    requiredFields.delete("Repeat Every");
    formData.value["Interval Type"] = "";
    formData.value["Repeat Every"] = 0;
  }
  for (const field of requiredFields) {
    if (
      formData.value[field] === undefined ||
      formData.value[field] === null ||
      formData.value[field] === ""
    ) {
      alert(`Field '${field}' is required.`);
      return;
    }
  }

  try {
    if (editDialog.value) {
      await editTask(props.hass!, formData.value);

    } else {
      await createTask(props.hass!, formData.value);

    }
    tasks.value = await getTasks(props.hass!)
    tasks.value = filterTasks(tasks.value)
    tasksToShow.value = tasks.value
    groupTasks()
    closeDialog()
  } catch (error) {
    console.error("Failed to create maintenance task:", error);
  }

}
// Handle changes in the form, update the state accordingly and fetch attributes when the sensor changes
const onFormChanged = async (event: any) => {
  if (event.detail.value["Sensor"] != "" && event.detail.value["Sensor"] != formData.value["Sensor"]) {
    try {
      const response = await getAttributes(props.hass!, event.detail.value["Sensor"]);
      sensorAttributes.value = response
      currentAttribute.value = sensorAttributes.value.length > 1 ? {} : sensorAttributes.value[0] ?? null
      event.detail.value["Operator"] = ""
      event.detail.value["Value"] = ""
      event.detail.value["Attribute"] = ""
    } catch (error) {
      console.error("Failed to get attributes:", error);
    }

  }
  if (completeDialog.value) {
    notesData.value = event.detail.value;
    return;
  }
  if (event.detail.value["Attribute"] != formData.value["Attribute"]) {
    event.detail.value["Value"] = ""
    event.detail.value["Operator"] = ""
  }
  formData.value = event.detail.value;
  seasonal.value = formData.value["Seasonal Task"] ?? false;
  duration.value = formData.value["Condition Duration"] ?? false;
  runtime.value = formData.value["Interval Type"] == 'runtime' ? true : false;
  if (formData.value["Attribute"] && sensorAttributes.value!.length > 1) {
    currentAttribute.value = sensorAttributes.value?.find(attr => attr.option === formData.value["Attribute"]) ?? null
  }
}
// Handle task deletion and update the task list
const submitDelete = async () => {
  if (!props.hass) return;

  try {
    await deleteTask(props.hass!, deletedTaskId.value);
    deleteDialog.value = false;
    deletedTaskId.value = "null";
    tasks.value = await getTasks(props.hass!)
    tasks.value = filterTasks(tasks.value)
    tasksToShow.value = tasks.value
    groupTasks()
  } catch (error) {
    console.error("Failed to delete task: ", error);
  }
}
// Handle marking a task as complete and update the task list and history
const submitComplete = async () => {
  if (!props.hass) return;

  try {
    await completeTask(props.hass!, completedTaskId.value, notesData.value);
    completeDialog.value = false;
    completedTaskId.value = "null";
    notesData.value = {}
    history.value = await getHistory(props.hass!)
    tasks.value = await getTasks(props.hass!)
    tasks.value = filterTasks(tasks.value)
    tasksToShow.value = tasks.value
    groupTasks()
  } catch (error) {
    console.error("Failed to completing task: ", error);
  }
}

const showEntireHistory = (taskId: string) => {

  showTaskHistory.value = history.value.find(task => task.id === taskId);
}

const reversedCompletionDates = computed(() =>
  [...showTaskHistory.value.completion_dates].reverse()
)

const openIntervalForm = () => {
  showCreateFormular.value = 'interval'
  formData.value = {};
  formData.value["Type"] = 'interval';
}

const openConditionalForm = () => {
  showCreateFormular.value = 'conditional'
  formData.value = {};
  formData.value["Type"] = 'conditional';
}
// Handle editing a task, fill the form with the existing data and fetch attributes if the sensor is defined
const submitEdit = async (taskId: string) => {
  editDialog.value = true
  const task = tasks.value.find(t => t.id === taskId)

  if (task.sensor != "") {
    try {
      const response = await getAttributes(props.hass!, task.sensor);
      sensorAttributes.value = response
      currentAttribute.value = sensorAttributes.value?.find(attr => attr.option === task.option) ?? response[0] ?? null

    } catch (error) {
      console.error("Failed to get attributes:", error);
    }
  }
  seasonal.value = task.seasonal
  duration.value = task.duration_condition
  runtime.value = task.seasonal_type == "runtime" ? true : false
  showCreateFormular.value = task.type
  if (task.duration_type == "minutes") {
    task.duration /= 60
  } else if (task.duration_type == "hours") {
    task.duration /= 3600
  }

  formData.value = {
    "task_id": task.id,
    "Task Name": task.name,
    "Location": task.location,
    "Sensor": task.sensor,
    "Value": task.value,
    "Operator": task.operator,
    "Description": task.description,
    "Duration": task.duration,
    "Duration Type": task.duration_type,
    "Seasonal Interval": task.seasonal_interval,
    "Seasonal Type": task.seasonal_type,
    "Condition Duration": task.duration_condition,
    "Seasonal Task": task.seasonal,
    "Type": task.type,
    "Fixed Interval": task.fixed,
    "Last Completed": task.last_completed,
    "Repeat Every": task.seasonal_interval,
    "Interval Type": task.seasonal_type,
    "Attribute": task.option
  }
}

const onFormChangedFilter = async (event: any) => {
  // const areas = [...new Set(tasks.value.map(task => task.location))]
  filter.value = event.detail.value["Select Filter"]
  switch (filter.value) {
    case "areas":
      groupByAreas()
      break;
    default:
      tasksToShow.value = tasks.value
      break;
  }

}

const groupByAreas = () => {
  const grouped = <any>{}
  tasks.value.forEach(task => {
    if (!grouped[task.location]) {
      grouped[task.location] = [];
    }
    grouped[task.location].push(task)
  })
  tasksToShow.value = Object.entries(grouped).flatMap(([location, tasks]) => tasks);
}

</script>

<template>
  <!-- Panel- header -->
  <Header v-if="props.hass" :hass="props.hass" :narrow="props.narrow" />
  <div class="flex flex-col gap-10 justify-center m-6">
    <!-- Panel- summary information -->
    <InfoCards :totalTasks="totalTasks" :upcomingTasks="upcomingTasks" :overdueTasks="overdueTasks" />
    <!-- Panel- new task button -->
    <ha-card class="flex flex-col p-6 gap-5">
      <div class="flex items-center justify-between pb-5 flex-col tablet:flex-row gap-3 text-center tablet:text-left">
        <div class="flex flex-col">
          <div class="text-2xl font-medium tablet:mb-0 mb-3">Maintenance Tasks</div>
          <div class="hidden mobileM:block text-xl">Manage scheduled and conditional maintenance for your smart
            devices</div>
        </div>
          <div class="flex flex-col flex-shrink-0 mobileM:flex-row gap-5 text-2xl items-center">
            <ha-button @click="showDialog = true">
              <div class="flex items-center gap-1">
                    <ha-icon class="text-white" .icon="'mdi:plus'"></ha-icon>
                    <span>New Task</span>
                </div>
            </ha-button>
            <ha-form .hass="props.hass" .schema="schemaFilter" @value-changed="onFormChangedFilter"></ha-form>
          </div>
      </div>
      <!-- Panel- navigation tab -->
      <ha-card class="flex w-full p-1 gap-1 rounded-full">
        <ha-button @click="infoToShow = 'interval'" class="flex items-center flex-1" variant="neutral"
          :appearance="infoToShow === 'interval' ? 'accent' : 'plain'" size="small"> <div class="flex items-center gap-1">
            <ha-icon variant="neutral"
            .icon="'mdi:calendar-blank'"></ha-icon><span class="hidden tablet:block"> Interval tasks</span>
          </div> </ha-button>
        <ha-button @click="infoToShow = 'conditional'" class="flex-1" variant="neutral"
          :appearance="infoToShow === 'conditional' ? 'accent' : 'plain'" size="small">
          <div class="flex items-center gap-1">
            <ha-icon variant="neutral"
            .icon="'mdi:triangle-wave'"></ha-icon><span class="hidden tablet:block"> Conditional tasks</span>
          </div>
          </ha-button>
        <ha-button @click="infoToShow = 'history'" class="flex-1" variant="neutral"
          :appearance="infoToShow === 'history' ? 'accent' : 'plain'" size="small"> 
          <div class="flex items-center gap-1">
            <ha-icon variant="neutral"
              .icon="'mdi:history'"></ha-icon><span class="hidden tablet:block"> History</span> 
          </div>
          </ha-button>
      </ha-card>

      <div class="text-2xl font-medium" v-if="totalTasks == 0">No tasks created yet...</div>
      <!-- Panel- conditional task card -->
      <ConditionalTaskCard v-if="infoToShow === 'conditional'"
        v-for="task in tasksToShow.filter(t => t.type == 'conditional')" :key="task.id" :id="task.id" :name="task.name"
        :location="task.location_name" :description="task.description" :sensor="task.sensor" :operator="task.operator"
        :value="task.value" :overdue="task.notified" @deleteTask="deleteDialog = true; deletedTaskId = task.id"
        @completeTask="completeDialog = true; completedTaskId = task.id" @editTask="submitEdit(task.id)" />
      <!-- Panel- interval task card -->
      <IntervalTaskCard v-if="infoToShow === 'interval'" v-for="task in tasksToShow.filter(t => t.type == 'interval')"
        :key="task.id" :id="task.id" :name="task.name" :location="task.location_name" :description="task.description"
        :value="task.seasonal_interval" :overdue="task.notified" :next_due="task.next_due"
        :last_completed="task.last_completed" :seasonal_type="task.seasonal_type" :warning="task.warning"
        @deleteTask="deleteDialog = true; deletedTaskId = task.id"
        @completeTask="completeDialog = true; completedTaskId = task.id" @editTask="submitEdit(task.id)" />
      <!-- Panel- tasks history card -->
      <ha-card v-if="infoToShow === 'history'" class="w-full p-4">
        <table class="w-full table-fixed border-spacing-y-3 text-[1.2em]">
          <thead class="text-left forn-size-lg text-[1.1em]">
            <tr>
              <th>Task Name</th>
              <th class="truncate">Location</th>
              <th class="hidden mobileL:table-cell">Date</th>
              <th class="hidden tablet:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr @click="showEntireHistory(task.id)" class="cursor-pointer" v-for="task in history" :key="task.id">
              <td class="truncate">{{ task.name }}</td>
              <td class="truncate">{{ task.location_name }}</td>
              <td class="hidden mobileL:table-cell truncate">{{ task.completion_dates.at(-1).date.replace('T', ' ') }}</td>
              <td class="hidden tablet:table-cell truncate">{{ task.completion_dates.at(-1).note }}</td>
            </tr>
          </tbody>
        </table>
      </ha-card>

    </ha-card>

    <!-- Panel- dialog for creating task -->
    <Dialog :show="showDialog">
      <ha-card class="p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide">
        <div class="flex flex-col mb-5">
          <div class="flex gap-5 text-2xl items-center">
            <ha-icon class="cursor-pointer" .icon="'mdi:close'" @click="closeDialog"></ha-icon>
            <div class="flex-shrink-0">Create Maintenance Task</div>
          </div>
        </div>
        <ha-card class="mb-2 flex w-full p-1 gap-1 rounded-full">
          <ha-button @click="openIntervalForm" class="flex-1" variant="neutral"
            :appearance="showCreateFormular === 'interval' ? 'accent' : 'plain'" size="small">Interval tasks</ha-button>
          <ha-button @click="openConditionalForm" class="flex-1" variant="neutral"
            :appearance="showCreateFormular === 'conditional' ? 'accent' : 'plain'" size="small">Conditional
            tasks</ha-button>
        </ha-card>
        <ha-form v-if="showCreateFormular == 'conditional'" .hass="props.hass" .schema="schemaConditional"
          @value-changed="onFormChanged"></ha-form>
        <ha-form v-else .hass="props.hass" .schema="schemaInterval" @value-changed="onFormChanged"></ha-form>
        <div class="flex flex-row w-full mt-4 gap-3">
          <ha-button class="flex flex-1 min-w-0" appearance="accent" variant="neutral"
            @click="closeDialog">Cancel</ha-button>
          <ha-button class="flex flex-1 min-w-0" @click="submitForm">Create</ha-button>
        </div>
      </ha-card>
    </Dialog>
    <!-- Panel- dialog for editing task -->
    <Dialog :show="editDialog">
      <ha-card class="p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide">
        <div class="flex flex-col mb-5">
          <div class="flex gap-5 text-2xl items-center">
            <ha-icon class="cursor-pointer" .icon="'mdi:close'" @click="closeDialog"></ha-icon>
            <div class="flex-shrink-0">Edit Maintenance Task</div>
          </div>
        </div>
        <ha-form v-if="formData['Type'] == 'conditional'" .hass="props.hass" .schema="schemaConditional"
          .data="formData" @value-changed="onFormChanged"></ha-form>
        <ha-form v-else .hass="props.hass" .schema="schemaInterval" .data="formData"
          @value-changed="onFormChanged"></ha-form>
        <div class="flex flex-row w-full mt-4 gap-3">
          <ha-button class="flex flex-1 min-w-0" appearance="accent" variant="neutral"
            @click="closeDialog">Cancel</ha-button>
          <ha-button class="flex flex-1 min-w-0" @click="submitForm">Edit</ha-button>
        </div>
      </ha-card>
    </Dialog>
    <!-- Panel- dialog for deleting task -->
    <Dialog :show="deleteDialog">
      <ha-card class="p-6 flex flex-col">
        <div class="flex flex-col">
          <div class="text-2xl font-medium mb-5">Create Maintenance Task</div>
          <div class="text-lg font-medium mb-5">Are you sure you want to delete this maintenance task? This action
            cannot be undone.</div>
        </div>

        <div class="flex flex-row w-full mt-4 gap-3">
          <ha-button class="flex flex-1 min-w-0" appearance="accent" variant="neutral"
            @click="deleteDialog = false">Cancel</ha-button>
          <ha-button class="flex flex-1 min-w-0" apperance="accent" variant="danger"
            @click="submitDelete">Delete</ha-button>
        </div>
      </ha-card>
    </Dialog>
    <!-- Panel- dialog for completing task -->
    <Dialog :show="completeDialog">
      <ha-card class="p-6 flex flex-col">
        <div class="flex flex-col">
          <div class="text-2xl font-medium mb-5">Mark as Complete</div>
          <div class="text-lg font-medium mb-5">Add any notes about completing this maintenance task (optional).</div>
        </div>
        <ha-form .hass="props.hass" .schema="schemaNotes" @value-changed="onFormChanged"></ha-form>
        <div class="flex flex-row w-full mt-4 gap-3">
          <ha-button class="flex flex-1 min-w-0" appearance="accent" variant="neutral"
            @click="completeDialog = false">Cancel</ha-button>
          <ha-button class="flex flex-1 min-w-0" apperance="accent" variant="brand" @click="submitComplete">Mark
            Complete</ha-button>
        </div>
      </ha-card>
    </Dialog>
    <!-- Panel- dialog for show task's history -->
    <Dialog :show="showTaskHistory !== ''">
      <ha-card class="p-6 flex flex-col max-h-[80vh] overflow-auto scrollbar-hide">
        <div class="flex flex-col">
          <div class="flex gap-3 text-2xl items-center mb-2">
            <ha-icon class="cursor-pointer" .icon="'mdi:close'" @click="showTaskHistory = ''"></ha-icon>
            <div class="text-2xl font-medium ">{{ showTaskHistory.name }}'s history</div>
          </div>
          <div class="text-lg font-medium mb-5">{{ showTaskHistory.location_name }}</div>
        </div>
        <table class="w-full table-fixed border-spacing-y-3 border-spacing-x-2 text-[1.2em]">
          <thead class="text-left forn-size-lg text-[1.1em]">
            <tr>
              <th>Date</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="note in reversedCompletionDates">
              <td class="">{{ note.date.replace('T', ' ') }}</td>
              <td class="break-words">
                {{ note.note }}
              </td>
            </tr>
          </tbody>
        </table>

      </ha-card>
    </Dialog>
  </div>

</template>

<style>
*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.left-0{left:0}.top-full{top:100%}.z-10{z-index:10}.z-50{z-index:50}.z-\[8\]{z-index:8}.m-6{margin:1.5rem}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-5{margin-right:1.25rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-4{margin-top:1rem}.box-border{box-sizing:border-box}.block{display:block}.flex{display:flex}.table{display:table}.grid{display:grid}.hidden{display:none}.max-h-\[80vh\]{max-height:80vh}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.min-w-0{min-width:0px}.max-w-3xl{max-width:48rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.table-fixed{table-layout:fixed}.border-spacing-x-1{--tw-border-spacing-x: .25rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.border-spacing-x-2{--tw-border-spacing-x: .5rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.border-spacing-y-3{--tw-border-spacing-y: .75rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.gap-8{gap:2rem}.overflow-auto{overflow:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-ellipsis{text-overflow:ellipsis}.break-words{overflow-wrap:break-word}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-sm{border-radius:.125rem}.border-2{border-width:2px}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(185 28 28 / var(--tw-border-opacity, 1))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(234 179 8 / var(--tw-border-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-opacity-50{--tw-bg-opacity: .5}.p-1{padding:.25rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-5{padding-bottom:1.25rem}.text-left{text-align:left}.text-center{text-align:center}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\[1\.1em\]{font-size:1.1em}.text-\[1\.2em\]{font-size:1.2em}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.leading-5{line-height:1.25rem}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}@media(min-width:375px){.mobileM\:block{display:block}.mobileM\:flex-row{flex-direction:row}}@media(min-width:425px){.mobileL\:ml-6{margin-left:1.5rem}.mobileL\:block{display:block}.mobileL\:table-cell{display:table-cell}}@media(min-width:768px){.tablet\:mb-0{margin-bottom:0}.tablet\:block{display:block}.tablet\:flex{display:flex}.tablet\:table-cell{display:table-cell}.tablet\:hidden{display:none}.tablet\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tablet\:flex-row{flex-direction:row}.tablet\:gap-0{gap:0px}.tablet\:gap-8{gap:2rem}.tablet\:text-left{text-align:left}}@media(min-width:1440px){.desktop\:block{display:block}}

</style>