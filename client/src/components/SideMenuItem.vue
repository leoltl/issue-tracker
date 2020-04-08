<template>
  <li>
    <div class="icon">
      <slot name="icon" />
    </div>
    <div class="item">
      <slot />
    </div>
  </li>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
li {
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 2.25rem;
  font-size: 1rem;
  cursor: pointer;
  > div {
    // border: 1px solid red;
    display: flex;
    align-items: center;
    &:nth-child(1) {
      justify-content: center;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
}
</style>