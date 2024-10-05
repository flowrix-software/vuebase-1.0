import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DashboardTabs',
  props: {
    initialTab: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const authStore = useAuthStore();
    const userStore = useUserStore();

    const selectedTab = ref<string>(props.initialTab);
   
    const changeTab = (tab: string) => {
      selectedTab.value = tab;
      emit('tabChanged', selectedTab.value);
    };

    const logoutFunc = async () => {
      await authStore.logout();
      userStore.$reset();
      authStore.$reset();
      await router.push({ name: 'Login' });
    };

    return {
      selectedTab,
      changeTab,
      logoutFunc,
    };
  },
});
