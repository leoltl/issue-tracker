<template>
  <div>
    {{ form }}
    <form @submit.prevent="handleSubmit">
      <InputUsername v-model="form.username" />
      <InputPassword v-model="form.password" />
      <template v-if="isSignUp">
        <InputEmail v-model="form.email"/>
        <InputName v-model="form.name" />
        <InputPassword v-model="form.password2" :label="'Confirm Password'" />
      </template>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
  import { InputEmail, InputName, InputPassword, InputUsername } from './FormFields';
import { reactive } from '@vue/composition-api';
  export default {
    props:["isSignUp"],
    components: {
      InputEmail,
      InputName,
      InputPassword,
      InputUsername
    },
    setup(_ ,{ emit }) {
      const form = reactive({
          username: '',
          password: '',
          password2: '',
          email: '',
          name: ''
      })

      function handleSubmit() {
        emit('submit', form)
      }

      return {
        form,
        handleSubmit
      }
    },
  }
</script>
