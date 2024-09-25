<script setup lang="ts">
import { computed, ref } from 'vue'
import AddMenuIcon1 from '@/assets/images/menu/menu-icon-add-01.svg'
import AddMenuIcon2 from '@/assets/images/menu/menu-icon-add-02.svg'
import AddMenuIcon3 from '@/assets/images/menu/menu-icon-add-03.svg'
import { useCompanyProfile } from '@/stores/CompanyProfile'
import { Swiper, SwiperSlide } from 'swiper/vue'
// core version + navigation, pagination modules:
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useNavMenu } from '@/stores/NavMenu'

const NavMenu = useNavMenu()
const CompanyProfile = useCompanyProfile()
import Menu from '@/components/Menu/MainMenu.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore';
import { useCartStore } from '@/stores/Cart'
const wordpressUrl = import.meta.env.VITE_APP_WORDPRESS_URL;
// const eventBus = useEventBus()
// const carsStore = useCarsStore()

const authStore = useAuthStore()
const cartStore = useCartStore()
const userStore = useUserStore()
// const loading = ref(false)

interface Menu {
  location: string
  items: any
}

const companyProfile = computed(() => CompanyProfile.profile)
const menuData = computed<Menu>(() =>{
  
 const headmenu =  NavMenu.Menu.filter((menu) => menu.location=='header')[0]
 return headmenu

});

const userData = computed(() => userStore.user?.user.data || {});

const mobile_menu = ref(false)
const OpenMobileMenu = () => {
  if (mobile_menu.value) {
    mobile_menu.value = false
  } else {

    mobile_menu.value = true
  }
}
</script>

