import { defineComponent, ref, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter, useRoute } from 'vue-router';
import { useTogglePassword } from '@/composables/useTooglePassword';
import { usePasswordFormat } from '@/composables/usePasswordFormatter';
import { useNumberInput } from '@/composables/useNumberOnly';
import { Icon } from '@iconify/vue';


export default defineComponent({
  name: 'Register',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const { showPassword, togglePassword } = useTogglePassword();
    const password = ref<string | null>(null);
    const confirmPassword = ref<string | null>(null);

    const {
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthTextColor,
      passwordStrengthWidth,
    } = usePasswordFormat(password);

    const firstName = ref<string | null>(null);
    const lastName = ref<string | null>(null);
    const email = ref<string | null>(null);

    const { inputValue: mobile, errorMessage, handleInput } = useNumberInput();

    const errorMessageComputed = computed(() => {
      return authStore.errorResponseData.message || null;
    });

    const successMessage = computed(() => {
      return authStore.responseData.status === 'Success' ? 'Account Created Successfully' : null;
    });

    
    const signupFunction = async () => {
      if (!firstName.value || !lastName.value || !email.value || !mobile.value || !password.value || !confirmPassword.value) {
        console.error('All fields are required');
        return;
      }

      try {
        await authStore.addCustomer({
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          mobile: mobile.value,
          password: password.value,
          email_confirmation: email.value,
          password_confirmation: confirmPassword.value,
        });

        if (authStore.responseData.status === 'Success') {
          setTimeout(() => {
            if (route.path.includes('cart')) {
              router.push({ name: 'Checkout' });
            } else {
              router.push({ name: 'Dashboard', params: { tab: 'account' } });
            }
          }, 1000);
        }
      } catch (error) {
        console.error('Signup failed', error);
      }
    };

    return {
      firstName,
      lastName,
      email,
      mobile,
      errorMessageComputed,
      handleInput,
      password,
      confirmPassword,
      showPassword,
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthTextColor,
      passwordStrengthWidth,
      togglePassword,
      signupFunction,
      successMessage,
      Icon
    };
  },
});
