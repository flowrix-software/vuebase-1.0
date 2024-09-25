<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

type SortType = 'priceasc' | 'pricedesc'

const selectSort = (sort: SortType) => {
  const queryObject = { ...route.query, sortby: sort }
  router.push({ query: queryObject })
}
</script>

<template>
    <div class="dropdown d-inline me-4">
        <a rel="nofollow" class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-bs-toggle="dropdown" aria-expanded="false">
            <p class="d-inline m-0">Sort By</p>
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
                <a rel="nofollow" class="dropdown-item" href="#" @click="selectSort('priceasc')">
                    Price Low to High
                </a>
            </li>
            <li>
                <a rel="nofollow" class="dropdown-item" href="#" @click="selectSort('pricedesc')">
                    Price High to Low
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.dropdown-item {
    font-size: 1.3rem;
}
</style>
