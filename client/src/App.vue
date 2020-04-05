<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from '@/views/Layout'
export default {
  name: 'App',
  components: {
    Layout,
  },
  created() {
    this.$store.dispatch('auth/loadToken')
  },
  async mounted() {
    await this.$store.dispatch('auth/checkAuth')
  }
}
</script>