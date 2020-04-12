<template>
  <div class="data-list">
    <div v-for="row of rows" class="data-entry" :key="row.name">
      <span class="title">{{ row.displayAs || row.name }}:</span> 
      <template v-if="row.dataFunction && row.dataFilter">
        <span class="value">{{ row.dataFilter(row.dataFunction(data)) }}</span>
      </template>
      <template v-else-if="row.dataFunction">
        <span class="value">{{ row.dataFunction(data) }}</span>
      </template>
      <template v-else-if="row.dataFilter">
        <span class="value">{{ row.dataFilter(data[row.name]) }}</span>
      </template>
      <template v-else>
        <span class="value">{{ data[row.name] }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataList",
  props: {
    data: Object,
    rows: Array,
  }
}
</script>

<style lang="scss" scoped>
.data-entry {
  border-bottom: 2px solid #ccc;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
}
</style>