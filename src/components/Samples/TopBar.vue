<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import SortBy from '@/components/Filters/SortBy.vue';

interface Props {
  data: {
    from: number;
    to: number;
    total: number;
  };
}

const props = defineProps<Props>();
const router = useRouter();

const clearFilters = (): void => {
  const currentRoute = router.currentRoute.value;
  const {...newQuery } = currentRoute.query;
  router.push({ query: newQuery });
};
</script>

<template>
  <div class="filters-top mb-4 clearfix mt-md-0 sticky-top bg-white offset-top" style="top:50px;z-index:9;">
    <div class="row align-items-center flex-column-reverse flex-md-row-reverse">
      <div class="col-lg-auto col-md-auto col-sm-12 col-xs-12 d-none d-sm-flex align-items-center">
        <SortBy />
      </div>
      <div class="col-lg col-md col-sm-12 col-xs-12">
        <p class="result_text m-0">
          Showing
          {{ props.data.from }}–{{ props.data.to }} of {{ props.data.total }}
          Products
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters-top {
  box-shadow: 0px 0px 10px #0000001A;
  padding: 0 20px;
}
</style>
