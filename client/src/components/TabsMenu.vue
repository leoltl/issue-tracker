<template>
  <div class="tabs-menu">
    <slot />
    <div class="plus" @click="create">+</div>
  </div>
</template>

<script>
export default {
  name: "TabsMenu",
  props: ["create"]
}
</script>

<style lang="scss" scoped>
  .tabs-menu {
    border-bottom: 1px solid black;
    display: flex;
    height: 5vh;
  }
  .plus {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    width: 5vh;
    cursor: pointer;
  }
</style>