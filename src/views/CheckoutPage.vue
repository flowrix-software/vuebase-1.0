<script setup lang="ts">
interface fieldsData {
    fields: FieldData,
    publishableKey: SecretData,
    calculations: any
}

interface SecretData {
    key: string,
    clientsceret: string
}

interface FieldData {
    billing_state: number | string,
    deliverymethod: number | undefined,
    billing_address: string,
    billing_suburb: string | undefined,
    billing_postcode: number | undefined,
    billing_mobile: string | number,
    billing_firstname: string,
    firstname: string,
    billing_middlename: string,
    billing_lastname: string,
    lastname: string,
    shipping_address: string,
    shippingmethod: number | string,
    shipping_state: number | string,
    shipping_suburb: string | undefined,
    shipping_postcode: number | undefined,
    shipping_mobile: string | number,
    mobile: string | number,
    createacount: string | number,
    shipping_firstname: string,
    shipping_middlename: string,
    authoritytoleave: number | undefined,
    customernotes: string,
    shipping_lastname: string,
    email: string,
    customertoken: string,
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
    url_success: string,
    url_cancel: string
}

interface Stripe {
    elements: any
}

//Stores
import { useCartStore } from "@/stores/Cart";
import { useCheckoutStore } from "@/stores/Checkout";
import { useCountryStore } from "@/stores/Country";
import { useAuthStore } from "@/stores/AuthStore";

import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'

//Assets
import visa from '@/assets/images/visa-icon.svg'
import master from '@/assets/images/mastercard.png'

//Components
import BillingDetailsForm from '@/components/Checkout/BillingAddress.vue';
import DeliveryMethodForm from '@/components/Checkout/DeliveryMethod.vue';
import ShippingDetailsForm from '@/components/Checkout/ShippingAddress.vue';
import ShippingMethodForm from '@/components/Checkout/ShippingMethod.vue';
import Calculations from '@/components/Checkout/Calculations.vue';
import Order from '@/components/Checkout/Order.vue';
import AuthorityToLeave from '@/components/Checkout/AuthorityToLeave.vue';

//Payment Methods
import Stripe from '@/components/Checkout/PaymentMethods/Stripe.vue'
import Eway from '@/components/Checkout/PaymentMethods/Eway.vue'
import Till from '@/components/Checkout/PaymentMethods/Till.vue'

//Dynamic Component Import for Payment Options
function getPaymentComponent(methodKey: string) {
    switch (methodKey) {
        case 'web-eway':
            return Eway;
        case 'web-till-payment':
            return Till;
        case 'web-stripe':
            return Stripe;
        default:
            return null;
    }
}

