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
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in stations" :key="station.code">
          <td>{{ station.code }}</td>
          <td>{{ station.city }}</td>
          <td>{{ station.latitude }}</td>
          <td>{{ station.longitude }}</td>
          <td>{{ station.installation_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    stations: {
      type: Array,
      required: true
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
</style>