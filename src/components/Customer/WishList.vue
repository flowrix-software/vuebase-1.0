<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'
const userStore = useUserStore()
const quoteHistory = ref([])

onMounted(async () => {
  try {
    await userStore.getQuotesHistory()

    if (userStore.quotes_history.status === 'Success') {
      quoteHistory.value = userStore.quotes_history.data
    }
    // console.log(quoteHistory)
  } catch (error) {
    // console.error('Error fetching user data:', error)
  }
})

</script>

<template>
  <div class="px-3 py-2">
    <div class="row">
      <div class="col-md-12">
        <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">My Wish List
        </h2>
      </div>
    </div>

    <section>
      <div class="mt-3">
        <table class="table responsive">
          <thead>
            <tr class="align-middle">
              <th class="bg-primary text-center text-white" scope="col" width="40%">Products</th>
              <th class="bg-primary text-center text-white" scope="col" width="10%">Price</th>
              <th class="bg-primary text-center text-white" scope="col" width="10%">Stock Status</th>
              <th class="bg-primary text-center text-white" scope="col" width="10%">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in quoteHistory" :key="item.id" class="align-middle">
              <td>
                {{ item.name }}
              </td>

              <td>{{ item.price }}</td>
              <td>
                <div class="status" :class="item.stock === 'Order Placed' ? 'order-placed' : 'pending'">
                  {{ item.stock }}
                </div>
              </td>
              <td class="text-end">{{ item.quantity }}</td>
            </tr>
          </tbody>
        </table>
        <h3 v-if="quoteHistory == 0">Wish List is Empty</h3>
      </div>
    </section>
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