let stripe: any;
let elements: any;
const loader = 'auto'
const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const CountryData = useCountryStore()
const AuthStore = useAuthStore()
const shippingFormEnabled = ref(true)
const countries = ref(CountryData.countries)
const cartData = computed(() => {
    const cartItems = checkoutStore.checkoutSession
    return cartItems
})
const abndToken = cartStore.cart.abndToken
const vouchercode = cartStore.cart.code
const sessiondata: fieldsData = checkoutStore.checkoutSession;
const inputData = ref({
    deliverymethod: sessiondata.fields ? sessiondata.fields.deliverymethod : undefined,
    billing_address: sessiondata.fields ? sessiondata.fields.billing_address : '',
    billing_country: 14,
    billing_state: sessiondata.fields ? sessiondata.fields.billing_state : undefined,
    billing_suburb: sessiondata.fields ? sessiondata.fields.billing_suburb : '',
    clientsceret: checkoutStore.publishableKey.clientsceret,
    billing_postcode: sessiondata.fields ? sessiondata.fields.billing_postcode : undefined,
    billing_mobile: sessiondata.fields ? sessiondata.fields.billing_mobile : '',
    billing_firstname: sessiondata.fields ? sessiondata.fields.billing_firstname : '',
    firstname: sessiondata.fields ? sessiondata.fields.firstname : '',
    billing_middlename: sessiondata.fields ? sessiondata.fields.billing_middlename : '',
    billing_lastname: sessiondata.fields ? sessiondata.fields.billing_lastname : '',
    lastname: sessiondata.fields ? sessiondata.fields.lastname : '',
    shipping_address: sessiondata.fields ? sessiondata.fields.shipping_address : '',
    shippingmethod: sessiondata.fields ? sessiondata.fields.shippingmethod : '',
    shipping_country: 14,
    shipping_state: sessiondata.fields ? sessiondata.fields.shipping_state : undefined,
    shipping_suburb: sessiondata.fields ? sessiondata.fields.shipping_suburb : '',
    shipping_postcode: sessiondata.fields ? sessiondata.fields.shipping_postcode : undefined,
    shipping_mobile: sessiondata.fields ? sessiondata.fields.shipping_mobile : '',
    shipping_firstname: sessiondata.fields ? sessiondata.fields.shipping_firstname : '',
    shipping_middlename: sessiondata.fields ? sessiondata.fields.shipping_middlename : '',
    shipping_lastname: sessiondata.fields ? sessiondata.fields.shipping_lastname : '',
    vouchercode,
    paymentmethod: '',
    cart: cartData.value.items,
    abndToken,
    customertoken: AuthStore.isAuthenticated?AuthStore.access_token: '',
    email: sessiondata.fields ? sessiondata.fields.email : '',
    mobile: sessiondata.fields ? sessiondata.fields.mobile : '',
    authoritytoleave: undefined,
    createacount: '',
    password: '',
    passwordconfirm: '',
    customernotes: '',
    ewayKey: '',
    eway_cardname: '',
    eway_cardnumber: '',
    eway_expirymonth: '',
    eway_expiryyear: '',
    eway_cvn: '',
    till_cardname: '',
    till_cardnumber: '',
    till_cvn: '',
    till_expirymonth: '',
    till_expiryyear: '',
    save_card_details: 0,
})
const beforeUnloadHandler = (event) => {
    cartStore.AbandonedCartComplete(abndToken)
};

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
});
onMounted(() => {
    const LoggedInUser = AuthStore.user
    if (Object.keys(LoggedInUser).length > 0) {
        inputData.value.billing_address = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].address : sessiondata.fields.billing_address
        // inputData.value.billing_country= LoggedInUser.addresses.length>0?LoggedInUser.addresses[0].length:sessiondata.fields.billing_address;
        inputData.value.billing_state = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].state_id : sessiondata.fields.billing_state;
        inputData.value.billing_suburb = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].suburb : sessiondata.fields.billing_suburb;
        inputData.value.billing_postcode = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].postcode : sessiondata.fields.billing_postcode;
        inputData.value.billing_mobile = LoggedInUser.data.mobile;
        inputData.value.billing_firstname = LoggedInUser.data ? LoggedInUser.data.firstname : sessiondata.fields.billing_firstname;
        // inputData.value.billing_middlename = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].suburb : sessiondata.fields.billing_suburb;
        inputData.value.billing_lastname = LoggedInUser.data ? LoggedInUser.data.lastname : sessiondata.fields.billing_lastname;
        inputData.value.shipping_address = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_address;
        // inputData.value.shipping_country=LoggedInUser.data.addresses.length>0?LoggedInUser.data.addresses[0].length:sessiondata.fields.shipping_country;
        inputData.value.shipping_state = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_state;
        inputData.value.shipping_suburb = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_suburb;
        inputData.value.shipping_postcode = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_postcode;
        inputData.value.shipping_mobile = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_mobile;
        inputData.value.shipping_firstname = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_firstname;
        inputData.value.shipping_middlename = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_middlename;
        inputData.value.shipping_lastname = LoggedInUser.data.addresses.length > 0 ? LoggedInUser.data.addresses[0].length : sessiondata.fields.shipping_lastname;
        inputData.value.email = LoggedInUser.data.email;
        inputData.value.customertoken=AuthStore.isAuthenticated?AuthStore.access_token:''
        // inputData.value.mobile= sessiondata.fields ? sessiondata.fields.mobile : '';
    }

    window.addEventListener('beforeunload', beforeUnloadHandler);
})

const totalPrice = computed(() => {
    return checkoutStore.checkoutSession ? checkoutStore.checkoutSession.calculations : checkoutStore.checkoutSession
})

const deliveryMethods = computed<any>(() => {
    return checkoutStore.checkoutSession?.preferences || [];
});

watch(inputData.value, async (newData, oldValue) => {
    // inputData
    inputData.value.mobile = newData.billing_mobile
    inputData.value.firstname = newData.billing_firstname
    inputData.value.lastname = newData.billing_lastname
    if (shippingFormEnabled.value) {
        inputData.value.shipping_firstname = newData.billing_firstname
        inputData.value.shipping_lastname = newData.billing_lastname
        inputData.value.shipping_address = newData.billing_address
        inputData.value.shipping_postcode = newData.billing_postcode
        inputData.value.shipping_state = newData.billing_state
        inputData.value.shipping_suburb = newData.billing_suburb
        inputData.value.shipping_mobile = newData.billing_mobile
    }
})

