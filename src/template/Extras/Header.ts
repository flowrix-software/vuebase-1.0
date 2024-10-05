import { computed, defineComponent, ref } from "vue";
import { useCompanyProfile } from "vuebase-1.0";
import { Icon } from "@iconify/vue";
import { useNavMenu } from "vuebase-1.0";
import Menu from "@/components/Menu/MainMenu.vue";
import { useAuthStore } from "vuebase-1.0";
import { useUserStore } from "vuebase-1.0";
import { useCartStore } from "vuebase-1.0";
type Menu= {
  location: string;
  items: any;
}
export default defineComponent({
  components: {
    Icon,
  },
  name: "Header",
  setup() {
    const NavMenu = useNavMenu();
    const CompanyProfile = useCompanyProfile();
    const wordpressUrl = import.meta.env.VITE_APP_WORDPRESS_URL;
    // const eventBus = useEventBus()
    // const carsStore = useCarsStore()

    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const userStore = useUserStore();
    // const loading = ref(false)


    const companyProfile = computed(() => CompanyProfile.profile);
    const menuData = computed<Menu>(() => {
      const headmenu = NavMenu.Menu.filter(
        (menu) => menu.location == "header"
      )[0];
      return headmenu;
    });

    const userData = computed(() => userStore.user?.user.data || {});

    const mobile_menu = ref(false);
    const OpenMobileMenu = () => {
      if (mobile_menu.value) {
        mobile_menu.value = false;
      } else {
        mobile_menu.value = true;
      }
    };
    return {
        wordpressUrl,
        authStore,
        cartStore,
        companyProfile,
        menuData,
        userData,
    };
  },
});
