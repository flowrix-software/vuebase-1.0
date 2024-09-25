<template>
  <div>
    <p class="fw-bold mt-5">What's in the bundle</p>
    <div class="table-responsive">
      <table class="table table-light">
        <thead>
          <tr>
            <th width="10%" scope="col"></th>
            <th width="30%" scope="col">Part Name</th>
            <th width="10%" scope="col">Qty</th>
            <th width="10%" scope="col">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through each item in the product bundle array -->
          <tr v-for="(item, index) in product.bundle" :key="index">
            <td scope="row">
              <img :src="item.image" class="img-fluid bundle_image" :alt="item.name" />
            </td>
            <td class="align-middle">
              <p class="fw-bold text-primary mb-0">{{ item.name }}</p>
            </td>
            <td class="align-middle">{{ item.qty }}</td>
            <td class="align-middle text-end fw-medium">{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define props using the Composition API
const props = defineProps<{
  product: {
    bundle: Array<{
      image: string;
      name: string;
      quantity: number;
      price: string;
    }>;
  };
}>();
</script>
