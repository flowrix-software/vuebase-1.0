<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
const orderHistory = ref([])

onMounted(async () => {
  try {
    await userStore.getOrderHistory()

    if (userStore.order_history.status === 'Success') {
      orderHistory.value = userStore.order_history.data
    }
    // console.log(orderHistory)
  } catch (error) {
    // console.error('Error fetching user data:', error)
  }
})
</script>

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">My Samples History
          </h2>
        </div>
      </div>
    </div>

    <section>

      <div class="container mt-5">
        <table class="table responsive">
          <thead>
            <tr class="align-middle">
              <th class="bg-primary text-center text-white" scope="col" width="25%">Invoice ID</th>
              <th class="bg-primary text-center text-white" scope="col" width="25%">
                Order Placed On
              </th>
              <th class="bg-primary text-center text-white" scope="col" width="25%">Price</th>
              <th class="bg-primary text-center text-white" scope="col" width="25%">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderHistory" :key="item.id" class="align-middle">
              <td>
                <router-link :to="{ name: 'invoice', query: { id: item.order_no } }">{{
                  item.order_no
                }}</router-link>
              </td>

              <td>{{ item.created_at }}</td>
              <td class="text-end">${{ item.grandtotal }} AUD</td>
              <td>
                <div class="status" :class="item.order_status === 'Order Placed' ? 'order-placed' : 'pending'">
                  {{ item.order_status }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 v-if="orderHistory == 0">No Orders Yet</h3>
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
  }

  &.pending {
    background-color: #ff9f43;
    color: #000000;
  }
}
</style>
