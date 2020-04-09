<template>
  <form @submit.prevent>
    <div class="form-fields">
      <InputSelect v-model="form.role" :label="'Role'" :options="roleOptions"/>
    </div>
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      Confirm Update
      </CustomButton>
    </div>
  </form>
</template>

<script>
  import { InputSelect } from './FormFields';
  import CustomButton from '@/components/Button'
  import ModalBus from '@/Bus'
  export default {
    name: "UpdateRoleForm",
    components: {
      InputSelect,
      CustomButton
    },
    data() {
      return {
        form: {...this.$store.state.user.selectedUser}
      }
    },
    methods: {
       async handleSubmit(e, loaderCallback) {
        let formData = this.form
        var callBack = () => {
          loaderCallback()
          ModalBus.$emit('close')
          this.form = {}
        }
        this.$store.dispatch('user/updateRole', { formData, callBack })
      }
    },
    computed: {
      roleOptions() {
        const ROLES = [{value: "admin", name:'Admin'}, {value: "pm", name:"Project Manager"}, {value: "dev", name:"Developer"}, {value: "tester", name:"Tester"}];
        return ROLES
      },
    }
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