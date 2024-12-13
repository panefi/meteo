<template>
  <div>
    <h2>Sensors for Station {{ stationId }}</h2>
    <ul>
      <li v-for="sensor in sensors" :key="sensor.id">
        {{ sensor.name }}: {{ sensor.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  name: 'SensorsView',
  props: ['stationId'],
  data() {
    return {
      sensors: []
    };
  },
  created() {
    this.fetchSensors();
  },
  methods: {
    async fetchSensors() {
      try {
        const response = await apiService.getSensors(this.stationId);
        this.sensors = response;
      } catch (error) {
        console.error('Error fetching sensors:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any styles you need for the sensors view */
</style>