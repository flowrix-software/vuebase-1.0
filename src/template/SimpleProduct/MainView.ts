import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProduct } from '@/stores/product';
import ProductVariation from '@/components/01/SimpleProduct/ProductVariation.vue';
import Gallery from '@/components/01/Product/Gallery.vue';
import AddToCart from '@/components/01/SimpleProduct/AddToCart.vue';

export default defineComponent({
  name: 'SimpleProduct',
  components: {
    ProductVariation,
    Gallery,
    AddToCart,
  },
  setup() {
    const productStore = useProduct();
    const productData = computed(() => productStore.data);
    const router = useRouter();

    const handleVariationChange = async (slug: string) => {
      await productStore.getProduct(slug);
      router.push({ name: 'Product', params: { slug } });
    };

    return {
      productData,
      handleVariationChange,
    };
  },
});
