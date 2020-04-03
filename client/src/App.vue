<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
  @import './assets/css-reset.css';
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Muli:wght@300;400;700&display=swap');
  html {
    box-sizing: border-box;
    font-family: 'Muli', 'Montserrat', sans-serif;
  }
</style>
