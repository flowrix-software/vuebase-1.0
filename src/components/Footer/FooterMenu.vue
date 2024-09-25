<script setup>
import { onMounted, computed } from 'vue'
import { useNavMenu } from '@/stores/NavMenu'

const navMenuStore = useNavMenu()
onMounted(() => {
  navMenuStore.topMenu(3, 'footer')
})

const footerMenuItems = computed(() => {
  const footerMenu = navMenuStore.Menu.find(menu => menu.location === 'footer')
  return footerMenu ? footerMenu.items : []
})
</script>

<template>
  <div class="col" v-for="(menu, index) in footerMenuItems" :key="index">
    <h3 class="text-white">{{ menu.title }}</h3>
    <ul class="mt-4 list-unstyled">
      <li v-for="(item, childIndex) in menu.children" :key="childIndex">
        <a :href="item.url">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>