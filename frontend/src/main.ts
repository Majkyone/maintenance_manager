// Author: Marián Šuľa
// Description: Defines the custom element for the Device Maintenance Manager integration.

import App from './App.vue'
import { defineCustomElement } from 'vue'
const MyIntegrationPanel = defineCustomElement(App);
customElements.define("maintenance-manager-panel", MyIntegrationPanel);

import './assets/main.css'
