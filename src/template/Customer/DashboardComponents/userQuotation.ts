// quoteHistory.ts

import { defineComponent, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';

export default defineComponent({
  name: 'QuoteHistory',

  setup() {
    const userStore = useUserStore();

    const quoteHistory = computed(() => {
      if (userStore.quotes_history.length === 0) {
        userStore.getQuotesHistory();
      }
      return userStore.quotes_history.data || [];
    });

    return {
      quoteHistory,
    };
  },
});
