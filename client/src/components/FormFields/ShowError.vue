<template>
  <div class="form-error">
    <p v-for="error of errorMsg" :key="error">{{error}}</p>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  name: "ShowError",
  props: ["errors"],
  setup(props) {
    const errorMsg = computed(() => props.errors.filter(msg => msg != null))
    return {
      errorMsg
    }
  }
}
</script>

<style>

</style>