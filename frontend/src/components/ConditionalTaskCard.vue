// Author: Marián Šuľa
// Description: ConditionalTaskCard component for displaying individual maintenance tasks with conditions and actions
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
    sensor: {
        type: String,
        required: true
    },
    operator: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    overdue: {
        type: Boolean,
        required: true
    }
});

const showActions = ref(false);

const operatorMap = {
    "below": "<",
    "equal": "=",
    "above": ">",
}

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
    <ha-card :class="['w-full', 'p-6', { 'border-red-700': props.overdue }]">

        <ha-expansion-panel @expanded-changed="onExpandedChanged">
            <!-- Card header -->
            <span slot="header">
                <div class="grid items-center grid-cols-1 gap-1 tablet:grid-cols-4 tablet:gap-0">
                    <div class="text-2xl font-medium">{{ props.name }}</div>
                    <div class="flex items-center">
                        <div v-if="!panel" class="text-xl font-light">{{ props.location }}</div>
                    </div>
                    <div class="flex items-center">
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

            <div class="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-lg">
                <div class="hidden tablet:block mb-1">
                    <span class="text-blue-600 font-semibold">Condition:</span>
                    <span class="text-blue-600 ml-1">{{ props.sensor }} {{ operatorMap[props.operator] ?? "=" }}
                        {{ Array.isArray(props.value) ? props.value.join(' or ') : props.value }}</span>
                </div>
                <div>
                    <span class="text-blue-600 font-semibold">Action:</span>
                    <span class="text-blue-600 ml-1">{{ props.description != "No description" ? props.description : "-"
                        }}</span>
                </div>
            </div>
        </ha-expansion-panel>
    </ha-card>
</template>