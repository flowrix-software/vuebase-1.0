<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useRoute, useRouter } from 'vue-router'
import { useTogglePassword } from '@/composables/useTooglePassword'
import { usePasswordFormat } from '@/composables/usePasswordFormatter'
import { useNumberInput } from '@/composables/useNumberOnly';

// Initialize Vue Router and Store
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Use composables
const { showPassword, togglePassword } = useTogglePassword()
const password = ref<string | null>(null)
const confirmPassword = ref<string | null>(null)

// Password format composable
const {
    passwordStrength,
    passwordStrengthClass,
    passwordStrengthTextColor,
    passwordStrengthWidth
} = usePasswordFormat(password)

// Form fields
const firstName = ref<string | null>(null)
const lastName = ref<string | null>(null)
const email = ref<string | null>(null)
const { inputValue: mobile, errorMessage, handleInput } = useNumberInput();

// Signup function
const signupFunction = async () => {
    if (!firstName.value || !lastName.value || !email.value || !mobile.value || !password.value || !confirmPassword.value) {
        console.error('All fields are required')
        return
    }

    try {
        await authStore.addCustomer({
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            mobile: mobile.value,
            password: password.value,
            email_confirmation: email.value,
            password_confirmation: confirmPassword.value
        })

        if (authStore.responseData.status === 'Success') {
            setTimeout(() => {
                if (route.path.includes('cart')) {
                    router.push({ name: 'Checkout' })
                } else if (localStorage.getItem('user')) {
                    router.push({ name: 'Dashboard', params: { tab: 'account' } });
                }
            }, 1000)
        }
    } catch (error) {
        console.error('Signup failed', error)
    }
}
</script>


<template>
    <div>
        <section>
            <div class="container my-5">
                <div class="row g-5">
                    <div class="col-md-6">
                        <h1 class="fw-semibold">New Customer Account</h1>
                        <h2 class="border-bottom pb-3 mb-4">Personal Information</h2>
                        <form class="loginForm" @submit.prevent="signupFunction">
                            <!-- Personal Information Fields -->
                            <div class="mb-4">
                                <label for="First_Name" class="form-label fw-medium">First Name <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span></label>
                                <input type="text" v-model="firstName" required class="form-control" id="First_Name">
                            </div>
                            <div class="mb-4">
                                <label for="Last_Name" class="form-label fw-medium">Last Name <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span></label>
                                <input type="text" v-model="lastName" required class="form-control" id="Last_Name">
                            </div>
                            <div class="mb-4">
                                <label for="Phone" class="form-label fw-medium">Mobile <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span></label>
                                <input
                                    type="text"
                                    v-model="mobile"
                                    @input="handleInput"
                                    required
                                    class="form-control"
                                    id="Phone"
                                />
                                <small v-if="errorMessage" class="form-text text-danger">{{ errorMessage }}</small>
                            </div>
                            <div class="mb-3">
                                <input type="checkbox" name="newsletter-signup" id="newsletter-signup" class="checkbox"
                                    title="Show Password">
                                <label for="newsletter-signup" class="label"><span>Sign Up for Newsletter</span></label>
                            </div>
                            <div class="mb-5">
                                <input type="checkbox" name="remote-assistance" id="remote-assistance" class="checkbox"
                                    title="Allow remote shopping assistance">
                                <label for="remote-assistance" class="label"><span>Allow remote shopping
                                        assistance</span></label>
                                <i class="bi bi-question-circle ms-3"></i>
                            </div>

                            <h2 class="border-bottom pb-3 mb-4 mt-5">Sign-in Information</h2>
                            <div class="mb-4">
                                <label for="exampleInputEmail1" class="form-label fw-medium">Email <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span></label>
                                <input type="email" v-model="email" required class="form-control"
                                    id="exampleInputEmail1">
                            </div>
                            <div class="mb-4">
                                <label for="exampleInputPassword1" class="form-label fw-medium">Password <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span></label>
                                <input :type="showPassword ? 'text' : 'password'" v-model="password" required
                                    class="form-control" id="exampleInputPassword1">
                                <div class=""v-if="password">
                                    <div class="mt-2" :class="passwordStrengthTextColor">{{ passwordStrength }}</div>
                                    <!-- Progress Bar -->
                                    <div class="progress mt-2" role="progressbar" aria-label="Password Strength"
                                        aria-valuenow="passwordStrengthValue" aria-valuemin="0" aria-valuemax="100">
                                        <div :class="passwordStrengthClass"
                                            :style="{ width: passwordStrengthWidth }"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label for="exampleInputPassword2" class="form-label fw-medium">Confirm Password <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span></label>
                                <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" required
                                    class="form-control" id="exampleInputPassword2">
                            </div>
                            <div class="mb-5">
                                <input type="checkbox" @click="togglePassword" name="show-password" id="show-password"
                                    class="checkbox" title="Show Password">
                                <label for="show-password" class="label"><span>Show Password</span></label>
                            </div>
                            <div class="d-flex gap-4">
                                <button type="submit" class="btn btn-secondary text-white px-5 py-2"
                                    :disabled="password !== confirmPassword">Create an Account</button>
                                <router-link :to="{ name: 'Login' }" class="btn action">Back</router-link>
                            </div>
                        </form>
                        <div v-if="authStore.errorResponseData.message"
                            class="alert mt-5 alert-danger alert-dismissible fade show" role="alert">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            <p v-for="(error, key) in authStore.errorResponseData.message" :key="key">{{ error[0] }}</p>
                        </div>
                        <div v-if="authStore.responseData.status === 'Success'"
                            class="alert mt-5 alert-success alert-dismissible fade show" role="alert">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            <p>Account Created Successfully</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>



