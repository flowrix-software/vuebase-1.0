<script lang="ts" src="@/template/Checkout/MainView" />

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
                                    v-if="inputData.paymentmethod === paymentMethod.key" :inputData="inputData"
                                    :paymentMethod="paymentMethod" />
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
