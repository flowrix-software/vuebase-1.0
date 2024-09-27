<script setup lang="ts">
import { defineProps } from 'vue';
import { useCheckoutStore } from "@/stores/Checkout";

const checkoutStore = useCheckoutStore()
interface InputDatas {
    billing_state: number | undefined,
    deliverymethod: number | string,
    billing_address: string,
    billing_suburb: string | undefined,
    billing_postcode: number | undefined,
    billing_mobile: string | number,
    billing_firstname: string,
    firstname: string,
    customertoken: string,
    billing_middlename: string,
    billing_lastname: string,
    lastname: string,
    shipping_address: string,
    shippingmethod: number | string,
    shipping_state: number | undefined,
    shipping_suburb: string | undefined,
    shipping_postcode: number | undefined,
    shipping_mobile: string | number,
    authoritytoleave: number | undefined,
    customernotes: string,
    shipping_firstname: string,
    shipping_middlename: string,
    shipping_lastname: string,
    email: string,
    createacount: string | number,
    till_cardname: string,
    till_cardnumber: string,
    till_cvn: string,
    till_expirymonth: string,
    till_expiryyear: string,
    save_card_details: number
    eway_cardname: string;
    eway_cardnumber: string;
    eway_expirymonth: string;
    eway_expiryyear: string;
    eway_cvn: string;
}

const props = defineProps<{ inputData: InputDatas, paymentMethod: any }>();

function saveToCheckoutSession() {
    // Implement your save logic
    checkoutStore.saveToCheckoutSession(props.inputData)
}

function eWayCardValidations() {
    const e = document.getElementById('EWAY_CARDNUMBER') as HTMLInputElement | null;
    if (!e) return; // Ensure the element exists

    const value = e.value.replace(/\s+/g, '');
    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();

    // Set the max length based on the card type
    if (value.startsWith('5')) {
        // MasterCard (starts with 5) typically has 16 digits
        e.maxLength = 18; // 16 digits + 3 spaces
    } else if (value.startsWith('4')) {
        // Visa (starts with 4) typically has 16 digits
        e.maxLength = 19; // 16 digits + 3 spaces
    } else {
        // For other card types or when the card type is not yet determined
        e.maxLength = 18; // Default to 19 to allow flexibility
    }

    // Update the input value with the formatted value
    e.value = formattedValue;
}

const eWayMonthValidations = (() => {
    const e = document.getElementById('eway_expirymonth') as HTMLInputElement | null;
    if (!e) return; // Ensure the element exists

    const value = e.value.replace(/\s+/g, '');
    const numericValue = value.replace(/[^\d]/g, '');
    // Enforce max length of 2
    const limitedValue = numericValue.slice(0, 2);

    // Validate the value to be between 01 and 12
    let finalValue = limitedValue;
    const month = parseInt(limitedValue, 10);
    if (limitedValue.length === 2) {
        if (month < 1) {
            finalValue = '01';
        } else if (month > 12) {
            finalValue = '12';
        }
    }
    if (month > 0 && month < 10 && limitedValue.length === 1) {
        finalValue = '0' + limitedValue;
    }

    e.value = finalValue;
});

const eWayYearValidations = (() => {
    const e = document.getElementById('eway_expiryyear') as HTMLInputElement | null;
    if (!e) return; // Ensure the element exists

    const value = e.value;

    // Remove non-numeric characters
    const numericValue = value.replace(/[^\d]/g, '');

    // Enforce max length of 2
    const limitedValue = numericValue.slice(0, 2);

    // Validate the value to be a valid future year
    let finalValue = limitedValue;
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    if (limitedValue.length === 2) {
        const year = parseInt(limitedValue, 10);
        if (year < currentYear) {
            finalValue = String(currentYear).padStart(2, '0');
        }
    }

    e.value = finalValue;
});

