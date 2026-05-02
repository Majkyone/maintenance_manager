// Author: Marián Šuľa
// Description: Header component for the Device Maintenance Manager application
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    hass: {
        type: Object,
        required: false
    },
    narrow: {
        type: Boolean,
        required: false
    },
});
</script>
<template>
    <div class="header">
        <div class="toolbar">
            <ha-menu-button .hass="props.hass" .narrow="props.narrow"></ha-menu-button>
            <div class="mobileL:ml-6 main-title">
                Device Maintenance Manager
            </div>
            <div class="version">
                v1.0.4
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
  background-color: var(--app-header-background-color);
  color: var(--app-header-text-color, white);
  border-bottom: var(--app-header-border-bottom, none);
}

.toolbar {
  height: var(--header-height);
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0 16px;
  font-weight: 400;
  box-sizing: border-box;
}

.main-title {
  line-height: 20px;
  flex-grow: 1;
}

.version {
  font-size: 14px;
  font-weight: 500;
  color: rgba(var(--rgb-text-primary-color), 0.9);
}
</style>