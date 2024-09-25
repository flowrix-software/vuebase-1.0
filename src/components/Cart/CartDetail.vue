<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/Cart'
type CartItem = {
  name: string;
  // other properties...
};
const route = useRoute()
const fetchCart = useCartStore()

const cartData = computed(() => {
  const cartItems = fetchCart.cart.items
  return cartItems
})

const removeFromCart = (productId: string,product: Object) => {
  fetchCart.removeFromCart(productId)
  window.gtag = window.gtag || []
    window.gtag('event', 'remove_from_cart', {
        'items': [
        {
            'item_id': product?.id,
            'item_name': product?.name,
            'item_category': product?.category,
            'quantity': 1, // or the quantity added
            'price': product?.pricefloat,
        }
        ],
        ...product?.options.values
    });
}

const isObjectEmpty = computed(() => {
  if (fetchCart.cart.items !== undefined) {

    const itemNames = Object.values<CartItem>(fetchCart.cart.items).map((item) => item.name);
    const checkForMeasure = itemNames.includes('Check Measure')

    if (checkForMeasure && itemNames.length === 1) {
      return false // Only 'Check Measure' is present
    }

    return itemNames.length > 0
  } else {
    return false
  }
});

const dvidedsummary = ((sammarydata: any) => {
  let sumary = []
  let firstMidpoint = Math.ceil(sammarydata.length / 3);
  let secondMidpoint = Math.ceil((sammarydata.length * 2) / 3);

  sumary[0] = sammarydata.slice(0, firstMidpoint);
  sumary[1] = sammarydata.slice(firstMidpoint, secondMidpoint);
  sumary[2] = sammarydata.slice(secondMidpoint);
  // sumary.push({firstHalf})
  // sumary.push({secondHalf})
  return sumary
});

const toggleClass = (element: Element, className: string) => {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}

const openBundle = (id: string) => {
  const bundle = document.querySelector(`.bundle_${id}`)
  const elems = document.querySelector(`.open_bundle${id}`)?.querySelector('.fas')

  if (bundle && elems) {
    toggleClass(elems, 'fa-angle-down')
    toggleClass(elems, 'fa-angle-up')
    toggleClass(bundle, 'd-none')
  }
}

const openAttributes = (id: string) => {
  const attributes = document.querySelector(`.attributes_${id}`)
  const elems = document.querySelector(`.open_attributes${id}`)?.querySelector('.fas')

  if (attributes && elems) {
    toggleClass(elems, 'fa-angle-down')
    toggleClass(elems, 'fa-angle-up')
    toggleClass(attributes, 'd-none')
  }
}

