<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>Sensors Data</h3>
      <button class="close-btn" @click="closeModal">Close</button>
      <div class="modal-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Measurement</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sensor in sensors" :key="sensor.id">
              <td>{{ sensor.sensor_id }}</td>
              <td>{{ sensor.date }}</td>
              <td>{{ sensor.type }}</td>
              <td>{{ sensor.measurement }}</td>
              <td>{{ sensor.unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  props: {
    show: Boolean,
    stationCode: Number
  },
  data() {
    return {
      sensors: []
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchSensorsData();
      }
    }
  },
  methods: {
    async fetchSensorsData() {
      try {
        const sensors = await apiService.getSensorsData(this.stationCode);
        this.sensors = sensors;
        console.log(this.sensors);
      } catch (error) {
        console.error('Error fetching sensors data:', error);
      }
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-body {
  max-height: 60vh;
  overflow-y: auto;
}
.close-btn {
  float: right;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}
</style> 