<template>
  <header class="header-desktop sticky sticky-top">
    <section class="bg-primary p-1">
      <div class="container">
        <Swiper class="header-top-slider" :slides-per-view="1" :loop="true" :space-between="15" :centered-slides="true"
          :breakpoints="{
            768: {
              slidesPerView: 1,
            },
          }">
          <swiper-slide>
            <div class="text-white text-center align-items-center d-flex justify-content-center gap-2"><i
                class="fa fa-circle me-3" style="font-size: 5px;"></i>Need Expert Advice? Book A<a
                class="text-white fw-bold text-decoration-none" href="https://calendly.com/iseekblinds">Free Video
                Consultation</a></div>
          </swiper-slide>
          <swiper-slide>
            <div class="text-white text-center align-items-center d-flex justify-content-center gap-2"><i
                class="fa fa-circle me-3" style="font-size: 5px;"></i>Need Expert Advice? Book A<a
                class="text-white fw-bold text-decoration-none" href="https://calendly.com/iseekblinds">Free Video
                Consultation</a></div>
          </swiper-slide>
        </Swiper>
      </div>
    </section>
    <section class="bg-info d-none d-md-block">
      <div class="container">
        <div class="row text-end justify-content-end">
          <div class="col-md-6">
            <ul class="nav top-nav justify-content-end">
              <li class="nav-item">
                <a class="nav-link" href="/blog/inspiration/">Inspiration</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/blog">Blog & Resources</a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link"
                  :to="{ name: 'Categories', params: { slug: 'blinds-spare-parts' } }">Spare
                  Parts</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact-us">Contact Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="tel:1300664257"><span class="icon-phone me-2"></span>1300 664 257</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="p-2 d-none d-md-block">
      <div class="container position-relative">
        <div class="row justify-content-end">
          <div class="col-md-6">
            <a :href="wordpressUrl" class="logo-link" v-if="companyProfile">
              <img :src="companyProfile?.logo || '../assets/images/logo.svg'" fetchpriority="high"
                alt="iSeek blinds Logo" class="logo img-fluid" />
            </a>
          </div>
          <div class="col-md-6 py-4">


            <ul class="header-links m-0">
              <li>
                <router-link
                  :to="userData && Object.keys(userData).length > 0 ? { name: 'Dashboard' , params: { tab: 'account' } } : { name: 'Login' }"
                  class="icon-account">
                  <div v-if="userData && Object.keys(userData).length > 0">
                    {{ userData.fullname }}
                    <!-- <span>{{ userData.user.fullname }}</span> -->
                  </div>
                  <span v-else>My Account</span>
                </router-link>
              </li>
              <li data-block="samples-minicart" class="samples-minicart-wrapper">
                <router-link :to="{ name: 'Samples' }" class="action icon-samples">
                  <span class="text">Samples</span>
                </router-link>
              </li>
              <li>
                <router-link class="action icon-showcart" :to="{ name: 'Cart' }">
                  <span class="text">My Cart</span>
                  <span class="counter qty" :class="{ 'empty': cartStore.itemsCount == 0 }">
                    <span class="counter-number">{{ cartStore.itemsCount }}</span>
                    <span class="counter-label">
                    </span>
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="border-top border-bottom position-relative d-none d-md-block">
      <div class="container">
        <div class="row justify-content-end align-items-center">
          <div class="col-12 col-md">
            <Menu :menuData="menuData" />
          </div>
          <div class="col-md-auto d-flex align-items-center justify-content-end gap-3 py-0">
            <router-link :to="{ name: 'Samples' }" class="seconday-btn">
              <span class="icon icon-samples"></span>
              <span>Get free samples</span>
            </router-link>
            <router-link class="orange-btn" :to="{ name: 'ShopAll' }">Order now <span
                class="icon icon-arrow-right"></span></router-link>
          </div>
        </div>
      </div>
    </section>
  </header>
  <header class="d-md-none sticky-top bg-white border-bottom mobile_menu">
    <div class="container">
      <div class="row row-cols-3 py-3 py-md-0 align-items-center">
        <div class="col">
          <ul class="header-links m-0">
            <li data-block="samples-minicart" class="samples-minicart-wrapper">
              <span class="action" id="mobilemenuopenner" rel="nofollow"
                :class="{ 'icon-menu': !mobile_menu, 'icon-close': mobile_menu }" @click="OpenMobileMenu">
                <span class="text">Menu</span>
              </span>
            </li>
            <li>
              <a class="action icon-phone-link" href="#">
                <span class="text">Contact</span>
                <span class="counter qty empty d-none d-xl-block"
                  data-bind="css: { empty: !!getCartParam('summary_count') == false }, blockLoader: isLoading">
                  <span class="counter-number"></span>
                  <span class="counter-label">
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col">
          <a :href="wordpressUrl" class="logo-links" v-if="companyProfile">
            <img :src="companyProfile?.logo || '../assets/images/logo.svg'" fetchpriority="high" alt="iSeek blinds Logo"
              class="logo img-fluid" />
          </a>
        </div>
        <div class="col">
          <ul class="header-links m-0">
            <li data-block="samples-minicart" class="samples-minicart-wrapper">
              <a class="action icon-samples" href="#" data-bind="scope: 'samples_minicart_content'">
                <span class="text">Samples</span>
              </a>
            </li>
            <li>
              <router-link class="action icon-showcart" :to="{ name: 'Cart' }">
                <span class="text">My Cart</span>
                <span class="counter qty" :class="{ 'empty': cartStore.itemsCount == 0 }"
                  data-bind="css: { empty: !!getCartParam('summary_count') == false }, blockLoader: isLoading">
                  <span class="counter-number">{{ cartStore.itemsCount }}</span>
                  <span class="counter-label">
                  </span>
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="mobile_menu" class="mobile_menu">
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item" v-for="(menu, index) in menuData.items" :key="index">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              :data-bs-target="`#panelsStayOpen-collapse${index}`" aria-expanded="true"
              :aria-controls="`panelsStayOpen-collapse${index}`">
              {{ menu.title }}
            </button>
          </h2>
          <div :id="`panelsStayOpen-collapse${index}`" class="accordion-collapse collapse">
            <div class="accordion-body p-0">
              <div class="drop-down-container" v-if="menu.children">
                <ul class="icons-nav">
                  <li v-for="(item, index) in menu.children" :key="index">
                    <component :is="item.url.startsWith('https://') ? 'a' : 'router-link'" :href="wordpressUrl + item.url">
                      <i class="icon icon-1"></i><span>{{ item.title }}</span>
                    </component>
                  </li>s
                </ul>
                <ul class="additional-nav" v-if="menu.title == 'Roller Blinds'">
                  <li><a :href="`${wordpressUrl}/roller-blinds/single/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon1 + ')' }"></i><span>Get an
                        Instant
                        Price</span></a></li>
                  <li><a :href="`${wordpressUrl}/measure-single-roller-blinds/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon2 + ')' }"></i><span>How to
                        Measure</span></a>
                  </li>
                  <li><a :href="`${wordpressUrl}/install-single-roller-blinds/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon3 + ')' }"></i><span>How to
                        Install</span></a>
                  </li>
                </ul>
                <ul class="additional-nav" v-if="menu.title == 'Curtains'">
                  <li><a :href="`${wordpressUrl}/curtains/single/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon1 + ')' }"></i><span>Get an
                        Instant
                        Price</span></a></li>
                  <li><a :href="`${wordpressUrl}/measure-curtains/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon2 + ')' }"></i><span>How to
                        Measure</span></a>
                  </li>
                  <li><a :href="`${wordpressUrl}/install-curtains/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon3 + ')' }"></i><span>How to
                        Install</span></a>
                  </li>
                </ul>
                <ul class="additional-nav" v-if="menu.title == 'Shutters'">
                  <li><a :href="`${wordpressUrl}/plantation-shutters/kits/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon1 + ')' }"></i><span>Get an
                        Instant
                        Price</span></a></li>
                  <li><a :href="`${wordpressUrl}/measure-plantation-shutters/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon2 + ')' }"></i><span>How to
                        Measure</span></a>
                  </li>
                  <li><a :href="`${wordpressUrl}/install-plantation-shutters/`"><i class="icon"
                        :style="{ 'background-image': 'url(' + AddMenuIcon3 + ')' }"></i><span>How to
                        Install</span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="extra-links">
        <li><a href="/blog/inspiration/" class="mobile-menu">Inspiration</a></li>
        <li><a href="/blog" class="mobile-menu">Blog & Resources</a></li>
        <!-- <li><router-link class="mobile-menu"
            :to="{ name: 'single-category', params: { slug: 'blinds-spare-parts' } }">Spare
            Parts</router-link></li> -->
        <li><a href="/contact-us" class="mobile-menu">Contact Us</a></li>
        <li><a href="tel:1300664257" class="mobile-menu"><i class="fa fa-phone-alt me-1"></i>1300 664 257</a></li>
        <!-- <li><router-link class="mobile-menu" :to="{ name: 'Login' }">My Account</router-link></li> -->
      </ul>
      <div class="bottom-links d-flex justify-content-between w-100 px-4">

        <!-- <router-link :to="{ name: 'samples' }" class="seconday-btn">
          <span class="icon icon-samples"></span>
          <span>Get free samples</span>
        </router-link>
        <router-link class="orange-btn" :to="{ name: 'Shop' }">Order now <span
            class="icon icon-arrow-right"></span></router-link> -->
      </div>
    </div>

  </header>
