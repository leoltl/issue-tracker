<template>
  <form @submit.prevent>
    <InputGeneric 
      label="Message"
      v-model="form.body"
    />
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      Add comment
      </CustomButton>
    </div>
  </form>
</template>

<script>
  import CustomButton from '@/components/Button'
  import { InputGeneric } from '@/components/Forms/FormFields';
  export default {
    name: "NewCommentForm",
    props: ["issueId"],
    components: {
      CustomButton,
      InputGeneric,
    },
    data() {
      return {
        form: {
          body: []
        }
      }
    },
    methods: {
      async handleSubmit(e, loaderCallback) {
        let formData = this.form
        var callback = () => {
          loaderCallback()
          this.form = {}
        }
        this.$store.dispatch('issue/createComment', { formData, issueId: this.issueId, callback })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .actions {
    width: 150px; //hard-coded for now.
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