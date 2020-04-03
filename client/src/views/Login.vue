<template>
  <div>
    <AccountForm :isSignUp="isSignUp" />

    <p v-if="isSignUp"><a href="#" @click.prevent="toggleForm">Log in</a> instead?</p>
    <p v-else><a href="#" @click.prevent="toggleForm">Sign up</a> instead?</p>
  </div>
</template>

<script>
  import { ref } from '@vue/composition-api';
  import AccountForm from '@/components/AccountForm.vue';
  export default {
    name: 'Login',
    components: {
      AccountForm,
    },
    setup() {
      const isSignUp = ref(false)
      function toggleForm() {
        isSignUp.value = !isSignUp.value;
      }
      return {
        toggleForm,
        isSignUp
      }
    }
  }
</script>
