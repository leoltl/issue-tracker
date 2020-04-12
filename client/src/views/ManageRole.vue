<template>
  <div class="manage-role">
    <SubSection :title="'Managed Staff'" class="sub-section-users">
      <UserTable :handleClick="handleClick.bind(this)" :users="users"/>
    </SubSection>
  </div>
</template>
<script>
import SubSection from '@/components/SubSection';
import UpdateRoleForm from '@/components/Forms/UpdateRoleForm'
import ModalBus from '@/Bus';
import UserTable from '@/views/UserTable';
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
export default {
  name: "ManageRole",
  components: {
    UserTable,
    SubSection
  },
  computed: {
    ...mapState([
      "users",
    ]),
  },
  methods: {
    handleClick(rowNumber) {
      this.$store.dispatch('user/setUser', this.users[rowNumber])
      ModalBus.$emit('open', {
        component: UpdateRoleForm,
        title: `Update ${this.users[rowNumber].name}'s role`
      })
    }
  },
  created(){
    this.$store.dispatch('user/getAllUsers');
  },
}
</script>

<style lang="scss" scoped>
.manage-role {
  padding: 1vh 2vw;
  height: 97%;
  background-color: #eee;
  tr {
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>