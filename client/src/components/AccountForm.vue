<template>
  <form @submit.prevent>
    <div class="form-fields">
      <InputUsername v-model="form.username" :required="true"/>
      <InputPassword v-model="form.password" :required="true"/>
      <template v-if="isSignUp">
        <InputPassword v-model="form.password2" :label="'Confirm Password'"  :required="true"/>
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
  import { reactive, computed } from '@vue/composition-api';
  import useRemoteData from '@/composition/useRemoteData';
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
    setup(props) {
      const form = reactive({
          username: '',
          password: '',
          password2: '',
          email: '',
          name: ''
      })
      
      const { request: loginRequest } = useRemoteData('signin', { method: "POST" })
      const { request: signupRequest } = useRemoteData('signup', { method: "POST" })

      function handleSubmit(e, loaderCallback) {
        let data;
        const TEMP_ROLE = 'tester'
        if (props.isSignUp.value) {
          data = {
            username: form.username,
            password: form.password,
            password2: form.password2,
            email: form.email,
            name: form.name,
            role: TEMP_ROLE
          }
          signupRequest({ data }, loaderCallback)
        } else {
          data = {
            username: form.username,
            password: form.password,
          }
          loginRequest({ data }, loaderCallback)
        }
      }

      const actionName = computed(() => props.isSignUp ? "Sign Up" : "Sign In")

      return {
        form,
        handleSubmit,
        actionName
      }
    },
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