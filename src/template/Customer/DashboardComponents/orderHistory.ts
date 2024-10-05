// orderHistory.ts

import { defineComponent, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';

export default defineComponent({
  name: 'OrderHistory',
  setup() {
    const userStore = useUserStore();

    const orderHistory = computed(() => {
      if (userStore.order_history.length === 0) {
        userStore.getOrderHistory();
      }
      return userStore.order_history.data || [];
    });

    const handleOrderClick = (orderNo: string) => {
      userStore.getTaxInvoice(orderNo);
    };

    return {
      orderHistory,
      handleOrderClick,
    };
  },
});
