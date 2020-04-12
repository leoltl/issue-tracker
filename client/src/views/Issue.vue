<template>
  <div class="ticket">
    <section class="ticket-main">
      <SubSection :title="'Issue ticket details'" class="sub-section-details">
        <button @click="handleEdit">Edit</button>
        <DataList
          v-if="currentIssue"
          :data="issueData"
          :rows="issueRow"
        />
      </SubSection>
      <SubSection :title="'Issue ticket comments'" class="sub-section-comment">
      </SubSection>
      <SubSection :title="'Issue ticket history'" class="sub-section-history">
        <DataTable 
          v-if="currentIssueHistory.length"
          :data="currentIssueHistory" 
          :definedColumns="historyColumns"
          :withAction="historyActions"
        />
        <p v-else> No edit record. </p>
      </SubSection>
    </section>
  </div>
</template>



<script>
import { displayDate, displayStatus, displayPriority } from '@/filters';
import { createNamespacedHelpers } from 'vuex';
import SubSection from '@/components/SubSection';
import DataList from '@/components/DataList';
import DataTable from '@/components/DataTable';
import UpdateIssueForm from '@/components/Forms/IssueFormUpdate';
import ModalBus from '@/Bus';

const { mapState } = createNamespacedHelpers('issue')
const ISSUE_ROW = [
  { name: "title", displayAs: "Title" }, 
  { name: "description", displayAs: "Description" }, 
  { name: "createdAt", displayAs: "Created At", dataFilter: displayDate, dataFunction: (data) => data.created_at || data.createdAt}, 
  { name: "authorId", displayAs: "Reported By", dataFunction: (data) => data.authorId.name },
  { name: "assignedId", displayAs: "Assigned To", dataFunction: (data) => data.assignedId?.name  || 'Not Assigned' },
  { name: "status", displayAs: "Status" , dataFilter: displayStatus},
  { name: "priority", displayAs: "Priority", dataFilter: displayPriority },
]

const HISTORY_COLUMNS = [
  { name: "title", displayAs: "Title" }, 
  { name: "updated_at", displayAs: "Updated at", dataFilter: displayDate }, 
  { name: "updatedBy", displayAs: "Last edited by", dataFunction: (data) => data.updatedBy.name }
]

export default {
  name: "Issue",
  components: {
    SubSection,
    DataList,
    DataTable,
    // eslint-disable-next-line vue/no-unused-components
    UpdateIssueForm,
  },
  computed: {
    ...mapState([
      "currentIssue",
      "currentIssueHistory"
    ]),
    issueData() {
      return this.currentIssue;
    },
    issueRow() {
      return ISSUE_ROW;
    },
    historyColumns() {
      return HISTORY_COLUMNS;
    },
    historyActions() {
      function showHistory(dataRow) {
        const snapShot = this.currentIssueHistory.find(issue => issue.updated_at == dataRow.updated_at)
        ModalBus.$emit('open', {
          component: DataList,
          title: `Ticket Snapshot at ${displayDate(snapShot.updated_at)}`,
          props: {
            data: snapShot,
            rows: ISSUE_ROW
          }
      })
      }
      return [
        { name: "Details" , displayAs: " ", action: showHistory.bind(this) },
      ];
    },
  },
  methods: {
    handleEdit() {
       ModalBus.$emit('open', {
        component: UpdateIssueForm,
        title: "Edit Issue:"
      })
    },
  },
  beforeCreate() {
    if(this.$route.params.issueId && !this.currentIssue) {
      this.$store.dispatch('issue/getIssueDetails', this.$route.params.issueId)
      this.$store.dispatch('issue/getIssueHistory', this.$route.params.issueId)
    }
  },
  beforeDestroy() {
    this.$store.dispatch('issue/getIssueDetails', '');
    this.$store.dispatch('issue/getIssueHistory', '');
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
  grid-template: "details comment"
                 "history .";
  grid-template-columns: 1fr 1fr;
  grid-gap: 2.5vw;
  .sub-section-details {
    grid-area: details;
  }
  .sub-section-comment {
    grid-area: comment;
  }
  .sub-section-history {
    grid-area: history;
  }
}
</style>