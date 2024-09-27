<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/stores/Cart'
import CartDetail from '@/components/01/Cart/CartDetail.vue'
import CartTotalAndPromo from '@/components/01/Cart/CartTotalAndPromo.vue'

const fetchCart = useCartStore()
type CartItem = {
    name: string;
    // other properties...
};

const isObjectEmpty = computed(() => {
    if (fetchCart.cart.items !== undefined) {

        const itemNames = Object.values<CartItem>(fetchCart.cart.items).map((item) => item.name);
        const checkForMeasure = itemNames.includes('Check Measure')

        if (checkForMeasure && itemNames.length === 1) {
            return false // Only 'Check Measure' is present
        }

        return itemNames.length > 0
    } else {
        return false
    }
});
</script>
<template>
    <section class="h-100 py-5 position-relative" v-if="isObjectEmpty" >
        <div class="container gx-5 gx-md-3">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <p class="fw-medium small mb-0">Login or sign up to save your cart? <router-link
                            :to="{ name: 'Shop' }">Login
                            now</router-link></p>
                </div>
                <div class="col-md-4 px-4">
                    <h1 class="mb-2">Cart</h1>
                </div>
            </div>
            <div class="row gx-5 gy-5 gy-md-0">
                <div class="col-md-8 pb-5">
                    <CartDetail />
                </div>
                <div class="col-md-4 bg-white">
                    <CartTotalAndPromo />
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        <div class="text-center">
            <h1 class="text-dark mb-4">
                Your Cart is Empty
            </h1>
            <router-link class="bg-primary text-white px-3 py-2 rounded hover-bg-dark text-decoration-none"
                v-if="!isObjectEmpty" :to="{ name: 'Shop' }">Continue Shopping</router-link>
        </div>
    </section>
</template>