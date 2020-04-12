<template>
  <section class="project-main" v-if="currentProjectID">
    <SubSection :title="'Tickets'" class="sub-section-issues">
      <DataTable 
        :data="issues" 
        :definedColumns="issueColumns" 
        :withAction="issueActions"
      />
    </SubSection>
    <div class="right-col">
      <SubSection :title="'Project details'" class="sub-section-details">
        Name: {{ currentProject.name }}
      </SubSection>
      <SubSection :title="'Project members'" class="sub-section-users">
        <DataTable 
          :data="projectMembers"
          :definedColumns="memberColumns"
        />
      </SubSection>
    </div>
  </section>
</template>

<script>
import DataTable from '@/components/DataTable';
import SubSection from '@/components/SubSection';
import { createNamespacedHelpers } from 'vuex';
import { displayDate, displayRole } from '@/filters';

const { mapState: mapIssueState } = createNamespacedHelpers('issue');
const { mapState: mapProjectState, mapGetters: mapProjectGetters } = createNamespacedHelpers('project')
const ISSUES_COLUMNS = [
  { name: "title", displayAs: "Title" }, 
  { name: "description", displayAs: "Description" }, 
  { name: "createdAt", displayAs: "Created At", dataFilter: displayDate }, 
  { name: "name", displayAs: "Reported By" }
];

const MEMBERS_COLUMNS = [
  { name: "name", displayAs: "Name"}, 
  { name: "email", displayAs: "Email"}, 
  { name: "role", displayAs: "Role", dataFilter: displayRole}
];
export default {
  name: "Projects",
  components: {
    SubSection,
    DataTable,
   },
  computed: {
    ...mapProjectState([
      'currentProjectID',
      'projectMembers'
    ]),
    ...mapIssueState([
      'issues',
    ]),
    ...mapProjectGetters([
      "currentProject"
    ]),
    issueColumns() {
      return ISSUES_COLUMNS
    },
    issueActions() {
      function showIssueDetails(dataRow) {
        this.$store.dispatch('issue/getIssueDetails', dataRow.issuesUuid)
      }
      return [
        { name: "Details" , displayAs: " ", action: showIssueDetails.bind(this) },
      ];
    },
    memberColumns() {
      return MEMBERS_COLUMNS
    }
  },
  created() {
    if(this.$route.params.projectId && this.currentProjectID == "") {
      this.$store.dispatch('project/setCurrentProject', this.$route.params.projectId)
    }
  },
  beforeDestroy() {
    this.$store.dispatch('project/setCurrentProject', '');
  }
}
</script>

<style lang="scss" scoped>
  .project-main {
    height: calc(100vh - 5vh - 105px);;
    background-color: #eee;
    padding: 2vh 2.5vw;
    display: grid;
    grid-template: "tickets info";
    grid-template-columns: 65% auto;
    grid-gap: 2.5vw;
    .right-col {
      grid-area: info;
      > * {
        margin-bottom: 2.5vw;
      }
    }
    .sub-section-tickets {
      grid-area: tickets;
    }
    
    @media screen and (max-width: 1600px){
      grid-gap: 1vw;
      padding: 2vh 1vw;
    }
    @media screen and (max-width: 1350px){
      grid-template: "tickets"
                      "info";
      grid-template-rows: 65% auto;
      padding: 2vh 3vw;
      height: 150%;
    }
  }
</style>