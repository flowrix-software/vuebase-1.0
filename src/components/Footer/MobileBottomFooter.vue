<script lang="ts" setup>
import australian_made from '@/assets/images/australian-made-large.webp';
</script>

<template>
    <div class="footer-additional d-block d-xl-none">
        <div class="container px-3 py-5 pb-4">
            <div class="row">
                <div class="col-12 col-md-6">
                    <ul class="list-unstyled list-inline footer-nav d-flex flex-wrap align-items-center justify-content-center row-gap-4 pb-5 pb-md-3 mb-0"
                        style="border-bottom: 1px solid rgba(54, 110, 172, .15);">
                        <li class="list-inline-item d-none d-md-inline-block"><a aria-label="our policies information"
                                href="#"><img width="36px" :src="australian_made" alt=""></a></li>
                        <li class="list-inline-item"><a aria-label="our policies information" href="#">Policies</a></li>
                        <li class="list-inline-item"><a aria-label="warranty information" href="#">Warranty</a></li>
                        <li class="list-inline-item"><a aria-label="terms and conditions information"
                                href="#">T&amp;Cs</a></li>
                        <li class="list-inline-item"><a aria-label="privacy policy information" href="#">Privacy</a>
                        </li>
                        <li class="list-inline-item"><a aria-label="child safety chains cords information"
                                href="#">Child Safety</a>
                        </li>
                        <!-- <li class="list-inline-item"><router-link aria-label="customer account"
                :to="{ name: 'Login' }">Account</router-link></li> -->
                    </ul>
                </div>

                <div class="col-12 col-md-6 text-center text-md-end py-5 py-md-0">
                    <a class="d-block d-md-none" href="#">
                        <img width="36px" :src="australian_made" alt="">
                    </a>
                    <div class="copyright mt-0">© Copyright I Seek Blinds Pty Ltd 2023. All rights reserved.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.footer-additional {
    background: #242a34;
}

.footer-nav {
    display: flex;

    li:first-child {
        margin: 0 !important;
    }

    li {
        margin: 0;
        margin-left: 25px;

        a {
            color: #aeb4bf;
            text-decoration: none;
            transition: all .3s cubic-bezier(.23, 1, .32, 1);
        }
    }

}

.copyright {
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #aeb4bf;
}

@media screen and (min-width:1366px) {
    .footer-last-column {
        margin-left: 100px !important;
    }

}
</style>