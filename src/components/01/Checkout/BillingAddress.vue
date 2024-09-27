<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { useCheckoutStore } from "@/stores/Checkout";
import { usePasswordFormat } from "@/composables/usePasswordFormatter";

const checkoutStore = useCheckoutStore()
const passwordShow = ref('password')
const password = ref('')
const passwordconfirmShow = ref('password')
interface BillingDetail {
    billing_state: number | undefined,
    deliverymethod: number | string,
    billing_address: string,
    firstname: string,
    lastname: string,
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
    billing_mobile: string | number,
    createacount: string | number,
    customertoken: string,
    shipping_firstname: string,
    shipping_middlename: string,
    authoritytoleave: number | undefined,
    customernotes: string,
    shipping_lastname: string,
    email: string,
    password: string,
    passwordconfirm: string,
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
    billingDetails: BillingDetail;
    states: any;
    LoggedInUser: any
}>();

function updateDeliveryMethod() {
    // emit('getPreferences');
    checkoutStore.saveToCheckoutSession(props.billingDetails)
}
watch(() => props.billingDetails.password, (newPassword) => {
    password.value = newPassword;
});
// Use the composable, passing the password ref
const {
    passwordStrength,
    passwordStrengthClass,
    passwordStrengthValue,
    passwordStrengthWidth,
    passwordStrengthTextColor
} = usePasswordFormat(password);
</script>

<template>
    <div>
        <h2 class="fw-semibold mt-5 border-bottom border-primary border-3 pb-2">Billing Details</h2>
        <div class="row border-bottom mb-3 mt-4">
            <label for="firstName" class="fw-medium col-sm-2 col-form-label text-nowrap">
                First Name<span class="text-danger">*</span>
            </label>
            <div class="col-sm-10">
                <input type="text" @change="updateDeliveryMethod()" v-model="props.billingDetails.billing_firstname"
                    class="form-control border-0 shadow-none" id="firstName" name="firstName" required />
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="lastName" class="fw-medium col-sm-2 col-form-label text-nowrap">
                Last Name<span class="text-danger">*</span>
            </label>
            <div class="col-sm-10">
                <input type="text" @change="updateDeliveryMethod()" v-model="props.billingDetails.billing_lastname"
                    class="form-control border-0 shadow-none" id="lastName" name="lastName" required />
            </div>
        </div>
        <div class="row border-bottom align-items-center mb-3 mt-4">
            <label for="Email" class="fw-medium col-sm-2 col-form-label text-nowrap">
                Email<span class="text-danger">*</span>
            </label>
            <div class="col-sm-7">
                <input type="email" @change="updateDeliveryMethod()" v-model="props.billingDetails.email"
                    class="form-control border-0 shadow-none" id="Email" name="Email" required />
            </div>
            <div class="col-sm-3 d-flex justify-content-end" v-if="!LoggedInUser">
                <div class="form-check">
                    <input class="form-check-input" @change="updateDeliveryMethod()" type="checkbox"
                        v-model="props.billingDetails.createacount" value="1" id="createAccount" />
                    <label class="form-check-label" for="createAccount">Create Account</label>
                </div>
            </div>
        </div>
        <div v-if="props.billingDetails.createacount"
            class="row border-bottom mb-0 mt-4 justify-content-between align-items-center">
            <div class="col-sm row align-items-center">
                <label for="Email" class="fw-medium col-auto col-form-label text-nowrap">Password
                    <span class="text-danger">*</span>
                </label>
                <div class="col-sm">
                    <input v-model="props.billingDetails.password" @change="updateDeliveryMethod()" :type="passwordShow"
                        required class="form-control border-0 shadow-none" id="password" name="password">
                </div>
                <div class="col-sm-auto">
                    <i v-if="passwordShow == 'password'" @click="passwordShow = 'text'" class="fal fa-eye"></i>
                    <i v-else @click="passwordShow = 'password'" class="fal fa-eye-slash"></i>
                </div>
            </div>
            <div class="col-sm row align-items-center">
                <label for="Email" class="fw-medium col-auto col-form-label text-nowrap">Confirm Password
                    <span class="text-danger">*</span>
                    <span style="line-height:0; transform: translateY(0px);"
                        v-if="props.billingDetails.passwordconfirm != '' && props.billingDetails.passwordconfirm !== props.billingDetails.password"
                        class="small text-danger text-start m-0 d-block"><small>password is not matched</small></span>
                </label>

                <div class="col-sm">
                    <input v-model="props.billingDetails.passwordconfirm" @change="updateDeliveryMethod()"
                        :type="passwordconfirmShow" required class="form-control border-0 shadow-none" id="password"
                        name="password">
                </div>
                <div class="col-sm-auto">
                    <i v-if="passwordconfirmShow == 'password'" @click="passwordconfirmShow = 'text'"
                        class="fal fa-eye"></i>
                    <i v-else @click="passwordconfirmShow = 'password'" class="fal fa-eye-slash"></i>
                </div>
            </div>
        </div>
        <div class="row" v-if="props.billingDetails.createacount">
            <p class="small mt-3"><span class="small">The Password must contain at least one uppercase and one lowercase
                    letter.</span></p>
            <div class="progress px-0" role="progressbar" aria-label="Basic example"
                aria-valuenow="passwordStrengthValue" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" :class="passwordStrengthClass" :style="{ width: passwordStrengthWidth }">
                </div>
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="contactNumber" class="fw-medium col-sm-2 col-form-label text-nowrap">
                Contact Number<span class="text-danger">*</span>
            </label>
            <div class="col-sm-10">
                <input type="text" @change="updateDeliveryMethod()" v-model="props.billingDetails.billing_mobile"
                    class="form-control border-0 shadow-none" id="contactNumber" name="contactNumber" required />
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="delivery_address" class="fw-medium col-sm-2 col-form-label text-nowrap">
                Billing Address<span class="text-danger">*</span>
            </label>
            <div class="col-sm-10">
                <input type="text" @change="updateDeliveryMethod()" v-model="props.billingDetails.billing_address"
                    class="form-control border-0 shadow-none" id="delivery_address" name="delivery_address" required />
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="suburb" class="fw-medium col-sm-2 col-form-label text-nowrap">
                Suburb<span class="text-danger">*</span>
            </label>
            <div class="col-sm-10">
                <input type="text" @change="updateDeliveryMethod()" v-model="props.billingDetails.billing_suburb"
                    class="form-control border-0 shadow-none" id="suburb" name="suburb" required />
            </div>
        </div>
        <div class="row border-bottom mb-3 mt-4">
            <label for="state" class="fw-medium col-sm-2 col-form-label text-nowrap">State<span
                    class="text-danger">*</span></label>
            <div class="col-sm-10">
                <select class="form-select border-0 shadow-none" name="state" required @change="updateDeliveryMethod()"
                    v-model="props.billingDetails.billing_state">
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
                <input type="number" required @change="updateDeliveryMethod()"
                    v-model="props.billingDetails.billing_postcode" class="form-control border-0 shadow-none"
                    id="post_code" name="post_code">
            </div>
        </div>
    </div>
</template>
