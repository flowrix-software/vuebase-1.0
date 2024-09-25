<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { usePasswordFormat } from '@/composables/usePasswordFormatter'
import { useTogglePassword } from '@/composables/useTooglePassword'

const authStore = useAuthStore()
const { showPassword, togglePassword } = useTogglePassword()

const old_password = ref<string | null>(null)
const new_password = ref<string | null>(null)
const confirm_password = ref<string | null>(null)
const password_reset_success = ref<string | null>(null)
const password_reset_failed = ref<any>(null)

const {
    passwordStrength,
    passwordStrengthClass,
    passwordStrengthValue,
    passwordStrengthWidth,
    passwordStrengthTextColor,
} = usePasswordFormat(new_password)

const setNewPassword = async () => {
  try {
    await authStore.changePassword({
      password: new_password.value ?? '',
      current_password: old_password.value ?? '',
      password_confirmation: confirm_password.value ?? ''
    })

    if (authStore.changePasswordState.status === 'Success') {
      password_reset_success.value = 'Password Reset Successfully'
    }
  } catch (error) {
    console.error('Error', error)
  }
}

watch(
  () => authStore.errorResponseData,
  (error) => {
    password_reset_failed.value = error.message
  }
)
</script>

<template>
  <div class="px-3 py-2">
    <section>
      <div class="row">
        <div class="col-md-12">
          <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">Change Password</h2>
        </div>
      </div>
      <div class="row align-items-center px-3 py-4">
        <form @submit.prevent="setNewPassword">
          <div class="row border-bottom py-2">
            <label for="inputOld" class="col-sm-3 col-form-label fw-bold">Old Password
            <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
            </label>
            <div class="col-sm-9">
              <input :type="showPassword ? 'text' : 'password'" required v-model="old_password"
                class="form-control border-0 shadow-none" id="inputOld">
            </div>
          </div>
          <div class="row border-bottom py-2 align-items-center">
            <label for="inputNew" class="col-sm-3 col-form-label fw-bold">New Password
            <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
            </label>
            <div class="col-sm-6">
              <input :type="showPassword ? 'text' : 'password'" required v-model="new_password"
                class="form-control border-0 shadow-none" id="inputNew">
            </div>
            <div class="col-sm-3" v-if="new_password">
              <div :class="passwordStrengthTextColor">{{ passwordStrength }}</div>
              <div class="progress" role="progressbar" aria-label="Basic example" :aria-valuenow="passwordStrengthValue"
                aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" :class="passwordStrengthClass" :style="{ width: passwordStrengthWidth }">
                </div>
              </div>
            </div>
          </div>
          <div class="row border-bottom py-2">
            <label for="inputConfirm" class="col-sm-3 col-form-label fw-bold">Confirm New Password
            <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
            </label>
            <div class="col-sm-9">
              <input :type="showPassword ? 'text' : 'password'" required v-model="confirm_password"
                class="form-control border-0 shadow-none" id="inputConfirm">
            </div>
          </div>
          <p v-if="new_password !== '' && confirm_password !== '' && new_password !== confirm_password"
            class="text-center text-danger">
            Passwords do not match
          </p>
          <div class="mt-4">
            <input type="checkbox" @click="togglePassword" name="show-password" id="show-password" class="checkbox"
              title="Show Password">
            <label for="show-password" class="label"><span>Show Password</span></label>
          </div>

          <button type="submit" class="btn mt-4 btn-secondary text-white w-25"
            :disabled="new_password === '' || confirm_password === '' || new_password !== confirm_password">Update</button>
          <div v-if="password_reset_success" class="alert alert-success mt-5 d-flex align-items-center" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>
            <div>{{ password_reset_success }}</div>
          </div>
          <div v-else-if="password_reset_failed" class="alert alert-danger mt-5 d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-circle-fill me-2"></i>
            <div v-for="(value, key) in password_reset_failed" :key="key">
              <div v-for="errorMsg in value" :key="errorMsg">{{ errorMsg }}</div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.progress-bar {
  transition: width 0.3s ease-in-out;
}

.weak {
  background-color: #ff9999;
}

.medium {
  background-color: #ffff99;
}

.strong {
  background-color: #99ff99;
}

.password-strength-marker {
  height: 10px;
  width: 100px;
}

.sub-title {
  font-size: 2.4rem;
  font-weight: 400;
}

.changePasswordBtn:hover {
  background-color: black;
}

form input[type=checkbox]+.label {
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
