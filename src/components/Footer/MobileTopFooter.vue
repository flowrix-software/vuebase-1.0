
<script setup lang="ts">
import { ref } from 'vue';
import { useSubscription } from '@/stores/Subscription';

const subscriptionStore = useSubscription();
const email = ref<string>('');
const successMessage = ref<string>('');
const errorMessage = ref<string>('');

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  try {
    const response = await subscriptionStore.subscribe(email.value);
    if (response.status === 'Success') {
        console.log(response.status ,'here')
      successMessage.value = 'Subscription successful!';
      email.value = ''; 
     
      setTimeout(() => {
        successMessage.value = '';
      }, 5000);
    } else if (response.status === 'Error') {
        console.log(response.message)
      const errorMessages = response.message?.email || ['Failed to subscribe. Please try again.'];
      errorMessage.value = errorMessages.join(', ');
      setTimeout(() => {
        errorMessage.value = '';
      }, 5000);
    }
  } catch (error) {
    errorMessage.value = 'Failed to subscribe. Please try again.';
    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
  }
};
</script>

<template>
    <footertop class="w-100 d-block d-xl-none bg-dark mobile">
      <div class="container px-5">
        <div class="row align-items-center">
          <div class="col-12 col-md-6">
            <div class="newsletter-contant">
              <h3 class="newletter-heading text-center">Seeking inspiration?</h3>
              <p class="m-0 newsletter-subheading text-center mb-5 mt-4">
                Sign up to our newsletter for all the latest
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <form class="form subscribe" novalidate @submit="handleSubmit">
              <div class="field newsletter">
                <div class="control">
                  <label for="newsletter">
                    <span class="label">Sign Up for Our Newsletter:</span>
                    <input
                      v-model="email"
                      name="email"
                      type="email"
                      id="newsletter"
                      placeholder="Email Address"
                      required
                    />
                  </label>
                   <!-- Display messages below the input field -->
                   <div v-if="successMessage" class=" py-2 text-center rounded text-success bg-white my-2">
                    {{ successMessage }}
                  </div>
                  <div v-if="errorMessage" class="mt-2 text-center rounded text-danger bg-white">
                    {{ errorMessage }}
                  </div>
                </div>
              </div>
              <div class="actions">
                <button
                  class="action subscribe primary px-4"
                  title="Join"
                  type="submit"
                  aria-label="Subscribe"
                >
                  <span>Join</span>
                  <span class="icon icon-arrow-right"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footertop>
  </template>
  