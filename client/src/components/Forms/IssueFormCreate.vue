<script>
  import BaseIssueForm from './IssueFormBase'
  import ModalBus from '@/Bus'
  export default {
    name: "NewIssueForm",
    mixins: [BaseIssueForm],
    data() {
      return {
        form: {
          title: '',
          description: '',
          priority: '',
          projectId: '',
        },
        isUpdate: false
      }
    },
    methods: {
       async handleSubmit(e, loaderCallback) {
        const authorId = this.$store.getters['auth/userId']
        const projectId = this.form.projectId
        
        let formData = {
          title: this.form.title,
          description: this.form.description,
          priority: this.form.priority,
          authorId,
        }

        this.$store.dispatch('issue/createIssue', { formData, projectId, loaderCallback })

        this.form = {
          title: '',
          description: '',
          priority: ''
        }

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