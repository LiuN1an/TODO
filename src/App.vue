<template>
  <router-view>
    <Home></Home>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './pages/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },
})
</script>
