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
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.product_name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.qty }}</td>
        <td>{{ getSum(product) }}</td>
        <td><input type="checkbox" @change="toggleSelect($event.target.checked, product )"></td>
      </tr>
      </tbody>
    </table>
    <div class="table__bottom-container">
      <Button :type="'delete'" @click="deleteProduct" :disabled="disabled">delete</Button>
    <p class="table__total">Total: {{total}}$</p>
    </div>
  </div>
  <p v-else>No products yet</p>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted, toRaw } from 'vue'

import Button from '../button/button.vue'

import { useStore } from 'vuex'

import { ITable } from "../../types/iTable"

export default defineComponent({
  name: "Table",
  components: { Button },
  setup() {
    const store = useStore()

    const disabled = ref<boolean>(true)

    const currentIds = ref<Array<Number>>([])

    const products = computed(() => store.state.productsModule.products)

    // onMounted(() => store.dispatch("productsModule/getData"))

    function getSum(product:ITable) {
      return product.qty! * product.price!
    }

    async function deleteProduct() {
      if (currentIds.value.length) {
        await store.dispatch('productsModule/deleteData', toRaw(currentIds.value))
        currentIds.value = []
      }
    }

    const total = computed(():number => products.value.reduce((acc:number, num:ITable) => Math.round(acc + getSum(num)), 0))

    function toggleSelect(isChecked:boolean, product:ITable ) {
      if (isChecked) {
        currentIds.value.push(product.id)
      } else {
        currentIds.value = currentIds.value.filter(id => id !== product.id)
      }
    }

    watch(() => currentIds.value.length, () => disabled.value = !currentIds.value.length)

    return {
      products,
      deleteProduct,
      getSum,
      total,
      toggleSelect,
      disabled
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
    margin: 20px;
    padding: 4px 10px;
  }
}

.table__total {
  color: seagreen;
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
}

.table__bottom-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input[type="checkbox" i] {
  margin: 12px 0;
}
</style>
