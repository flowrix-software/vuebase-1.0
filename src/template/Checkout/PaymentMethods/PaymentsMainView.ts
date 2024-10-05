import { defineComponent, computed } from "vue";

import Stripe from "@/components/01/Checkout/PaymentMethods/Stripe.vue";
import Eway from "@/components/01/Checkout/PaymentMethods/Eway.vue";
import Till from "@/components/01/Checkout/PaymentMethods/Till.vue";
import { useCheckoutStore } from "@/stores/Checkout";

import { loadStripe } from "@stripe/stripe-js";

//Assets
import visa from "@/assets/images/visa-icon.svg";
import master from "@/assets/images/mastercard.png";

export default defineComponent({
  components: {
    Stripe,
    Eway,
    Till,
  },
  name: "PaymentsMainView",
  props: {
    cartData: {
      type: Object, // Define the type of the prop
      required: true, // Specify whether it is required or not
    },
    inputData: {
      type: Object, // Define the type of the prop
      required: true, // Specify whether it is required or not
    },
  },
  setup(props) {
    const checkoutStore=useCheckoutStore()
    let stripe:any;
    let elements:any;
    const loader = "auto";

    function getPaymentComponent(methodKey: string) {
      switch (methodKey) {
        case "web-eway":
          return Eway;
        case "web-till-payment":
          return Till;
        case "web-stripe":
          return Stripe;
        default:
          return null;
      }
    }
    const totalPrice = computed(() => {
      return checkoutStore.checkoutSession
        ? checkoutStore.checkoutSession.calculations
        : checkoutStore.checkoutSession;
    });
    const getpaymentMethod = async (paymentMethod: string) => {
      console.log(props.inputData)  
      try {
          props.inputData.paymentmethod = paymentMethod;
  
          const newPrice = parseFloat(totalPrice.value.total);
          if (paymentMethod == "web-stripe" && stripe !== null) {
            const appearance = {
              theme: "stripe",
            };
            await checkoutStore.paymentMethods({
              clientsceret: checkoutStore.publishableKey.clientsceret,
              paymentmethod: paymentMethod,
              total: newPrice * 100,
            });
            const clientSecret = checkoutStore.publishableKey.clientsceret;
            stripe = await loadStripe(checkoutStore.publishableKey.key);
            elements = stripe.elements({ appearance, clientSecret, loader });
            // const linkAuthenticationElement = elements.create("linkAuthentication");
  
            const paymentElementOptions = {
              layout: {
                type: "tabs",
              },
            };
            // Mount the Elements to their corresponding DOM node
            const cardElement = elements.create("payment", paymentElementOptions);
            cardElement.mount("#card-element");
          }
          if (
            paymentMethod == "web-zippay" ||
            paymentMethod == "web-direct-deposit" ||
            paymentMethod == "web-paypal" ||
            paymentMethod == "web-eway"
          ) {
            await checkoutStore.paymentMethods({
              paymentmethod: paymentMethod,
              total: newPrice,
            });
            if (paymentMethod == "web-eway") {
              props.inputData.ewayKey = checkoutStore.publishableKey.key;
            }
          }
  
          if (paymentMethod == "web-till-payment") {
            await checkoutStore.paymentMethods({
              paymentmethod: paymentMethod,
              total: newPrice,
            });
  
            payment.init(
              "TFtrYq0SAcyy5l2cxi3a",
              "number_div",
              "cvv_div",
              function (payment) {
                payment.setNumberStyle({
                  width: "100%",
                  height: "100%",
                  border: "none",
                  "input:focus-visible": {
                    outline: "-webkit-focus-ring-color auto 0px",
                  },
                });
                payment.setCvvStyle({
                  width: "100%",
                  height: "100%",
                  border: "none",
                });
                payment.numberOn("input", function () {
                  console.log(props.inputData);
                  var data = {
                    card_holder: props.inputData.till_cardname,
                    month: props.inputData.till_expirymonth,
                    year: props.inputData.till_expiryyear,
                  };
                  payment.tokenize(
                    data, //additional data, MUST include card_holder (or first_name & last_name), month and year
                    function (token: string) {
                      //success callback function
                      props.inputData.clientsceret = token;
                    },
                    function (errors) {
                      //error callback function
                      console.log(errors);
                      //render error information here
                    }
                  );
                });
              }
            );
          }
          checkoutStore.saveToCheckoutSession(props.inputData);
        } catch (error) {
          console.log("Error", error);
        }
      };

    return {
      props,
      getPaymentComponent,
      visa,
      master,
      getpaymentMethod
    };
  },
});