const getpaymentMethod = async (paymentMethod: string) => {
    try {
        inputData.value.paymentmethod = paymentMethod

        const newPrice = parseFloat(totalPrice.value.total)
        if (paymentMethod == 'web-stripe' && stripe !== null) {
            const appearance = {
                theme: 'stripe'
            }
            await checkoutStore.paymentMethods({
                clientsceret: checkoutStore.publishableKey.clientsceret,
                paymentmethod: paymentMethod,
                total: newPrice * 100
            })
            const clientSecret = checkoutStore.publishableKey.clientsceret
            stripe = await loadStripe(checkoutStore.publishableKey.key)
            elements = stripe.elements({ appearance, clientSecret, loader })
            // const linkAuthenticationElement = elements.create("linkAuthentication");

            const paymentElementOptions = {
                layout: {
                    type: 'tabs',
                }
            }
            // Mount the Elements to their corresponding DOM node
            const cardElement = elements.create('payment', paymentElementOptions)
            cardElement.mount('#card-element')
        }
        if (paymentMethod == 'web-zippay' || paymentMethod == 'web-direct-deposit' || paymentMethod == 'web-paypal' || paymentMethod == 'web-eway') {
            await checkoutStore.paymentMethods({
                paymentmethod: paymentMethod,
                total: newPrice
            })
            if (paymentMethod == 'web-eway') {
                inputData.value.ewayKey = checkoutStore.publishableKey.key
            }
        }

        if (paymentMethod == 'web-till-payment') {
            await checkoutStore.paymentMethods({
                paymentmethod: paymentMethod,
                total: newPrice
            })

            payment.init('TFtrYq0SAcyy5l2cxi3a', 'number_div', 'cvv_div', function (payment) {
                payment.setNumberStyle({
                    'width': '100%',
                    'height': '100%',
                    'border': 'none',
                    'input:focus-visible': {
                        'outline': '-webkit-focus-ring-color auto 0px'
                    }
                });
                payment.setCvvStyle({
                    'width': '100%',
                    'height': '100%',
                    'border': 'none'
                });
                payment.numberOn('input', function () {
                    console.log(inputData.value)
                    var data = {
                        card_holder: inputData.value.till_cardname,
                        month: inputData.value.till_expirymonth,
                        year: inputData.value.till_expiryyear,
                    };
                    payment.tokenize(data, //additional data, MUST include card_holder (or first_name & last_name), month and year
                        function (token: string) { //success callback function
                            inputData.value.clientsceret = token
                        },
                        function (errors) { //error callback function
                            console.log(errors)
                            //render error information here
                        }
                    )
                })
            });

        }
        checkoutStore.saveToCheckoutSession(inputData.value)
    } catch (error) {
        console.log('Error', error)
    }
}

const states = ref([])
const getStates = computed(() => {
    if (countries.value.length > 0) {
        const country = countries.value.find(country => country.id == '14');
        if (country) {
            states.value = country.states;
        }
    }
    return states.value;
});

const shippingMethods = computed(() => {
    // console.log(checkoutStore.preference.data.shippingmethods)
    if (checkoutStore.checkoutSession) {
        return checkoutStore.checkoutSession.shippingmethods.filter((method: { available: number }) => method.available == 1)
    }
})

const step_2 = ref(false)
const proceedtoNext = () => {

    step_2.value = true

}

const step1Valid = computed(() => inputData.value.billing_firstname !== '' && inputData.value.billing_lastname !== '' && inputData.value.email !== '' && inputData.value.billing_mobile !== '' && inputData.value.billing_address !== '' && inputData.value.billing_suburb !== '' && inputData.value.billing_postcode !== undefined);
const step2Valid = computed(() => step1Valid.value && inputData.value.paymentmethod !== '');
const proceedtoPrev = () => {
    step_2.value = false
}

function showMessage(messageText: string): void {
    const messageContainer = document.querySelector<HTMLElement>('#payment-message');
    if (messageContainer) {
        const errorbody = messageContainer.querySelector<HTMLElement>('.alert-body');
        if (errorbody) {
            messageContainer.classList.remove('d-none');
            errorbody.textContent = messageText;

            setTimeout(() => {
                messageContainer.classList.add('d-none');
                messageContainer.textContent = '';
            }, 14000);
        }
    }
}

