// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SensorsView from '../views/SensorsView.vue';


const baseUrl = process.env.VUE_APP_BASE_URL || '/';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/sensors',
    name: 'Sensors',
    component: SensorsView,
  },
];

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
});

export default router;