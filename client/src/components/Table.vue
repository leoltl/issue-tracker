<template>
  <table>
    <thead>
      <tr>
        <th v-for="(column, index) of columns" :key="index" >
          {{ column.displayAs || column.name || column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="currentRow in nubmerOfRows" :key="currentRow">
        <td v-for="(column, index) of columns" :key="index">
            <span v-if="column.dataFilter">
              {{ column.dataFilter(data[currentRow-1][column.name]) }}
            </span>
            <span v-else-if="column.action">
              <CustomButton @click="column.action(data[currentRow-1])">
                {{ column.name }}
              </CustomButton>
            </span>
            <span v-else>
              {{ data[currentRow-1][column.name || column] }}
            </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CustomButton from '@/components/Button';
export default {
  name: "Table",
  components: { CustomButton },
  props: {
    definedColumns: {
      type: Array
    },
    data: {
      type: Array
    },
    withAction: {
      type: Array
    }
  },
  computed: {
    nubmerOfRows() {
      return this.data.length
    },
    columns() {
      var dataColumns = this.definedColumns || this.data.length && Object.keys(this.data[0]) || [];
      var actionColumns = this.withAction && this.withAction.length ? [...dataColumns, ...this.withAction] : dataColumns
      return actionColumns;
    },
  }
}
</script>

<style lang="scss" scoped>
  table {
    width: 100%;
    border-bottom: 3px solid black;
    tr {
      border-bottom: 2px solid #ddd;
      td {
        padding: 0.4rem;
        text-align: center;
        vertical-align: center;
      }
    }
  }
</style>