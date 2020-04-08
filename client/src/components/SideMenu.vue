<template>
  <div>
    Side menu
    <CustomButton @click="toggle">
      Compose
    </CustomButton>
  </div>
</template> 

<script>
import CustomButton from '@/components/Button'
import NewIssueForm from '@/components/Forms/NewIssueForm'
import ModalBus from '@/Bus';
export default {
  name: "SideMenu",
  components: {
    CustomButton,
  },
  methods: {
    toggle() {
      ModalBus.$emit('open', {
        component: NewIssueForm
      })
    }
  }
}
</script>