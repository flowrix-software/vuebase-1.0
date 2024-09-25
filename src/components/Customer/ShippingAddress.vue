<script setup>
import { onMounted, ref, onBeforeUnmount, defineEmits } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useNumberInput } from '@/composables/useNumberOnly';
import { Modal } from 'bootstrap';

const props = defineProps({
  userAddress: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['switch-to-billing']);
const userStore = useUserStore();

const { errorMessage: newMobileError, handleInput: handleNewMobileInput } = useNumberInput();
const { errorMessage: newPostcodeError, handleInput: handleNewPostcodeInput } = useNumberInput();
const { errorMessage: editMobileError, handleInput: handleEditMobileInput } = useNumberInput();
const { errorMessage: editPostcodeError, handleInput: handleEditPostcodeInput } = useNumberInput();

const alertMessage = ref('');
const alertType = ref('');
const newShippingAddress = ref({
  firstname: '',
  lastname: '',
  mobile: '',
  saddress: '',
  address:'',
  country_id: 14, // Default country ID
  suburb: '',
  postcode: '',
  state_id: ''
});

const currentAddress = ref({ country_id: 14 });
const addNewAddress = ref(false);
const addressToDelete = ref(null);

const countries = ref([]);
const states = ref(null);

const clearMessages = () => {
  userStore.successResponse = null;
  userStore.errorResponseData = null;
  alertMessage.value = '';
};

// Fetch countries and states data on component mount
onMounted(async () => {
  await userStore.getCountries();
  if (userStore.countries.status === 'Success') {
    countries.value = userStore.countries.data;
    const australia = countries.value.find(country => country.id === 14);
    if (australia) states.value = australia.states;
  }
});

// Clear messages when the component is about to be destroyed
onBeforeUnmount(() => {
  clearMessages();
});

const handleAddAddress = async () => {
  try {
    await userStore.addNewAddress(newShippingAddress.value);
    if (userStore.new_address.status === 'Success') {
      showAlert('Address added successfully!', 'success');
      closeModal('addAddressModal');
    }
  } catch {
    showAlert('Error adding address.', 'error');
  }
};

const handleEditAddress = async () => {
  try {
    currentAddress.value.address = currentAddress.value.saddress;
    await userStore.updateAddress(currentAddress.value);
    if (userStore.update_address.status === 'Success') {
      showAlert('Address updated successfully!', 'success');
      closeModal('editModal');
    }
  } catch {
    showAlert('Error updating address.', 'error');
  }
};

const handleDeleteAddress = async () => {
  if (!addressToDelete.value) return;

  try {
    await userStore.deleteAddress({ id: addressToDelete.value });
    if (userStore.delete_address.status === 'Success') {
      showAlert('Address deleted successfully!', 'success');
      closeModal('deleteModal');
    }
  } catch {
    showAlert('Error deleting address.', 'error');
  }
};

// Show alert with a timeout
const showAlert = (message, type) => {
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => (alertMessage.value = ''), 5000);
};

const editAddress = (address) => {
  currentAddress.value = { ...address, saddress: address.address };
  if (address.billing === 1) emit('switch-to-billing');
};

const openConfirmationModal = (addressId) => {
  addressToDelete.value = addressId;
};

const handleDefaultAddress = async (address) => {
  await userStore.defaultAddress(address);
};

// Function to close modal programmatically
const closeModal = (modalId) => {
  const modalElement = document.getElementById(modalId);
  const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
  modalInstance.hide();

  modalElement.addEventListener('hidden.bs.modal', () => {    
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }

    if (!document.querySelector('.modal.show')) {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = ''
    }
  });
};

</script>

