<script setup>
import { ref, computed } from 'vue'

import { useCartStore } from '@/stores/Cart'
const { from, product, service } = defineProps(['from', 'getFormData', 'product', 'service'])
import PopUp from '@/components/Product/PopUpCart.vue'
import { useRoute, useRouter } from 'vue-router' // Import useRoute from Vue Router
const route = useRoute() // Access the route object
const router = useRouter()

const queryParameters = route.query ? route.query : null
let productId = queryParameters?.customize ? queryParameters.customize : null
const newProduct = queryParameters?.copy ? productId = '' : productId = productId


const showError = ref(false)
const ErrorMessage = ref('')
const open = ref(false)
const closeerrorModal = () => {
  showError.value = false
  ErrorMessage.value = ''
}

const price_span = ref('')
const getFormData = () => {
  const customProductForm = document.querySelector('.customproductform');
  const form = customProductForm

  if (form) {
    const formData = new FormData(form)
    const formObject = {}

    const visibleFields = Array.from(formData.entries()).filter(([key]) => {
      const element = form.querySelector(`[name="${key}"]`)
      const parentElement = element.closest('.attribute-item')
        ? element.closest('.attribute-item')
        : element

      return parentElement && window.getComputedStyle(parentElement).display === 'block'
    })

    // Convert filtered data to formObject
    visibleFields.forEach(([key, value]) => {
      formObject[key] = value
    })

    //console.log(formObject)
    return formObject
  }
}
const addToCart = async (product, productId) => {
  let DontCheckError = 0;
  price_span.value = document.querySelector('.product-details .price_span') ? document.querySelector('.product-details .price_span').innerHTML : 0;
  var mainwidthelement = document.querySelector('.mainwidthInput')
  if (mainwidthelement) {
    var maintitle = mainwidthelement.getAttribute('data-title')
    var mainwidth = parseInt(mainwidthelement.value);

    var subwidths = document.querySelectorAll('.subWidthInput');
    if (mainwidth && subwidths.length > 0) {

      DontCheckError = subwidths.length;

      var allfieldsum = 0;
      var title = ''
      subwidths.forEach((subwidth, index) => {
        var grandparent = subwidth.parentElement.parentElement.parentElement.parentElement;
        const grandparentStyle = window.getComputedStyle(grandparent);
        if (grandparentStyle.display === 'none') {
          DontCheckError = DontCheckError - 1;
        } else {
          allfieldsum = parseInt(allfieldsum) + parseInt(subwidth.value);
          title += index == 0 ? '' : ' + ';
          title += subwidth.getAttribute('data-title')
        }

      });

      if (DontCheckError > 0) {
        if (allfieldsum != mainwidth) {
          showError.value = true
          ErrorMessage.value = `The total ${maintitle} must be equal to ${title}.`
          return false;
        }
      }
    }
  }


  var mainheightelement = document.querySelector('.mainHeightInput')
  if (mainheightelement) {
    var maintitlehieght = mainheightelement.getAttribute('data-title')
    var mainheight = parseInt(mainheightelement.value);

    var subheight = document.querySelectorAll('.subHeightInput');
    if (mainheight && subheight.length > 0) {
      DontCheckError = subwidths.length;
      var allfieldsum = 0;
      var title = ''
      subheight.forEach((subwidth, index) => {
        var grandparent = subwidth.parentElement.parentElement.parentElement.parentElement;
        const heightgrandparentStyle = window.getComputedStyle(grandparent);
        if (heightgrandparentStyle.display === 'none') {
          DontCheckError = DontCheckError - 1;
        } else {
          allfieldsum = parseInt(allfieldsum) + parseInt(subwidth.value)
          title += index == 0 ? '' : ' + ';
          title += subwidth.getAttribute('data-title')
        }
      });
      if (DontCheckError > 0) {
        if (allfieldsum != mainheight) {
          showError.value = true
          ErrorMessage.value = `The total ${maintitlehieght} must be equal to ${title} ${maintitlehieght}.`
          return false;
        }
      }
    }
  }



  const formData = getFormData();

  await useCartStore().addToCart(product, 1, formData, newProduct)
  if (useCartStore().addedResponse == 'success') {
    // initializeDataLayer(useCartStore().cart)
    open.value = true
  }

}
const initializeDataLayer = (cart, product) => {
  const productAdded = Object.values(cart.cart).filter((v) => v.id == product.id)
  var ecomarceItems = []
  // window.gtag = window.gtag || []
  // window.gtag('event', 'add_to_cart', {
  //   'items': [
  //     {
  //       'item_id': product.id,
  //       'item_name': product.name,
  //       'item_category': product.category,
  //       'quantity': 1, // or the quantity added
  //       'price': product.price,
  //       "item_list_id": 'The monetary unit price of the item, in units of the specified currency parameter.If a discount applies to the item, set price to the discounted unit price and specify the unit price discount in the discount parameter.'
  //     }
  //   ]
  // });
};
const closeModal = () => {
  open.value = false
}
</script>

<template>

  <template v-if="from == 'detailpage'">
    <button @click="addToCart(product, productId)" class="btn btn-secondary text-white py-2" type="button">
      <span v-if="productId">Update to Cart</span>
      <span v-else="productId">Add to Cart</span>
    </button>
    <div class="error-popup-modal" v-if="showError == true">
      <div class="error-body">
        <p class="text-danger text-wrap">{{ ErrorMessage }}</p>
        <span @click="closeerrorModal" class="btn btn-primary py-0 px-3">Close</span>
      </div>
    </div>
    <Teleport to="#app">
      <div v-if="open" class="modals">
        <PopUp @some-event="closeModal" :productData="product" :price="price_span" />
      </div>
    </Teleport>
  </template>
</template>
<style lang="scss" scoped></style>
