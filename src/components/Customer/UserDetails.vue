<script setup lang="ts">
import { ref, defineProps, computed, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useDateFormatter } from '@/composables/useDateFormatter';
import { useNumberInput } from '@/composables/useNumberOnly'
// Define UserData interface for prop type
interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  mobile: string;
  dob: string;
  addresses: Array<{
    address: string;
    suburb: string;
    state: string;
    country: string;
  }>;
}

// Define UserStore interface for store
interface UserStore {
  successResponse: string | null;
  errorResponseData: { message: Record<string, string[]> } | null;
  updateProfile: (profileData: any) => Promise<void>;
}

const props = defineProps<{ userData: UserData }>();
const userStore = useUserStore() as UserStore;
const isEdit = ref(false);

// Use composable for phone and mobile number
const { inputValue: phone, errorMessage: phoneError, handleInput: handlePhoneInput } = useNumberInput();
phone.value = props.userData.phone;

const { inputValue: mobile, errorMessage: mobileError, handleInput: handleMobileInput } = useNumberInput();
mobile.value = props.userData.mobile;

// Address computation
const address = computed(() => {
  if (props.userData.addresses && props.userData.addresses.length > 0) {
    const addr = props.userData.addresses[0];
    const formattedAddress = `${addr.address ?? '-'} ${addr.suburb ?? '-'} ${addr.state ?? '-'} ${addr.country ?? '-'}`;
    return formattedAddress;
  }
  return '-'; // Default value when no address data is available
});

// Date formatter composable
const { formatDate, parseDate } = useDateFormatter();

const inputData = ref({
  firstname: props.userData.firstname,
  lastname: props.userData.lastname,
  email: props.userData.email,
  phone: props.userData.phone,
  mobile: props.userData.mobile,
  dob: formatDate(props.userData.dob),
  address: address.value,
});

const successMessage = computed(() => {
  return userStore.successResponse && !errorMessages.value.length ? userStore.successResponse : null;
});

const errorMessages = computed(() => {
  if (userStore.errorResponseData && typeof userStore.errorResponseData === 'object') {
    const errors = userStore.errorResponseData.message;
    const formattedErrors: string[] = [];
    for (const field in errors) {
      if (Array.isArray(errors[field])) {
        formattedErrors.push(...errors[field]);
      }
    }
    return formattedErrors;
  }
  return [];
});

const showSuccess = ref(false);

const triggerSuccessMessage = () => {
  if (successMessage.value) {
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  }
};

const editForm = () => {
  isEdit.value = true;
};

const submitForm = async () => {
  try {
    const profileData = {
      firstname: inputData.value.firstname,
      lastname: inputData.value.lastname,
      email: inputData.value.email,
      phone: phone.value, // Use phone from composable
      mobile: mobile.value, // Use mobile from composable
      dob: parseDate(inputData.value.dob),
      address: inputData.value.address,
    };

    userStore.successResponse = null;
    userStore.errorResponseData = null;

    await userStore.updateProfile(profileData);
    triggerSuccessMessage();
  } catch (error) {
    console.error(error);
    
    userStore.successResponse = null;
  }
};

// Clear messages on route change
const clearMessages = () => {
  userStore.successResponse = null;
  userStore.errorResponseData = null;
};

onBeforeUnmount(() => {
  clearMessages();
});
</script>


<template>
  <div class="px-3 py-2">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-between align-items-center">
        <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">My Account Information</h2>
        <!-- Display success message if there is no error -->
        <div v-if="showSuccess && successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
        <!-- Display error messages if present -->
        <div v-if="errorMessages.length > 0" class="alert alert-danger">
          <ul>
            <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
          </ul>
        </div>
      </div>
    </div>
    <form class="my-4" @submit.prevent="submitForm">
      <div class="row border-bottom py-2">
        <label for="firstName" class="col-sm-4 col-form-label fw-bold">First Name</label>
        <div class="col-sm-8">
          <input type="text" :disabled="!isEdit" v-model="inputData.firstname" class="form-control" id="firstName">
        </div>
      </div>
      <div class="row border-bottom py-2">
        <label for="lastName" class="col-sm-4 col-form-label fw-bold">Last Name</label>
        <div class="col-sm-8">
          <input type="text" :disabled="!isEdit" v-model="inputData.lastname" class="form-control" id="lastName">
        </div>
      </div>
      <div class="row border-bottom py-2">
        <label for="inputEmail" class="col-sm-4 col-form-label fw-bold">Email Address</label>
        <div class="col-sm-8">
          <input type="email" disabled v-model="inputData.email" class="form-control" id="inputEmail">
        </div>
      </div>
      <div class="row border-bottom py-2">
        <label for="inputPhone" class="col-sm-4 col-form-label fw-bold">Phone Number</label>
        <div class="col-sm-8">
          <input
            type="text"
            :disabled="!isEdit"
            v-model="phone"
            @input="handlePhoneInput"
            class="form-control"
            id="inputPhone"
          />
          <small v-if="phoneError" class="form-text text-danger">{{ phoneError }}</small>
        </div>
      </div>
      <div class="row border-bottom py-2">
        <label for="inputMobile" class="col-sm-4 col-form-label fw-bold">Mobile Number</label>
        <div class="col-sm-8">
          <input
            type="text"
            :disabled="!isEdit"
            v-model="mobile"
            @input="handleMobileInput"
            class="form-control"
            id="inputMobile"
          />
          <small v-if="mobileError" class="form-text text-danger">{{ mobileError }}</small>
        </div>
      </div>
      <div class="row border-bottom py-2">
        <label for="inputDOB" class="col-sm-4 col-form-label fw-bold">Date of Birth</label>
        <div class="col-sm-8">
          <input type="date" :disabled="!isEdit" v-model="inputData.dob" class="form-control" id="inputDOB">
        </div>
      </div>
      <div class="row border-bottom py-2">
        <label for="inputAddress" class="col-sm-4 col-form-label fw-bold">Address</label>
        <div class="col-sm-8">
          <input type="text" disabled v-model="address" class="form-control" id="inputAddress">
        </div>
      </div>
      <button v-if="isEdit" type="submit" class="btn mt-4 btn-secondary text-white w-25">Update</button>
      <button v-if="!isEdit" @click="editForm" class="btn mt-4 btn-secondary text-white w-25">Edit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.link {
  font-size: 1.6rem;
}

.sub-title {
  font-size: 2.4rem;
  font-weight: 400;
}

.form-control:disabled {
  background-color: #fff;
  opacity: 1;
  border: 0;
  box-shadow: none;
}

.action-orange {
  font-size: 1.6rem;
  background: var(--iseek-secondary);
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  font-weight: 400;
  height: 35px;
  line-height: 1;
  overflow: hidden;
  padding: 11px 25px 0;
  text-decoration: none;
  margin-right: 10px;
}

.action {
  font-size: 1.6rem;
  background: var(--iseek-light);
  border-radius: 3px;
  color: #2d7dd7;
  display: inline-block;
  font-weight: 400;
  height: 35px;
  line-height: 1;
  overflow: hidden;
  padding: 11px 25px 0;
  text-decoration: none;
}
</style>
