<template>
  <section class="project-main" v-if="currentProjectID">
    <SubSection :title="'Project details'" class="sub-section-details">
      Name: {{ currentProject.name }}
    </SubSection>
    <SubSection :title="'Tickets'" class="sub-section-issues">
      <DataTable 
        :data="issues" 
        :definedColumns="issueColumns" 
        :withAction="issueActions"
      />
    </SubSection>
    <SubSection :title="'Project members'" class="sub-section-users">
      <DataTable 
        :data="projectMembers"
        :definedColumns="memberColumns"
      />
    </SubSection>
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
    if(this.$route.params.projectId) {
      this.$store.dispatch('project/setCurrentProject', this.$route.params.projectId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .project-main {
    height: 100%;
    background-color: #eee;
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
</style>