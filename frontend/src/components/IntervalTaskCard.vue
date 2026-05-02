// Author: Marián Šuľa
// Description: IntervalTaskCard component for displaying individual maintenance tasks with intervals and actions
<script setup>
import { defineProps, defineEmits, ref } from 'vue';


const props = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    value: {
        type: Number,
        required: true
    },
    overdue: {
        type: Boolean,
        required: true
    },
    next_due: {
        type: String,
        required: true
    },
    last_completed: {
        type: String,
        required: false
    },
    seasonal_type: {
        type: String,
        required: true
    },
    warning: {
        type: Boolean,
        required: true
    }
});

const showActions = ref(false);

const emit = defineEmits(['deleteTask', 'completeTask']);

const deleteTask = () => {
    showActions.value = false
    emit('deleteTask');
}

const completeTask = () => {
    emit('completeTask');
}

const editTask = () => {
    showActions.value = false
    emit('editTask');
}
const panel = ref(false);

const onExpandedChanged = (event) => {
    panel.value = event.detail.expanded;
}


</script>
<template>
    <ha-card :class="['w-full', 'p-6', {
        'border-red-500': props.overdue,
        'border-yellow-500': props.warning && !props.overdue
    }]">
        <ha-expansion-panel @expanded-changed="onExpandedChanged">
            <!-- Card header -->
            <span slot="header">
                <div class="grid items-center grid-cols-1 gap-1 tablet:grid-cols-4 tablet:gap-0">
                    <div class="text-2xl font-medium">{{ props.name }}</div>
                    <div class="flex items-center">
                        <div v-if="!panel" class="text-xl font-light">{{ props.location }}</div>
                    </div>
                    <div>
                        <div v-if="!panel" class="flex items-center">

                        <ha-icon .icon="'mdi:clock-time-four-outline'"></ha-icon>
                        <span class="ml-2 flex items-center gap-1">
                            <div class="hidden desktop:block">Next due:</div> {{ props.seasonal_type == "runtime" ?
                                Math.ceil(Number(props.next_due)
                                    /
                                    3600) <= 1 ? Math.ceil(Number(props.next_due) / 60) + " minutes remaining" :
                                    Math.ceil(Number(props.next_due) / 3600) + " hours remaining" : props.next_due }}</span>

                    </div>
                    </div>
                    
                    <div class="flex items-center justify-end gap-2 mr-5">
                        <ha-button @click.stop @click="completeTask" appearance="accent" variant="success"
                            class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                                <ha-icon .icon="'mdi:check-circle-outline'"></ha-icon><span
                                    class="hidden mobileL:block tablet:hidden desktop:block">
                                    Complete</span>
                            </div>
                        </ha-button>
                        <ha-dropdown @click.stop>
                            <ha-button slot="trigger" appearance="plain" variant="neutral">
                                <ha-icon .icon="'mdi:dots-vertical'"></ha-icon>
                            </ha-button>

                            <ha-dropdown-item @click="editTask" variant="neutral" appearance="plain">
                                <ha-icon .icon="'mdi:pencil'"></ha-icon>
                                Edit
                            </ha-dropdown-item>
                            <ha-dropdown-item @click="deleteTask" variant="danger" appearance="plain">
                                <ha-icon .icon="'mdi:delete'"></ha-icon>
                                Delete
                            </ha-dropdown-item>
                        </ha-dropdown>
                    </div>
                </div>
            </span>

            <!-- Card informations -->
            <div class="text-xl font-light mt-2 mb-6">{{ props.location }}</div>

            <div class="text-lg">
                <div v-if="props.description != 'No description'" class="mb-2 flex items-center">
                    <span class="hidden tablet:block font-semibold">Description:</span>
                    <ha-icon class="block tablet:hidden" .icon="'mdi:book-open-variant-outline'"></ha-icon>
                    <span class="ml-2">{{ props.description }}</span>
                </div>
                <div class="mb-2">
                    <ha-icon .icon="'mdi:calendar'"></ha-icon>
                    <span class="ml-2">Every {{ props.value }} {{ props.seasonal_type == "runtime" ? "hours" :
                        props.seasonal_type }}</span>
                </div>
                <div class="mb-2 flex items-center">
                    <ha-icon .icon="'mdi:clock-time-four-outline'"></ha-icon>
                    <span class="ml-2 flex items-center gap-1"><div class="hidden mobileL:block">Next due:</div> {{ props.seasonal_type == "runtime" ? Math.ceil(Number(props.next_due)
                        /
                        3600) <= 1 ? Math.ceil(Number(props.next_due) / 60) + " minutes remaining" :
                        Math.ceil(Number(props.next_due) / 3600) + " hours remaining" : props.next_due }}</span>
                </div>
                <div class="flex items-center">
                    <ha-icon .icon="'mdi:check-circle-outline'"></ha-icon>
                    <span class="ml-2 flex items-center gap-1"><div class="hidden mobileL:block">Last completed:</div> {{ props.last_completed != "" ? props.last_completed :
                        'Notcompleted before...' }}
                    </span>
                </div>
            </div>
        </ha-expansion-panel>


    </ha-card>
</template>