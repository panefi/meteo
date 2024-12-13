// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StationsView from '../views/StationsView.vue';
// import SensorsView from '../views/SensorsView.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },  
  {
    path: '/stations',
    name: 'Stations',
    component: StationsView
  },
  {
    path: '/login',
    name: 'Login',
    component: HomeView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;