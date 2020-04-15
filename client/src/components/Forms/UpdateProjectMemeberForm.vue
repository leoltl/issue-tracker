<template>
  <form @submit.prevent>
    <UserTable 
      :users="usersNotInCurrentProject"
      :handleClick="handleSelectUser"
      :selectedRows="selected"
      />
    <div class="actions">
      <CustomButton 
        @click="handleSubmit"
        :hasAsync="true"
      >
      Add member(s)
      </CustomButton>
    </div>
  </form>
</template>

<script>
  import CustomButton from '@/components/Button'
  import UserTable from '@/views/UserTable';
  import ModalBus from '@/Bus'
  
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters: mapUserGetters } = createNamespacedHelpers('project')
  export default {
    name: "UpdateProjectMemberForm",
    props: ['projectId'],
    components: {
      CustomButton,
      UserTable
    },
    data() {
      return {
        selected: [],
        form: {
          members: []
        }
      }
    },
    methods: {
      async handleSubmit(e, loaderCallback) {        
        let formData = this.form
        var callback = () => {
          loaderCallback()
          ModalBus.$emit('close')
          this.form = {}
        }
        this.$store.dispatch('project/updateProjectMember', { formData, projectId: this.projectId, callback })
      },
      handleSelectUser(rowNumber) {
        if (!this.selected.includes(rowNumber)) {
          this.selected.push(rowNumber);
          this.form.members.push(this.usersNotInCurrentProject[rowNumber].usersUuid)
        } else {
          this.selected = this.selected.filter(row => row != rowNumber)
          var userToRemove = this.usersNotInCurrentProject[rowNumber].usersUuid
          this.form.members = this.form.members.filter(user => user != userToRemove)
        }
      }
    },
    computed: {
      ...mapUserGetters([
        'usersNotInCurrentProject',
      ]),
    },
    created() {
      this.$store.dispatch('user/getAllUsers');
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