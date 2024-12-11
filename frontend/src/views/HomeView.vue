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
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await apiService.login({ email: this.email, password: this.password });
        localStorage.removeItem('jwt');
        localStorage.setItem('jwt', response.token);
        console.log('Stored JWT Token:', localStorage.getItem('jwt'));
        // Redirect or perform other actions
        this.$router.push('/stations');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    loginWithGoogle() {
      window.location.href = `${process.env.VUE_APP_API_URL}/auth/google`;
    }
  }
};
</script>

<style scoped>
/* Add any styles you need for the home view */
</style>