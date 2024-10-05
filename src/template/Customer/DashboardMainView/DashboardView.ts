import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/UserStore';

import ShippingAddress from '@/components/01/Customer/DashboardComponents/ShippingAddress.vue';
import ChangePassword from '@/components/01/Customer/DashboardComponents/ChangePassword.vue';
import CreditCards from '@/components/01/Customer/DashboardComponents/CreditCards.vue';
import OrderHistory from '@/components/01/Customer/DashboardComponents/OrderHistory.vue';
import Quotation from '@/components/01/Customer/DashboardComponents/Quotation.vue';
import UserDetails from '@/components/01/Customer/DashboardComponents/UserDetails.vue';
import BillingAddress from '@/components/01/Customer/DashboardComponents/BillingAddress.vue';

import DashboardTabs from '@/components/01/Customer/DashboardMainView/DashboardTabs.vue';

export default {
  name: 'DashboardMainView',

  components: {
    DashboardTabs,
    UserDetails,
    BillingAddress,
    ShippingAddress,
    ChangePassword,
    CreditCards,
    OrderHistory,
    Quotation,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const isLoading = ref<boolean>(true);
    const parentSelectedTab = ref<string>(route.params.tab as string || 'account');

    onBeforeMount(async () => {
      try {
        await userStore.fetchUserData();
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    });

    const logoutFunc = async () => {
      await authStore.logout();
      userStore.$reset();
      authStore.$reset();
      await router.push({ name: 'Login' });
    };

    const userData = computed(() => userStore.user?.user.data || {});

    const handleTabChange = (tab: string) => {
      if (tab !== parentSelectedTab.value) {
        parentSelectedTab.value = tab;
        router.push({ name: 'Dashboard', params: { tab } });
      }
    };

    const currentTab = computed(() => route.params.tab as string || 'account');
    parentSelectedTab.value = currentTab.value;

    return {
      isLoading,
      parentSelectedTab,
      userData,
      handleTabChange,
      logoutFunc
    };
  },
};