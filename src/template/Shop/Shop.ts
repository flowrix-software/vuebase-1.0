import { ref, defineComponent } from "vue";
import InnerBanner from "@/components/01/innerBanner.vue";
import Pagination from "@/components/Others/Pagination.vue";
import ProductCard from "@/components/01/Product/ProductCard.vue";
import { useShopStore } from "vuebase-1.0";
import { register } from "swiper/element/bundle";
import banner from "@/assets/images/banner.webp";
register();
export default defineComponent({
  name: "Shop",
  components: {
    InnerBanner,
    Pagination,
    ProductCard,
  },
  setup() {
    let shop = ref<any | null>(null);
    shop.value = useShopStore().shop;

    return {
      shop,
    };
  },
});
