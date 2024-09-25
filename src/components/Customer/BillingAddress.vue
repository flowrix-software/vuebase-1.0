<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useNumberInput } from '@/composables/useNumberOnly';

interface Address {
  id: number;
  fullname: string;
  firstname: string;
  middlename?: string | null;
  lastname: string;
  address: string;
  saddress: string;
  suburb: string;
  state: string;
  state_id: number;
  country: string;
  country_id: number;
  postcode: string;
  mobile: string;
  shipping: number;
  billing: number;
}

const userStore = useUserStore();

const props = defineProps<{
  userAddress: Address[];
}>();

const billingAddress = computed(() => {
  return props.userAddress.find(address => address.billing === 1) || {
    id: 0,
    fullname: '',
    firstname: '',
    middlename: null,
    lastname: '',
    address: '',
    saddress: '',
    suburb: '',
    state: '',
    state_id: 0,
    country: '',
    country_id: 14,
    postcode: '',
    mobile: '',
    shipping: 0,
    billing: 1,
  };
});

const addressForm = ref<Address>({ ...billingAddress.value });

// Initialize useNumberInput composable for mobile
const { inputValue: mobile, errorMessage: mobileError, handleInput: handleMobileInput } = useNumberInput();
mobile.value = addressForm.value.mobile;
const { inputValue: postcode, errorMessage: postCodeError, handleInput: handlePostCodeInput } = useNumberInput();
postcode.value = addressForm.value.postcode;

const alertMessage = ref<string | null>(null);

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  addressForm.value.saddress = addressForm.value.address;
  addressForm.value.mobile = mobile.value; // Update mobile with validated value

  try {
    if (addressForm.value.id) {
      // Edit existing address
      await userStore.updateAddress(addressForm.value);
      alertMessage.value = 'Billing Address Updated Successfully';
    } else {
      // Add new address
      await userStore.addNewAddress(addressForm.value);
      alertMessage.value = 'New Address Added Successfully';
    }

    setTimeout(() => {
      alertMessage.value = null;
    }, 3000);
  } catch (error) {
    // Handle errors if needed
    console.error('Failed to process address:', error);
  }
};
</script>


<template>
  <div class="px-3 py-2">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-between align-items-center">
        <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">
          Billing Address
        </h2>
           <!-- Alert message -->
           <div v-if="alertMessage" class="alert alert-success">
            {{ alertMessage }}
          </div>
      </div>
    </div>
    <section class="mt-4">
      <div class="row">
        <div class="col">
          <form @submit="handleSubmit" class="mt-4">
            <div class="row mb-3 align-content-center">
              <label for="firstname" class="col-sm-2 col-form-label text-nowrap">First Name
                <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
              </label>
              <div class="col-sm-10">
                <input type="text" v-model="addressForm.firstname" placeholder="First Name" required class="form-control" id="firstname">
              </div>
            </div>
            <div class="row mb-3">
              <label for="lastname" class="col-sm-2 col-form-label text-nowrap">Last Name
                <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
              </label>
              <div class="col-sm-10">
                <input type="text" v-model="addressForm.lastname" placeholder="Last Name" required class="form-control" id="lastname">
              </div>
            </div>
            <div class="row mb-3">
              <label for="address" class="col-sm-2 col-form-label text-nowrap">Address
                <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
              </label>
              <div class="col-sm-10">
                <textarea v-model="addressForm.address" class="form-control" required id="address" rows="3" placeholder="Enter Address"></textarea>
              </div>
            </div>

            <div class="row mb-3 d-none">
              <label for="country" class="col-sm-2 col-form-label text-nowrap">Country
                <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
              </label>
              <div class="col-sm-10">
                <textarea v-model="addressForm.country_id" class="form-control" required id="country" rows="3" placeholder="Enter Country"></textarea>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <div class="row mb-3">
                  <label for="state" class="col-sm-4 col-form-label text-nowrap">State
                    <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
                  </label>
                  <div class="col-sm-8">
                    <select v-model="addressForm.state_id" class="form-select" id="state" required>
                      <option value="206">Australian Capital Territory</option>
                      <option value="207">New South Wales</option>
                      <option value="208">Northern Territory</option>
                      <option value="209">Queensland</option>
                      <option value="210">South Australia</option>
                      <option value="211">Tasmania</option>
                      <option value="212">Victoria</option>
                      <option value="213">Western Australia</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mb-3">
                  <label for="suburb" class="col-sm-2 col-form-label text-nowrap">Suburb
                    <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
                  </label>
                  <div class="col-sm-10">
                    <input type="text" v-model="addressForm.suburb" required class="form-control" id="suburb">
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="row mb-3">
                  <label for="postcode" class="col-sm-4 col-form-label text-nowrap">Postcode
                    <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
                  </label>
                  <div class="col-sm-8">
                    <input type="text" v-model="addressForm.postcode"  @input="handlePostCodeInput" required class="form-control" id="postcode">
                  </div>
                  <div v-if="postCodeError" class="text-danger text-center">{{ postCodeError }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mb-3">
                  <label for="mobile" class="col-sm-2 col-form-label text-nowrap">Mobile
                    <span class="text-danger" ><i class="bi bi-asterisk fs-6"></i></span>
                  </label>
                  <div class="col-sm-10">
                    <input type="text" v-model="addressForm.mobile" @input="handleMobileInput" required class="form-control" id="inputPhone">
                  </div>
                  <div v-if="mobileError" class="text-danger text-center">{{ mobileError }}</div>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-md-12 text-end">
                <button type="submit" class="btn btn-secondary text-white px-5 py-2 fw-medium">
                  <i class="far fa-save me-3 text-dark"></i>Save & Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.sub-title {
  font-size: 2.4rem;
  font-weight: 400;
}

.required-field {
  color: red;
  font-size: 15pt;
}

.saveBtn:hover {
  background-color: black;
}

.alert {
  margin-bottom: 1rem;
}
</style>
