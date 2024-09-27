<script lang="ts" setup>
import { useCheckoutStore } from "@/stores/Checkout";

const checkoutStore = useCheckoutStore()

interface ShippingDetails {
    billing_state: number | undefined,
    deliverymethod: number | undefined,
    billing_address: string,
    billing_suburb: string | undefined,
    billing_postcode: number | undefined,
    billing_mobile: string | number,
    billing_firstname: string,
    billing_middlename: string,
    billing_lastname: string,
    shipping_address: string,
    shippingmethod: number | string,
    shipping_state: number | undefined,
    shipping_suburb: string | undefined,
    shipping_postcode: number | undefined,
    shipping_mobile: string | number,
    shipping_firstname: string,
    shipping_middlename: string,
    shipping_lastname: string,
    email: string,
    authoritytoleave:number|undefined,
    customernotes:string,
    eway_cardname: string,
    eway_cardnumber: string,
    eway_expirymonth: string,
    eway_expiryyear: string,
    eway_cvn: string,
    till_cardname: string,
    till_cardnumber: string,
    till_cvn: string,
    till_expirymonth: string,
    till_expiryyear: string,
    save_card_details: number
}

const props = defineProps<{
    shippingDetails: ShippingDetails;
    states: any
}>();

const emit = defineEmits<{
    (e: 'update:deliveryMethod', value: string): void;
    (e: 'getPreferences'): void;
}>();

function updateShippingMethod() {
    // emit('getPreferences');
    checkoutStore.saveToCheckoutSession(props.shippingDetails)
}
</script>

<template>
    <div>
        <h2 class="fw-semibold mt-5 border-bottom border-primary border-3 pb-2">
            Shipping Details</h2>
        <div class="row border-bottom mb-3 mt-4">
            <label for="firstName" class="fw-medium col-sm-2 col-form-label text-nowrap">First
                Name<span class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" v-model="props.shippingDetails.shipping_firstname" required
                    class="form-control border-0 shadow-none" id="firstName" @change="updateShippingMethod()" name="firstName">
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="lastName" class="fw-medium col-sm-2 col-form-label text-nowrap">Last
                Name<span class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" v-model="props.shippingDetails.shipping_lastname" required
                    class="form-control border-0 shadow-none" id="lastName" @change="updateShippingMethod()" name="lastName">
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="ShippingcontactNumber" class="fw-medium col-sm-2 col-form-label text-nowrap">Contact
                Number<span class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input required type="text" v-model="props.shippingDetails.shipping_mobile"
                    class="form-control border-0 shadow-none" id="ShippingcontactNumber" @change="updateShippingMethod()" name="ShippingcontactNumber">
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="delivery_address" class="fw-medium col-sm-2 col-form-label text-nowrap">Shipping
                Address<span class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" v-model="props.shippingDetails.shipping_address" required
                    class="form-control border-0 shadow-none" id="delivery_address" @change="updateShippingMethod()" name="delivery_address">
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="suburb" class="fw-medium col-sm-2 col-form-label text-nowrap">Suburb<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" required v-model="props.shippingDetails.shipping_suburb"
                    class="form-control border-0 shadow-none" id="suburb" @change="updateShippingMethod()" name="suburb">
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="state" class="fw-medium col-sm-2 col-form-label text-nowrap">State<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <select class="form-select border-0 shadow-none" name="state" required @change="updateShippingMethod()"
                    v-model="props.shippingDetails.shipping_state">
                    <option :value="selectedCountryState.id" v-for="selectedCountryState in states"
                        :key="selectedCountryState.id">
                        {{ selectedCountryState.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="post_code" class="fw-medium col-sm-2 col-form-label text-nowrap">Postcode<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" required v-model="props.shippingDetails.shipping_postcode"
                    class="form-control border-0 shadow-none" id="shipping_post_code" name="shipping_post_code">
            </div>
        </div>
    </div>
</template>