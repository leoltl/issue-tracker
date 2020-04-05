<template>
  <section class='sub-section' :class="`sub-section-${title}`">
    <div class="sub-section-header">
      <h4>{{ title }}</h4>
    </div>
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "SubSection",
  props: ["title"]
}
</script>

<style lang="scss" scoped>
  .sub-section{
    border: 1px solid black;
    background: white;
  }
  .sub-section-header {
    background: blue;
    height: 50px;
  }
  .content {
    max-height: 70vh;
    padding: 1.25vw;
  }
</style>