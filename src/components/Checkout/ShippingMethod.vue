<script setup lang="ts">
import { defineProps } from 'vue';
import { useCheckoutStore } from "@/stores/Checkout";

const checkoutStore = useCheckoutStore()

interface Preference {
    id: string;
    name: string;
    selected: boolean;
    details: string;
    title: string;
}
interface shippingMethod {
    billing_state: number | string,
    deliverymethod: number | undefined,
    billing_address: string,
    shipping_suburb: string | undefined,
    billing_suburb: string | undefined,
    billing_postcode: number | undefined,
    billing_mobile: string | number,
    billing_firstname: string,
    billing_middlename: string,
    billing_lastname: string,
    shipping_address: string,
    firstname: string,
lastname: string,
    shippingmethod: number | string,
    shipping_state: number | string,
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
    shippingMethod: shippingMethod;
    shippingMethods: Preference[];
}>();
if (props.shippingMethods.length == 1) {
    props.shippingMethod.shippingmethod = props.shippingMethods[0].id
    updateShippingMethod()
}
function updateShippingMethod() {
    // emit('getPreferences');
    checkoutStore.saveToCheckoutSession(props.shippingMethod)
}
</script>

<template>
    <div>
        <h2 class="fw-semibold mt-5 border-bottom border-primary border-3 pb-2">Shipping Type</h2>
        <div class="delivery_methods mt-5">
            <div class="form-check w-auto delivery_method" v-for="(item, index) in props.shippingMethods" :key="index">
                <input v-model="props.shippingMethod.shippingmethod" class="form-check-input" type="radio"
                    name="shipping" :id="`shiping_${item.id}`" :checked="item.selected" required autocomplete="off"
                    :value="item.id" @change="updateShippingMethod()">
                <label class="form-check-label" :for="`shiping_${item.id}`">
                    {{ item.title }}
                    <div>
                        <small>{{ item.details }}</small>
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.delivery_methods {
    display: flex;
    gap: 20px;

    .delivery_method {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 20px;
        position: relative;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #ccc;

        .form-check-input {
            margin-bottom: 10px;
            margin-left: 0;
        }

        label {
            width: 100%;
            height: 100%;
            // position: absolute;
            left: 0;
            font-weight: 500;
            top: 0;
            // padding-top: 25%;
            text-align: center;
        }
    }
}

@media screen and (max-width:768px) {
    .delivery_methods {
        display: flex;
        gap: 20px;
        flex-direction: column;

        .delivery_method {
            label {
                padding-top: 20%;
            }
        }

    }
}
</style>