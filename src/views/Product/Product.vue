<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const dynamicComponent = route.meta.component || null;
const data = route.meta.data || null;

</script>
<template>
  <component :is="dynamicComponent" :product="data" />
</template>