<style lang="scss" scoped>
.progress {
  position: relative;
  height: 1.75rem; /* Slightly taller for better visibility */
  background-color: #f5f5f5; /* Subtle background color */
  border-radius: 1rem; /* More pronounced rounded corners */
  overflow: hidden; /* Ensures the progress bar does not overflow */
}

.progress-bar {
  height: 100%;
  transition: width 0.5s ease, background-color 0.5s ease; /* Smoother transitions */
  border-radius: 1rem; /* Matches the container’s rounded corners */
  text-align: center; /* Center align text inside the progress bar */
  line-height: 1.75rem; /* Vertically centers text */
  color: #fff; /* White text color for better contrast */
  font-weight: bold; /* Bold text for emphasis */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); /* Subtle inner shadow */
}

.action {
    font-size: 1.6rem;
    background: #f5f7fb;
    border-radius: 3px;
    color: #2d7dd7;
    display: inline-block;
    font-weight: 400;
    height: 38px;
    line-height: 1;
    overflow: hidden;
    padding: 11px 25px 0;
    text-decoration: none;
    margin-top: 0;

    &:hover {
        background: #d1daec;
        text-decoration: none;
    }
}

h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    margin: 0 0 38px;
    padding-top: 4px;
}

h2 {
    font-size: 2.4rem;
    font-weight: 400;
    line-height: inherit;

}
.progress-bar {
  transition: width 0.5s ease;
  height: 1rem; /* Adjust as needed */
}

form.loginForm input[type=checkbox]+.label {
    cursor: pointer;
    padding-left: 32px;
    position: relative;
    display: inline;
    font-weight: 400;

    &:before {
        background-color: rgba(54, 110, 172, .15);
        border-radius: 3px;
        content: '';
        height: 19px;
        left: 0;
        position: absolute;
        top: 0;
        width: 20px;
    }

    &:after {
        background: url(../../assets/images/bg-checkbox.svg) no-repeat;
        content: '';
        height: 17px;
        left: 5px;
        opacity: 0;
        position: absolute;
        top: -3px;
        transform: translateY(-5px);
        transition: all .3s cubic-bezier(.23, 1, .32, 1);
        width: 17px;
    }
}

input[type=checkbox]:checked+.label:after {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

input[type=checkbox] {
    margin: 2px 5.5px 0 0;
    position: relative;
    top: 2px;
    position: absolute;
    visibility: hidden;
}
</style>