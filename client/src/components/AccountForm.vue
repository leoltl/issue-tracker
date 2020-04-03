<template>
  <form @submit.prevent>
    <InputUsername v-model="form.username" />
    <InputPassword v-model="form.password" />
    <template v-if="isSignUp">
      <InputEmail v-model="form.email"/>
      <InputName v-model="form.name" />
      <InputPassword v-model="form.password2" :label="'Confirm Password'" />
    </template>
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      Sign In
      </CustomButton>
    </div>
  </form>
</template>

<script>
  import { InputEmail, InputName, InputPassword, InputUsername } from './FormFields';
  import { reactive } from '@vue/composition-api';
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

      return {
        form,
        handleSubmit
      }
    },
  }
</script>

<style lang="scss" scoped>
  .actions {
    width: 100px; //hard-coded for now.
  }
</style>