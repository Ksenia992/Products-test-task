<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './components/navbar/navbar.vue'

export default defineComponent ({
  components: { Navbar }
})
</script>

<template>
  <Navbar />
    <router-view />
</template>
