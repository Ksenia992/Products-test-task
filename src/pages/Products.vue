<template>
  <div>
    <h1>Products</h1>
    <Table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Table from "../components/table/table.vue"
export default defineComponent( {
  name: "Products",
  components: { Table }
})
</script>

<style scoped>

</style>
