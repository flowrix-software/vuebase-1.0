<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';

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
</script>



<template>
  <div class="px-3 py-2">
      <div class="row">
        <div class="col-md-12">
          <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">My Order History
          </h2>
        </div>
    </div>
    <section>
      <div class=" mt-3 px-">
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
              <td @click="handleOrderClick(item.order_no)" class="c-pointer">
                {{item.order_no}}
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
}

.status.order-placed {
  background-color: #3bcc7c;
  color: #ffffff;
}

.status.pending {
  background-color: #ff9f43;
  color: #000000;
}
.c-pointer{
  cursor: pointer;
}
.c-pointer:hover{
  text-decoration: underline;
  color: #005289;
}
</style>
