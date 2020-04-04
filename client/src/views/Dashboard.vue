<template>
  <div>
    DASHBOARD
    {{ projects }}
    <button @click="kk">fetch</button>
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
    return {
      projects,
      kk
    }
  }
}
</script>

<style>

</style>