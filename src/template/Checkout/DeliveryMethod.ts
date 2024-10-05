import { defineComponent } from 'vue';
import { useCheckoutStore } from "@/stores/Checkout";

type Preference = {
    id: string;
    name: string;
    selected: boolean;
}
type deliveryMethods = {
    billing_state: number | string,
    deliverymethod: number | string,
    billing_address: string,
    billing_suburb: string | undefined,
    billing_postcode: number | undefined,
    billing_mobile: string | number,
    billing_firstname: string,
    billing_middlename: string,
    billing_lastname: string,
    shipping_address: string,
    shippingmethod: number | string,
    shipping_state: number | string,
    firstname: string,
    lastname: string,
    customertoken: string,
    shipping_suburb: string | undefined,
    shipping_postcode: number | undefined,
    shipping_mobile: string | number,
    shipping_firstname: string,
    shipping_middlename: string,
    shipping_lastname: string,
    email: string,
    authoritytoleave: number | undefined,
    customernotes: string,
    eway_cardname: string,
    eway_cardnumber: string,
    eway_expirymonth: string,
    eway_expiryyear: string,
    eway_cvn: string,
    till_cardname: string,
    till_cardnumber: string,
    till_cvn: string,
    till_expirymonth: string,
    till_expiryyear: string,
    save_card_details: number
}
export default defineComponent({
    name: "DeliveryMethods",
    props: {
        preferences: {
        type: Object, // Define the type of the prop
        required: true, // Specify whether it is required or not
      },
      deliveryMethod: {
        type: Object,
        default: 0, // You can also specify default values
      },
      countries: {
        type: Array,
        default: 0, // You can also specify default values
      },
    },

    setup(props) {
    const checkoutStore = useCheckoutStore()
// const props = defineProps<{
//     deliveryMethod: deliveryMethods;
//     preferences: Preference[];
// }>();
if (props.preferences.length > 1) {
    props.deliveryMethod.deliverymethod = props.preferences[0].id
    updateDeliveryMethod()
}
function updateDeliveryMethod() {
    // emit('getPreferences');
    checkoutStore.saveToCheckoutSession(props.deliveryMethod)
}
return {
    props,
    updateDeliveryMethod,
  };
},
});