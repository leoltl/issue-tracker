<template>
  <div class="tabs-menu">
    <Tab 
      v-for="project in projects" 
      :project="project" 
      :key="project.projectsUuid"
      :selected="project.projectsUuid == currentProjectID"
      @click.native="setCurrentProject(project.projectsUuid)"
    />
    <div class="plus">+</div>
  </div>
</template>

<script>
import Tab from '@/components/Tab';
import { mapState, mapActions } from 'vuex';

// const { mapState, mapActions } = createNamespacedHelpers('base')
export default {
  name: "TabsMenu",
  components: {
    Tab
  },
  computed: {
    ...mapState([
      'currentProjectID',
      'projects'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentProject'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .tabs-menu {
    border-bottom: 1px solid black;
    display: flex;
    height: 5vh;
  }
  .plus {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    width: 5vh;
    cursor: pointer;
  }
</style>