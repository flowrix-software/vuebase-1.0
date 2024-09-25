<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/Cart'
const {product, service } = defineProps([ 'product', 'service'])

const router = useRouter()

const addToCart = async (product, qty) => {
    router.push({ name: 'Cart' })
    useCartStore().addToCart(product, qty)
}

const quantity = ref(1);

const incrementQuantity = () => {
    quantity.value++;
};

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};
</script>
<template>
    <div>
        <div class="row mt-4 align-items-center g-3">
            <div class="col-6">
                <div class="input-group align-items-center quantity">
                    <span class="me-2 fw-bold">
                        Qty
                    </span>
                    <button class="btn btn-primary py-0 px-4" @click="decrementQuantity"
                        :disabled="quantity <= 1">-</button>
                    <input type="text" class="form-control text-center p-0" aria-label="Product Quantity" v-model="quantity" min="1">
                    <button class="btn btn-primary py-0 px-4" @click="incrementQuantity">+</button>
                </div>
            </div>
            <div class="col-6">
                <button class="btn btn-secondary w-100 text-white py-2" @click="addToCart(product, quantity)" type="button">
                    Add to Cart<i class="bi ms-2 bi-chevron-double-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.quantity{
    width: 50%;
}

@media only screen and (max-width:768px){
    
    .quantity{
        width: 100%;
    }
}
</style>