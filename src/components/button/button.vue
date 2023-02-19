<template>
<button :type="type" :class="['button', btnType]" :disabled="disabled"><slot /></button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent ({
  name: "Button",
  props: {
    type: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  setup(props) {
    const btnType = computed(() => {
      switch (props.type) {
        case 'add':
          return 'add-btn'
        case 'delete':
          return 'delete-btn'
      }
    })
    return {
      btnType
    }
  }
})
</script>

<style scoped lang="scss">
.button {
  max-height: 40px;
  &:hover {
    border-color: white;
  }
}
.add-btn {
  background-color: #1a1a1a;
}
.delete-btn {
  background-color: #FF0000;
}
</style>
