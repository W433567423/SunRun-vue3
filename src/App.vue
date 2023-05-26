<script setup lang="ts">
</script>

<template>
  <div class="app">
    <section class="content">
      <router-view/>
    </section>
    <nav class="nav">
      <router-link to="home" class="nav-bar">home</router-link>
      <router-link to="upload" class="nav-bar">upload</router-link>
      <router-link to="help" class="nav-bar">help</router-link>
      <router-link to="about" class="nav-bar">about</router-link>
    </nav>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  margin: 0 auto;
//background-color: red;

  .content {
    width: 100%;
    height: 94vh;
    background-color: pink;
  //height: 90vh;
  }

  .nav {
    height: 6vh;
    background-color: yellow;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .nav-bar {
      display: inline-block;
      background-color: red;
      width: 80px;
      height: 30px;

    }

  }
}
</style>
