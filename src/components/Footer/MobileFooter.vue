<script lang="ts" setup>
import australian_made from '@/assets/images/australian-made-large.webp';
import visa from '@/assets/images/visa.webp';
import master_card from '@/assets/images/master-card.webp';
import paypal from '@/assets/images/paypal.webp';
import zip from '@/assets/images/zip.webp';
import MobileContactFooter from './MobileContactFooter.vue';
import MobileFooterMenu from './MobileFooterMenu.vue';
import MobileTopFooter from './MobileTopFooter.vue';
import MobileBottomFooter from './MobileBottomFooter.vue';

</script>

<template>

    <MobileTopFooter />

    <footer class="footer_section clearfix d-block d-xl-none" style="background-color:#2c333f;">
        <div class="container-fluid d-block d-xl-none">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="row justify-content-center">
                        <MobileFooterMenu />
                        <div class="col-auto footer-last-column pt-5">
                            <a class="primary-button order-now">Order now <span
                                    class="icon icon-arrow-right"></span></a>
                            <a class="seconday-button justify-content-center">
                                <span class="icon icon-samples"></span>
                                <span>Get free samples</span>
                            </a>
                            <MobileContactFooter />
                            <div class="followus mt-5 pt-3">
                                <h3 class="text-white mb-4  text-center">Follow Us</h3>
                                <ul class="list-unstyled justify-content-center footer-social-links">
                                    <li class="">
                                        <a href="https://www.facebook.com/Iseekblinds" aria-label="facebook"
                                            target="_blank">
                                            <span class="icon-facebook"></span>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="https://www.instagram.com/iseekblinds" aria-label="instagram"
                                            target="_blank">
                                            <span class="icon-instagram"></span>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="https://www.pinterest.com/iseekblinds" aria-label="pinterest"
                                            target="_blank">
                                            <span class="icon-pinterest"></span>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="https://www.youtube.com/user/iseekblindsnew" aria-label="youtube"
                                            target="_blank">
                                            <span class="icon-youtube"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div><!-- followus  End-->
                            <div class="paymentaccepted mt-5 pt-3 mb-5">
                                <h3 class="text-white text-center mb-4">Payments accepted</h3>
                                <ul class="list-unstyled justify-content-center payment-icons mb-5 pb-4">
                                    <li class=""><img :src="visa" alt=""></li>
                                    <li class=""><img :src="master_card" alt=""></li>
                                    <li class=""><img :src="paypal" alt=""></li>
                                    <li class=""><a href="#"><img :src="zip" alt=""></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div><!-- col-md-12  end-->
            </div>
        </div>
    </footer>

    <MobileBottomFooter />

</template>
<style scoped lang="scss">
footer .container {
    margin-left: auto;
    margin-right: auto;
    // max-width: 1440px;
    // padding-left: 20px;
    // padding-right: 20px;
    padding-bottom: 40px;
    padding-top: 60px;
    width: 100%;
    // padding-left: 125px;
    // padding-right: 125px;
}


.primary-button .icon {
    font-size: 1.2rem;
    line-height: 1;
    margin-left: 10px;
    opacity: .5;
    height: fit-content;
    position: relative;
    bottom: -5px;
}

.seconday-button {
    margin-top: 22px;

    .icon {
        font-size: 2rem;
        line-height: 2rem;
        margin-right: 10px;
    }
}

.info-items {
    .info-item {
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start;
        align-content: flex-start;
        margin-bottom: 10px;
    }

    .icon {
        font-size: 1.5rem;
        color: #aeb4bf;
        margin-right: 15px;
        line-height: 1;
    }

    .icon-envelope {
        font-size: 2.8rem;
        margin-right: 10px;
        margin-left: -8px;
        color: #aeb4bf;
        vertical-align: middle;
        line-height: 1;
    }

    a {
        color: #fff;
    }
}

.footer-social-links {
    display: flex;
    justify-content: flex-start;
    gap: 15px;

    a {
        align-items: center;
        background: #242a34;
        border-radius: 3px;
        display: flex;
        height: 44px;
        justify-content: center;
        text-decoration: none;
        transition: all .3s cubic-bezier(.23, 1, .32, 1);
        width: 44px;

        span {
            font-size: 2.6rem;
            line-height: 2.6rem;
        }

        &:hover {
            background: #37404f;
        }
    }
}
</style>