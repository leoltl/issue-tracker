<template>
  <div>
    DASHBOARD
    {{ projects }}
    <button @click="kk">fetch</button>
    <button @click="pp">me</button>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
  name: "Dashboard",
  setup(_, {root: { $store }}) {
    $store.dispatch("getAllProjects")
    const projects = computed(() => $store.state.projects );
    const kk = () => $store.dispatch("getAllProjects")
    const pp = () => $store.dispatch("checkAuth")
    return {
      projects,
      kk,
      pp
    }
  }
}
</script>

<style>

</style>