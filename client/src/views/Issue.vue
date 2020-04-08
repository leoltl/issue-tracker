<template>
  <div class="ticket">
    <section class="ticket-main">
      <SubSection :title="'Ticket details'" class="sub-section-details">
        <DataList
          v-if="currentIssue"
          :data="issueData"
          :rows="issueRow"
        />
      </SubSection>
      <SubSection :title="'Ticket comments'" class="sub-section-comment">
        <!-- TODO -->
      </SubSection>
    </section>
  </div>
</template>



<script>
import { displayDate, displayStatus, displayPriority } from '@/filters';
import { createNamespacedHelpers } from 'vuex';
import SubSection from '@/components/SubSection';
import DataList from '@/components/DataList';

const { mapState } = createNamespacedHelpers('issue')
const ISSUE_ROW = [
  { name: "title", displayAs: "Title" }, 
  { name: "description", displayAs: "Description" }, 
  { name: "createdAt", displayAs: "Created At", dataFilter: displayDate }, 
  { name: "authorId", displayAs: "Reported By", dataFunction: (data) => data.authorId.name },
  { name: "assignedTo", displayAs: "Assigned To", dataFunction: (data) => data.assignedTo.name },
  { name: "issueStatus", displayAs: "Status" , dataFilter: displayStatus},
  { name: "issuePriority", displayAs: "Priority", dataFilter: displayPriority },
]

export default {
  name: "Issue",
  components: {
    SubSection,
    DataList
  },
  computed: {
    ...mapState([
      "currentIssue"
    ]),
    issueData() {
      return this.currentIssue
    },
    issueRow() {
      return ISSUE_ROW;
    }
  },
  created() {
    if(this.$route.params.issueId) {
      this.$store.dispatch('issue/getIssueDetails', this.$route.params.issueId)
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket {
  height: 100%;
  background-color: #eee;
  padding-top: 2vh;
}
.ticket-main {
  margin: 0 2.5vw;
  display: grid;
  grid-template: "details comment";
  grid-template-columns: 1fr 1fr;
  grid-gap: 2.5vw;
  .sub-section-details {
    grid-area: details;
  }
  .sub-section-comment {
    grid-area: comment;
  }
}
</style>