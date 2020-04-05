<template>
  <section class="sub-section" >
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
  .sub-section {
    -webkit-box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
    -moz-box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
    box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
    border-radius: 5px;
    overflow: hidden;
    background: white;
  }
  .sub-section-header {
    display: flex;
    justify-content: center;
    padding: 1rem;
    border-bottom: 1px solid black;
  }
  .content {
    max-height: 70vh;
    padding: 1.5vw 1.25vw;
  }
</style>