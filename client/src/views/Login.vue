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
      const isSignUp = ref(true)
      const { request: loginRequest } = useRemoteData('signin', { method: "POST" })
      function handleSubmit(payload) {
        console.log(payload)
        console.log(loginRequest);
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
