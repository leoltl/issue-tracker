<template>
  <div id="layout" :class="{default: !isFullScreen}">
    <NavBar />
    <template v-if="isFullScreen">
      <main>
        <router-view />
      </main>
    </template>
    <template v-else>
      <aside>
        <SideMenu />
      </aside>
      <main>
        <router-view />
      </main>
    </template>
    <ModalRoot />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SideMenu from '@/components/SideMenu'
import ModalRoot from '@/views/ModalRoot'
export default {
  name: 'Layout',
  components: {
    NavBar,
    SideMenu,
    ModalRoot,
  },
  computed: {
    isFullScreen() {
      return this.$route.meta.isFullScreen
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css-reset.scss';
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Muli:wght@300;400;700&display=swap');
  :root {
    box-sizing: border-box;
    font-family: 'Muli', 'Montserrat', sans-serif;
    font-size: 16px;
  }
  h1 { font-size: 5rem }
  h2 { font-size: 4rem }
  h3 { font-size: 3rem }
  h4 { font-size: 2rem }
  h5 { font-size: 1.5rem }
  #layout.default {
    display: grid;
    grid-template-areas: "nav nav"
                         "aside main";
    grid-template-columns: minmax(200px, 12.5%) auto;
    grid-template-rows: 65px calc(100vh - 65px);
    nav {
      grid-area: nav;
    }
    aside {
      grid-area: aside;
    }
    main {
      grid-area: main;
    }
  }
</style>
