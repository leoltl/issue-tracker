<template>
  <div class="ticket">
    <section class="ticket-main" v-if="currentIssue">
      <SubSection :title="'Issue ticket details'" class="sub-section-details">
        <DataList
          v-if="currentIssue"
          :data="issueData"
          :rows="issueRow"
        />
        <div class="action">
          <CustomButton @click="handleEdit">Edit</CustomButton>
        </div>
      </SubSection>
      <SubSection :title="'Ticket comments'" class="sub-section-comment">
        <div class="comment-list">
          <CommentRow
            v-for="comment of currentIssueComments"
            :comment="comment"
            :key="comment.commentsUuid"
            :currentUser="userName"
          />
        </div>
        <NewCommentForm 
          :issueId="currentIssue.issuesUuid"
        />
      </SubSection>
      <SubSection :title="'Issue history'" class="sub-section-history">
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
import CustomButton from '@/components/Button';
import SubSection from '@/components/SubSection';
import DataList from '@/components/DataList';
import DataTable from '@/components/DataTable';
import CommentRow from '@/components/CommentRow';
import UpdateIssueForm from '@/components/Forms/IssueFormUpdate';
import NewCommentForm from '@/components/Forms/NewCommentForm';
import ModalBus from '@/Bus';
import { displayDate, displayStatus, displayPriority } from '@/filters';

import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('issue')
const { mapGetters: mapAuthGetters } = createNamespacedHelpers('auth')

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
    CustomButton,
    CommentRow,
    NewCommentForm,
    // eslint-disable-next-line vue/no-unused-components
    UpdateIssueForm,
  },
  computed: {
    ...mapState([
      "currentIssue",
      "currentIssueHistory",
      "currentIssueComments"
    ]),
    ...mapAuthGetters([
      "userName"
    ]),
    issueData() {
      return this.currentIssue || [];
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
  created() {
    if(this.$route.params.issueId && !this.currentIssue) {
      this.$store.dispatch('issue/getIssueDetails', this.$route.params.issueId)
    }
  },
  mounted() {
    this.$store.dispatch('issue/getIssueHistory', this.$route.params.issueId)
    this.$store.dispatch('issue/getAllIssueComments', this.$route.params.issueId)
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
    .comment-list {
      max-height: 300px;
      overflow-y: scroll;
    }
  }
  .sub-section-history {
    grid-area: history;
  }
  .action {
    width: 150px;
    padding: 20px;
    float: right;
  }
}
</style>