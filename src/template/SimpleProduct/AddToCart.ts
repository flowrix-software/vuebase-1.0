import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/Cart';

export default defineComponent({
  name: 'AddToCart',
  props: {
    product: Object,
    service: Object,
  },
  setup(props) {
    const router = useRouter();
    const quantity = ref(1);
    const cartStore = useCartStore();

    const addToCart = async (product, qty) => {
      cartStore.addToCart(product, qty);
      router.push({ name: 'Cart' });
    };

    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    return {
      quantity,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      product: props.product,
      service: props.service,
    };
  },
});
