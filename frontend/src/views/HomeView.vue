<!-- src/views/HomeView.vue -->
<template>
  <div>
    <h1>Welcome to the Meteorological App</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="full_name">Full Name:</label>
        <input type="text" v-model="full_name" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script>
import apiService from '@/services/apiService'; // Import apiService

export default {
  name: 'HomeView',
  data() {
    return {
      email: '',
      password: '',
      full_name: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await apiService.login({ email: this.email, password: this.password, name: this.full_name });
        console.log('Login response:', response);
        if (response.token) {
          localStorage.setItem('jwt', response.token);
          console.log('Stored JWT Token:', localStorage.getItem('jwt'));
          this.$router.push('/stations');
        } else {
          console.error('No token received from server');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any styles you need for the home view */
</style>