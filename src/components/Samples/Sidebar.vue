<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import SamplesFilter from '@/components/Filters/SamplesFilter.vue'

const route = useRoute()
const router = useRouter()
const props = defineProps<{ data: { filters: Filter[] } }>()

const clearFilters = () => {
  router.push({ path: route.path, query: {} })
}
</script>

<template>
  <aside class="w-100 sidebar sticky-top" style="top:50px;height:90vh;overflow: auto;z-index: 9;">
    <div class="sb_widget sb_collapse_category d-flex justify-content-between">
      <div class="d-flex sidebar-heading align-items-center">
        <i class="fas fa-sliders-h me-1"></i>
        <p class="mb-0 ms-2 fw-bold">Filters</p>
      </div>
      <a class="filters" @click.prevent="clearFilters"><small>Clear All Filters</small></a>
    </div>
    <div class="sb_widget sb_pricing_range mt-4">
      
      <div class="accordion accordion-flush" id="accordionPanelsStayOpenExample">
        <SamplesFilter :data="props.data" />
      </div>
    </div>
  </aside>
</template>


<style lang="scss" scoped>
.sidebar {
  box-shadow: 0px 0px 10px #0000001A;
  padding: 20px;

  .sidebar-heading {
    font-size: 22px;
    font-family: 'Metropolis' !important;
  }

  :deep(.accordion-item) {
    .accordion-button {
      background-color: var(--iseek-default);
      color: var(--iseek-primary);
      font-size: 16px;
      font-weight: normal;
      padding: 15px 10px !important;

      &:after {
        filter: brightness(0) invert(0);
        background-size: 20px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .accordion-button:not(.collapsed) {
      background-color: var(--iseek-primary);
      color: #fff;
      font-size: 16px;
      font-weight: normal;
      padding: 15px 10px !important;

      &:after {
        filter: brightness(0) invert(1);
        background-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
  }
}

.filters {
  cursor: pointer;
}
</style>
