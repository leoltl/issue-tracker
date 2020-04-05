<template>
  <div id="layout">
    <NavBar />
    <aside>
      menu
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'Layout',
  components: {
    NavBar,
  }
}
</script>

<style lang="scss">
  @import '@/assets/css-reset.scss';
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Muli:wght@300;400;700&display=swap');
  html {
    box-sizing: border-box;
    font-family: 'Muli', 'Montserrat', sans-serif;
  }
  #layout {
    display: grid;
    grid-template-areas: "nav nav"
                         "aside main";
    grid-template-columns: 15% auto;
    grid-template-rows: 65px calc(100vh - 65px);
    nav {
      grid-area: nav;
    }
    aside {
      grid-area: aside;
      border: 2px solid orange;
    }
    main {
      grid-area: main;
      border: 2px solid red;
    }
  }
</style>
