<script setup lang="ts">
import { defineProps } from 'vue'

interface Item {
  name: string
  image: string
  rrp: string
  slug:string
  rrpfloat: number
  variations: number
}

const props = defineProps<{ item: Item }>()
</script>

<template>
  <div class="product-card-item h-100 rounded-4 h-100 d-flex flex-column justify-content-between ">
    <router-link :to="{ name: 'SamplesProduct', params: { slug:props.item.slug } }" class="h-100 d-flex flex-column justify-content-between ">
      <div>
        <img height="260px" :src="props.item.image" loading="lazy" />
        <div class="card-item-detail px-3 position-relative mt-4 mb-3 pt-0">
          <div class="d-flex justify-content-between detail">
            <h3 class="h3 card-item-title text-dark">{{ props.item.name }}</h3>
            <p class="d-flex flex-column item-price m-0">
              <span class="h4 text-secondary d-flex flex-column text-start">
                <small class="text-black">From </small>
                <span v-if="props.item.rrpfloat > 0" class="price_span fw-bold">{{ props.item.rrp }}</span>
                <span v-if="props.item.rrpfloat === 0" class="price_span fw-bold">$74.00</span>
              </span>
            </p>
          </div>
          <u class="text-primary fw-bold">{{ props.item.variations }} colours available</u>
        </div>
      </div>
    </router-link>
  </div>
</template>


<style  scoped>
.product-card-item{
  overflow: hidden;
}

.orange-btn{
  .icon {
    font-size: 12px;
    line-height: 0.9rem;
    margin-left: 10px;
    opacity: 1;
}
}
#promotion-tag{
  width: 119px;
    height: 50px;
    display: block;
    position: absolute;
    top: 30px;
    left: -9px;
  #promotion-text {
    font-size: 13px;
    position: absolute;
    left: 21px;
    color: #fff;
    line-height: 1.2;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    letter-spacing: 0.04rem;
    b {
        font-size: 111%;
    }
  }
}
.card-quantity-block{
  span#quantity-text{
    width: 50%;
    border: 1px solid #E9E9E9;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-size: 18px;
    font-weight: 600;
  }
  span#quantity-change {
    width: 25%;
    background: var(--iseek-primary);
    color: white;
    text-align: center;
    font-size: 24px;
    border-radius: 0px;
    cursor: pointer;
    &:hover{
      background: var(--iseek-secondary);
      color: var(--iseek-primary);
    }
  }
}
</style>