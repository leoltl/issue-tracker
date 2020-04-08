<template>
  <form @submit.prevent>
    <div class="form-fields">
      <InputGeneric v-model="form.name" :label="'Project Name'" :required="true"/>
    </div>
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      Create Project
      </CustomButton>
    </div>
  </form>
</template>

<script>
  import APIrequest from '@/api/request';
  import { InputGeneric } from './FormFields';
  import CustomButton from '@/components/Button'
  export default {
    name: "AccountForm",
    props:["isSignUp"],
    components: {
      InputGeneric,
      CustomButton
    },
    data() {
      return {
        form: {
          name: '',
        }
      }
    },
    methods: {
       async handleSubmit(e, loaderCallback) {
        
        let data = {
          name: this.form.name,
        }
        
        // TODO: refactor fetch login into store
        try {
          const res = await APIrequest.post(`/projects`, { data })
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
  }
</script>

<style lang="scss" scoped>
  .actions {
    width: 150px; //hard-coded for now.
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