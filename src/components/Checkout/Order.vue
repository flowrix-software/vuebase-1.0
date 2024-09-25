<script lang="ts" setup>
interface Cart {
    name: string;
    image: string;
    price: string;
    qty: number;
}

const props = defineProps<{
    items: Cart[];
}>();
</script>

<template>
    <div>
        <div class="order_summary mb-5">
            <h2 class="border-bottom pb-2 mb-4 fw-bold">Review your Order</h2>
            <div class="card mb-4 border-0" v-for="(data, index) in props.items" :key="index"
                style="max-width: 540px;">
                <div class="row g-3">
                    <div class="col-md-4">
                        <img :src="data.image" class="object-fit-cover img-fluid rounded-2" :alt="`${data.name} Image`">
                    </div>
                    <div class="col-md-8 d-flex align-items-center">
                        <div class="card-body">
                            <h3 class="card-title">{{ data.name }}</h3>
                            <p class="card-text mb-0">Price: <span class="display-6 fw-medium text-secondary h3">{{
                                data.price }}</span>
                            </p>
                            <p class="card-text">Quantity: <span class="fw-medium text-secondary">{{ data.qty
                                    }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>