<script setup lang="ts">
//Assets
import visa from '@/assets/images/visa-icon.svg'
import master from '@/assets/images/mastercard.png'
import PayPal from '@/assets/images/PayPal-icon.svg'

interface Preference {
    itemtotal: number;
    itemrrptotal: number;
    voucherdiscount: number;
    servicesprice: number;
    shipping: number;
    itemdiscount: number;
    subtotal: number;
    gst: number;
    gstlabel: number;
    gstrate: number;
    total: number;
    gstincluded: boolean;
}


const props = defineProps<{
    calculations: Preference;
    step2Valid: boolean
}>();


</script>

<template>
    <div>

        <div class="row mb-3" v-if="props.calculations.itemtotal !== 0">
            <div class="col">
                <p class="mb-0 h2 fw-semibold">Product Total</p>
            </div>
            <div class="col text-end">
                <p class="price mb-0 fw-bold text-secondary h2">${{
                    props.calculations.itemrrptotal.toFixed(2)
                    }}</p>
            </div>
        </div>
        <div class="row mb-3" v-if="props.calculations.voucherdiscount !== 0">
            <div class="col">
                <p class="mb-0 h2 fw-semibold">Voucher Discount</p>
            </div>
            <div class="col text-end">
                <p class="price mb-0 fw-bold text-secondary h2">${{
                    props.calculations.voucherdiscount.toFixed(2)
                    }}</p>
            </div>
        </div>
        <div class="row mb-3" v-if="props.calculations.servicesprice !== 0">
            <div class="col">
                <p class="mb-0 h2 fw-semibold">Service Price</p>
            </div>
            <div class="col text-end">
                <p class="price mb-0 fw-bold text-secondary h2">${{
                    props.calculations.servicesprice.toFixed(2)
                    }}
                </p>
            </div>
        </div>
        <div class="row mb-3" v-if="props.calculations.shipping !== 0">
            <div class="col">
                <p class="mb-0 h2 fw-semibold">Shipping</p>
            </div>
            <div class="col text-end">
                <p v-if="props.calculations.shipping != 0" class="price mb-0 fw-bold text-secondary h2">
                    ${{
                        props.calculations.shipping.toFixed(2) }}</p>
                <p v-else class="price mb-0 fw-bold text-secondary h2">Free</p>
            </div>
        </div>
        <div class="row mb-3" v-if="props.calculations.itemdiscount !== 0">
            <div class="col">
                <p class="mb-0 h2 fw-semibold">Item Discount</p>
            </div>
            <div class="col text-end">
                <p class="price mb-0 fw-bold text-secondary h2">${{
                    props.calculations.itemdiscount.toFixed(2)
                    }}</p>
            </div>
        </div>
        <div class="row mb-3" v-if="props.calculations.itemtotal !== 0">
            <div class="col">
                <p class="mb-0 h2 fw-semibold">Subtotal</p>
            </div>
            <div class="col text-end">
                <p class="price mb-0 fw-bold text-secondary h2">${{
                    props.calculations.subtotal.toFixed(2) }}
                </p>
            </div>
        </div>
        <div class="row mb-3" v-if="props.calculations.gst !== 0">
            <div class="col">
                <p class="mb-0 h2 fw-semibold">{{ props.calculations.gstlabel }} ({{
                    props.calculations.gstrate
                    }}%)</p>
            </div>
            <div class="col text-end">
                <p class="price mb-0 fw-bold text-secondary h2">${{ props.calculations.gst.toFixed(2) }}
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p class="mb-0 fw-bold display-6 h2">Total</p>
            </div>
            <div class="col text-end">
                <p class="mb-0 fw-bold text-secondary display-6 h2">${{
                    props.calculations.total.toFixed(2) }}
                </p>
            </div>
        </div>
        <p class="small mt-4 my-5 mb-0">{{ props.calculations.gstincluded == false ? 'Exclusive' :
            'Inclusive'
            }} {{
                props.calculations.gstlabel }} & our best price guarantee</p>
        <button :disabled="!step2Valid" type="submit"
            class="btn btn-secondary text-white w-100 mt-5 text-uppercase fw-bold h4">Place
            Order</button>
        <div class="payment_options d-flex justify-content-center mt-3">
            <img class="img-fluid" :src="visa" alt="Visa" width="50px">
            <img class="img-fluid" :src="master" alt="Master" width="50px">
            <img class="img-fluid" :src="PayPal" alt="PayPal" width="50px">
        </div>
    </div>

</template>

<style scoped lang="scss">
p.mb-0.h2.fw-semibold,
.price,
.h2 {
    font-family: 'Metropolis';
    font-size: 18px;
}

.payment_options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>