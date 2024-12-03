<!-- src/components/StationList.vue -->
<template>
  <div class="container">
    <h2 class="my-4">Stations</h2>
    <ul class="list-group">
      <li class="list-group-item" v-for="station in stations" :key="station.id">{{ station.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StationList',
  props: {
    stations: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>