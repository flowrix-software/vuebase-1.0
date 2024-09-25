// src/composables/useTogglePassword.ts
import { ref } from 'vue';

export function useTogglePassword() {
  const showPassword = ref<boolean>(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  return {
    showPassword,
    togglePassword
  };
}