const addLoading = () => {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';

    const spanElement = document.createElement('span');
    loadingDiv.appendChild(spanElement);

    // Get the body element and add the loadingDiv as its first child
    const bodyElement = document.body;
    bodyElement.insertBefore(loadingDiv, bodyElement.firstChild);
}

const removeLoading = (): void => {
    if (document.querySelector('.loading')) {
        document.querySelector('.loading').remove()
    }
}

const resetpaymentoptions = (async () => {
    var paymentMethodElement = document.querySelector('#card-element div')

    if (paymentMethodElement) {
        paymentMethodElement.remove()
        inputData.value.paymentmethod = ''
    }

})

const handleSubmit = async () => {
    try {
        const resolved = router.resolve({
            name: 'ThankYou'
        })
        addLoading();
        if (inputData.value.paymentmethod == 'web-stripe') {
            inputData.value.clientsceret = checkoutStore.publishableKey.clientsceret
        }


        sessiondata.fields.url_success = `${window.location.origin}/checkout/onepage/success`
        sessiondata.fields.url_cancel = `${window.location.origin}/onestepcheckout`

        // }
        if (inputData.value.paymentmethod == 'web-eway') {
            const cardnumber = eCrypt.encryptValue(sessiondata.fields.eway_cardnumber, inputData.value.ewayKey);
            const eway_cvn = eCrypt.encryptValue(sessiondata.fields.eway_cvn, inputData.value.ewayKey);
            sessiondata.fields.eway_cardnumber = cardnumber
            sessiondata.fields.eway_cvn = eway_cvn
            // inputData.value.ewayKey=''
        }
        // sessiondata.publishableKey.clientsceret = inputData.value.clientsceret
        await checkoutStore.submitCheckout()
        console.log(checkoutStore.errorResponseData)
        if (checkoutStore.errorResponseData.status !== 'Error') {
            if (inputData.value.paymentmethod == 'web-stripe') {
                if (sessiondata.calculations.total > 0) {
                    const { error } = await stripe.confirmPayment({
                        elements,
                        confirmParams: {
                            // Make sure to change this to your payment completion page
                            return_url: window.location.origin + resolved.href,
                            receipt_email: inputData.value.email
                        }
                    })
                    if (error.type === 'card_error' || error.type === 'validation_error') {

                        showMessage(error.message)
                    } else {
                        // router.push({ name: 'ThankYou' })
                    }
                } else {
                    showMessage(error.message)
                }
            } else if (checkoutStore.responseData.data.url) {
                var url = checkoutStore.responseData.data.url
                window.location.href = url
            }
            router.push({ name: 'ThankYou' })
            removeLoading()
        } else if (checkoutStore.errorResponseData.status == 'Error') {
            removeLoading()
        }
    } catch (error) {
        removeLoading()
        console.log('Error', error)
    } finally {
        // router.push({ name: 'ThankYou' })
        removeLoading()

    }
}
</script>

