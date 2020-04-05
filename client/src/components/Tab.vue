<template>
  <div class="tab-tag" :class="{'selected': selected}">
    {{ project.name }}
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: ["project", "selected"]
}
</script>

<style lang="scss" scoped>
  .tab-tag {
    display: flex;
    padding-left: 1vw;
    align-items: center;
    border-right: 1px solid #888;
    width: 10vw;
    background-color: #444;
    color: white;
    cursor: pointer;
  }
  .selected {
      border-top: 3px solid #f48024;
      background-color: #888;
    }
</style>