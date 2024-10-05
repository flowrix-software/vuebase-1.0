import { computed } from "vue";
import { useCartStore } from "@/stores/Cart";
import CartDetail from "@/components/01/Cart/CartDetail.vue";
import CartTotalAndPromo from "@/components/01/Cart/CartTotalAndPromo.vue";

type CartItem = {
  name: string;
  // other properties...
};
export default {
  components: {
    CartDetail,
    CartTotalAndPromo,
  },
  name: "CartMainView",
  setup() {
    const fetchCart = useCartStore();

    const isObjectEmpty = computed(() => {
      if (fetchCart.cart.items !== undefined) {
        const itemNames = Object.values<CartItem>(fetchCart.cart.items).map(
          (item) => item.name
        );
        const checkForMeasure = itemNames.includes("Check Measure");

        if (checkForMeasure && itemNames.length === 1) {
          return false; // Only 'Check Measure' is present
        }

        return itemNames.length > 0;
      } else {
        return false;
      }
    });
    
    return {
      isObjectEmpty,
    };
  },
};
