<template>
  <form @submit.prevent>
    <div class="form-fields">
      <InputUsername v-model="form.username" :required="true"/>
      <InputPassword v-model="form.password" :required="true"/>
      <template v-if="isSignUp">
        <InputPassword v-model="form.password2" :label="'Confirm Password'" :required="true"/>
        <InputName v-model="form.name" :label="'Full Name'" :required="true"/>
        <InputEmail v-model="form.email" :required="true"/>
      </template>
    </div>
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      {{ actionName }}
      </CustomButton>
    </div>
  </form>
</template>

<script>
  import APIrequest from '@/request';
  import { InputEmail, InputName, InputPassword, InputUsername } from './FormFields';
  import CustomButton from '@/components/Button'
  export default {
    name: "AccountForm",
    props:["isSignUp"],
    components: {
      InputEmail,
      InputName,
      InputPassword,
      InputUsername,
      CustomButton
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
          password2: '',
          email: '',
          name: ''
        }
      }
    },
    methods: {
       async handleSubmit(e, loaderCallback) {
        let data;
        const TEMP_ROLE = 'tester'
        if (this.isSignUp) {
          data = {
            username: this.form.username,
            password: this.form.password,
            password2: this.form.password2,
            email: this.form.email,
            name: this.form.name,
            role: TEMP_ROLE
          }
        } else {
          data = {
            username: this.form.username,
            password: this.form.password,
          }
        }
        const action = this.isSignUp ? 'signup' : 'signin'
        // TODO: refactor fetch login into store
        try {
          const res = await APIrequest.post(`/${action}`, { data })
          this.$store.dispatch(`${action}Success`, res.data);
          if (loaderCallback) loaderCallback()
        } catch (err) {
          this.$store.dispatch(`${action}Failed`, this.actionName);
          if (loaderCallback) loaderCallback(err)
        }
      }
    },
    computed: {
      actionName() {
        return this.isSignUp ? "Sign Up " : "Sign In"
      }
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