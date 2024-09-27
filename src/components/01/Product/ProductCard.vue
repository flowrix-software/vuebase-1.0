<script setup lang="ts">
// import promotionTag from '@/components/other/promotionTag.vue';
import { ref } from 'vue'
import { useCartStore } from '@/stores/Cart';

const CartStore = useCartStore()

const { item: { } } = defineProps(['item'])

const checkInCart = ref(0)
const productQty = ref(1)
const isProductInCart = (productId: string) => {
    // Iterate over the cart object and check if the product ID exists
    if (CartStore.cart.items) {
        var isincart = Object.values(CartStore.cart.items).filter((v) => v.slug == productId)
        if (isincart.length > 0) {
            productQty.value = isincart[0].qty
            checkInCart.value = 1
        } else {
            productQty.value = 0
            checkInCart.value = 0

        }
    }
}
const updateQuantity = (product: object, quantity: number) => {
    const SingleProduct = Object.values(CartStore.cart.items).find(item => item.slug === product.slug);
    CartStore.updateQuantity(SingleProduct, quantity)
    productQty.value = SingleProduct.qty
    console.log(SingleProduct)
}

const addToCart = async (product: object, qty: number) => {
    // router.push({ name: 'Cart' })
    useCartStore().addToCart(product, qty)
}

const imagesize = ((swatchImage: string) => {
    if (swatchImage) {
        let swatchImage320 = swatchImage.replace(/.webp/gi, '320.webp')
        return swatchImage320
    }
    return swatchImage
})
</script>

<template>
    <div class="product-card-item h-100 border rounded-3 h-100 d-flex flex-column justify-content-between ">
        <router-link class="h-100 d-flex flex-column justify-content-between " :aria-label="item.name"
            :to="{ name: 'Product', params: { slug: item.slug } }">
            <div>
                <div class="card-item-image"
                    :style="{ backgroundImage: 'url(' + imagesize(item.image) + ')', height: '273px' }">
                    <!-- <img :src="item.image" width="100%"/> -->
                    <span id="promotion-tag" v-if="item.promotionlabels != null">
                        <span id="promotion-text" :style="{ color: item.promotionlabels.promotionTagColor }"><span
                                v-html="item.promotionlabels.promotionTag"></span></span>
                        <!-- <promotionTag :color="item.promotionlabels.promotionTagBackgroundColor" /> -->
                    </span>
                </div>
                <div class="card-item-detail px-3 position-relative mt-4 mb-3 pt-4 d-block justify-content-between">
                    <h3 class="card-item-title">{{ item.name }}</h3>
                    <p class="d-flex flex-column item-price m-0">
                        <span class="h2 text-secondary text-end">
                            <small class="text-black">Price </small>
                            <span class="price_span">{{ item.price }}</span>
                        </span>
                        <span class="if-discounted" style="display: none">$<span id="dis_price">0.00</span></span>
                    </p>
                </div>
            </div>

            <router-link :aria-label="item.name" v-if="item.type == 'custom'"
                class="btn orange-btn d-block text-white btn-lg rounded-0 mt-2 d-inline-block"
                :to="{ name: 'Product', params: { slug: item.slug } }">Customise
                <span>
                    <span class="icon icon-arrow-right"></span><span class="icon mx-0 icon-arrow-right"></span>
                </span>
            </router-link>
        </router-link>
        {{ isProductInCart(item.slug) }}
        <span v-if="item.type != 'custom' && checkInCart == 0" 
            class="btn orange-btn d-block text-white btn-lg rounded-0 mt-2 d-inline-block" title="Add To Cart"
            :aria-label="'Add to Cart ' + item.name + ''" @click="addToCart(item, 1)">
            Add to Cart
            <span>
                <span class="icon icon-arrow-right"></span><span class="icon mx-0 icon-arrow-right"></span>
            </span>
        </span>
        <span v-if="item.type != 'custom' && checkInCart > 0"
            class="d-flex justify-content-between card-quantity-block">
            <span id="quantity-change" @click="updateQuantity(item, productQty - 1)">-</span>
            <span id="quantity-text">{{ productQty }}</span>
            <span id="quantity-change" @click="updateQuantity(item, productQty + 1)">+</span>
        </span>
    </div>
</template>
<style scoped lang="scss">
.product-card-item {
    overflow: hidden;

    .card-item-image {
        background-repeat: no-repeat;
        position: relative;
        background-size: cover;
        background-position: center;
    }

    .card-item-detail:before {
        content: "";
        position: absolute;
        top: 0;
        left: 1rem;
        height: 3px;
        width: 70px;
        background: var(--iseek-primary);

    }
}

.orange-btn {
    .icon {
        font-size: 12px;
        line-height: 0.9rem;
        margin-left: 10px;
        opacity: 1;
    }
}

#promotion-tag {
    width: 119px;
    height: 50px;
    display: block;
    position: absolute;
    top: 30px;
    left: -9px;

    #promotion-text {
        font-size: 13px;
        position: absolute;
        left: 21px;
        color: #fff;
        line-height: 1.2;
        width: 70%;
        height: 100%;
        display: flex;
        align-items: center;
        letter-spacing: 0.04rem;

        b {
            font-size: 111%;
        }
    }
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
        font-size: 24px;
        border-radius: 0px;
        cursor: pointer;

        &:hover {
            background: var(--iseek-secondary);
            color: var(--iseek-primary);
        }
    }
}
</style>