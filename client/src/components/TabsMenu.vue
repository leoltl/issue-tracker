<template>
  <div class="tabs-menu">
    <Tab 
      v-for="project in projects" 
      :project="project" 
      :key="project.projectsUuid"
      :selected="project.issuesUuid == currentProjectID"
      @click.native="setCurrentProject(project.projectsUuid)"
    />
  </div>
</template>

<script>
import Tab from '@/components/Tab';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('base')
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
    border: 2px solid green;
    display: flex;
    height: 5vh;
  }
</style>