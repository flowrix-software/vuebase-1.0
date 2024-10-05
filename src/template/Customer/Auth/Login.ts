import { defineComponent, ref, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { useTogglePassword } from '@/composables/useTooglePassword';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    
    const { showPassword, togglePassword } = useTogglePassword();

    const checked = ref<boolean>(false);
    const email = ref<string | null>(null);
    const password = ref<string | null>(null);

    const form_error = computed<string | null>(() => {
      return authStore.errorResponseData.message?.[0] || null;
    });

    const handleLogin = async () => {
      try {
        await authStore.login({
          email: email.value ?? '',
          password: password.value ?? ''
        });

        if (authStore.responseData.status === 'Success') {
          router.push({ name: 'Dashboard', params: { tab: 'account' } });
        }
      } catch (error) {
        console.error('Login Error', error);
      }
    };

    return {
      checked,
      Icon,
      email,
      password,
      showPassword,
      form_error,
      togglePassword,
      handleLogin,
      Icon
    };
  }
});
