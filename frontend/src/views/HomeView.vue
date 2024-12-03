<!-- src/views/HomeView.vue -->
<template>
  <div>
    <TopBar />
    <StationList :stations="stations" />
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue';
import StationList from '../components/StationList.vue';
import apiService from '@/services/apiService';

export default {
  name: 'HomeView',
  components: {
    TopBar,
    StationList,
  },
  data() {
    return {
      stations: [],
    };
  },
  created() {
    this.fetchStations();
  },
  methods: {
    async fetchStations() {
      try {
        const stations = await apiService.getStations();
        this.stations = stations;
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    },
  }
};
</script>

<style scoped>
</style>