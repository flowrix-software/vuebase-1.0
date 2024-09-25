<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const orderHistory = ref([])
let invoiceOrders = []
const loading = ref(false)

const route = useRoute()
const invoiceId = route.query.id
// console.log(invoiceId)

const getInvoiceOrders = (orders, id) => {
  return orders.filter((order) => order.order_no === id)
}

onMounted(async () => {
  try {
    await userStore.getOrderHistory()

    if (userStore.order_history.status === 'Success') {
      orderHistory.value = userStore.order_history.data
      invoiceOrders = getInvoiceOrders(orderHistory.value, invoiceId)
      // console.log(invoiceOrders[0].fullname)
      loading.value = true
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})
</script>

<template>
  <div v-if="loading">
    <section class="py-4">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="fw-bold">Order Details</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <h4>Billed To:</h4>
            <div class="row">
              <div class="col">
                <strong>Order Number:</strong>
              </div>
              <div class="col">{{ invoiceOrders[0].order_no }}</div>
            </div>
            <div class="row">
              <div class="col">
                <strong>Name:</strong>
              </div>
              <div class="col">{{ invoiceOrders[0].fullname }}</div>
            </div>
            <div class="row">
              <div class="col">
                <strong>Email:</strong>
              </div>
              <div class="col">{{ invoiceOrders[0].email }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-4 d-none d-md-block">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="d-flex float-end align-items-center gap-md-3 gap-2">
              <h3 class="mb-0">Order Status:</h3>
              <p class="status px-lg-5 px-md-4 mb-0 px-2 text-uppercase fw-medium" :class="invoiceOrders[0].order_status === 'Order Placed' ? 'order-placed' : 'pending'
                ">
                {{ invoiceOrders[0].order_status }}
              </p>
            </div>
          </div>

          <table class="table mt-4">
            <thead>
              <tr class="align-middle">
                <th class="bg-primary text-center text-white" scope="col" width="20%">Image</th>
                <th class="bg-primary text-center text-white" scope="col" width="35%">Items</th>
                <th class="bg-primary text-center text-white" scope="col" width="15%">Quantity</th>
                <th class="bg-primary text-center text-white" scope="col" width="15%">Price</th>
                <th class="bg-primary text-center text-white" scope="col" width="15%">Total</th>
              </tr>
            </thead>
            <tbody v-for="item in invoiceOrders[0].items" :key="item.id">
              <tr class="align-middle">
                <td rowspan="2">
                  <img :src="item.product.image" :alt="item.product.name" class="img-fluid align-middle" />
                </td>
                <td class="border-0">
                  <h3 class="text-secondary">{{ item.product.name }}</h3>
                </td>
                <td class="text-center border-0">
                  <input type="text" disabled :value="item.quantity" class="quantity-input" />
                </td>
                <td class="text-end border-0">
                  ${{ item.price.toFixed(2) }}
                </td>
                <td class="text-end fw-medium border-0">${{ item.product.pricefloat.toFixed(2) }}</td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="product-summary bg-light w-100 p-2" v-if="item.product.type === 'custom'">
                    <!-- <div class="row">
                      <div class="col" v-for="group in item.product.groups">
                        <div class="row">
                          <div class="col fw-medium">
                            {{ group.title }}
                          </div>
                          <div class="col"></div>
                        </div>
                      </div>
                    </div> -->

                    <!-- <div class="row">
                      <div class="col-4" v-for="group in item.product.groups">
                        <div class="row" v-for="attribute in group.attributes">
                          <div class="col fw-medium">{{ attribute.title }}</div>
                          <div v-if="attribute.values.length > 0" class="col">
                            {{ attribute.values[0].title }}
                          </div>
                          <div v-else class="col">{{ attribute.value }}</div>
                        </div>
                      </div>
                    </div> -->

                    <div class="row">
                      <div class="row" v-for="(group, index) in item.product.groups" :key="index">
                        <div class="col-md-4" v-for="(attribute, index) in group.attributes" :key="index">
                          <div class="row">
                            <div class="col fw-medium">{{ attribute.title }}</div>
                            <div class="col text-end" v-if="attribute.values.length > 0">
                              {{ attribute.values[0].title }}
                            </div>
                            <div class="col text-end" v-else>
                              {{ attribute.value }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- For Mobile Screens -->
    <section class="py-4 d-block d-md-none">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="d-flex text-center gap-md-3 gap-2">
            <h5>Order Status:</h5>
            <p class="status px-lg-5 px-md-4 px-2 text-uppercase fw-medium"
              :class="invoiceOrders[0].order_status === 'Order Placed' ? 'order-placed' : 'pending'">
              {{ invoiceOrders[0].order_status }}
            </p>
          </div>
        </div>
        <div class="col-12">
          <div class="card mx-2 pb-4">
            <div v-for="item in invoiceOrders[0].items" :key="item.id">
              <!-- Product Information -->
              <div class="p-3">
                <div v-if="item.product.image">
                  <img :src="item.product.image" :alt="item.product.name" class="img-fluid" />
                </div>

                <div class="py-4">
                  <h4 class="text-primary fw-bold mb-0">
                    {{ item.product.name }}
                  </h4>
                </div>

                <!-- Price, Quantity and Total -->
                <div class="d-flex flex-wrap justify-content-between mt-4">
                  <div class="d-flex flex-column">
                    <div>
                      <p class="text-center fw-bold m-0 my-1">Price</p>
                      <p>
                        {{ item.product.currencyprefix }}{{ item.price }}
                        {{ item.product.currencypostfix }}
                      </p>
                    </div>
                  </div>

                  <div class="d-flex flex-column">
                    <p class="text-center fw-bold m-0 my-1">Quantity</p>
                    <div class="d-flex">
                      <input disabled type="number" name="qty" min="1" id="quantity" class="text-center border"
                        style="width: 70px" :value="item.quantity" />
                    </div>
                  </div>

                  <div class="d-flex flex-column">
                    <div>
                      <p class="text-center fw-bold m-0 my-1">Total</p>
                      <p class="fw-bold">${{ invoiceOrders[0].grandtotal }} AUD</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-light mx-4" v-if="item.product.type === 'custom'">
                <div class="row">
                  <div class="row" v-for="(group, index) in item.product.groups" :key="index">
                    <div class="col-md-4" v-for="(attribute, index) in group.attributes" :key="index">
                      <div class="row">
                        <div class="col ps-4">{{ attribute.title }}</div>
                        <div class="col" v-if="attribute.values.length > 0">
                          {{ attribute.values[0].title }}
                        </div>
                        <div class="col" v-else>
                          {{ attribute.value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8"></div>
          <div class="col">
            <div class="row grand-total-section">
              <div class="row">
                <div class="col">
                  <strong>Payment Method</strong>
                </div>
                <div class="col text-end fw-medium">{{ invoiceOrders[0].payment_method }}</div>
              </div>
              <div class="row" v-if="invoiceOrders[0].subtotal !== 0">
                <div class="col">
                  <strong>Subtotal</strong>
                </div>
                <div class="col text-end fw-medium">${{ invoiceOrders[0].subtotal.toFixed(2) }}</div>
              </div>
              <div class="row" v-if="invoiceOrders[0].shipping !== 0">
                <div class="col">
                  <strong>Shipping</strong>
                </div>
                <div class="col text-end fw-medium">${{ invoiceOrders[0].shipping.toFixed(2) }}</div>
              </div>
              <div class="row" v-if="invoiceOrders[0].fitting !== 0">
                <div class="col">
                  <strong>Fitting</strong>
                </div>
                <div class="col text-end fw-medium">${{ invoiceOrders[0].fitting }}</div>
              </div>
              <div class="row" v-if="invoiceOrders[0].tax !== 0">
                <div class="col">
                  <strong>Tax</strong>
                </div>
                <div class="col text-end fw-medium">${{ invoiceOrders[0].tax.toFixed(2) }}</div>
              </div>
              <div class="row" v-if="invoiceOrders[0].shipping !== 0">
                <div class="col">
                  <strong>Shipping</strong>
                </div>
                <div class="col text-end fw-medium">${{ invoiceOrders[0].shipping.toFixed(2) }}</div>
              </div>
              <div class="row" v-if="invoiceOrders[0].discount !== 0">
                <div class="col">
                  <strong>Discount</strong>
                </div>
                <div class="col text-end fw-medium">${{ invoiceOrders[0].discount.toFixed(2) }}</div>
              </div>
              <div class="row mt-4" v-if="invoiceOrders[0].grandtotal !== 0">
                <div class="col">
                  <strong>Grand Total</strong>
                </div>
                <div class="col text-end fw-bold">${{ invoiceOrders[0].grandtotal.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 3px 5px 5px #e8e8e8;
}

.status {
  border-radius: 15px;
  text-align: center;
  // background-color: #ff9f43;
  // color: #000000;
}

.status.order-placed {
  background-color: #3bcc7c;
  color: #ffffff;
}

.status.pending {
  background-color: #ff9f43;
  color: #000000;
}

.grand-total-section {
  padding: 15px;
  box-shadow: 0px 0px 30px 6px #c6c6c6;
}

.quantity-input {
  width: 80px;
  text-align: center;
}
</style>
