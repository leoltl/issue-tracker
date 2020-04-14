<script>
  import BaseIssueForm from './IssueFormBase'
  import ModalBus from '@/Bus'
  export default {
    name: "UpdateIssueForm",
    mixins: [BaseIssueForm],
    data() {
      return {
        form: this.$store.getters['issue/issueData'] || {},
        isUpdate: true
      }
    },
    methods: {
       async handleSubmit(e, loaderCallback) {
        const issuesId = this.form.issuesUuid
        
        let formData = {
          title: this.form.title,
          description: this.form.description,
          priority: this.form.priority,
          projectId: this.form.projectId,
          assignedId: this.form.assignedId,
          authorId: this.form.authorId,
          status: this.form.status
        }

        this.$store.dispatch('issue/updateIssue', { formData, issuesId, loaderCallback })

        this.form = {}

        ModalBus.$emit('close')
      }
    },
    
  }
</script>

<style lang="scss" scoped>
  .actions {
    width: 150px; //hard-coded for now.
    margin: 1.5rem 1rem;
  }
  .form-field-group {
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0;
  }
  
  .form-fields {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>