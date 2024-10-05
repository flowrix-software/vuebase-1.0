// billingAddress.ts

import { defineComponent, ref, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useNumberInput } from '@/composables/useNumberOnly';

export type Address = {
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

export default defineComponent({
  name: 'BillingAddress',
  props: {
    userAddress: {
      type: Array as () => Address[],
      required: true
    }
  },
  setup(props) {
    const userStore = useUserStore();
    
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

   
    const { inputValue: mobile, errorMessage: mobileError, handleInput: handleMobileInput } = useNumberInput();
    mobile.value = addressForm.value.mobile;
    
    const { inputValue: postcode, errorMessage: postCodeError, handleInput: handlePostCodeInput } = useNumberInput();
    postcode.value = addressForm.value.postcode;

    const alertMessage = ref<string | null>(null);

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      addressForm.value.saddress = addressForm.value.address;
      addressForm.value.mobile = mobile.value; 

      try {
        if (addressForm.value.id) {
          
          await userStore.updateAddress(addressForm.value);
          alertMessage.value = 'Billing Address Updated Successfully';
        } else {

          await userStore.addNewAddress(addressForm.value);
          alertMessage.value = 'New Address Added Successfully';
        }

        setTimeout(() => {
          alertMessage.value = null;
        }, 3000);
      } catch (error) {
        console.error('Failed to process address:', error);
      }
    };

    return {
      addressForm,
      mobile,
      mobileError,
      handleMobileInput,
      postcode,
      postCodeError,
      handlePostCodeInput,
      alertMessage,
      handleSubmit,
    };
  }
});
