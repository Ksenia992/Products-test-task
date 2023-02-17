<template>
<button :type="type" :style="style">{{text}}</button>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
export default defineComponent ({
  name: "Button",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const text = ref<string>('')
    const color = ref<string>('')

    const btnType = computed(():string => props.type)

    function btnStyle () {
      if (btnType.value === 'add') {
        text.value = 'add'
        color.value = '#1a1a1a'
      }
      else if (btnType.value === 'delete') {
        text.value = 'delete'
        color.value = '#FF0000'
      }
    }
    btnStyle()

    const style = computed(() => ({
      '--bg-color': color.value
    }))
    return {
      text,
      style
    }
  }
})
</script>

<style scoped lang="scss">
button {
  max-height: 40px;
  background-color: var(--bg-color);
  &:hover {
    border-color: white;
  }
}
</style>
