import { defineComponent, ref, computed} from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useDateFormatter } from '@/composables/useDateFormatter';
import { useNumberInput } from '@/composables/useNumberOnly';


export type UserData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  mobile: string;
  dob: string;
  addresses: Array<{
    address: string;
    suburb: string;
    state: string;
    country: string;
  }>;
}

export default defineComponent({
  name: 'ProfileForm',
  props: {
    userData: {
      type: Object as () => UserData,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const isEdit = ref(false);

    const { inputValue: phone, errorMessage: phoneError, handleInput: handlePhoneInput } = useNumberInput();
    phone.value = props.userData.phone;

    const { inputValue: mobile, errorMessage: mobileError, handleInput: handleMobileInput } = useNumberInput();
    mobile.value = props.userData.mobile;

    const address = computed(() => {
      if (props.userData.addresses && props.userData.addresses.length > 0) {
        const addr = props.userData.addresses[0];
        return `${addr.address ?? '-'} ${addr.suburb ?? '-'} ${addr.state ?? '-'} ${addr.country ?? '-'}`;
      }
      return '-'; 
    });

    const { formatDate, parseDate } = useDateFormatter();

    const inputData = ref({
      firstname: props.userData.firstname,
      lastname: props.userData.lastname,
      email: props.userData.email,
      phone: props.userData.phone,
      mobile: props.userData.mobile,
      dob: formatDate(props.userData.dob),
      address: address.value,
    });

    const successMessage = computed(() => {
      return userStore.successResponse && !errorMessages.value.length ? userStore.successResponse : null;
    });

    const errorMessages = computed(() => {
      if (userStore.errorResponseData && typeof userStore.errorResponseData === 'object') {
        const errors = userStore.errorResponseData.message;
        const formattedErrors: string[] = [];
        for (const field in errors) {
          if (Array.isArray(errors[field])) {
            formattedErrors.push(...errors[field]);
          }
        }
        return formattedErrors;
      }
      return [];
    });

    const showSuccess = ref(false);

    const triggerSuccessMessage = () => {
      if (successMessage.value) {
        showSuccess.value = true;
        setTimeout(() => {
          showSuccess.value = false;
        }, 3000);
      }
    };

    const editForm = () => {
      isEdit.value = true;
    };

    const submitForm = async () => {
      try {
        const profileData = {
          firstname: inputData.value.firstname,
          lastname: inputData.value.lastname,
          email: inputData.value.email,
          phone: phone.value, 
          mobile: mobile.value, 
          dob: parseDate(inputData.value.dob),
          address: inputData.value.address,
        };

        userStore.successResponse = null;
        userStore.errorResponseData = null;

        await userStore.updateProfile(profileData);
        triggerSuccessMessage();
      } catch (error) {
        console.error(error);
        userStore.successResponse = null;
      }
    };

    return {
      isEdit,
      inputData,
      phone,
      mobile,
      successMessage,
      errorMessages,
      showSuccess,
      editForm,
      submitForm,
    };
  },
});
