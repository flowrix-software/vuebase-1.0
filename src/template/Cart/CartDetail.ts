import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/Cart';

type CartItem = {
  id: string;
  name: string;
  category?: string;
  pricefloat?: number;
  options?: { values: Record<string, unknown> };
};

interface ProductData{
  qty:number
}
// Vue component export
export default defineComponent({
  name: 'CartDetail',
  setup() {
    // Initialize route and cart store
    const route = useRoute();
    const fetchCart = useCartStore();

    // Computed property to get cart items
    const cartData = computed(() => fetchCart.cart.items);

    // Function to remove an item from the cart and send the event to Google Analytics
    const removeFromCart = (productId: string, product: CartItem) => {
      fetchCart.removeFromCart(productId);

      // window.gtag = window.gtag || [];
      // window.gtag('event', 'remove_from_cart', {
      //   items: [
      //     {
      //       item_id: product?.id,
      //       item_name: product?.name,
      //       item_category: product?.category,
      //       quantity: 1, // Adjust quantity as per actual requirement
      //       price: product?.pricefloat,
      //     },
      //   ],
      //   ...product?.options?.values,
      // });
    };

    const updateQuantity = (product:ProductData, type:any)=>{
      if(type == 'add'){
        fetchCart.updateQuantity(product, product.qty + 1)
      }else{
        fetchCart.updateQuantity(product, product.qty - 1)
      }
    }

    // Computed property to check if the cart is empty or contains only the 'Check Measure' item
    const isObjectEmpty = computed(() => {
      if (fetchCart.cart.items !== undefined) {
        const itemNames = Object.values<CartItem>(fetchCart.cart.items).map((item) => item.name);
        const checkForMeasure = itemNames.includes('Check Measure');

        if (checkForMeasure && itemNames.length === 1) {
          return false; // Only 'Check Measure' is present
        }

        return itemNames.length > 0;
      }
      return false;
    });

    // Function to divide summary data into three parts
    const dividedSummary = (summaryData: any[]) => {
      let summary = [];
      let firstMidpoint = Math.ceil(summaryData.length / 3);
      let secondMidpoint = Math.ceil((summaryData.length * 2) / 3);

      summary[0] = summaryData.slice(0, firstMidpoint);
      summary[1] = summaryData.slice(firstMidpoint, secondMidpoint);
      summary[2] = summaryData.slice(secondMidpoint);

      return summary;
    };

    // Helper function to toggle a class on an element
    const toggleClass = (element: Element, className: string) => {
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    };

    // Function to toggle visibility of a bundle element
    const openBundle = (id: string) => {
      const bundle = document.querySelector(`.bundle_${id}`);
      const elems = document.querySelector(`.open_bundle${id}`)?.querySelector('.fas');

      if (bundle && elems) {
        toggleClass(elems, 'fa-angle-down');
        toggleClass(elems, 'fa-angle-up');
        toggleClass(bundle, 'd-none');
      }
    };

    // Function to toggle visibility of attributes element
    const openAttributes = (id: string) => {
      const attributes = document.querySelector(`.attributes_${id}`);
      const elems = document.querySelector(`.open_attributes${id}`)?.querySelector('.fas');

      if (attributes && elems) {
        toggleClass(elems, 'fa-angle-down');
        toggleClass(elems, 'fa-angle-up');
        toggleClass(attributes, 'd-none');
      }
    };

    // Return all the reactive properties and methods to be used in the template
    return {
      route,
      cartData,
      removeFromCart,
      updateQuantity,
      isObjectEmpty,
      dividedSummary,
      openBundle,
      openAttributes,
    };
  },
});
