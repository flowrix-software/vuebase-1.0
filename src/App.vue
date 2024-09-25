<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import MobileFooter from '@/components/Footer/MobileFooter.vue'
</script>

<template>
  <Header />
  <div class="page-content">
    <RouterView />
  </div>
  <Footer />
  <MobileFooter />
</template>

<style lang="scss" scoped>
.page-content{
  min-height: 100vh;
}
</style>
