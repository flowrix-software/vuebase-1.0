import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "SignInForm",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();

    const email = ref(null);
    const password = ref(null);
    const show_password = ref(false);

    const form_error = ref(null);
    // const form_success = ref(null)

    watch(
      () => authStore.errorResponseData,
      (error) => {
        form_error.value = error.message;
      }
    );

    const togglePasswordVisibility = () => {
      show_password.value = !show_password.value;
    };

    const loginRequest = async () => {
      try {
        await authStore.login({ email: email.value, password: password.value });

        if (authStore.responseData.status === "Success") {
          if (route.path.includes("cart")) {
            // document.querySelector('[data-bs-dismiss="modal"]').click()
            router.push({ name: "checkout" });
          } else if (route.path.includes("login")) {
            router.push({ name: "dashboard" });
          } else if (route.path.includes("checkout")) {
            // $emit('someEvent')
          }
        }
      } catch (error) {
        // console.log('Error', error)
      }
    };
    return {
      loginRequest,
      email,
      password,
      form_error,
      route,
      router,
      authStore,
    };
  },
};
