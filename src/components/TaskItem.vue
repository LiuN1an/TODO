<template>
  <div class="item-container">
    <input placeholder="please type in " />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TaskItem',
  props: {
    tasks: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    // console.log(props)
  },
})
</script>

<style>
.item-container {
  margin: 10px 0;
}
</style>
