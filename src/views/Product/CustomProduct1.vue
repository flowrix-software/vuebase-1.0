<script setup>
import { defineProps,onMounted, nextTick, getCurrentInstance } from 'vue';

import Gallery from '@/components/Product/Gallery.vue'
import Attributes from '@/components/CustomProduct/Attributes.vue'
import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
import ProductCard from '@/components/Product/ProductCard.vue'
const CustomScript = useCustomScript();
const props = defineProps(['product']);
CustomScript.attributeIdz = props.product.attributeIdz
CustomScript.lookupprices =props.product.lookupprices
CustomScript.servicePriceSetting =props.product.servicePriceSetting
CustomScript.conditions =props.product.conditions
CustomScript.TYPES =props.product.types
CustomScript.PRICETYPE =props.product.pricetypes
CustomScript.UNIT_RELATIVE =props.product.unit_relative
CustomScript.DISCOUNTS =props.product.discounts
CustomScript.measurementUnit =props.product.unit
CustomScript.promotionSettings =props.product.promotionSettings
CustomScript.B2BTYPE =props.product.b2btype
CustomScript.USEBASEPRICE =props.product.usebaseprice
CustomScript.BASEPRICE =props.product.baseprice
CustomScript.usefitting =props.product.usefitting
CustomScript.sevice_price_type =props.product.servicePriceSetting.sevice_price_type
CustomScript.serviceprice =0
const screenwidth = screen.width

</script>
<template>
<section class="product-details pb-5">
    <div class="container mt-lg-5 pt-lg-5 p-0 px-lg-1">
        <div class="row gx-5" ref="descriptionTarget">
            <div class="col-xl-6 pe-md-5">
                <Gallery :productData="product" />
            </div>
            <div class="col-xl-6">
                <Suspense>
                <Attributes :product="product"/>
                </Suspense>
            </div>
        </div>
        <div class="row mt-5 px-5" ref="relatedTarget" v-if="product.description">
            <div class="col">
                <h3 class="product-sub-title"><span>Product Description</span></h3>
                <div v-html="product.description"></div>
            </div>
        </div>
        <div class="row mt-5 px-5 related_section" v-if="product.related.length > 0">
            <div class="col">
                <h3 class="product-sub-title"><span>Related Products</span></h3>
                <div class="row  g-5 ">
                    <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in product.related" :key="item">
                        <ProductCard :item="item" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<style lang="scss" scoped>
:deep(){
.product-Attributes {
    background: #f9f9f9;
    padding: 0 30px;
}
.wizard-steps{
    
    .single-step{
       position:relative;
       z-index: 1;
    span {
    width: 50px;
    height: 50px;
    background: #E5E5E5;
    border-radius: 50%;
    color: #8E8E8E;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    z-index: 0;
    border: 1px solid #DED9D9;
    margin: 0 auto;
    cursor: pointer;
    &:hover{
        background: var(--iseek-primary);
        border: 0;
        color:#fff;
    }
    &.active{
        background: var(--iseek-primary);
        border: 0;
        color:#fff;
    }
}
line.active{
    width: 100%;
    height: 3px;
    display: block;
    background: var(--iseek-primary);
    position: absolute;
    right: calc(50% - 25px);
    z-index: -1;
    top: 50%;
}
}
}
.price {
    font-size: 18px;
    font-weight: 400;
    font-family: 'Metropolis';
    .pricecontent {
        color: var(--iseek-primary);
        font-size: 3rem;
        line-height: 1;
    }
}
.product-sub-title {
    font-size: 3rem !important;
    margin-bottom: 20px;
    font-weight: bold;
    position: relative;
    span {
        background: #fff;
        z-index: 1;
        position: relative;
        padding-right: 10px;
    }
    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        left: 0;
        bottom: 0;
        background: var(--iseek-secondary);
    }
}
.product-card-item{
    #card-item-image{
            height:300px;
            position: relative;
            background-size: cover;
            background-position: center;
            img{
                position: absolute;
                
            }
    }
    .card-item-detail{
        .card-item-title{
            font-size:2rem !important;
            font-weight: bold;
        }
    }
}
.col-form-label{
    font-family: "Metropolis", Georgia, "Times New Roman", Times, serif;
    font-size: 15px;
}
.input-group-text{
    font-size: 1em;
}
.multiselect__input, .multiselect__single {
    display: flex !important;
    align-items: center !important;
}
span.option__desc{
    display: block !important;
    overflow: hidden;
}
span.option__title {
    white-space: pre;
}
.image-box-magnifier-hover-image {
    box-shadow: 0px 0px 5px 5px #e2e2e2;
    border-radius: 10px;
    width: 450px;
    height: 450px;
    z-index: 1;
  }

  .image-box-magnifier-hover-image-simple {
    box-shadow: 0px 0px 5px 5px #e2e2e2;
    border-radius: 10px;
    width: 450px;
    height: 300px;
    z-index: 1;
    width: auto !important;
    position: absolute;
    bottom: 100%;
    background: #fff;
  }
  .lightbox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0 0 0 / 50%);
    z-index: 99999;
    animation: all ease-in-out 0.3s 0.3s;
    .lightbox-content {
      position: relative;
      background-color: #fff;
      padding: 10px;
      max-width: 100%;
      max-height: 100%;
      border-radius: 9px;

      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
      .light-img {
        height: 500px;
        margin-bottom: 10px;
      }
      .nav {
        position: absolute;
        top: calc(50% - 5px);
        &.btn-prev {
          left: -30px;
          right: auto;
        }
        &.btn-next {
          right: -30px;
          left: auto;
        }
      }
    }
  }
}
</style>