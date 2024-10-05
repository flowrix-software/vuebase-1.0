// import promotionTag from '@/components/other/promotionTag.vue';
import { defineComponent, ref } from "vue";
import { useCartStore } from "@/stores/Cart";

export default defineComponent({
  name: "ProductCard",
  props: {
    item: {
      required: true,
    },
  },
  setup(props) {
    const CartStore = useCartStore();

    const checkInCart = ref(0);
    const productQty = ref(1);
    const isProductInCart = (productId: string) => {
      // Iterate over the cart object and check if the product ID exists
      if (CartStore.cart.items) {
        var isincart = Object.values(CartStore.cart.items).filter(
          (v) => v.slug == productId
        );
        if (isincart.length > 0) {
          productQty.value = isincart[0].qty;
          checkInCart.value = 1;
        } else {
          productQty.value = 0;
          checkInCart.value = 0;
        }
      }
    };
    const updateQuantity = (product: object, quantity: number) => {
      const SingleProduct = Object.values(CartStore.cart.items).find(
        (item) => item.slug === product.slug
      );
      CartStore.updateQuantity(SingleProduct, quantity);
      productQty.value = SingleProduct.qty;
      console.log(SingleProduct);
    };

    const addToCart = async (product: object, qty: number) => {
      // router.push({ name: 'Cart' })
      CartStore.addToCart(product, qty);
    };

    const imagesize = (swatchImage: string) => {
      if (swatchImage) {
        let swatchImage320 = swatchImage.replace(/.webp/gi, "320.webp");
        return swatchImage320;
      }
      return swatchImage;
    };
    return {
      props,
      updateQuantity,
      addToCart,
      imagesize,
      isProductInCart,
    };
  },
});