</script>
<template>
    <div class="saved_cards my-3" v-if="paymentMethod.cards && paymentMethod.cards.length > 0">
        <label id="cardone"
            class="gap-4 single-card py-3 my-3 px-4 border d-flex justify-content-between align-items-center"
            v-for="card in paymentMethod.cards">

            <h4 class="m-0"><input id="cardone" type="radio" class="form-check-input m-0"
                    @change="saveToCheckoutSession, props.inputData.eway_cvn = ''"
                    v-model="props.inputData.customertoken" name="customertoken" :value="card.id" /> {{ card.holder_name
                }}</h4>
            <h4 class="m-0">{{ card.first_six_digits }} - - - - - - {{ card.last_four_digits }}</h4>
            <h4 class="m-0">{{ card.card }}</h4>
            <label for="eway_cvn" v-if="props.inputData.customertoken == card.id"
                class="py-0 fw-medium col-form-label text-nowrap d-flex gap-3 align-items-center">
                <span>CVV<span class="text-danger">*</span></span>
                <input style="width:100px;height:30px;" type="text" required
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="3" id="eway_cvn"
                    placeholder="123" class="form-control border shadow-none" @change="saveToCheckoutSession"
                    v-model="props.inputData.eway_cvn" name="eway_cvn" />
            </label>
        </label>
        <label id="cardnew"
            class="gap-4 single-card py-3 my-3 px-4 border d-flex justify-content-start align-items-center">
            <input id="cardnew" type="radio" class="form-check-input m-0"
                @change="saveToCheckoutSession, inputData.eway_cvn = ''" v-model="inputData.customertoken"
                name="customertoken" value="" />
            <h4 class="m-0 lh-1">New Card</h4>
        </label>
    </div>

    <div class="row gap-5 px-3 mt-3 pt-0 border-top" v-if="props.inputData.customertoken == ''">
        <div class="col-md d-flex border-bottom mb-3 mt-4">
            <label for="EWAY_CARDNAME" class="fw-medium col-form-label text-nowrap">Card Name<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" required class="form-control border-0 shadow-none" @change="saveToCheckoutSession"
                    @input="eWayCardValidations()" v-model="props.inputData.eway_cardname" id="EWAY_CARDNAME"
                    name="EWAY_CARDNAME" />
            </div>
        </div>
        <div class="col-md d-flex border-bottom mb-3 mt-4">
            <label for="EWAY_CARDNUMBER" class="fw-medium col-form-label text-nowrap">Card Number<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <input type="text" id="EWAY_CARDNUMBER" @input="eWayCardValidations()"
                    class="form-control border-0 shadow-none" @change="saveToCheckoutSession"
                    v-model="props.inputData.eway_cardnumber" name="EWAY_CARDNUMBER" />
            </div>
        </div>
        <!-- Add other fields similarly -->
        <div class="row gap-5 px-3">
            <div class="col-md d-flex border-bottom mb-3 mt-4">
                <label for="eway_expirymonth" class="fw-medium col-form-label text-nowrap">Expiry Month<span
                        class="text-danger">*</span></label>
                <div class="col-sm-10">
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="2"
                        placeholder="MM" required class="form-control border-0 shadow-none"
                        @change="saveToCheckoutSession" @focusout="eWayMonthValidations()"
                        v-model="props.inputData.eway_expirymonth" id="eway_expirymonth" name="eway_expirymonth" />
                </div>
            </div>
            <div class="col-md d-flex border-bottom mb-3 mt-4">
                <label for="eway_expiryyear" class="fw-medium col-form-label text-nowrap">Expiry Year<span
                        class="text-danger">*</span></label>
                <div class="col-sm-10">
                    <input type="text" required oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="2"
                        @focusout="eWayYearValidations()" placeholder="YY" id="eway_expiryyear"
                        class="form-control border-0 shadow-none" @change="saveToCheckoutSession"
                        v-model="props.inputData.eway_expiryyear" name="EWAY_CARDNUMBER" />
                </div>
            </div>
            <div class="col-md d-flex border-bottom mb-3 mt-4">
                <label for="eway_cvn" class="fw-medium col-form-label text-nowrap">CVV<span
                        class="text-danger">*</span></label>
                <div class="col-sm-10">
                    <input type="text" required oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="3"
                        id="eway_cvn" placeholder="123" class="form-control border-0 shadow-none"
                        @change="saveToCheckoutSession" v-model="props.inputData.eway_cvn" name="eway_cvn" />
                </div>
            </div>
        </div>
        <div class="row" v-if="props.inputData.createacount">
            <div class="col">
                <div class="saveCard">
                    <label for="savecard">
                        <input type="checkbox" @change="saveToCheckoutSession" value="1" name="save_card_details"
                            v-model="props.inputData.save_card_details" id="savecard" class="form-check-input me-2">
                        Save Card
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>