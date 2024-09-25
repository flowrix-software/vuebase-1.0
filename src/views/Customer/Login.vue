<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { useTogglePassword } from '@/composables/useTooglePassword';

const router = useRouter();
const authStore = useAuthStore();

const { showPassword, togglePassword } = useTogglePassword();
const checked = ref<boolean>(false);
const email = ref<string | null>(null);
const password = ref<string | null>(null);

const form_error = computed(() => {
  return authStore.errorResponseData.message?.[0] || null;
});

const handleLogin = async () => {
  try {
    await authStore.login({ email: email.value ?? '', password: password.value ?? '' });

    if (authStore.responseData.status === 'Success') {
      router.push({ name: 'Dashboard', params: { tab: 'account' } });
    }
  } catch (error) {
    console.error('Error', error);
  }
};
</script>

<template>
  <div>
    <section>
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6">
            <h1 class="fw-semibold">Customer Login</h1>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container my-5">
        <div class="row g-5">
          <div class="col-md-6">
            <h2 class="border-bottom pb-3 mb-4">Registered Customers</h2>
            <p class="mb-5">If you have an account, sign in with your email address.</p>
            <form class="loginForm" @submit.prevent="handleLogin">
              <div class="mb-4">
                <label for="exampleInputEmail1" class="form-label fw-medium">Email<span
                    class="asterick text-danger">*</span></label>
                <input type="email" v-model="email" required class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-medium">Password<span
                    class="asterick text-danger">*</span></label>
                <input :type="showPassword ? 'text' : 'password'" required class="form-control"
                  id="exampleInputPassword1" v-model="password">
              </div>
              <div class="mb-5">
                <input type="checkbox" v-model="checked" @change="togglePassword" name="show-password"
                  id="show-password" class="checkbox" title="Show Password">
                <label for="show-password" class="label"><span>Show Password</span></label>
              </div>
              <div class="d-flex gap-4">
                <button type="submit" class="btn btn-secondary text-white px-5 py-2">Sign In</button>
                <router-link :to="{ name: 'ForgetPassword' }" class="btn action">Forgot Your Password?</router-link>
              </div>
            </form>
            <div v-if="form_error" class="mt-5 alert alert-danger d-flex align-items-center" role="alert">
              <i class="bi bi-exclamation-circle-fill me-2"></i>
              <div>{{ form_error }}</div>
            </div>
          </div>
          <div class="col-md-6">
            <h2 class="border-bottom pb-3 mb-4">New Customers</h2>
            <p class="mb-5">Creating an account has many benefits: check out faster, keep more than one address, track
              orders and more.</p>
            <router-link :to="{ name: 'Register' }" class="btn btn-secondary text-white px-5 py-2">Create an
              Account</router-link>
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
  margin: 0 0 38px;
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


input[type=checkbox] {
  margin: 2px 5.5px 0 0;
  position: relative;
  top: 2px;
  position: absolute;
  visibility: hidden;
}

input[type=checkbox]:checked+.label:after {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style>