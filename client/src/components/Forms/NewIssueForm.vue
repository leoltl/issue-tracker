<template>
  <form @submit.prevent>
    <div class="form-fields">
      <InputGeneric v-model="form.title" :label="'Title'" :required="true"/>
      <InputGeneric v-model="form.description" :label="'Description'" />
      <InputSelect v-model="form.projectId" :label="'Project'" :options="projectOptions"/>
      <InputSelect v-model="form.issuePriority" :label="'Priority'" :options="priorityOptions"/>
    </div>
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      Create Ticket
      </CustomButton>
    </div>
  </form>
</template>

<script>
  import APIrequest from '@/request';
  import { InputGeneric, InputSelect } from './FormFields';
  import CustomButton from '@/components/Button'
  export default {
    name: "AccountForm",
    props:["isSignUp"],
    components: {
      InputGeneric,
      InputSelect,
      CustomButton
    },
    data() {
      return {
        form: {
          title: '',
          description: '',
          issuePriority: '',
          projectId: '',
        }
      }
    },
    methods: {
       async handleSubmit(e, loaderCallback) {
        const authorId = this.$store.getters['auth/userId']
        const projectId = this.form.projectId
        
        let data = {
          title: this.form.title,
          description: this.form.description,
          issuePriority: this.form.issuePriority,
          authorId,
        }
        
        // TODO: refactor fetch login into store
        try {
          const res = await APIrequest.post(`/projects/${projectId}/issues`, { data })
          this.$store.dispatch(`TODO`, res.data);
          if (loaderCallback) loaderCallback()
        } catch (err) {
          this.$store.dispatch(`TODO`, this.actionName);
          if (loaderCallback) loaderCallback(err)
        } finally {
          this.form = {
            title: '',
            description: '',
            issuePriority: ''
          }
        }
      }
    },
    computed: {
      priorityOptions() {
        return ['low', 'medium', 'high', 'severe'];
      },
      projectOptions() {
        return this.$store.state.projects.map(project => {
          return {
            name: project.name,
            value: project.projectsUuid
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .actions {
    width: 100px; //hard-coded for now.
  }

  .form-field-group {
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0;
  }
  .actions {
    margin: 1.5rem 1rem;
  }
  .form-fields {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>