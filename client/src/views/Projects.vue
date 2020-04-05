<template>
  <div class="projects">
    <TabsMenu />
    <router-view />
  </div>
</template>

<script>
import TabsMenu from '@/components/TabsMenu';

export default {
  name: "Projects",
  components: {
    TabsMenu,
   },
  created() {
    this.$store.dispatch('getAllProjects');
  },
}
</script>

<style lang="scss" scoped>
  .projects {
    height: 100%;
    background-color: #eee;
  }
</style>