import { computed, defineComponent, ref } from "vue";
import { useCompanyProfile } from "@/stores/CompanyProfile";
import { Icon } from "@iconify/vue";
import { useNavMenu } from "@/stores/NavMenu";
import Menu from "@/components/Menu/MainMenu.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import { useCartStore } from "@/stores/Cart";
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
