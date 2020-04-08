<template>
  <div class="projects">
    <TabsMenu :create="toggleForm">
      <Tab 
        v-for="project in projects" 
        :project="project" 
        :key="project.projectsUuid"
        :selected="project.projectsUuid == currentProjectID"
        @click.native="setCurrentProject(project.projectsUuid)"
      />
    </TabsMenu>
    <router-view />
  </div>
</template>

<script>
import TabsMenu from '@/components/TabsMenu';
import Tab from '@/components/Tab';
import ModalBus from '@/Bus';
import { mapState, mapActions } from 'vuex';
import NewProjectForm from '../components/Forms/NewProjectForm.vue';
export default {
  name: "Projects",
  components: {
    TabsMenu,
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
    ]),
    toggleForm() {
      ModalBus.$emit('open', {
        component: NewProjectForm
      })
    }
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