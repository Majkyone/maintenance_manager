// Author: Marián Šuľa
// Description: Dialog component for displaying content in a modal window
<script setup>
const props = defineProps({
    show:{
        type: Boolean,
        required: true
    }
});
</script>
<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[8] p-4">
      <div class="flex justify-center w-full max-w-3xl">
        <slot></slot>
      </div>
    </div>
</template>