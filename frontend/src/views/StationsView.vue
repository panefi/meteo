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
    name: 'StationsView',
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
      this.checkTokenAndFetchStations();
    },
    methods: {
      checkTokenAndFetchStations() {
        const token = localStorage.getItem('jwt');
        if (token) {
          console.log('Retrieved JWT Token:', token);
          this.fetchStations();
        } else {
          console.error('No token found in local storage');
          // redirect to login page
          this.$router.push('/login');
        }
      },
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