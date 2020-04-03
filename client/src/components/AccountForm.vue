<template>
  <div>
    {{ form }}
    <form @submit.prevent="handleSubmit">
      <InputEmail v-model="form.email"/>
      <InputName v-model="form.name" />
      <InputPassword v-model="form.password" />
      <InputPassword v-model="form.password2" :label="'Confirm Password'" />
      <InputUsername v-model="form.username" :label="'Confirm Username'" />
    </form>
  </div>
</template>

<script>
  import { InputEmail, InputName, InputPassword, InputUsername } from './FormFields';
  export default {
    props:["isSignUp"],
    components: {
      InputEmail,
      InputName,
      InputPassword,
      InputUsername
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
          password2: '',
          email: '',
          name: '',
          role: 'tester'
        },
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.form)
      }
    }
  }
</script>
