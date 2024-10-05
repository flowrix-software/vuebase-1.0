import { ref, watch, defineComponent } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { usePasswordFormat } from '@/composables/usePasswordFormatter';
import { useTogglePassword } from '@/composables/useTooglePassword';

export default defineComponent({
  name: 'ChangePassword',
  setup() {
    const authStore = useAuthStore();
    const { showPassword, togglePassword } = useTogglePassword();

    const old_password = ref<string | null>(null);
    const new_password = ref<string | null>(null);
    const confirm_password = ref<string | null>(null);
    const password_reset_success = ref<string | null>(null);
    const password_reset_failed = ref<any>(null);

    const {
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthValue,
      passwordStrengthWidth,
      passwordStrengthTextColor,
    } = usePasswordFormat(new_password);

    const resetForm = () => {
      old_password.value = null;
      new_password.value = null;
      confirm_password.value = null;
      password_reset_success.value = null;
      password_reset_failed.value = null;
    };

    const setNewPassword = async () => {
      try {
        await authStore.changePassword({
          password: new_password.value ?? '',
          current_password: old_password.value ?? '',
          password_confirmation: confirm_password.value ?? '',
        });

        if (authStore.changePasswordState.status === 'Success') {
          password_reset_success.value = 'Password Reset Successfully';
          setTimeout(() => {
            resetForm();
          }, 5000);
        }
      } catch (error) {
        password_reset_failed.value = error.response?.data || 'Error occurred during password reset';
      }
    };

    watch(
      () => authStore.errorResponseData,
      (error) => {
        password_reset_failed.value = error.message;
      }
    );

    return {
      old_password,
      new_password,
      confirm_password,
      password_reset_success,
      password_reset_failed,
      showPassword,
      togglePassword,
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthValue,
      passwordStrengthWidth,
      passwordStrengthTextColor,
      setNewPassword,
      resetForm,
    };
  },
});
