import { useCheckoutStore } from "@/stores/Checkout";
import { ref, defineEmits, defineComponent } from "vue";
type ShippingDetails = {
  billing_state: number | undefined;
  deliverymethod: number | undefined;
  billing_address: string;
  billing_suburb: string | undefined;
  billing_postcode: number | undefined;
  billing_mobile: string | number;
  billing_firstname: string;
  billing_middlename: string;
  billing_lastname: string;
  shipping_address: string;
  shippingmethod: number | string;
  shipping_country: number | string;
  shipping_state: number | undefined;
  shipping_suburb: string | undefined;
  shipping_postcode: number | undefined;
  shipping_mobile: string | number;
  shipping_firstname: string;
  shipping_middlename: string;
  shipping_lastname: string;
  email: string;
  authoritytoleave: number | undefined;
  customernotes: string;
  eway_cardname: string;
  eway_cardnumber: string;
  eway_expirymonth: string;
  eway_expiryyear: string;
  eway_cvn: string;
  till_cardname: string;
  till_cardnumber: string;
  till_cvn: string;
  till_expirymonth: string;
  till_expiryyear: string;
  save_card_details: number;
};
export default defineComponent({
  name: "ShippingAddress",
  props: {
    shippingDetails: {
      type: Object, // Define the type of the prop
      required: true, // Specify whether it is required or not
    },
    states: {
      type: Array,
      default: 0, // You can also specify default values
    },
    countries: {
      type: Array,
      default: 0, // You can also specify default values
    },
  },
  setup(props) {
    const checkoutStore = useCheckoutStore();
    // const props = defineProps<{
    //   shippingDetails: ShippingDetails;
    //   states: any;
    //   countries: any;
    // }>();

    const emit = defineEmits<{
      (e: "update:deliveryMethod", value: string): void;
      (e: "getPreferences"): void;
    }>();

    function updateShippingMethod() {
      // emit('getPreferences');
      checkoutStore.saveToCheckoutSession(props.shippingDetails);
    }
    
    return {
      props,
      emit,
      updateShippingMethod,
    };
  },
});
