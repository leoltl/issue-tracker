<template>
  <div class="tab-tag">
    {{ project.name }}
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: ["project"]
}
</script>

<style lang="scss" scoped>
  .tab-tag {
    border: 1px solid black;
    width: 10vw;
  }
</style>