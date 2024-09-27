import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/Cart'

const fetchCart = useCartStore() as ErrorResponse
interface errorResponseData {
    message: string
}

interface ApplyCouponArgs {
    code: string;
    remove?: number; // Optional parameter 'remove'
}

interface ErrorResponse {
    ApplyCoupon(args: ApplyCouponArgs): any;
    // interface CartState {
    cart: Record<string, any>
    activeService: []
    coupon: string[]
    data: []
    responseData: []
    errorResponseData: errorResponseData
}
export default {
    name: 'CartTotalAndPromo',
    setup() {
        const coupon = ref<string>('')
        const couponCodes = ref<string[]>([])

        const cartData = computed(() => {
            return fetchCart.cart.totals || {}
        })

        couponCodes.value = fetchCart.coupon
        // Uncomment and update the following lines as needed
        // activeService.value = localStorage.getItem('activeService') ? JSON.parse(localStorage.getItem('activeService')) : ''
        // var configData: any = {}
        // configData.preferencetype = activeService.value.id
        // configData.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).items : []
        // await fetchCheckout.preferences(configData)
        // cartTotals.value = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).totals : []


        const ApplyCoupon = async () => {
            try {
                await fetchCart.ApplyCoupon({ code: coupon.value })
                couponCodes.value = fetchCart.coupon
                coupon.value = ''
            } catch (error) {
                coupon.value = ''
            }
        }

        const RemoveCoupon = async (removeIndex: number) => {
            try {
                await fetchCart.ApplyCoupon({ code: coupon.value, remove: removeIndex })
                couponCodes.value = fetchCart.coupon
                coupon.value = ''
            } catch (error) {
                coupon.value = ''
            }
        }

        // Return all the reactive properties and methods to be used in the template
        return {
            cartData,
            ApplyCoupon,
            RemoveCoupon,
            fetchCart
        };
    },
};