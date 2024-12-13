<!-- src/components/SensorsDataList.vue -->
<template>
    <div>
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Station Code</th>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Measurement</th>
            <th scope="col">Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sensor in sensors" :key="sensor.sensor_id">
            <td>{{ sensor.sensor_id }}</td>
            <td>{{ sensor.station_code }}</td>
            <td>{{ sensor.date }}</td>
            <td>{{ sensor.type }}</td>
            <td>{{ sensor.measurement }}</td>
            <td>{{ sensor.unit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sensors: {
        type: Array,
        required: true
      }
    }
  };
  </script>
    