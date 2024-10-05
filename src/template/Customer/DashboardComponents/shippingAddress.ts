import { defineComponent, ref, computed } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useCountryStore } from "@/stores/Country";
import { useNumberInput } from "@/composables/useNumberOnly";
import { Modal } from "bootstrap";

export default defineComponent({
  props: {
    userAddress: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    // Computed property to filter addresses with billing == 0
    const filteredAddresses = computed(() => {
      return props.userAddress.filter(address => address.billing === 0);
    });

    const userStore = useUserStore();
    const countryStore = useCountryStore();

    const {
      errorMessage: newMobileError,
      handleInput: handleNewMobileInput,
    } = useNumberInput();
    const {
      errorMessage: newPostcodeError,
      handleInput: handleNewPostcodeInput,
    } = useNumberInput();
    const {
      errorMessage: editMobileError,
      handleInput: handleEditMobileInput,
    } = useNumberInput();
    const {
      errorMessage: editPostcodeError,
      handleInput: handleEditPostcodeInput,
    } = useNumberInput();

    const alertMessage = ref("");
    const alertType = ref("");
    const newShippingAddress = ref({
      firstname: "",
      lastname: "",
      mobile: "",
      saddress: "",
      address: "",
      country_id: 14,
      suburb: "",
      postcode: "",
      state_id: "",
    });

    const currentAddress = ref({ country_id: 14 });
    const addNewAddress = ref(false);
    const addressToDelete = ref(null);

    const states = ref(null);

    const countries = computed(() => countryStore.countries);
    const australia = countries.value.find((country) => country.id === 14);
    if (australia) states.value = australia.states;

    const openConfirmationModal = (addressId) => {
      addressToDelete.value = addressId;
    };

    const editAddress = (address) => {
      currentAddress.value = { ...address };
    };

    const handleAddAddress = async () => {
      try {
        await userStore.addNewAddress(newShippingAddress.value);
        if (userStore.new_address.status === "Success") {
          showAlert("Address added successfully!", "success");
          closeModal('addAddressModal');
        }
      } catch {
        showAlert("Error adding address.", "error");
      }
    };

    const handleEditAddress = async () => {
      try {
        currentAddress.value.address = currentAddress.value.saddress;
        await userStore.updateAddress(currentAddress.value);
        if (userStore.update_address.status === "Success") {
          showAlert("Address updated successfully!", "success");
          closeModal('editAddressModal');
        }
      } catch {
        showAlert("Error updating address.", "error");
      }
    };

    const handleDeleteAddress = async () => {
      if (!addressToDelete.value) {
        showAlert("No address selected for deletion.", "error");
        return;
      }

      try {
        await userStore.deleteAddress({ id: addressToDelete.value });
        if (userStore.delete_address && userStore.delete_address.status === "Success") {
          showAlert("Address deleted successfully!", "success");
          closeModal("deleteModal");
        } else {
          showAlert("Error deleting address.", "error");
        }
      } catch (error) {
        showAlert("Error deleting address: " + error.message, "error");
        console.error(error);
      }
    };

    const showAlert = (message, type) => {
      alertMessage.value = message;
      alertType.value = type;
      setTimeout(() => (alertMessage.value = ""), 5000);
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

    return {
      filteredAddresses,
      newMobileError,
      handleNewMobileInput,
      newPostcodeError,
      handleNewPostcodeInput,
      editMobileError,
      handleEditMobileInput,
      editPostcodeError,
      handleEditPostcodeInput,
      alertMessage,
      alertType,
      newShippingAddress,
      currentAddress,
      addNewAddress,
      addressToDelete,
      states,
      countries,
      openConfirmationModal,
      editAddress,
      handleAddAddress,
      handleEditAddress,
      handleDeleteAddress,
      showAlert,
      handleDefaultAddress,
      closeModal,
    };
  },
});
