<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();

onBeforeMount(() => {
  userStore.getCustomerCards();
});

const customerCards = computed(() => userStore.cards);

const isModalVisible = ref(false);
const selectedCardId = ref<string | null>(null);

const isSuccessAlertVisible = ref(false);

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
</script>

<template>
  <div class="px-3 py-2">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-between align-items-center">
        <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">My Credit Cards</h2>
        <!-- Success Alert -->
        <div v-if="isSuccessAlertVisible" class="alert alert-success mt-3" role="alert">
          {{ userStore.successResponse }}
        </div>
      </div>
    </div>

    <section>
      <div class="mt-3">
        <!-- Alert if there are no cards -->
        <div v-if="customerCards.length === 0">
          <div class="alert alert-warning d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div>
              <p class="mb-0 fw-bold">You have no credit cards</p>
            </div>
          </div>
        </div>

        <!-- Table displaying cards -->
        <table v-else class="table text-middle">
          <thead>
            <tr>
              <th class="bg-primary text-white" scope="col" width="40%">Name On Card</th>
              <th class="bg-primary text-white" scope="col" width="40%">Card Number</th>
              <th class="bg-primary text-white" scope="col" width="20%">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="card in customerCards" :key="card.id">
              <td>{{ card.holder_name }}</td>
              <td>**** **** **** {{ card.last_four_digits }}</td>
              <td>
                <button class="btn btn-danger px-1 py-1" @click="showDeleteModal(card.id)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path
                      d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6H19Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Confirmation Modal -->
    <div v-if="isModalVisible" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this card?</p>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal"
            class="btn btn-secondary text-white px-5 py-2 fw-medium " @click="closeDeleteModal">Cancel</button>
            <button type="button"  class="btn btn-danger text-white px-5 py-2 fw-medium" @click="confirmDeleteCard">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.sub-title {
  font-size: 2.4rem;
  font-weight: 400;
}

.status {
  padding: 5px;
  border-radius: 12px;
  text-align: center;

  &.order-placed {
    background-color: #3bcc7c;
    color: #ffffff;

    &.pending {
      background-color: #ff9f43;
      color: #000000;
    }
  }
}
</style>
