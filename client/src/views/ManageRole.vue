<template>
<div class="manage-role">
  <SubSection :title="'Managed Staff'" class="sub-section-users">
    <DataTable 
      :data="users"
      :definedColumns="memberColumns"
      @rowClick="handleClick"
    />
  </SubSection>
</div>
</template>

<script>
import SubSection from '@/components/SubSection'
import DataTable from '@/components/DataTable'
import { createNamespacedHelpers } from 'vuex'
import { displayRole } from '@/filters';
import ModalBus from '@/Bus';
import UpdateRoleForm from '@/components/Forms/UpdateRoleForm'
const { mapState } = createNamespacedHelpers('user')
const MEMBERS_COLUMNS = [
  { name: "name", displayAs: "Name" }, 
  { name: "email", displayAs: "Email" }, 
  { name: "role", displayAs: "Role", dataFilter: displayRole }
];
export default {
  components: {
    SubSection,
    DataTable
  },
  created(){
    this.$store.dispatch('user/getAllUsers');
  },
  computed: {
    ...mapState([
      "users",
    ]),
    memberColumns() {
      return MEMBERS_COLUMNS
    }
  },
  methods: {
    handleClick(rowNumber) {
      this.$store.dispatch('user/setUser', this.users[rowNumber])
      ModalBus.$emit('open', {
        component: UpdateRoleForm,
        title: `Update ${this.users[rowNumber].name}'s role`
      })
    }
  }
}
</script>

<style lang="scss" >
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