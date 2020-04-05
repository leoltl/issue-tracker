<template>
  <div class="dashboard">
    DASHBOARD
    Select your project
    <TabsMenu />
    <section class="project-TONAME" v-if="currentProjectID">
      <SubSection :title="'details'">
        Name: {{ currentProject.name }}
      </SubSection>
      <SubSection :title="'issues'">
        <Table 
          :data="issues" 
          :definedColumns="issueColumns" 
          :withAction="issueActions"
        />
      </SubSection>
      <SubSection :title="'users'"/>
    </section>

    {{ issues }}
  </div>
</template>

<script>
import TabsMenu from '@/components/TabsMenu';
import Table from '@/components/Table';
import SubSection from '@/components/SubSection';
import { mapState, mapGetters } from 'vuex';
import { displayDate } from '@/filters';

const ISSUES_COLUMNS = [
  { name: "title" }, 
  { name: "description" }, 
  { name: "createdAt", dataFilter: displayDate }, 
  { name: "name", displayAs: "Reported By" }
];
// const { mapState } = createNamespacedHelpers('base')
export default {
  name: "Dashboard",
  components: {
    TabsMenu,
    SubSection,
    Table,
   },
  created() {
    this.$store.dispatch('getAllProjects');
  },
  computed: {
    ...mapState([
      'issues',
      'currentProjectID'
    ]),
    ...mapGetters([
      "currentProject"
    ]),
    issueColumns() {
      return ISSUES_COLUMNS
    },
    issueActions() {
      function TONAME(dataRow) {console.log('action!', this, dataRow.issuesUuid)}
      return [
        { name: "Details" , displayAs: " ", action: TONAME.bind(this) },
      ];
    }

  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    height: 100%;
    background-color: #eee;
    .project-TONAME {
      margin: 2vh 2.5vw;
      display: grid;
      grid-template: "tickets details"
                     "tickets users";
      grid-template-columns: 70% auto;
      grid-gap: 2.5vw;
      .sub-section-details {
        grid-area: details
      }
      .sub-section-tickets {
        grid-area: tickets
      }
      .sub-section-users {
        grid-area: users
      }
    }
  }
</style>