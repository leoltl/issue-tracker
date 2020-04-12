<template>
  <DataTable 
    class="user-table"
    :data="users"
    :definedColumns="memberColumns"
    :selectedRows="selectedRows"
    :withAction="action"
    @rowClick="handleRowClick"
  />
</template>

<script>
import DataTable from '@/components/DataTable'
import { displayRole } from '@/filters';
const MEMBERS_COLUMNS = [
  { name: "name", displayAs: "Name" }, 
  { name: "email", displayAs: "Email" }, 
  { name: "role", displayAs: "Role", dataFilter: displayRole }
];
export default {
  name: "UserTable",
  props: ["handleClick", "users", "selectedRows", "withAction"],
  components: {
    DataTable
  },
  computed: {
    memberColumns() {
      return MEMBERS_COLUMNS
    },
    handleRowClick() {
      return this.handleClick || (() => {})
    },
    action() {
      return this.withAction || null;
    }
  },
}
</script>

<style lang="scss" >
  .user-table tbody tr {
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
  
  .sub-section-users tr {
    .action-Delete {
      visibility: hidden;
    }
    &:hover .action-Delete {
      visibility:visible;
    }
  }
</style>