</template>
<style scoped lang="scss">
swiper-container.header-top-slider {
  line-height: 25px;

  &::part(button-prev),
  &::part(button-next) {
    color: #fff;
    transition: 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    width: 10px;
    height: 32px;
    border-radius: 50%;
    text-indent: -2em;
    display: inline-block;
    overflow: hidden;
    top: 74%;
    // opacity: 0.6;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAQAAABuQZ3IAAAAi0lEQVR4AU3OISBEQQBAwS0AACS9NxqQgCZpkiYBVddFvWhAAUABAPQCAGC4g/0vTnrBqCfDIZl70J+kMUBPpEwT4FNXxBxz4F1HxHyr4EVTxBLb4EFNxEon4CJSlVNw9AcV9sC16h8osgke1P1ArgXwouVvdQq86ww/GQefusNf7kBviBlxpT8k+gL/Wox4r1d4MwAAAABJRU5ErkJggg==") no-repeat scroll 50% 50% / 9px 13px;
  }

  &::part(button-prev) {
    transform: rotate(-180deg);
  }
}

.logo-link {
  position: absolute;
  top: -45px;

  .logo {
    width: 230px
  }
}

.top-nav {
  flex-wrap: nowrap !important;

  .nav-link {
    font-size: 14px;
    padding: 10px 15px;
    color: #2c333f;
    white-space: nowrap;

    &:hover {
      background: rgba(54, 110, 172, .15);
    }
  }
}

.header-links {
  list-style: none none;
  display: flex;
  justify-content: flex-end;
}

.selectedcar {
  top: 100%;
  position: absolute;
  background: #fff;
  padding: 6px;
  right: 0;
  line-height: 1.5;
  font-weight: 600;
  font-size: 18px;
  border: 2px solid #004f7b;
  border-radius: 10px;
  z-index: 1;
}

