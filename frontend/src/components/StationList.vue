<!-- src/components/StationList.vue -->
<template>
  <div>
    <table class="table table-striped table-hover table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Code</th>
          <th scope="col">City</th>
          <th scope="col">Latitude</th>
          <th scope="col">Longitude</th>
          <th scope="col">Installation Date</th>
          <th scope="col" class="text-center">Sensors</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in stations" :key="station.code">
          <td>{{ station.code }}</td>
          <td>{{ station.city }}</td>
          <td>{{ station.latitude }}</td>
          <td>{{ station.longitude }}</td>
          <td>{{ station.installation_date }}</td>
          <td class="text-center">
            <button class="btn btn-primary btn-sm" @click="openModal(station.code)">View Sensors</button>
          </td>
        </tr>
      </tbody>
    </table>
    <SensorsDataModal
      :show="showModal"
      :stationCode="selectedStationCode"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import SensorsDataModal from './SensorsDataModal.vue';

export default {
  components: {
    SensorsDataModal
  },
  props: {
    stations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      selectedStationCode: null
    };
  },
  methods: {
    openModal(stationCode) {
      this.selectedStationCode = stationCode;
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.thead-dark th {
  background-color: #343a40;
  color: white;
}
.text-center {
  text-align: center;
}
.btn-primary {
  margin: 0;
}
</style>