<template>
  <div class="px-3 py-2">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-between">
        <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">Shipping Address
        </h2>
        <div v-if="alertMessage" :class="['alert', alertType === 'success' ? 'alert-success' : 'alert-danger']"
          role="alert">
          {{ alertMessage }}
        </div>
      </div>
    </div>
    <section class="mt-4">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="border c-pointer h-100 w-100 d-flex flex-column align-items-center justify-content-center"
            data-bs-toggle="modal" data-bs-target="#addAddressModal">
            <i class="fas fa-map-marked-alt fa-4x mb-4 text-primary" style="--fa-secondary-opacity: 0.20"></i>
            <h3 class="text-primary fw-bold">Add Address</h3>

          </div>
        </div>
        <div class="col" v-for="(address, index) in userAddress" :key="index">
          <div class="card h-100 border-light-alt mb-3">
            <div class="d-flex bg-primary justify-content-between align-items-center">
              <div v-if="address.billing && address.shipping" class="card-header text-white fw-bold border-light-alt">
                Billing & Shipping Address
              </div>
              <div v-else-if="address.billing === 0 && address.shipping === 1"
                class="card-header text-white fw-bold border-light-alt">
                Shipping Address
              </div>
              <div v-else-if="address.billing === 1 && address.shipping === 0"
                class="card-header text-white fw-bold border-light-alt">
                Billing Address
              </div>
              <div v-else-if="address.billing === 0 && address.shipping === 0"
                class="card-header text-white fw-bold border-light-alt">
                Address
              </div>
            </div>

            <div class="card-body">
              <h4 class="card-title text-primary fw-bold">{{ address.fullname }}</h4>
              <p class="card-text mb-0">{{ address.address }} {{ address.suburb }} {{ address.state }}</p>
              <p class="card-text ">{{ address.country }}</p>
            </div>
            <div class="card-footer bg-transparent border-light-alt">
              <div class="d-flex justify-content-between align-content-center">

                <div v-if="address.shipping && address.shipping == 0 || address.billing == 0"
                  @click="editAddress(address)" data-bs-toggle="modal" data-bs-target="#editModal"
                  class="text-primary mb-0 c-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21H6.75L17.81 10.03L14.97 7.19L3 19.12V17.25Z" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M17.81 3.19C18.0596 2.93934 18.3478 2.76447 18.6528 2.6609C18.9578 2.55733 19.279 2.52831 19.5941 2.57566C19.9091 2.62301 20.2116 2.74584 20.4589 2.93182C20.7062 3.1178 20.8921 3.36294 21.0058 3.62843C21.1196 3.89391 21.1587 4.18055 21.1196 4.46528C21.0805 4.74901 20.9652 5.02154 20.78 5.251L19.25 6.78L17.19 4.72L17.81 3.19Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div v-if="address.billing && address.billing == 0 || address.billing" @click="editAddress(address)"
                  class="text-primary mb-0 c-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21H6.75L17.81 10.03L14.97 7.19L3 19.12V17.25Z" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M17.81 3.19C18.0596 2.93934 18.3478 2.76447 18.6528 2.6609C18.9578 2.55733 19.279 2.52831 19.5941 2.57566C19.9091 2.62301 20.2116 2.74584 20.4589 2.93182C20.7062 3.1178 20.8921 3.36294 21.0058 3.62843C21.1196 3.89391 21.1587 4.18055 21.1196 4.46528C21.0805 4.74901 20.9652 5.02154 20.78 5.251L19.25 6.78L17.19 4.72L17.81 3.19Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>

                <div class="d-flex gap-1 form-check form-switch">
                  <input @change="handleDefaultAddress(address.id)" class="form-check-input" type="checkbox"
                    role="switch" :id="`shippinginput${address.id}`"
                    :checked="address.shipping === 1 || (address.shipping === 1 && address.billing === 1)" />
                  <label class="form-check-label fs-4 pt-1" :for="`shippinginput${address.id}`">Set shipping</label>
                </div>

                <div v-if="address.billing !== 1" @click="openConfirmationModal(address.id)" data-bs-toggle="modal"
                  data-bs-target="#deleteModal" class="mb-0 text-danger c-pointer">
                  <i class="fas fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Add New Address Modal -->
    <div class="modal fade" id="addAddressModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">Add New Address</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="mt-4" @submit.prevent="handleAddAddress">
              <div class="row mb-3">
                <label for="firstname" class="col-sm-2 col-form-label text-nowrap">First Name
                  <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="Enter Full Name" required v-model="newShippingAddress.firstname"
                    class="form-control" id="firstname">
                </div>
              </div>
              <div class="row mb-3">
                <label for="lastname" class="col-sm-2 col-form-label text-nowrap">Last Name
                  <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="Enter Full Name" required v-model="newShippingAddress.lastname"
                    class="form-control" id="lastname">
                </div>
              </div>
              <div class="row mb-3">
                <label for="saddress" class="col-sm-2 col-form-label text-nowrap">Address
                  <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                </label>
                <div class="col-sm-10">
                  <textarea class="form-control" required id="saddress" rows="3" placeholder="Enter Address"
                    v-model="newShippingAddress.saddress"></textarea>
                </div>
              </div>
              <!-- Hide the country field and set "Australia" as default -->
              <div class="row mb-3 d-none">
                <label for="country" class="col-sm-2 col-form-label text-nowrap">Country
                  <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                </label>
                <div class="col-sm-10">
                  <select class="form-select" id="country" v-model="newShippingAddress.country_id" disabled>
                    <option v-for="country in countries" :value="country.id" :key="country.id">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="state" class="col-sm-4 col-form-label text-nowrap">State
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-8">
                      <select class="form-select" id="state" v-model="newShippingAddress.state_id" required>
                        <option v-for="(state, index) in states" :value="state.id" :selected="index === 0" :key="index">
                          {{ state.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="suburb" class="col-sm-2 col-form-label text-nowrap">Suburb
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-10">
                      <input type="text" required class="form-control" id="suburb" v-model="newShippingAddress.suburb">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="postcode" class="col-sm-4 col-form-label text-nowrap">Postcode
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="postcode" v-model="newShippingAddress.postcode"
                        @input="handleNewPostcodeInput" required />
                      <div v-if="newPostcodeError" class="text-danger">{{ newPostcodeError }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="mobile" class="col-sm-2 col-form-label text-nowrap">Mobile
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="mobile" v-model="newShippingAddress.mobile"
                        @input="handleNewMobileInput" required />
                      <div v-if="newMobileError" class="text-danger">{{ newMobileError }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-md-12 text-end">
                  <button type="submit" class="btn btn-secondary text-white px-5 py-2 fw-medium"><i
                      class="far fa-save me-3 text-dark"></i>Save & Continue</button>
                </div>
              </div>
            </form>
            <div class="alert alert-danger mt-5"
              v-if="userStore.errorResponseData && userStore.errorResponseData.message" role="alert">
              {{ userStore.errorResponseData.message }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">Edit Shipping Address</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="mt-4" @submit.prevent="handleEditAddress">
              <div class="row mb-3">
                <label for="firstname" class="col-sm-2 col-form-label text-nowrap">First Name <span
                    class="text-danger"><i class="bi bi-asterisk fs-6"></i></span></label>
                <div class="col-sm-10">
                  <input type="text" placeholder="Enter Full Name" required v-model="currentAddress.firstname"
                    class="form-control" id="firstname">
                </div>
              </div>
              <div class="row mb-3">
                <label for="lastname" class="col-sm-2 col-form-label text-nowrap">Last Name <span class="text-danger"><i
                      class="bi bi-asterisk fs-6"></i></span></label>
                <div class="col-sm-10">
                  <input type="text" placeholder="Enter Full Name" required v-model="currentAddress.lastname"
                    class="form-control" id="lastname">
                </div>
              </div>
              <div class="row mb-3">
                <label for="saddress" class="col-sm-2 col-form-label text-nowrap">Address
                  <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                </label>
                <div class="col-sm-10">
                  <textarea class="form-control" required id="saddress" rows="3" placeholder="Enter Address"
                    v-model="currentAddress.saddress"></textarea>
                </div>
              </div>
              <div class="row mb-3 d-none">
                <label for="country" class="col-sm-2 col-form-label text-nowrap">Country
                  <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                </label>
                <div class="col-sm-10">
                  <select class="form-select" id="country" v-model="currentAddress.country_id" required
                    @change="onCountryChange(currentAddress.country_id)">
                    <option v-for="country in countries" :value="country.id" :key="country.id">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="state" class="col-sm-4 col-form-label text-nowrap">State
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-8">
                      <select class="form-select" id="state" v-model="currentAddress.state_id" required>
                        <option v-for="(state, index) in states" :value="state.id" :selected="index === 0" :key="index">
                          {{ state.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="suburb" class="col-sm-2 col-form-label text-nowrap">Suburb
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-10">
                      <input type="text" required class="form-control" id="suburb" v-model="currentAddress.suburb">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="postcode" class="col-sm-4 col-form-label text-nowrap">Postcode
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-8">
                      <input type="number" required class="form-control" id="postcode"
                        v-model="currentAddress.postcode" @input="handleEditPostcodeInput">
                      <div v-if="editPostcodeError" class="text-danger">{{ editPostcodeError }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row mb-3">
                    <label for="mobile" class="col-sm-2 col-form-label text-nowrap">Mobile
                      <span class="text-danger"><i class="bi bi-asterisk fs-6"></i></span>
                    </label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editMobile" v-model="currentAddress.mobile"
                        @input="handleEditMobileInput" required />
                      <div v-if="editMobileError" class="text-danger">{{ editMobileError }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-md-12 text-end">
                  <button type="submit" class="btn btn-secondary text-white px-5 py-2 fw-medium"><i
                      class="far fa-save me-3 text-dark"></i>Save & Continue</button>
                </div>
              </div>
            </form>
            <div class="alert alert-danger mt-5"
              v-if="userStore.errorResponseData && userStore.errorResponseData.message" role="alert">
              {{ userStore.errorResponseData.message }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="confirmationModalLabel">Confirm Deletion</h4>
            <button type="button" data-bs-dismiss="modal" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this address?</p>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal"
              class="btn btn-secondary text-white px-5 py-2 fw-medium">Cancel</button>
            <button type="button" class="btn btn-danger text-white px-5 py-2 fw-medium"
              @click="handleDeleteAddress">Delete</button>
          </div>
        </div>
      </div>
    </div>
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

.c-pointer {
  cursor: pointer;
}
</style>
