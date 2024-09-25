<script setup lang="ts">
import { PropType } from 'vue';

// Define the types for the product data
interface VariationValue {
    name: string;
    slug: string;
    image: string;
    selected: boolean;
}

interface Variation {
    id: number;
    name: string;
    values: VariationValue[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
    type: string;
    promotionlabels: string | null;
    category: string;
    brand: string;
    sortorder: number;
    sku: string;
    mansku: string;
    stockstatus: boolean;
    stock: number;
    image: string;
    price: string;
    rrp: string;
    pricefloat: number;
    rrpfloat: number;
    variations: Variation[];
    cars: any[];
    images: any[];
}

// Define the props
const props = defineProps<{
    data: Product[];
}>();
</script>
<template>
    <section class="pt-5" id="productsGrid">
        <div class="container">
            <div class="row gx-5" style="row-gap:100px;">
                <div class="col-md-3" v-for="product in data" :key="product.id">
                    <div class="product-card-item h-100 border rounded-3 h-100 d-flex flex-column justify-content-between ">
                        <router-link :to="{ name: 'Product', params: { slug: product.slug }}" class="h-100 d-flex flex-column justify-content-between">
                            <div>
                                <div id="card-item-image">
                                    <img :src="product.image" width="100%" height="257px">
                                </div>
                                <div class="card-item-detail px-3 position-relative mt-4 mb-3 pt-4 d-block justify-content-between">
                                    <h3 class="card-item-title">{{ product.name }}</h3>
                                    <p class="d-flex flex-column item-price m-0">
                                        <span class="h2 text-secondary text-end">
                                            <small class="text-black">Price </small>
                                            <span class="price_span">{{ product.price }}</span>
                                        </span>
                                        <span class="if-discounted" style="display: none">$<span id="dis_price">0.00</span></span>
                                    </p>
                                </div>
                            </div>

                            <a :aria-label="product.name" v-if="product.type == 'custom'"
                                class="btn orange-btn d-block text-white btn-lg rounded-0 mt-2 d-inline-block"
                                :to="{ name: 'Product', params: { slug: product.slug } }">Customise
                                <span>
                                    <span class="icon icon-arrow-right"></span><span class="icon mx-0 icon-arrow-right"></span>
                                </span>
                            </a>
                        </router-link>
                        <span v-if="product.type != 'custom'"
                            class="btn orange-btn d-block text-white btn-lg rounded-0 mt-2 d-inline-block"
                            title="Add To Cart">
                            Add to Cart
                            <span>
                                <span class="icon icon-arrow-right"></span><span class="icon mx-0 icon-arrow-right"></span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.product-card-item {
    overflow: hidden;
}

.card-item-detail:before {
    content: "";
    position: absolute;
    top: 0;
    left: 1rem;
    height: 3px;
    width: 70px;
    background: var(--iseek-primary);
}

.orange-btn .icon {
    font-size: 12px;
    line-height: 0.9rem;
    margin-left: 10px;
    opacity: 1;
}

#promotion-tag {
    width: 119px;
    height: 50px;
    display: block;
    position: absolute;
    top: 30px;
    left: -9px;
}

#promotion-tag #promotion-text {
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
}

#promotion-tag #promotion-text b {
    font-size: 111%;
}

.card-quantity-block span#quantity-text {
    width: 50%;
    border: 1px solid #E9E9E9;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-size: 18px;
    font-weight: 600;
}

.card-quantity-block span#quantity-change {
    width: 25%;
    background: var(--iseek-primary);
    color: white;
    text-align: center;
    font-size: 24px;
    border-radius: 0px;
    cursor: pointer;
}

.card-quantity-block span#quantity-change:hover {
    background: var(--iseek-secondary);
    color: var(--iseek-primary);
}
</style>
