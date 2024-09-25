<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { attribute } = defineProps(['attribute']);
const emit = defineEmits(['variationChange']);
const route = useRoute();
const selectedValue = ref(route.params.slug);

const changeVariation = () => {
  emit('variationChange', selectedValue.value);
};
</script>
<template>
  <div>
    <div v-for="(single_attribute, index) in attribute" :key="index" class="row mt-4 align-items-center border-bottom pb-4">
      <div class="col-md-4">
        <p class="fw-bold mb-0 col-form-label">
          {{ single_attribute.name }}
        </p>
      </div>
      <div class="col-md-8">
        <select class="form-control form-select" v-model="selectedValue" @change="changeVariation()">
          <template v-for="value in single_attribute.values" :key="value">
            <option :value="value.slug">{{ value.name }}</option>
          </template>
          </select>
        <!-- <div class="values d-flex flex-wrap gap-4">
          <div class="value" :class="{active:value.selected}" v-for="value in single_attribute.values" :key="value.id">
            <router-link :to="{ name: 'Product', params: { slug: value.slug } }">
              {{ value.name }}
            </router-link>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* .values .value .product-option-input.active {
  background: #365072;
  color: #fff !important;
  font-weight: 700 !important;
} */
.values {

  .value {
    a {
      height: 80px;
      width: 100px;
      text-align: center;
      align-content: center;
      border: 1px solid #c6c6c6;
      display: block;
      font-size: 18px;
      font-weight: 500;

      &:hover {
        background: var(--iseek-primary);
        color: #fff !important;
        font-weight: 700 !important;
      }
    }

    &.active {
      background: var(--iseek-primary);
      font-weight: 700 !important;

      a {
        color: #fff !important;

      }
    }
  }
}
</style>
