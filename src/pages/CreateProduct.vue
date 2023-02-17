<template>
  <div class="container">
    <h1>Create product</h1>
    <div class="content">
      <div class="content__inputs">
        <div class="content__input">
                <input type="text" v-model="tableData.product_name" :placeholder="'Product name'">
          <p v-if="v$.product_name.$error"> {{ v$.product_name.$errors[0].$message }}</p>
        </div>
        <div class="content__input">
          <input type="text" v-model="tableData.price" :placeholder="'Price'">
          <p v-if="v$.price.$error"> {{ v$.price.$errors[0].$message }}</p>
        </div>
        <div class="content__input">
          <input type="text" v-model="tableData.qty" :placeholder="'Qty'">
          <p v-if="v$.qty.$error"> {{ v$.qty.$errors[0].$message }}</p>
        </div>
      </div>
      <Button @click="addProduct" :type="'add'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Button from '../components/button/button.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import useValidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength } from '@vuelidate/validators'
import { ITable } from "../interfaces/iTable"

export default defineComponent ({
  name: 'CreateProduct',
  components: { Button },
  setup() {
    const store = useStore()
    const router = useRouter()

    const tableData = ref<ITable>({
      product_name: '',
      id: Date.now(),
      checked: false,
      price: '',
      qty: ''
    })

    const rules = computed(() => ({
      product_name: { required, minLength: minLength(4), maxLength: maxLength(12) },
      price: { required, numeric },
      qty: { required, numeric },
    }))

    const v$ = useValidate(rules, tableData)

    async function addProduct () {
      await v$.value.$validate()
      if (!v$.value.$error) {
        await store.commit('SET_DATA', tableData.value)
        await router.push('/products')
        resetForm()
      }
    }

    function resetForm () {
      v$.value.$reset()
    }

    return {
      tableData,
      v$,
      addProduct
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
.content {
  display: flex;
  align-items: baseline;
  @media(max-width: $md) {
    align-items: center;
  }
}

.content__input {
  height: 140px;
  @media(max-width: $md) {
    height: 100%;
    width: 100%;
  }
}

.content__inputs {
  display: flex;
  flex-wrap: wrap;
  p {
    margin: 0;
    max-width: 170px;
    color: crimson;
    @media(max-width: $md) {
      max-width: 100%;
    }
  }
}

input {
  padding: 5px 10px;
  margin: 20px 10px;
}
</style>

