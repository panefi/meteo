<!-- src/components/TopBar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <button class="btn btn-link nav-link" @click="navigateTo('home')">Home</button>
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link" @click="navigateTo('sensors')">Sensors</button>
          </li>
            <li class="nav-item">
            <button class="btn btn-link nav-link" @click="navigateTo('sensorsData')">Measurements</button>
          </li>        
          </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopBar',
  methods: {
    navigateTo(page) {
      console.log(`Navigating to ${page}`);
      // Implement navigation logic here
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>