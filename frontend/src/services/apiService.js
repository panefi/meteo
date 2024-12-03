import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

console.log(apiClient);
export default {
    async getStations() {
        try {
          const response = await apiClient.get('/stations');
          return response.data;
        } catch (error) {
          console.error('Error fetching stations:', error);
          throw error;
        }
      }
};