import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Token is expired, refresh it
            console.log('Token expired');
            // take them to login page
            window.location.href = '/';
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
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
      },
    async getCurrentUser() {
        try {
          const response = await apiClient.get('/current_user');
          return response.data;
        } catch (error) {
          console.error('Error fetching current user:', error);
          throw error;
        }
      },
    async login(credentials) {
        try {
          const response = await apiClient.post('/users/login', credentials);
          return response.data;
        } catch (error) {
          console.error('Error logging in:', error);
          throw error;
        }
      }
};