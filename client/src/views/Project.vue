<template>
  <section class="project-main" v-if="currentProjectID">
    <SubSection :title="'Project details'" class="sub-section-details">
      Name: {{ currentProject.name }}
    </SubSection>
    <SubSection :title="'Tickets'" class="sub-section-issues">
      <Table 
        :data="issues" 
        :definedColumns="issueColumns" 
        :withAction="issueActions"
      />
    </SubSection>
    <SubSection :title="'Project members'" class="sub-section-users">
      <Table 
        :data="projectMembers"
        :definedColumns="memberColumns"
      />
    </SubSection>
  </section>
</template>

<script>
import Table from '@/components/Table';
import SubSection from '@/components/SubSection';
import { mapState, mapGetters } from 'vuex';
import { displayDate, displayRole } from '@/filters';

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
    Table,
   },
  computed: {
    ...mapState([
      'issues',
      'currentProjectID',
      'projectMembers'
    ]),
    ...mapGetters([
      "currentProject"
    ]),
    issueColumns() {
      return ISSUES_COLUMNS
    },
    issueActions() {
      function showTicketDetails(dataRow) {
        this.$store.dispatch('getTicketDetails', dataRow.issuesUuid)
      }
      return [
        { name: "Details" , displayAs: " ", action: showTicketDetails.bind(this) },
      ];
    },
    memberColumns() {
      return MEMBERS_COLUMNS
    }
  },
  created() {
    if(this.$route.params.projectId) {
      this.$store.dispatch('setCurrentProject', this.$route.params.projectId)
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