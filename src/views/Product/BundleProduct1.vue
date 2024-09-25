<script setup lang="ts">
import { useProduct } from '@/stores/product';
import { computed } from 'vue';
import Gallery from '@/components/Product/Gallery.vue';
import AddToCard from '@/components/Product/AddToCart.vue';
import BundlePrice from '@/components/BundleProduct/BundleProductPrice.vue'
const productStore = useProduct();

const productData = computed(() => productStore.data);

</script>

<template>
  <div>
    <div class="container mt-lg-5 pt-lg-5 px-lg-1">
      <div class="row mb-5">
        <div class="col-xl-6 pe-md-5">
          <Gallery :productData="productData" />
        </div>
        <div class="col-xl-6">
          <div class="bg-light p-1 p-md-5">
            <div class="sticky_summary_details mobile pt-5">
              <div class="d-flex justify-content-between">
                <div class="flex-grow-1 ms-3">
                  <h1 class="fw-bold">{{ productData.name }}</h1>
                  <div class="d-flex flex-row align-items-center gap-2 price" style="font-size:16px;">
                    <span>Price:</span>
                    <span class="pricecontent h2 fw-bold text-secondary m-0" style="font-size:18px;">
                      <span class="price_span" style="font-size:24px;">{{ productData.price }}</span>
                    </span>
                    <span class="if-discounted" style="display: none">$<span id="dis_price">0.00</span></span>
                  </div>
                  <BundlePrice :product="productData"/>
                </div>
              </div>
            </div>
          </div>
          <AddToCard :product="productData"/>
        </div>
      </div>
    </div>
  </div>
</template>


