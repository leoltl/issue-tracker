<template>
  <div class="side-menu">
    <CustomButton
      :type="'compose'"
      @click="toggle">
      Issue
    </CustomButton>
    <ul>
      <SideMenuItem>
        <template v-slot:icon>
          <i class="el-icon-s-management"></i>
        </template>
        <router-link :to="{name:'Projects'}">
          Projects
        </router-link>
      </SideMenuItem>
       <SideMenuItem>
        <template v-slot:icon>
          <i class="el-icon-s-management"></i>
        </template>
        <router-link :to="{name:'ManageRole'}">
          Manage Role
        </router-link>
      </SideMenuItem>
      <SideMenuItem @click.native="handleLogout">
        <template v-slot:icon>
          <i class="el-icon-switch-button"></i>
        </template>
        <router-link :to="'/'" @click.native="handleLogout">
          Logout
        </router-link>
      </SideMenuItem>
    </ul>
  </div>
</template> 

<script>
import CustomButton from '@/components/Button'
import NewIssueForm from '@/components/Forms/NewIssueForm'
import SideMenuItem from '@/components/SideMenuItem';
import ModalBus from '@/Bus';
export default {
  name: "SideMenu",
  components: {
    CustomButton,
    SideMenuItem
  },
  methods: {
    toggle() {
      ModalBus.$emit('open', {
        component: NewIssueForm,
        title: "Create new issue"
      })
    },
    handleLogout() {
      this.$store.dispatch('auth/signOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  padding-top: 7.5%;
  padding-left: 2.5%;
}
ul {
  padding-left: 10%;
}
</style>