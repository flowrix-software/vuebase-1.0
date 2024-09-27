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
import BillingDetailsForm from '@/components/01/Checkout/BillingAddress.vue';
import DeliveryMethodForm from '@/components/01/Checkout/DeliveryMethod.vue';
import ShippingDetailsForm from '@/components/01/Checkout/ShippingAddress.vue';
import ShippingMethodForm from '@/components/01/Checkout/ShippingMethod.vue';
import Calculations from '@/components/01/Checkout/Calculations.vue';
import Order from '@/components/01/Checkout/Order.vue';
import AuthorityToLeave from '@/components/01/Checkout/AuthorityToLeave.vue';

//Payment Methods
import Stripe from '@/components/01/Checkout/PaymentMethods/Stripe.vue'
import Eway from '@/components/01/Checkout/PaymentMethods/Eway.vue'
import Till from '@/components/01/Checkout/PaymentMethods/Till.vue'
export default {
    name: 'CheckoutMainView',
    setup() {
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
            customertoken: AuthStore.isAuthenticated ? AuthStore.access_token : '',
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
        const beforeUnloadHandler = () => {
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
                inputData.value.customertoken = AuthStore.isAuthenticated ? AuthStore.access_token : ''
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

        return {
            cartData,
            AuthStore,
            inputData,
            // checkoutStore,
            // DeliveryMethodForm,
            handleSubmit,
            proceedtoPrev,
            proceedtoNext
        };
    },
};