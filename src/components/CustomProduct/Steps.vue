<script setup>
import { defineProps,ref } from 'vue';
import SingleStep from '@/components/CustomProduct/SingleStep.vue'
import AddToCart from '@/components/Product/AddToCart.vue'
const props = defineProps({'product':Object});
const activeStep = ref(0)
const NextStep = ((id)=>{
    activeStep.value = id
});
const sortedGroups = (groups) => {
  const myObject = groups
  var sortedObject = []
  if (myObject) {
    const sortedArray = Object.entries(myObject).sort(
      (a, b) => a[1]['sortorder'] - b[1]['sortorder']
    )
    sortedArray.forEach(([key, value]) => {
      sortedObject.push(value)
    })
  }
  return sortedObject
}
</script>
<template>
   <div class="product-wizard">
        <div class="steps-head">
            <div class="wizard-steps d-none d-lg-flex w-100 justify-content-around algin-items-center">
                <div @click="NextStep(index)" v-for="(group,index) in sortedGroups(product.groups)" class="w-100 text-center single-step">
                    <span :class="{'active':activeStep>=index}">{{ index+1 }}</span>
                    <line v-if="index>0" :class="{'active':activeStep>=index}"></line>
                </div>
            </div>
        </div>
        <div class="product-top-details d-flex justify-content-between align-items-end mt-4 pb-3 border-bottom">
            <h1 class="fw-bold product-title m-0 lh-1">{{ product.name }}</h1>
            <div class="align-self-center">
                <div class="d-flex flex-column price">
                    <span>Price</span>
                    <span class="pricecontent h2 fw-bold text-secondary">
                        $<span class="price_span">86.00</span>
                    </span>
                    <span class="if-discounted" style="display: none;">
                        $<span id="dis_price">0.00</span>
                    </span>
                </div>
            </div>
        </div>
        <form class="customproductform">
            <template v-for="(group,index) in sortedGroups(product.groups)">
        <div v-show="activeStep==index" class="step-content" :id="`step_${group.id}`">
            <SingleStep  :group="group"/>
        </div>
        <div class="serviceprice d-none"></div>
            </template>
        </form>
        <div class="steps-buttons d-flex justify-content-between pt-3">
            <div class="col justify-content-start" v-if="activeStep+1>1">
                <div @click="NextStep(activeStep-1)" class="py-2 btn btn-outline-secondary px-5 backbutton">
                    <span class="icon icon-arrow-left"></span><span class="icon icon-arrow-left me-4"></span>
                    Previus
                </div>
            </div>
            <div class="col text-end" v-if="activeStep+1!=sortedGroups(product.groups).length">
                <div :class="{ 'w-100': activeStep+1 == 1}" @click="NextStep(activeStep+1)" class="py-2 btn text-white btn-secondary px-5">
                    Next
                    <span class="icon icon-arrow-right ms-4"></span><span class="icon icon-arrow-right"></span>
                </div>
            </div>
            <div class="col text-end" v-if="activeStep+1==sortedGroups(product.groups).length">
                <AddToCart from="detailpage" getFormData="" :product="product" service=""/>
            </div>
        </div>
   </div>
</template>
<style>
.backbutton{
    &:hover{
        color:#fff;
    }
}
.icon{
    font-size: 14px;
}
.wizard-steps {
    position: relative;
    z-index: 2;
    top: -25px;
}
.error-popup-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 50%);
  z-index: 99;
  display: grid;
  place-items: center;
}
.error-body {
  background: #fff;
  width: 30%;
  min-width: 300px;
  padding: 20px;
  text-align: center;
}
</style>