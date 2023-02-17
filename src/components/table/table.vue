<template>
  <div v-if="products && products.length">
    <table>
      <thead>
      <tr>
        <th>Product name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Sum</th>
        <th>Check</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, i) in products" :key="product.id">
        <td>{{ product.product_name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.qty }}</td>
        <td>{{ getSum(product) }}</td>
        <td><Button :type="'delete'" @click="deleteProduct(i)" /></td>
      </tr>
      </tbody>
    </table>
    <p class="table__total">Total: {{total}}$</p>
  </div>
  <p v-else>No products yet</p>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import Button from '../button/button.vue'

import { useStore } from 'vuex'

import { ITable } from "../../interfaces/iTable"

export default defineComponent({
  name: "Table",
  components: { Button },
  setup() {
    const store = useStore()

    const products = computed(() => store.getters.getProducts)

    function getSum(product:ITable) {
      return product.qty * product.price
    }

    function deleteProduct(i:number) {
        products.value.splice(i, 1)
        const storageProducts = JSON.parse(localStorage.getItem('products') || '[]')
        storageProducts.slice(i, 1)
        localStorage.setItem('products', JSON.stringify(products.value))
    }

    const total = computed(():number => products.value.reduce((acc:number, num:ITable) => acc + getSum(num), 0))

    return {
      products,
      deleteProduct,
      getSum,
      total
    }
  }
})
</script>

<style scoped lang="scss">
table {
  border: 1px solid white;
  border-collapse: collapse;
  border-radius: 3px;
  width: 100%;

  tr {
    border-bottom: 1px solid white;

    th {
      padding: 0 10px;
    }

    td {
      color: cadetblue;
    }
  }
  button {
    margin: 10px;
    padding: 4px 10px;
  }
}

.table__total {
  color: seagreen;
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
}
</style>
