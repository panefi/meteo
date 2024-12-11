<!-- src/components/TopBar.vue -->
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mb-2 mb-lg-0" style="margin-left: 20px;">
            <li class="nav-item">
              <router-link class="nav-link" to="/stations">Stations</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/sensors">Sensors</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/sensorsData">Measurements</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  methods: {
    logout() {
      localStorage.removeItem('jwt'); // Clear token on logout
      // Redirect to login page or perform other logout actions
      window.location.href = '/';
    }
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}

.navbar-nav {
  text-align: left;
}
</style>
