<script lang="ts" setup>
import visa from '@/assets/images/visa.webp';
import master_card from '@/assets/images/master-card.webp';
import paypal from '@/assets/images/paypal.webp';
import zip from '@/assets/images/zip.webp';
import ContactFooter from '@/components/Footer/ContactFooter.vue';
import FooterMenu from './FooterMenu.vue';
import TopFooter from './TopFooter.vue';
import BottomFooter from './BottomFooter.vue';

</script>

<template>

  <TopFooter />

  <footer class="footer_section clearfix d-none d-xl-block" style="background-color:#2c333f;">
    <div class="container d-none d-xl-block">
      <div class="row ">
        <FooterMenu />
        <div class="col-auto footer-last-column">
          <a class="primary-button order-now">Order now <span class="icon icon-arrow-right"></span></a>
          <a class="seconday-button justify-content-center">
            <span class="icon icon-samples"></span>
            <span>Get free samples</span>
          </a>
          <ContactFooter />
          <div class="followus mt-5 pt-3">
            <h3 class="text-white mb-4">Follow Us</h3>
            <ul class="list-unstyled footer-social-links">
              <li class="">
                <a href="https://www.facebook.com/Iseekblinds" aria-label="facebook page" target="_blank">
                  <span class="icon-facebook"></span>
                </a>
              </li>
              <li class="">
                <a href="https://www.instagram.com/iseekblinds" aria-label="instagram profile" target="_blank">
                  <span class="icon-instagram"></span>
                </a>
              </li>
              <li class="">
                <a href="https://www.pinterest.com/iseekblinds" aria-label="pinterest profile" target="_blank">
                  <span class="icon-pinterest"></span>
                </a>
              </li>
              <li class="">
                <a href="https://www.youtube.com/user/iseekblindsnew" aria-label="youtube" target="_blank">
                  <span class="icon-youtube"></span>
                </a>
              </li>
            </ul>
          </div><!-- followus  End-->
          <div class="paymentaccepted mt-5 pt-3">
            <h3 class="text-white mb-4">Payments accepted</h3>
            <ul class="list-unstyled payment-icons mb-0 pb-0">
              <li class=""><img :src="visa" alt=""></li>
              <li class=""><img :src="master_card" alt=""></li>
              <li class=""><img :src="paypal" alt=""></li>
              <li class=""><a aria-label="zippay" href="#"><img :src="zip" alt=""></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid d-block d-xl-none">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="accordion bg-transparent" id="accordionExample">
                <!-- <div class="accordion-item bg-transparent border-0" v-for="(menu, index) in footerMenuData"
                  :key="index">
                  <h2 class="accordion-header" :id="`heading${index}`">
                    <h3 class="py-2 accordion-button bg-transparent text-white collpased" type="button"
                      data-bs-toggle="collapse" :data-bs-target="`#collapse${index}`" aria-expanded="true"
                      :aria-controls="`collapse${index}`">
                      {{ menu.title }}
                    </h3>
                  </h2>
                  <div :id="`collapse${index}`" class="accordion-collapse collapse bg-transparent"
                    :aria-labelledby="`heading${index}`" data-bs-parent="#accordionExample">
                    <div class="accordion-body bg-transparent">
                      <ul class="mt-4 ps-3 list-unstyled">
                        <li v-for="(item, index) in menu.children" :key="index">
                          <a :href="wordpressUrl + item.url">{{ item.title }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="col-auto footer-last-column pt-5">
              <!-- <router-link :to="{ name: 'Shop' }" class="primary-button order-now">Order now <span
                  class="icon icon-arrow-right"></span></router-link>
              <router-link :to="{ name: 'samples' }" class="seconday-button justify-content-center">
                <span class="icon icon-samples"></span>
                <span>Get free samples</span>
              </router-link> -->
              <div class="contact-footer text-center">
                <h3 class="text-white">Contact Us</h3>
                <ul class="info-items list-unstyled">
                  <li class="phone info-item justify-content-center">
                    <span class="icon icon-phone"></span>
                    <a class="text-center" href="tel:+611300664257">1300 664 257</a>
                  </li>
                  <li class="email info-item justify-content-center">
                    <span class="icon icon-envelope"></span>
                    <a href="mailto:sales@iseekblinds.com.au">sales@iseekblinds.com.au</a>
                  </li>
                  <li class="address info-item align-items-center flex-column">
                    <span class="icon icon-map"></span>
                    <a href="https://www.google.com/maps/place/iseekblinds/@-37.6860427,144.9476623,15z/data=!4m6!3m5!1s0x6ad64f46c67e4987:0xfd88ecd7e7dbc84c!8m2!3d-37.6860427!4d144.9476623!16s%2Fg%2F1tdwf1x7?entry=ttu"
                      target="_blank" rel="noopener noreferrer">
                      49 Lakeside Dr <br>
                      Broadmeadows, VIC 3047<br>
                      Melbourne, Australia
                    </a>
                  </li>
                </ul>
              </div>
              <div class="followus mt-5 pt-3">
                <h3 class="text-white mb-4  text-center">Follow Us</h3>
                <ul class="list-unstyled justify-content-center footer-social-links">
                  <li class="">
                    <a href="https://www.facebook.com/Iseekblinds" aria-label="facebook" target="_blank">
                      <span class="icon-facebook"></span>
                    </a>
                  </li>
                  <li class="">
                    <a href="https://www.instagram.com/iseekblinds" aria-label="instagram" target="_blank">
                      <span class="icon-instagram"></span>
                    </a>
                  </li>
                  <li class="">
                    <a href="https://www.pinterest.com/iseekblinds" aria-label="pinterest" target="_blank">
                      <span class="icon-pinterest"></span>
                    </a>
                  </li>
                  <li class="">
                    <a href="https://www.youtube.com/user/iseekblindsnew" aria-label="youtube" target="_blank">
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

  <BottomFooter />

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

.accordion-button {
  padding: 19px 20px 18px !important;
  border-bottom: 1px solid rgba(54, 110, 172, 0.15);
  box-shadow: none !important;

  &::after {
    background-image: none !important;
    font-size: 1.2rem;
    line-height: 3.2rem;
    background: rgba(54, 110, 172, 0.15);
    border-radius: 50%;
    color: #fff;
    height: 32px;
    position: absolute;
    right: 20px;
    text-align: center;
    top: 15px;
    transform: rotate(-90deg);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    width: 32px;
    font-family: 'isb-icons' !important;
    content: '\e900' !important;
  }
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
