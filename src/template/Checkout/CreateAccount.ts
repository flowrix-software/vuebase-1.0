import { ref, watch } from "vue";
import { useCheckoutStore } from "@/stores/Checkout";

import SignInForm from "@/components/01/Checkout/SignInForm.vue";

export default {
  components: {
    SignInForm,
  },
  name: "CreateAccount",
  props: {
    inputData: {
      type: Object, // Define the type of the prop
      required: true, // Specify whether it is required or not
    },
  },
  setup(props: any) {
    const isCustomer = ref(null);
    const checkoutStore = useCheckoutStore();

     function updatePersonalDetails() {
      // emit('getPreferences');
      checkoutStore.saveToCheckoutSession(props.inputData);
    }

    return {
      isCustomer,
      updatePersonalDetails,
      props,
    };
  },
};
