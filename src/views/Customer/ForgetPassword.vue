<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router'

const router = useRouter();
const authStore = useAuthStore();
const email = ref<string | null>(null);
const token = ref<string | null>(null);
const new_password = ref<string | null>(null);
const confirm_password = ref<string | null>(null);
const verified_token = ref<string | null>(null);

const verifyEmailField = ref(true);
const verifyTokenField = ref(false);
const setNewPasswordField = ref(false);
const password_error_message = ref<string | null>(null); 
const isEmailVerified = ref(false); // Flag to track email verification status

// Computed properties for error messages
const emailErrorMessage = computed(() => {
  return authStore.errorResponseData.message?.email?.[0] || null;
});

const tokenErrorMessage = computed(() => {
  return authStore.errorResponseData.message?.token?.[0] || null;
});

// Functions
const verifyEmailRequest = async () => {
  try {
    await authStore.verifyEmail({ email: email.value });
    if (authStore.verifyEmailState.status === 'Success') {
      verifyEmailField.value = false;
      verifyTokenField.value = true;
      isEmailVerified.value = true; 
    }
  } catch (error) {
    console.error('Error during email verification', error);
  }
};

const verifyTokenRequest = async () => {
  try {
    await authStore.verifyToken({ email: email.value, token: token.value });
    if (authStore.verifyTokenState.status === 'Success') {
      verified_token.value = authStore.verifyTokenState.data;
      verifyTokenField.value = false;
      setNewPasswordField.value = true;
    }
  } catch (error) {
    console.error('Error during token verification', error);
  }
};

const setNewPassword = async () => {
  if (new_password.value !== confirm_password.value) {
    password_error_message.value = 'New and confirm password must be matched'; // Set error message
    return;
  }
  try {
    await authStore.resetPassword({ token: verified_token.value, password: new_password.value, password_confirmation: confirm_password.value });
    if (authStore.setNewPasswordState.status === 'Success') {
      setNewPasswordField.value = false;
      router.push({ name: 'Login' });
    }
  } catch (error) {
    console.error('Error during password reset', error);
  }
};
</script>

<template>
  <div>
    <section>
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6">
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container mt-5">
        <div class="row g-5">
          <div class="col-md-6">
            <h1 class="fw-semibold">Forgot Your Password?</h1>
            <p class="mb-5">Please enter your email address below to receive a password reset link.</p>
          </div>
        </div>
      </div>
    </section>
    <section v-if="verifyEmailField">
      <div class="container mb-5">
        <div class="row g-5">
          <div class="col-md-6">
            <form class="loginForm" @submit.prevent="verifyEmailRequest">
              <div class="mb-4">
                <label for="exampleInputEmail1" class="form-label fw-medium">Email<span class="asterick text-danger">*</span></label>
                <input type="email" v-model="email" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div v-if="emailErrorMessage" class="alert alert-danger mt-2" role="alert">
                {{ emailErrorMessage }}
              </div>
              <div class="d-flex gap-4">
                <button type="submit" class="btn btn-secondary text-white px-5 py-2">Reset Password</button>
                <router-link :to="{ name: 'Login' }" class="btn action">Go Back</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Verification Section -->
    <section v-if="verifyTokenField && isEmailVerified">
      <div class="container mb-5">
        <div class="row g-5">
          <div class="col-md-6">
            <!-- Success Alert for Email Verification -->
            <div v-if="authStore.verifyEmailState.message" class="alert alert-primary alert-dismissible fade show my-4" role="alert">
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              {{ authStore.verifyEmailState.message }}
            </div>

            <!-- Token Verification Form -->
            <form class="loginForm" @submit.prevent="verifyTokenRequest">
              <div class="mb-4">
                <label for="exampleInputEmail1" class="form-label fw-medium">Token<span class="asterick text-danger">*</span></label>
                <input type="text" v-model="token" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div v-if="tokenErrorMessage" class="alert alert-danger mt-2" role="alert">
                {{ tokenErrorMessage }}
              </div>
              <div class="d-flex gap-4">
                <button type="submit" class="btn btn-secondary text-white px-5 py-2">Verify Token</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Password Reset Section -->
    <section v-if="setNewPasswordField">
      <div class="container mb-5">
        <div class="row g-5">
          <div class="col-md-6">
            <form class="loginForm" @submit.prevent="setNewPassword">
              <div class="mb-4">
                <label for="newPassword" class="form-label fw-medium">New Password<span class="asterick text-danger">*</span></label>
                <input type="password" v-model="new_password" required class="form-control" id="newPassword" aria-describedby="passwordHelp">
              </div>
              <div class="mb-4">
                <label for="confirmPassword" class="form-label fw-medium">Confirm Password<span class="asterick text-danger">*</span></label>
                <input type="password" v-model="confirm_password" required class="form-control" id="confirmPassword" aria-describedby="passwordHelp">
              </div>

              <div v-if="password_error_message" class="alert alert-danger mt-2" role="alert">
                  {{ password_error_message }}
                </div>

              <div class="d-flex gap-4">
                <button type="submit" class="btn btn-secondary text-white px-5 py-2">Set New Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<style lang="scss" scoped>
.action {
  font-size: 1.6rem;
  background: #f5f7fb;
  border-radius: 3px;
  color: #2d7dd7;
  display: inline-block;
  font-weight: 400;
  height: 45px;
  line-height: 35px;
  overflow: hidden;
  padding: 5px 25px 0;
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
  margin: 0 0 30px;
  padding-top: 4px;
}

h2 {
  font-size: 2.4rem;
  font-weight: 400;
  line-height: inherit;

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
    background: url(../assets/images/bg-checkbox.svg) no-repeat;
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