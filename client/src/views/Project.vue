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
        <UserTable 
          :users="projectMembers"
          :withAction="memberActions"
        />
        <div class="member-action">
          <CustomButton @click="handleEdit">Edit Member</CustomButton>
        </div>
      </SubSection>
    </div>
  </section>
</template>

<script>
import UserTable from '@/views/UserTable';
import DataTable from '@/components/DataTable';
import SubSection from '@/components/SubSection';
import CustomButton from '@/components/Button';
import UpdateProjectMemberForm from '@/components/Forms/UpdateProjectMemeberForm';
import ModalBus from '@/Bus';
import { createNamespacedHelpers } from 'vuex';
import { displayDate } from '@/filters';

const { mapState: mapIssueState } = createNamespacedHelpers('issue');
const { mapState: mapProjectState, mapGetters: mapProjectGetters } = createNamespacedHelpers('project')

const ISSUES_COLUMNS = [
  { name: "title", displayAs: "Title" }, 
  { name: "description", displayAs: "Description" }, 
  { name: "status", displayAs: "Status" }, 
  { name: "createdAt", displayAs: "Created At", dataFilter: displayDate }, 
  { name: "name", displayAs: "Reported By" }
];
export default {
  name: "Projects",
  components: {
    SubSection,
    UserTable,
    DataTable,
    CustomButton,
    // eslint-disable-next-line vue/no-unused-components
    UpdateProjectMemberForm,
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
    memberActions() {
      function removeMember(dataRow) {
        this.$store.dispatch('project/deleteProjectMember', { userId: dataRow.usersUuid, projectId: this.currentProjectID })
      }
      return [
        { name: "Delete" , displayAs: " ", action: removeMember.bind(this) },
      ]
    },
  },
  methods: {
    handleEdit() {
      ModalBus.$emit('open', {
        component: UpdateProjectMemberForm,
        title: `Add project members`,
        props: {
          projectId: this.currentProjectID,
        }
      })
      
    }
  },
  created() {
    try {
      if(this.$route.params.projectId && this.currentProjectID == "") {
       this.$store.dispatch('project/setCurrentProject', this.$route.params.projectId)
      }
    } catch (e) {
      console.log(e)
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
    grid-gap: 2vw;
    .right-col {
      grid-area: info;
      > * {
        margin-bottom: 2.5vw;
      }
      .member-action {
        width: 150px;
        padding: 20px;
        float: right;
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