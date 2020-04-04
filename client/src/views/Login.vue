<template>
  <main>
    <div :class="['account-form', cssClass]">
      <div :class="{ 'switch-form': switchFormAnim }">
        <AccountForm :isSignUp="isSignUp" />
      </div>
      <div class="divider"></div>
      <div>
        <p v-if="isSignUp"><a href="#" @click.prevent="toggleForm">Log in</a> instead?</p>
        <p v-else><a href="#" @click.prevent="toggleForm">Sign up</a> instead?</p>
      </div>
    </div>
  </main>
</template>

<script>
  import { ref, computed } from '@vue/composition-api';
  import AccountForm from '@/components/AccountForm.vue';
  export default {
    name: 'Login',
    components: {
      AccountForm,
    },
    setup() {
      const isSignUp = ref(false)
      const switchFormAnim = ref(false)
      function toggleForm() {
        switchFormAnim.value = true
        setTimeout(() => {
          isSignUp.value = !isSignUp.value;
          switchFormAnim.value = false
        }, 100)
      }
      const cssClass = computed(() => isSignUp.value ? 'sign-up' : 'sign-in')
      return {
        toggleForm,
        isSignUp,
        cssClass,
        switchFormAnim
      }
    }
  }
</script>

<style lang="scss">
  main {
    padding: 22.5vh 25vw;
    .account-form {
      width: 50vw;
      height: 45vh;
      display: flex;
      -webkit-box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
      -moz-box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
      box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
      border-radius: 10px;
      > div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      > div:nth-child(1) {
        width: 60%;
      }
      > div:nth-last-child(1) {
        width: 40%;
      }
      .divider {
        border-right: 2px dotted #aaa;
      }
      form {
        width: 80%;
        transition: opacity 150ms ease-out
      }
      .switch-form form {
        opacity: 0;
      }
    }
    .sign-up {
      flex-direction: row-reverse;
      .form-fields {
        .form-field-group:nth-of-type(1) { order: 1; }
        .form-field-group:nth-of-type(2) { order: 4; }
        .form-field-group:nth-of-type(3) { order: 5; }
        .form-field-group:nth-of-type(4) { order: 3; }
        .form-field-group:nth-of-type(5) { order: 2; }
      }
    }
  }

</style>