.selectedcar:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #004f7b 50%, transparent 50%);
  top: -10px;
  right: calc(50% - 10px);
  transform: rotate(45deg);
  z-index: -1;
}

.icon-showcart {
  position: relative;

  .counter.qty {
    left: 14px;
    position: absolute;
    top: -4px;

    &.empty {
      display: none;
    }

    .counter-number {
      line-height: 1.4rem;
      background: #242a34;
      border-radius: 50%;
      color: #fff;
      display: block;
      height: 15px;
      text-align: center;
      width: 15px;
      font-size: 10px;
    }
  }
}

@media screen and (max-width: 991px) {
  .header-links {
    list-style: none none;
    display: flex;
    justify-content: center;
    gap: 20px;

    .samples-link:before {
      font-size: 2rem;
      color: #2c333f;
      display: block;
      height: 20px;
      margin-bottom: 6px;
      margin-left: auto;
      margin-right: auto;
      transition: color .3s cubic-bezier(.23, 1, .32, 1);
      width: 20px;
    }

    a,
    span {
      color: #77808f;
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 5px;
      text-decoration: none;
      transition: color .3s cubic-bezier(.23, 1, .32, 1);

      span {
        font-size: 1rem;
        line-height: 1.2rem;
        text-transform: uppercase
      }
    }
  }

  .mobile_menu {
    .accordion-header button {
      font-size: 1.8rem;
      background: var(--iseek-info);
      color: #2c333f;
      font-weight: 700;
      padding: 22px 20px;
      position: relative;
      text-decoration: none;
    }

    .icons-nav {
      margin: 0;
      padding: 0px;
      list-style: none none;

      li {
        border-bottom: 1px solid rgba(54, 110, 172, .15);
        margin: 0;

        a {
          font-size: 1.6rem;
          color: #2c333f;
          display: block;
          font-weight: 500;
          padding: 18px 20px;
          text-decoration: none;
        }
      }
    }

    .extra-links {
      list-style: none;
      background-color: var(--iseek-info);
      padding: 0;

      li {
        border: 1px solid #dee2e6;
        border-top: none;
        padding: 22px;

        a {
          font-weight: 700;
          font-size: 1.8rem;
          color: #2c333f;
          font-family: "Metropolis", Georgia, "Times New Roman", Times, serif;
        }
      }
    }

    .additional-nav {
      padding: 10px 20px;

      li {
        align-items: center;
        display: flex;
        margin: 0 0 20px;

        a {
          font-size: 1.6rem;
          line-height: 1.8rem;
          align-items: center;
          color: #2c333f;
          display: inline-flex;
          font-weight: 500;
          padding-right: 15px;
          position: relative;
          text-decoration: none;

          &:before {
            font-family: 'isb-icons';
            font-style: normal;
            font-variant: normal;
            font-weight: 400;
            line-height: 1;
            text-transform: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content: '\e901';
            display: inline-block;
            font-size: 1.2rem;
            position: absolute;
            right: 0;
            top: 7px;
            transition: all .3s cubic-bezier(.23, 1, .32, 1);
          }

          &:hover:before {
            transform: translateX(5px);
          }
        }
      }

      .icon {

        display: inline-block;
        height: 25px;
        margin-right: 16px;
        width: 25px;
      }
    }
  }

  .search_result_wrapper {
    top: 60px !important;
  }

  swiper-container.header-top-slider {
    &:deep(swiper-slide) {
      font-size: 14px;
    }

    &::part(button-prev),
    &::part(button-next) {
      width: 9px;
      font-size: 14px;
    }
  }
}

.icon-phone {
  color: #aeb4bf;
}

.container {
  max-width: 1326px;
  padding: 0;
}

.navigation {
  margin: 0px -20px !important;
  line-height: 1;

  :deep(.menu) {
    >li {
      padding: 14px 0;
    }
  }
}

header.header-desktop {
  background: #fff;
  z-index: 999 !important;
  top: -130px;
  transition-duration: 500ms;
}

.mobile_menu {
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.accordion-button::after {
  background-color: rgba(54, 110, 172, 0.15);
  border-radius: 50%;
  color: #2c333f;
  height: 32px;
  margin-top: -16px;
  position: absolute;
  right: 20px;
  text-align: center;
  top: 50%;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  width: 32px;
  background-size: 14px !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}
</style>
