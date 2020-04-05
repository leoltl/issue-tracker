<template>
  <div class="dashboard">
    DASHBOARD
    Select your project
    <TabsMenu />
    <p v-for="issue of issues" :key="issue.issuesUuid" >{{ issue }}</p>
  </div>
</template>

<script>
import TabsMenu from '@/components/TabsMenu'
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('base')
export default {
  name: "Dashboard",
  components: {
    TabsMenu
  },
  created() {
    this.$store.dispatch('base/getAllProjects');
  },
  computed: {
    ...mapState([
      'issues'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    height: 100%;
  }
</style>