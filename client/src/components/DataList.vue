<template>
  <div class="data-list">
    <div v-for="row of rows" class="data-entry" :key="row.name">
      <span class="title">{{ row.displayAs || row.name }}:</span> 
      <span class="value">{{ displayData(row) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataList",
  props: {
    data: Object,
    rows: Array,
  },
  methods: {
    displayData(row) {
      if ('dataFilter' in row && 'dataFunction' in row) {
        return row.dataFilter(row.dataFunction(this.data))
      } else if ('dataFilter' in row) {
        return row.dataFilter(this.data[row.name])
      } else if ('dataFunction' in row) {
        return row.dataFunction(this.data)
      } else {
        return this.data[row.name]
      }
    }
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