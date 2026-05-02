// Author: Marián Šuľa
// Description: InfoCards component for displaying summary information about tasks
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    totalTasks: {
        type: Number,
        required: true
    },
    upcomingTasks: {
        type: Number,
        required: true
    },
    overdueTasks: {
        type: Number,
        required: true
    }
});
</script>
<template>
    <div class="tablet:flex tablet:gap-8 tablet:flex-row grid grid-cols-1 gap-4">
        <ha-card class="flex flex-1 min-w-0 items-center justify-between p-6">
            <div class="flex flex-col">
                <div class="text-2xl">Total tasks</div>
                <div class="text-2xl">{{ props.totalTasks }}</div>
            </div>
            <div class="flex-shrink-0">
                <ha-icon class="text-blue-500" .icon="'mdi:calendar-blank'"></ha-icon>
            </div>
        </ha-card>
        <ha-card class="flex flex-1 min-w-0 items-center justify-between p-6">
            <div class="flex flex-col">
               <div class="text-2xl">Upcoming Tasks</div>
                <div class="text-2xl">{{ props.upcomingTasks }}</div>
            </div>
            <div class="flex-shrink-0">
                <ha-icon class="text-yellow-500" .icon="'mdi:bell'"></ha-icon>
            </div>
        </ha-card>
        <ha-card class="flex flex-1 min-w-0 items-center justify-between p-6">
            <div class="flex flex-col">
                <div class="text-2xl">Overdue Tasks</div>
                <div class="text-2xl">{{ props.overdueTasks }}</div>
            </div>
            <div class="flex-shrink-0">
                <ha-icon class="text-red-500" .icon="'mdi:alert'"></ha-icon>
            </div>
        </ha-card>
    </div>
</template>