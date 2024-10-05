import { ref, computed, onBeforeMount, defineComponent } from 'vue';
import { useUserStore } from '@/stores/UserStore';

export default defineComponent({
  name: 'UserCard',
  setup() {
    const userStore = useUserStore();
    const isModalVisible = ref(false);
    const selectedCardId = ref<string | null>(null);
    const isSuccessAlertVisible = ref(false);

    const customerCards = computed(() => userStore.cards);

    const showDeleteModal = (cardId: string) => {
      selectedCardId.value = cardId;
      isModalVisible.value = true;
    };

    const confirmDeleteCard = async () => {
      if (selectedCardId.value) {
        await userStore.deleteCustomerCard(selectedCardId.value);
        if (userStore.successResponse) {
          showSuccessAlert();
        }
      }
      closeDeleteModal();
    };

    const closeDeleteModal = () => {
      isModalVisible.value = false;
      selectedCardId.value = null;
    };

    const showSuccessAlert = () => {
      isSuccessAlertVisible.value = true;
      setTimeout(() => {
        isSuccessAlertVisible.value = false;
      }, 5000);
    };

    return {
      customerCards,
      isModalVisible,
      selectedCardId,
      isSuccessAlertVisible,
      showDeleteModal,
      confirmDeleteCard,
      closeDeleteModal,
    };
  }
});
