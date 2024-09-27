<script setup>
const product = defineProps(['productData', 'price'])
// console.log(product.price.getHTML())
</script>
<template>
<div>
        <div class="modals modal">
            <div class="modal-dialog modal-dialog-centered opacity-100">
                <div class="modal-content rounded-0">
                    <div class="modal-body pb-0 position-relative p-4">
                        <div class="card mb-3 border-0 bg-transparent">
                            <div class="w-100 text-end position-absolute top-0 end-0">
                                <button type="button" class="btn-close" @click="$emit('someEvent')"></button>
                            </div>
                            <div class="row g-0 align-items-center">
                                <div class="col-2">
                                    <img :src="productData.image" height="100px" class="img-fluid image"
                                        :alt="productData.name">
                                </div>
                                <div class="col-10">
                                    <div class="card-body">
                                        <p class="fw-bold mb-0 fs-2">Added to your shopping cart</p>
                                        <p class="fw-bold mb-2">{{ productData.name }} - ${{
                                            price }}</p>
                                        <p class="text-secondary fw-bold mb-0">You can continue shopping or move to your
                                            shopping cart
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer d-flex flex-row flex-wrap flex-md-nowrap mt-0 px-4">
                        <button type="button" class="btn bg-transparent w-100 w-md-50 shadow-none fs-4 fw-bold" @click="$emit('someEvent')"><i
                                class="bi bi-chevron-left"></i> Continue Shopping</button>
                        <router-link :to="{ name: 'Cart' }" class="btn btn-secondary w-100 w-md-50 fs-4 fw-bold text-white">View your shopping
                            cart <i class="bi bi-chevron-right"></i> </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    z-index: 9999909999;
    background-color: rgba(51, 51, 51, .55);
    width: 100vw;
    height: 100vh;
    display: flex;

    .modal-dialog {
        max-width: 700px;
        width: 75%;

        .image {
            width: 100%;
            height: 88px;
            object-fit: cover;
        }
    }
}

@media only screen and (max-width:768px) {
    .modal-dialog {
        width: 100% !important;
    }
}
</style>