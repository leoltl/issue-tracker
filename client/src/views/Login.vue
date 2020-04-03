<template>
  <div>
    <AccountForm @submit="handleSubmit" :isSignUp="isSignUp" />

    <p v-if="isSignUp"><a href="#" @click.prevent="toggleForm">Log in</a> instead?</p>
    <p v-else><a href="#" @click.prevent="toggleForm">Sign up</a> instead?</p>
  </div>
</template>

<script>
  import { ref } from '@vue/composition-api';
  import AccountForm from '@/components/AccountForm.vue';
  import useRemoteData from '@/composition/useRemoteData';
  export default {
    name: 'Login',
    components: {
      AccountForm,
    },
    setup() {
      const isSignUp = ref(false)
      const { request: loginRequest } = useRemoteData('signin', { method: "POST" })
      const { request: signupRequest } = useRemoteData('signup', { method: "POST" })
      function handleSubmit(payload) {
        let data;
        if (isSignUp.value) {
          data = {
            username: payload.username,
            password: payload.password,
            password2: payload.password2,
            email: payload.email,
            name: payload.name,
            role: 'tester'
          }
          signupRequest({ data })
        } else {
          data = {
            username: payload.username,
            password: payload.password,
          }
          loginRequest({ data })
        }
      }
      function toggleForm() {
        isSignUp.value = !isSignUp.value;
      }
      return {
        handleSubmit,
        toggleForm,
        isSignUp
      }
    }
  }
</script>
