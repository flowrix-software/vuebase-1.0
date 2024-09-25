<script setup lang="ts">
import { defineProps } from 'vue';
import { useCheckoutStore } from "@/stores/Checkout";

const checkoutStore = useCheckoutStore()

interface Preference {
    id: string;
    name: string;
    selected: boolean;
}
interface deliveryMethods {
    billing_state: number | string,
    deliverymethod: number | string,
    billing_address: string,
    billing_suburb: string | undefined,
    billing_postcode: number | undefined,
    billing_mobile: string | number,
    billing_firstname: string,
    billing_middlename: string,
    billing_lastname: string,
    shipping_address: string,
    shippingmethod: number | string,
    shipping_state: number | string,
    firstname: string,
    lastname: string,
    customertoken: string,
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
    deliveryMethod: deliveryMethods;
    preferences: Preference[];
}>();
if (props.preferences.length > 1) {
    props.deliveryMethod.deliverymethod = props.preferences[0].id
    updateDeliveryMethod()
}
function updateDeliveryMethod() {
    // emit('getPreferences');
    checkoutStore.saveToCheckoutSession(props.deliveryMethod)
}
</script>
<template>
    <div>
        <h2 class="fw-semibold mt-5 border-bottom border-primary border-3 pb-2">Delivery Method</h2>
        <div class="delivery_methods mt-5" v-if="props.preferences && props.preferences.length">
            <div class="form-check delivery_method" v-for="(item, index) in props.preferences" :key="index">
                <input class="form-check-input" type="radio" :value="item.id" :id="item.id" :checked="item.selected"
                    name="exampleRadios" v-model="props.deliveryMethod.deliverymethod" @change="updateDeliveryMethod()"
                    required autocomplete="off" />
                <label class="form-check-label" :for="item.id">
                    {{ item.name }}
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