<template>
  <h1>{{ msg }}</h1>
  <button @click="plus">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <div>{{ cv }}</div>
</template>

<script>
import { toRefs, ref, computed, watchEffect, reactive } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    
  }
};
</script>
