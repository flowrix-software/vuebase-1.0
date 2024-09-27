
<script lang="ts" src="@/template/Cart/CartTotalAndPromo.ts" />
<template>
    <div>
        <div class="row g-5">
            <div class="col-md-12">
                <div class="totals shadow rounded overflow-hidden">
                    <div class="cart_totals border w-100 p-4 shadow rounded-2">
                        <div class="row mb-3" v-if="cartData.itemtotal !== 0">
                            <div class="col">
                                <p class="mb-0 h2 fw-semibold">Product Total</p>
                            </div>
                            <div class="col text-end">
                                <p class="price mb-0 fw-bold text-secondary h2">${{ cartData.itemrrptotal.toFixed(2) }}
                                </p>
                            </div>
                        </div>
                        <div class="row mb-3" v-if="cartData.voucherdiscount !== 0">
                            <div class="col">
                                <p class="mb-0 h2 fw-semibold">Voucher Discount</p>
                            </div>
                            <div class="col text-end">
                                <p class="price mb-0 fw-bold text-secondary h2">${{ cartData.voucherdiscount.toFixed(2)
                                    }}</p>
                            </div>
                        </div>
                        <div class="row mb-3" v-if="cartData.servicesprice !== 0">
                            <div class="col">
                                <p class="mb-0 h2 fw-semibold">Service Price</p>
                            </div>
                            <div class="col text-end">
                                <p class="price mb-0 fw-bold text-secondary h2">${{ cartData.servicesprice.toFixed(2) }}
                                </p>
                            </div>
                        </div>
                        <div class="row mb-3" v-if="cartData.shipping !== 0">
                            <div class="col">
                                <p class="mb-0 h2 fw-semibold">Shipping</p>
                            </div>
                            <div class="col text-end">
                                <p v-if="cartData.shipping !== 0" class="price mb-0 fw-bold text-secondary h2">${{
                                    cartData.shipping.toFixed(2) }}</p>
                                <p v-else class="price mb-0 fw-bold text-secondary h2">Free</p>
                            </div>
                        </div>
                        <div class="row mb-3" v-if="cartData.itemdiscount !== 0">
                            <div class="col">
                                <p class="mb-0 h2 fw-semibold">Item Discount</p>
                            </div>
                            <div class="col text-end">
                                <p class="price mb-0 fw-bold text-secondary h2">${{ cartData.itemdiscount.toFixed(2) }}
                                </p>
                            </div>
                        </div>
                        <div class="row mb-3" v-if="cartData.subtotal !== 0">
                            <div class="col">
                                <p class="mb-0 h2 fw-semibold">Subtotal</p>
                            </div>
                            <div class="col text-end">
                                <p class="price mb-0 fw-bold text-secondary h2">${{ cartData.subtotal.toFixed(2) }}</p>
                            </div>
                        </div>
                        <div class="row mb-3" v-if="cartData.gst !== 0">
                            <div class="col">
                                <p class="mb-0 h2 fw-semibold">{{ cartData.gstlabel }} ({{ cartData.gstrate }}%)</p>
                            </div>
                            <div class="col text-end">
                                <p class="price mb-0 fw-bold text-secondary h2">${{ cartData.gst.toFixed(2) }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <p class="mb-0 fw-bold display-6 h2">Total</p>
                            </div>
                            <div class="col text-end">
                                <p class="mb-0 fw-bold text-secondary display-6 h2">${{ cartData.total.toFixed(2) }}</p>
                            </div>
                        </div>
                        <p class="small mt-4 my-5 mb-0">{{ cartData.gstincluded == false ? 'Exclusive' : 'Inclusive' }}
                            {{ cartData.gstlabel }} & our best price guarantee</p>
                        <router-link type="submit" :to="{ name: 'Checkout' }"
                            class="btn btn-secondary text-white w-100 mt-5 text-uppercase fw-bold h4">Proceed to
                            checkout</router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <h3 class="mb-3 coupon_code">Enter Coupon</h3>
                <form @submit.prevent="ApplyCoupon">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Enter Coupon Code Here"
                            aria-label="Enter Coupon Code Here" v-model="coupon" required
                            aria-describedby="button-addon2" />
                        <button class="btn text-white btn-primary px-5" type="submit" id="button-addon2">
                            Apply
                        </button>
                    </div>
                </form>
                <div id="couponcodesList" v-if="fetchCart.coupon.length > 0" class="d-flex gap-3 align-items-center">
                    <strong>Coupon Applied:</strong>
                    <span class="couponcode_item" v-for="(code, index) in fetchCart.coupon" :key="index">{{ code }}<i
                            @click="RemoveCoupon(index)" class="bi bi-x remove-single-coupon"></i></span>
                </div>
                <div v-if="Object.keys(fetchCart.errorResponseData).length > 0" class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
                    {{ fetchCart.errorResponseData.message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.totals {
    .cart_totals {
        tr {
            border-bottom: 1px solid #ccc;

            .head {
                font-weight: 600;
            }
        }

        p.mb-0.h2.fw-semibold,
        .price,
        .h2 {
            font-size: 18px;
            font-family: 'Metropolis'
        }
    }
}

.main,
.copy-button {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
}

.card {
    width: 400px;
    height: 180px;
    border-radius: 5px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    padding: 10px 10px;
    position: relative;

    &::after {
        position: absolute;
        content: "";
        height: 40px;
        right: -20px;
        border-radius: 40px;
        z-index: 1;
        top: 70px;
        box-shadow: -5px 0px 1px 1px #ccc;
        background-color: #fff;
        width: 40px;
    }

    &::before {
        position: absolute;
        content: "";
        height: 40px;
        left: -20px;
        border-radius: 40px;
        z-index: 1;
        top: 70px;
        box-shadow: 5px 0px 1px 1px #ccc;
        background-color: #fff;
        width: 40px;
    }
}

.co-img img {
    width: 100px;
    height: 100px;
}

.vertical {
    border-left: 5px dotted black;
    height: 100px;
    position: absolute;
    left: 40%;
}

.content {
    h1 {
        font-size: 35px;
        margin-left: -20px;
        color: #565656;

        span {
            font-size: 18px;
        }
    }

    h2 {
        font-size: 18px;
        margin-left: -20px;
        color: #565656;
        text-transform: uppercase;
    }

    p {
        font-size: 16px;
        color: #696969;
        margin-left: -20px;
    }
}


.copy-button {
    margin: 12px 0 -5px 0;
    height: 45px;
    border-radius: 4px;
    padding: 0 5px;
    border: 1px solid #e1e1e1;

    input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 15px;
    }

    button {
        padding: 5px 20px;
        background-color: #dc143c;
        color: #fff;
        border: 1px solid transparent;
    }
}

.coupon_code {
    font-size: 18px;
}

#couponcodesList {
    flex-wrap: wrap;

    .couponcode_item {
        border: 2px dashed red;
        padding: 10px;
        border-radius: 8px;
    }
}
</style>
