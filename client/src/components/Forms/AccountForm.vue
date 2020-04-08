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
        const NEW_ACCOUNT_DEFAULT_ROLE = 'tester'
        if (this.isSignUp) {
          const data = {
            username: this.form.username,
            password: this.form.password,
            password2: this.form.password2,
            email: this.form.email,
            name: this.form.name,
            role: NEW_ACCOUNT_DEFAULT_ROLE
          }
          this.$store.dispatch('auth/signUp', { formData: data, loaderCallback })
        } else {
          const data = {
            username: this.form.username,
            password: this.form.password,
          }
          this.$store.dispatch('auth/signIn', { formData: data, loaderCallback })
        }   

        this.form.password = this.form.password2 = ""
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