<template>

    <!--
        - PLEASE Do not Touch this Section
    -->
    <div class="container my-5 gx-5 gx-md-3">
        <form class="row g-5" @submit.prevent="handleSubmit">
            <div class="col-md-8">
                <h1 class="mb-0">Checkout Securely</h1>
                <p v-if="!step_2" class="fw-medium small">Have an account? </p>
                <Transition name="fade" v-if="!step_2">
                    <div class="step_1">
                        <DeliveryMethodForm :deliveryMethod="inputData" :preferences="deliveryMethods" />

                        <BillingDetailsForm :billingDetails="inputData" :states="getStates"
                            :LoggedInUser="AuthStore.user" />
                        <div class="form-check" v-show="inputData.deliverymethod == 1">
                            <input class="form-check-input" type="checkbox" value="" id="shippingFormEnabled"
                                v-model="shippingFormEnabled">
                            <label class="form-check-label" for="shippingFormEnabled">
                                Use the same for Shipping
                            </label>
                        </div>

                        <div v-show="inputData.deliverymethod == 1" v-if="!shippingFormEnabled">
                            <ShippingDetailsForm :shippingDetails.sync="inputData" :states="getStates" />
                        </div>
                        <AuthorityToLeave :inputData.sync="inputData" v-show="inputData.deliverymethod == 1" />
                        <div class="alert alert-danger mt-4 athomeerror" role="alert"
                            v-if="inputData.deliverymethod == 1 && (shippingMethods && shippingMethods.length == 0)">
                            <h4 class="alert-heading">Need valid Address</h4>
                            <div class="alert-body">
                                Shipping is not available on your selected <b>Address</b>. Please select/or add another
                                address.
                            </div>
                        </div>
                        <ShippingMethodForm v-show="shippingMethods && shippingMethods.length > 1"
                            :shippingMethod.sync="inputData" :shippingMethods="shippingMethods" />
                        <div class="row mt-5">
                            <div class="col">
                                <button @click="proceedtoNext" :disabled="!step1Valid" type="button"
                                    class="btn btn-secondary text-white w-100">Next<i
                                        class="bi ms-2 bi-chevron-double-right"></i></button>
                            </div>
                        </div>
                    </div>
                </Transition>
                <Transition>
                    <div class="step_2" v-show="step_2">
                        <h2 class="fw-semibold mt-5 border-bottom border-primary border-3 pb-2">Payment Methods</h2>
                        <div v-for="(paymentMethod, index) in cartData.paymentmethods" :key="index">
                            <label class="form-check-label mt-5 w-100 mb-3 p-3 rounded border"
                                :for="`paymentmethod_${paymentMethod.key}`">
                                <div class=" d-flex align-items-center justify-content-between gap-2 ">
                                    <div class="d-flex align-items-center gap-3">
                                        <input @change="getpaymentMethod(paymentMethod.key)"
                                            class="form-check-input m-0" type="radio" v-model="inputData.paymentmethod"
                                            :value="paymentMethod.key" name="flexRadioDefault1"
                                            :id="`paymentmethod_${paymentMethod.key}`">
                                        <div>
                                            {{ paymentMethod.title }}
                                            <p class="small text-muted m-0" v-html="paymentMethod.description"></p>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="payment_options">
                                            <span class="d-flex gap-2" v-if="paymentMethod.id == 2">
                                                <img :src="visa" alt="Visa" width="50px">
                                                <img :src="master" alt="Master" width="50px">
                                            </span>

                                            <img :src="paymentMethod.image" v-if="paymentMethod.id !== 2"
                                                :alt="paymentMethod.title" height="50px">
                                        </div>
                                    </div>
                                </div>
                                <div class="ms-5 border-top pt-3 mt-3"
                                    v-if="inputData.paymentmethod == paymentMethod.key && paymentMethod.description"
                                    v-html="paymentMethod.description"></div>

                                <!-- Dynamic component based on the selected payment method -->
                                <component :is="getPaymentComponent(paymentMethod.key)"
                                    v-if="inputData.paymentmethod === paymentMethod.key" :inputData="inputData" :paymentMethod="paymentMethod" />
                            </label>

                        </div>
                        <div class="row mt-5 ">
                            <div class="col">
                                <div class="btn btn-outline-secondary w-md-25" @click="proceedtoPrev">
                                    <i class="bi me-2 bi-chevron-double-left"></i>Previous
                                </div>
                            </div>
                        </div>

                        <div v-if="checkoutStore.errorResponseData.message" class="mt-5 alert alert-danger"
                            role="alert">

                            <p v-for="error in checkoutStore.errorResponseData.message"><small
                                    class="fas fa-exclamation-circle"></small>
                                {{ error }}</p>
                        </div>
                        <div id="payment-message" class="alert alert-danger athomeerror d-none mt-4" role="alert">
                            <h4 class="alert-heading">Payment method error</h4>
                            <div class="alert-body">
                                Shipping is not available on your selected <b>Address</b>. Please select/or add another
                                address.
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="col-md-4">
                <Order :items="cartData.cart" />
                <div class="cart_totals border w-100 p-4 shadow rounded-2 sticky-top" v-if="cartData.calculations">
                    <Calculations :calculations="cartData.calculations" :step2Valid="step2Valid" />

                </div>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
/**
Replace this section with relevant customer theme.
*/


/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.nav-tabs {
    border-bottom: 3px solid var(--iseek-secondary);
    gap: 10px;
    flex-wrap: nowrap;

    .nav-link {
        border: 1px solid #aaa;
        width: 100%;
        color: #aaa;

        &.active {
            border: 1px solid var(--iseek-secondary);
            color: #fff;
            background-color: var(--iseek-secondary);
        }

        &.actived {
            border: 1px solid var(--iseek-primary);
            color: #fff;
            background-color: var(--iseek-primary);

        }
    }
}





.payment-loading {
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
}

p.mb-0.h2.fw-semibold,
.price,
h2 {
    font-size: 18px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