</script>
<template>
  <!-- <pre>
		{{ cartData }}
	</pre> -->
  <div>

    <div class="col-md-12 item-row bg-white p-4 position-relative mb-5" v-for="(product, productId) in cartData"
      :key="productId">

      <a @click="removeFromCart(productId,product)" class="icon-cross-02 product-remove-icon"></a>

      <div class="row g-4 g-md-3" :class="{ 'align-items-start': product.type !== 'custom' }">
        <div class="col-md-2">
          <img :src="product.image" class="img-fluid" :alt="product.name" srcset="">
        </div>
        <div class="col-md-10 d-flex flex-column justify-content-between">
          <div class="row">
            <div class="col-md-7">
              <h2 class="fw-bold align-items-center">{{ product.name }} </h2>
              <p class="fw-bold small" v-if="product.height || product.width">Dimensions: <span>{{ product.width }}mm
                  x {{ product.height }}mm</span></p>
              <p class="m-0" v-if="product.type == 'sample'">Free Sample</p>
              <div class="accordion accordion-flush" v-if="product.type == 'bundle'"
                :id="`accordionFlush${product.rowId}`">
                <div class="accordion-item">
                  <h3 class="accordion-header d-inline-block">
                    <button class="accordion-button collapsed me-2" type="button" data-bs-toggle="collapse"
                      :data-bs-target="`#flush-${product.rowId}`" aria-expanded="false"
                      :aria-controls="`flush-${product.rowId}`">
                      View Bundle
                    </button>
                  </h3>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="fw-bold me-2 text-center mb-2">Qty</div>
              <div v-if="product.pricefloat > 0" class="d-flex justify-content-between card-quantity-block">
                <span id="quantity-change"
                  @click="fetchCart.updateQuantity(product, product.qty - 1)">-</span>
                <span id="quantity-text">{{ product.qty }}</span>
                <span id="quantity-change" @click="fetchCart.updateQuantity(product, product.qty + 1)">+</span>
              </div>
              <div v-else class="quantity d-grid justify-content-center">
                <!-- <div v-if="product.pricefloat > 0" class="d-flex">
                      <div class="fw-bold me-2">Qty</div>
                      <button :disabled="product.qty <= 1" class="btn btn-light btn-sm border" @click="
                        fetchCart.updateQuantity(productId, (product.qty = product.qty - 1))
                        ">
                        -
                      </button>
                      <input disabled type="number" name="qty" min="1" id="quantity" class="text-center border"
                        style="width: 60px; padding-left: 15px" @change="fetchCart.updateQuantity(productId, product.qty)"
                        v-model="product.qty" />
                      <button class="btn btn-light btn-sm border" @click="
                        fetchCart.updateQuantity(productId, (product.qty = product.qty + 1))
                        ">
                        +
                      </button>
                    </div> -->
                <div>{{ product.qty }}</div>
              </div>
            </div>
            <div class="justify-content-end d-flex col-md-3">
              <div class="text-start">
                <div class="fw-bold text-center mb-2">Total</div>
                <span class="h3 text-secondary">
                  ${{ (product.pricefloat * product.qty).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
          <div class="row mt-0 g-4 align-items-center">
            <div class="col-md-4">
              <div class="accordion accordion-flush" v-if="product.type == 'bundle'"
                :id="`accordionFlush${product.rowId}`">
                <div class="accordion-item">
                  <!-- <h3 class="accordion-header d-inline-block">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          :data-bs-target="`#flush-${product.rowId}`" aria-expanded="false"
                          :aria-controls="`flush-${product.rowId}`">
                          View Bundle
                        </button>
                      </h3> -->
                  <div :id="`flush-${product.rowId}`" class="accordion-collapse collapse"
                    :data-bs-parent="`#accordionFlush${product.rowId}`">
                    <div class="accordion-body p-0">
                      <p class="fw-bold mt-3 mb-3">What's in the Bundle</p>
                      <div class="table-responsive">
                        <table class="table table-light">
                          <thead>
                            <tr>
                              <th width="30%" scope="col">Part Name</th>
                              <th width="10%" class="text-center" scope="col">Qty</th>
                              <th width="10%" class="text-end" scope="col">Unit Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="" v-for="(bundle, index) in product.bundle" :key="index">
                              <td class="align-middle">
                                <p class="fw-medium text-primary mb-0">{{ bundle.name }}</p>
                              </td>
                              <td class="align-middle text-center">{{ bundle.qty }}</td>
                              <td class="align-middle text-end">{{ bundle.price }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion accordion-flush" v-if="product.type == 'custom'"
                :id="`accordionFlush${product.rowId}`">
                <div class="accordion-item">
                  <h3 class="accordion-header">
                    <button class="accordion-button collapsed me-2" type="button" data-bs-toggle="collapse"
                      :data-bs-target="`#flush-${product.rowId}`" aria-expanded="false"
                      :aria-controls="`flush-${product.rowId}`">
                      Show selected options
                    </button>
                  </h3>
                </div>
              </div>
            </div>
            <div
              class="col-md-8 text-md-end d-flex justify-content-end gap-4 align-items-center flex-column flex-md-row"
              v-if="product.type == 'custom'">
              <div>
                <!-- <i @click="removeFromCart(productId)" class="fa fa-trash text-secondary m-0 p-0"
                  style="font-size: 12px; cursor:pointer;">
                </i> -->
              </div>
              <router-link :aria-label="product.name" class="icon-link icon-link-hover d-flex align-items-start"
                :to="{ name: 'Product', params: { slug: product.slug }, query: { customize: productId } }"><i
                  class="bi bi-pencil-square"></i> Edit this product
              </router-link>

              <a :href="`/product/${product.slug}/?customize=${productId}&copy=true`" class="orange-btn"
                data-v-c970699f="">Create similar product</a>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="accordion accordion-flush" v-if="product.type == 'custom'"
                :id="`accordionFlush${product.rowId}`">
                <div :id="`flush-${product.rowId}`" class="accordion-collapse collapse"
                  :data-bs-parent="`#accordionFlush${product.rowId}`">
                  <div class="accordion-body p-0">

                    <p class="fw-bold mt-3 mb-1">Options</p>
                    <div class="options-gid">
                      <div v-for="colum in dvidedsummary(product.options.summary)">
                        <div class="row w-100" v-for="(item, index) in colum" :key="index">
                          <div class="col text-wrap-custom">
                            <b :title="item.name" class="key mb-0 text-sm">{{ item.name }}:</b>
                          </div>
                          <div class="col-auto text-end">
                            <p class="value mb-0 text-end">{{ item.value }}</p>
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
      </div>

    </div>


    <div class="row d-none">
      <div class="col-md-12">
        <div class="table-responsive shadow mb-5 rounded overflow-hidden" v-if="isObjectEmpty">
          <table class="table cart">
            <thead class="table-primary shadow-md">
              <tr>
                <th class="bg-primary text-white p-3 px-1 text-center" scope="col">Image</th>
                <th class="bg-primary text-white p-3 px-1" scope="col">Product Details</th>
                <th class="bg-primary text-white p-3 px-1  text-end" scope="col">Price</th>
                <th class="bg-primary text-white p-3 px-1 text-center" scope="col">Quantity</th>
                <th class="bg-primary text-white p-3 px-1 pe-2 text-end" scope="col">Total</th>
              </tr>
            </thead>
            <tbody v-for="(product, productId) in cartData" :key="productId">
              <tr v-if="product.type !== 'service'">
                <td width="20%" class="p-3 px-1" rowspan="2">
                  <div v-if="product.iconcolor" class="swatch-img" :style="{ backgroundColor: product.iconcolor }">
                  </div>
                  <img style="height: 50px" class="swatch-img" v-else-if="product.swatch" :src="product.swatch"
                    :alt="product.title" />
                  <img class="product-img" style="height: 50px;width:auto" v-else-if="product.image"
                    :src="product.image" :alt="product.title" />
                </td>
                <td width="" class="p-3 px-1">
                  <div class="image-wrapper" style="display: grid">
                    <div>
                      <h4 style="white-space: nowrap;line-height: 31px;" class="text-primary fw-bold mb-0"
                        v-if="product.title">
                        {{ product.title }}
                      </h4>
                      <h5 style="white-space: unset" class="text-primary fw-bold mb-0" v-else>
                        {{ product.name }}
                      </h5>
                      <small v-if="product.name && product.type != 'simple'" class="dimensions d-flex gap-2">
                        <span v-if="product.sku"><b>sku:</b> 123</span>|
                        <span><b>Width: </b>{{ product.width }} mm X <b>Drop: </b>{{ product.height }} mm</span>
                      </small>
                      <p class="mb-0 fw-semibold text-uppercase" style="white-space: nowrap" v-if="product.list">
                        <i class="bi bi-arrow-right-short"></i>
                        <span>{{ product.list }}</span>
                      </p>
                    </div>
                    <div class="gap-3 mt-2 align-items-md-center d-flex flex-wrap" v-if="route.path.includes('cart')">
                      <a @click="removeFromCart(productId,product)" class="remove-title small"><i
                          class="bi bi-trash"></i><span>Remove</span></a>
                    </div>
                  </div>
                  <a href="javascript:void(0);" rel="no-follow" :class="`open_bundle${product.id} mt-2`"
                    v-if="product.type == 'bundle'" @click="openBundle(product.id);">What's in the Bundle <i
                      class="fas fa-angle-down"></i></a>
                  <a href="javascript:void(0);" rel="no-follow" :class="`open_attributes${product.id} mt-2`"
                    v-if="product.type == 'custom'" @click="openAttributes(product.id);">Product's Selected Options <i
                      class="fas fa-angle-down"></i></a>
                </td>
                <td width="" class="p-3 px-1   text-end">
                  <div class="price d-flex flex-column" v-if="product.price">
                    <div style="line-height: 31px;">
                      <!-- <span>Product:</span> -->
                      {{ product.price }}
                    </div>
                    <!-- <div v-if="product.service">
                      Service: ${{ product.service.servicePrice }}
                    </div> -->
                  </div>
                  <div class="price" v-else>0.00</div>
                </td>
                <td width="" class="p-3 px-1  text-center">
                  <div class="quantity d-grid justify-content-center">
                    <div v-if="product.pricefloat > 0" class="d-flex">
                      <!--route.path.includes('checkout') || -->

                      <button :disabled="product.qty <= 1" class="btn btn-light btn-sm border" @click="
                        fetchCart.updateQuantity(productId, (product.qty = product.qty - 1))
                        ">
                        -
                      </button>
                      <input disabled type="number" name="qty" min="1" id="quantity" class="text-center border"
                        style="width: 60px; padding-left: 15px"
                        @change="fetchCart.updateQuantity(productId, product.qty)" v-model="product.qty" />
                      <button class="btn btn-light btn-sm border" @click="
                        fetchCart.updateQuantity(productId, (product.qty = product.qty + 1))
                        ">
                        +
                      </button>
                    </div>
                    <div v-else>{{ product.qty }}</div>
                  </div>
                </td>
                <td width="" class="p-3 px-1 pe-2   text-end">
                  <div class="price" v-if="product.pricefloat > 0" style="line-height: 31px;">
                    ${{ (product.pricefloat * product.qty).toFixed(2) }}
                  </div>
                  <div class="total" v-else>Free Sample</div>
                </td>
              </tr>
              <tr :class="`d-none attributes_${product.id}`" v-if="product.options && product.type == 'custom'">
                <td class="product-summary" colspan="4">
                  <div class="grid bg-light p-4 w-100">
                    <div class="grid" v-for="(value, key) in product.options.values" :key="key">
                      <div>
                        <p class="key mb-0 text-sm">{{ key }}:</p>
                      </div>
                      <div>
                        <p class="value mb-0 text-end">{{ value }}</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr :class="`d-none bundle_${product.id}`" v-if="product.options && product.type == 'bundle'">
                <td class="product-summary p-2" colspan="4">
                  <div class="bg-light px-4 pt-2 w-100">
                    <table class="table">
                      <tr v-for="(prod, key) in product.bundle" class="border-bottom" :key="key">
                        <td width="50%" class="p-1">
                          <h6 style="white-space: nowrap" class="text-primary fw-bold mb-0" v-if="prod.title">
                            {{ prod.title }}
                          </h6>
                          <h6 style="white-space: nowrap;background:none;" class="text-primary mb-0 pb-0" v-else>
                            {{ prod.name }}
                          </h6>
                          <small class="dimensions d-flex gap-2 mt-0 pt-0" style="background:none;">
                            <span v-if="product.sku"><b>sku:</b> 123</span>
                          </small>
                        </td>
                        <td width="13%" class=" p-1 text-end">$5,260.00</td>
                        <td width="27%" class=" p-1 text-center">{{ prod.qty }}</td>
                        <td width="20%" class=" p-1 text-end">$5260.00</td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- For Mobile Screens -->
    <div class="row d-none d-md-none">
      <div class="col-md-12 mb-5">
        <div class="card">
          <div v-for="(product, productId) in cartData" :key="productId">
            <!-- Product Information -->
            <div class="p-3" v-if="product.type !== 'service'">
              <div v-if="product.iconcolor" class="swatch-img"
                :style="{ backgroundColor: product.iconcolor, height: '100px' }"></div>
              <div v-else-if="product.swatch">
                <img :src="product.swatch" :alt="product.title" class="img-fluid" />
              </div>
              <div v-else-if="product.image">
                <img :src="product.image" :alt="product.title" class="img-fluid" />
              </div>

              <div class="py-4">
                <h4 class="text-primary fw-bold mb-0" v-if="product.title || product.name">
                  {{ product.title || product.name }}
                </h4>
                <small v-if="product.name && product.type !== 'simple'" class="dimensions">
                  <b>Width: </b>{{ product.width }} mm X <b>Drop: </b>{{ product.height }} mm
                </small>
                <p class="mb-0 fw-semibold text-uppercase" style="white-space: nowrap" v-if="product.list">
                  <i class="bi bi-arrow-right-short"></i>
                  <span>{{ product.list }}</span>
                </p>
              </div>

              <!-- Actions -->
              <div class="d-flex gap-3 align-items-center justify-content-center" v-if="route.path.includes('cart')">
                <!-- <a
                  v-if="product.name"
                  :href="`/ezilux_vue/product/${product.slug}/?customize=${productId}&copy=true`"
                  class="btn btn-primary"
                  role="button"
                  >Add More</a
                >
                <a
                  v-if="product.name"
                  :href="`/ezilux_vue/product/${product.slug}/?customize=${productId}`"
                  class="btn btn-primary"
                  role="button"
                  >Modify</a
                > -->
                <a @click="removeFromCart(productId,product)" class="remove-title">
                  <i class="bi bi-trash"></i><span>Remove</span>
                </a>
              </div>

              <!-- Price, Quantity and Total -->
              <div class="d-flex flex-wrap justify-content-between mt-4">
                <div class="d-flex flex-column">
                  <div v-if="product.price">
                    <p class="text-center fw-bold m-0 my-1">Price</p>
                    <p>{{ product.price }}</p>
                  </div>
                  <div v-else>
                    <p class="text-center fw-bold m-0 my-1">Price</p>
                    <p>0.00</p>
                  </div>
                </div>

                <div class="d-flex flex-column">
                  <p class="text-center fw-bold m-0 my-1">Quantity</p>
                  <div v-if="product.price" class="d-flex">
                    <!-- Quantity buttons -->
                    <button type="button" class="btn btn-light btn-sm border"
                      @click="fetchCart.updateQuantity(productId, product.qty - 1)">
                      -
                    </button>
                    <input disabled type="number" name="qty" min="1" id="quantity" class="text-center border"
                      style="width: 60px; padding-left: 0px" @change="fetchCart.updateQuantity(productId, product.qty)"
                      v-model="product.qty" />
                    <button type="button" class="btn btn-light btn-sm border"
                      @click="fetchCart.updateQuantity(productId, product.qty + 1)">
                      +
                    </button>
                  </div>
                  <div v-else class="text-center">{{ product.qty }}</div>
                </div>

                <div class="d-flex flex-column">
                  <div v-if="product.price">
                    <p class="text-center fw-bold m-0 my-1">Total</p>
                    <p class="fw-bold">${{ (product.pricefloat * product.qty).toFixed(2) }}</p>
                  </div>
                  <div v-else>
                    <p class="fw-bold m-0 my-1">Total</p>
                    <p>Free Sample</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="product.options && product.type !== 'service'" class="m-4">
              <!-- Options -->
              <div class="row bg-light" v-for="(value, key) in product.options.values" :key="key">
                <div class="col text-sm border">{{ key }}:</div>
                <div class="col text-sm border">{{ value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- For Mobile Screens -->
  </div>
</template>
<!-- <script type="text/javascript">


</script> -->
<style lang="scss" scoped>
.text-wrap-custom {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.accordion-button {
  padding: 0 !important;
  font-size: 1.3rem;

  // border-bottom: 0;
  &:not(.collapsed) {
    background-color: white;

    &::after {
      transform: rotate(180deg);
    }
  }

  &::after {
    font-size: 1rem;
    top: unset;
    right: 0;
    color: var(--iseek-secondary);
  }
}

.cart {
  .swatch-img {
    height: 100px;
    width: 100px;
  }

  .product-img {
    height: 200px;
    width: 200px;
  }

  tbody {
    border-bottom: 1px solid red;
  }

  tr {
    border-color: #fff;
  }

  a {
    cursor: pointer;
  }

  .product-summary {
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      .grid {
        grid-template-columns: 1fr 1fr;
        border: 1px solid #eee;
        padding: 5px;

        p {
          font-size: 15px;

          &.key {
            font-weight: 600;
          }
        }
      }
    }
  }
}

.product-remove-icon {
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  background: rgba(54, 110, 172, .15);
  border-radius: 50%;
  height: 20px;
  position: absolute;
  right: 6px;
  top: 6px;
  width: 20px;
}

.item-row {
  border: 1px solid var(--iseek-border-color);
  box-shadow: 0px 3px 5px 5px #e8e8e8;
}

.card {
  box-shadow: 0px 3px 5px 5px #e8e8e8;
}

.card-quantity-block {
  span#quantity-text {
    width: 50%;
    border: 1px solid #E9E9E9;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-size: 18px;
    font-weight: 600;
  }

  span#quantity-change {
    width: 25%;
    background: var(--iseek-primary);
    color: white;
    text-align: center;
    font-size: 18px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: var(--iseek-secondary);
      color: var(--iseek-primary);
    }
  }
}

.options-gid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  font-size: 12px;
}

.icon-cross-02:before {
  content: '\e907';
}

@media screen and (max-width:768px) {
  .options-gid {
    display: grid;
    grid-template-columns: 1fr !important;
    column-gap: 10px;
    font-size: 12px;

    >.row {
      border-bottom: 1px solid #e9e9e9;
      padding: 2px 0;
      margin: 0;

      >* {
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>