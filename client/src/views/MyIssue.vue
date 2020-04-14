<template>
  <div class="manage-role">
    <SubSection :title="'My issues'" class="sub-section-users">
      <DataTable 
        :data="myIssues" 
        :definedColumns="issueColumns" 
        :withAction="issueActions"
      />
    </SubSection>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import SubSection from '@/components/SubSection';
import { displayDate } from '@/filters';

const ISSUES_COLUMNS = [
  { name: "title", displayAs: "Title" }, 
  { name: "description", displayAs: "Description" }, 
  { name: "status", displayAs: "Status" }, 
  { name: "authorId", displayAs: "Reported By", dataFunction: (ticket) => ticket.authorId.name },
  { name: "assignedId", displayAs: "Assigned To", dataFunction: (ticket) => ticket.assignedId?.name || "Not Assigned" },
  { name: "createdAt", displayAs: "Created At", dataFilter: displayDate }, 
  { name: "updatedAt", displayAs: "Last Updated", dataFilter: displayDate }, 
];

import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('issue');
export default {
  name: "ManageRole",
  components: {
    DataTable,
    SubSection
  },
  computed: {
    ...mapState([
      "myIssues",
    ]),
    issueColumns() {
      return ISSUES_COLUMNS;
    },
    issueActions() {
      function showIssueDetails(dataRow) {
        this.$store.dispatch('issue/getIssueDetails', dataRow.issuesUuid)
      }
      return [
        { name: "Details" , displayAs: " ", action: showIssueDetails.bind(this) },
      ];
    },
  },
  created(){
    this.$store.dispatch('issue/getMyIssues');
  },
}
</script>

<style lang="scss" scoped>
.manage-role {
  padding: 1vh 2vw;
  height: 97%;
  background-color: #eee;
  tr {
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>