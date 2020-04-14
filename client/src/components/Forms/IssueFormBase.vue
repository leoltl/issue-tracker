<template>
  <form @submit.prevent>
    <div class="form-fields">
      <InputGeneric v-model="form.title" :label="'Title'" :required="true"/>
      <InputGeneric v-model="form.description" :label="'Description'" />
      <InputSelect v-model="form.projectId" :label="'Project'" :options="projectOptions"/>
      <InputSelect v-model="form.priority" :label="'Priority'" :options="priorityOptions"/>
      <InputSelect v-if="isUpdate" v-model="form.status" :label="'Status'" :options="statusOptions"/>
      <InputSelect v-if="isUpdate" v-model="form.assignedId" :label="'Assign To'" :options="usersOptions"/>
    </div>
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      {{ action }} Ticket
      </CustomButton>
    </div>
  </form>
</template>

<script>
import { InputGeneric, InputSelect } from './FormFields';
import CustomButton from '@/components/Button'
export default {
  name: "BaseIssueForm",
  components: {
    InputGeneric,
    InputSelect,
    CustomButton
  },
  computed: {
    priorityOptions() {
      return ['low', 'medium', 'high', 'severe'];
    },
    statusOptions() {
      return ['open', 'close'];
    },
    projectOptions() {
      return this.$store.getters['project/projectOptions']
    },
    usersOptions() {
      return this.$store.getters['user/userOptions'];
    },
    action() {
      return this.isUpdate ? "Update" : "Create"
    }
  },
  created() {
    this.$store.dispatch('user/getAllUsers')
  },
  mounted() {
    if (!this.projectOptions.length) {
      this.$store.dispatch('project/getAllProjects')
      }
    if (!this.usersOptions.length) {
      this.$store.dispatch('user/getAllUsers')
    } 
  }
}
</script>
