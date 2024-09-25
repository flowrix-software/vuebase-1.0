<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()

const quoteHistory = computed(() => {
  if (userStore.quotes_history.length === 0) {
    userStore.getQuotesHistory()
  }
  return userStore.quotes_history.data || []
})
</script>

<template>
  <div class="px-3 py-2">
    <div class="row">
      <div class="col-md-12">
        <h2 class="border-bottom border-3 border-secondary fw-bold text-primary sub-title">Quotations
        </h2>
      </div>
    </div>
    <section>
      <div class="mt-3">
        <table class="table responsive">
          <thead>
            <tr class="align-middle">
              <th class="bg-primary  text-white" scope="col" width="25%">Quotation ID</th>
              <th class="bg-primary  text-white" scope="col" width="20%">Date </th>
              <th class="bg-primary  text-white" scope="col" width="10%">Total </th>
              <th class="bg-primary  text-white" scope="col" width="15%">Status </th>
              <th class="bg-primary  text-white" scope="col" width="10%">Action </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in quoteHistory" :key="item.id" class="align-middle">
              <td>
                {{ item.quotation_no }}
              </td>
              <td class="">{{ item.createddate }}</td>
              <td class="text-end">${{ item.total.toFixed(2) }}</td>
              <td>
                <div :class="item.quotestatus === 'Sent' ? 'text-success' : 'text-danger'">
                  {{ item.quotestatus }}
                </div>
              </td>
              <td class="">
                <!-- <router-link :to="{name:'QuotationCheckout', params: { slug: item.quotation_no } }">
                  Order Now
                </router-link> -->
              </td>
            </tr>
          </tbody>
        </table>
        <h3 v-if="quoteHistory == 0">No Quotations Yet</h3>
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
