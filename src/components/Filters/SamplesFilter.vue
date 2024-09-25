<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSamples } from '@/stores/Samples';

interface FilterValue {
  id: number;
  val: string;
  slug: string;
}

interface Filter {
  id: number;
  title: string;
  slug: string;
  values: FilterValue[];
}

interface Props {
  data: {
    filters: Filter[];
  };
}

const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();
const Samples = useSamples();

const Filters = computed(() => {
  return [...props.data.filters];
});

// Check if a filter value is selected based on the route query parameters
const isChecked = (slug: string, parentSlug: string) => {
  const currentFilters = (route.query[parentSlug] as string || '').split('_');
  return currentFilters.includes(slug);
};

// Toggle the checkbox state and update the route query parameters
const toggleCheckbox = (slug: string, parentSlug: string) => {
  const currentFilters = (route.query[parentSlug] as string || '').split('_');

  const index = currentFilters.indexOf(slug);
  if (index !== -1) {
    currentFilters.splice(index, 1);
  } else {
    currentFilters.push(slug);
  }

  const newFilters = currentFilters.join('_');
  const currentQuery = { ...route.query };

  if ('page' in currentQuery) {
    delete currentQuery.page;
  }

  if (newFilters) {
    currentQuery[parentSlug] = newFilters;
  } else {
    delete currentQuery[parentSlug];
  }

  router.push({
    path: route.path,
    query: currentQuery,
  });
};

watch(route, (newRoute) => {
  const filters = { ...newRoute.query };
  const page = parseInt(newRoute.query.page as string) || 1;
  delete filters.page;
  Samples.getSamples(page, filters);
});
</script>

<template>

    <div v-for="(filter, index) in Filters" :key="filter.id" class="accordion-item">
      <h2 class="accordion-header" :id="'panelsStayOpen-heading' + filter.id">
        <button class="accordion-button px-2 py-2" :class="{ 'collapsed': index !== 0 }" type="button"
          data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse' + filter.id" aria-expanded="true"
          :aria-controls="'panelsStayOpen-collapse' + filter.id">
          <p class="mb-0 font-weight-bold"><strong>{{ filter.title }}</strong></p>
        </button>
      </h2>
      <div :id="'panelsStayOpen-collapse' + filter.id" class="accordion-collapse collapse" :class="{ 'show': index == 0 }"
        :aria-labelledby="'panelsStayOpen-heading' + filter.id">
        <div class="accordion-body px-1 py-3">
          <ul
            class="list-unstyled category-list-simple list_relative pb-2 mb-4 filters_ul_list categories_filters closed_filter">
            <li v-for="value in filter.values" :key="value.id" class="my-2">
              <div class="form-check d-flex align-items-center justify-content-start m-0 gap-2">
                <input class="form-check-input" type="checkbox" value="" :checked="isChecked(value.slug, filter.slug)"
                  :id="'cate' + value.id" @click="() => toggleCheckbox(value.slug, filter.slug)" />
                <label class="form-check-label" :for="'cate' + value.id">{{ value.val }}</label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

</template>

<style scoped>
.h3 {
  font-size: 2rem !important;
  line-height: 2.5rem !important;
  font-family: 'Metropolis' !important;
  font-weight: 700 !important;
}
</style>
