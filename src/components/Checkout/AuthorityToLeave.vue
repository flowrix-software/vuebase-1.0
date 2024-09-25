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
    authoritytoleave: number | undefined,
    customernotes: string,
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
    inputData: ShippingDetails;
}>();

function updateInputData() {
    // emit('getPreferences');
    checkoutStore.saveToCheckoutSession(props.inputData)
}
</script>

<template>
    <div>
        <div class="form-check form-switch mt-4">
            <input class="form-check-input" type="checkbox" role="switch" id="authorityToLeave" value="1" v-model="props.inputData.authoritytoleave" @change="updateInputData()">
            <label class="form-check-label" for="authorityToLeave">Authority to Leave Parcel at Door step</label>
        </div>
        <div class="mb-3">
            <label for="customerNotes" class="form-label fw-medium col-form-label text-nowrap">Delivery Instructons</label>
            <textarea class="form-control" name="customerNotes" v-model="props.inputData.customernotes" id="customerNotes" rows="3" @change="updateInputData()"></textarea>
        </div>
        
    </div>
</template>