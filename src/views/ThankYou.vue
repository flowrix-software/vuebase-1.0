<script lang="ts" setup>
import { loadStripe } from '@stripe/stripe-js'
let stripe: any;

const checkStatus = async () => {
    stripe = await loadStripe('pk_test_pWcWnWU330fwiLAqbGqlmo3h00JT0DaWoC')
    const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
    )

    if (!clientSecret) {
        return
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
    switch (paymentIntent.status) {
        case 'succeeded':
            showMessage('Payment succeeded!')
            break
        case 'processing':
            showMessage('Your payment is processing.')
            break
        case 'requires_payment_method':
            showMessage('Your payment was not successful, please try again.')
            break
        default:
            showMessage('Something went wrong.')
            break
    }
}

function showMessage(messageText: string): void {
    const messageContainer = document.querySelector('#payment-message') as HTMLElement | null;

    if (messageContainer) {
        messageContainer.classList.remove('hidden');
        messageContainer.textContent = messageText;

        setTimeout(function () {
            messageContainer.classList.add('hidden');
            messageContainer.textContent = '';
        }, 4000);
    }
}

</script>
<template>
    <div>
        <div class="container my-5">
            <div class="row justify-content-center text-center">
                <div class="col-md-6">
                    <div id="payment-message" class="text-success"></div>
                    <h1 class="mb-3">Thank You! Your Order has been Placed Successfully</h1>
                    <p>Check Your Order Details in your Account</p>
                    <router-link class="btn btn-primary mt-4 py-2 px-5" :to="{ name: 'Dashboard' }">
                        My Account
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>