<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/autoplay'
import { FreeMode, Navigation, Thumbs, EffectFade, Autoplay } from 'swiper/modules'
const emit = defineEmits()

const { productData } = defineProps(['productData'])
const thumbsSwiper = ref(null)
const modalThumbsSwiper = ref(null)

const modules = [Navigation, Thumbs, EffectFade, Autoplay]

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}
const setModalThumbsSwiper = (swiper) => {
  modalThumbsSwiper.value = swiper
}

const coordinates = ref('');

const startZoom = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  coordinates.value =  `${x}px ${y}px`;
  let activeslide = document.querySelector('.mainSlider .swiper-slide-active');
  let activeImage = activeslide.querySelector('img');
  activeImage.style.transformOrigin = coordinates.value
};

const clearCoor = () => {
  coordinates.value = '';
};

const windoWidth = window.innerWidth

const modalslider = ref(null);

  const CurentSlideIndex = (index) => {
    let modalslider = document.querySelector('.modalslider');
    
    modalslider.swiper.slideTo(index);
 
};
</script>
<template>
  <div class="row">    
    <div class="col-12 col-md-12 col-xl-10 order-2 px-md-0">
      <Swiper 
        @mousemove="startZoom" @mouseout="clearCoor"
        :loop="true"
        :spaceBetween="10"
        :thumbs="{ swiper: thumbsSwiper }"
        navigation
        :effect="'slide'"
        :autoplay="false"
        :modules="modules"
        class="currentImage mainSlider"
      >
      <SwiperSlide>
        <img class="border" :alt="productData.name" data-bs-toggle="modal"
            data-bs-target="#gallaryModal"  @click="CurentSlideIndex(0)" fetchpriority="heigh" :src="productData.image" width="100" />
        </SwiperSlide>
        <SwiperSlide v-if="productData.images!=''" v-for="(image, index) in productData.images" :key="index">
          <img :alt="productData.name" data-bs-toggle="modal"
            data-bs-target="#gallaryModal" @click="CurentSlideIndex(index+1)" fetchpriority="low"  :src="image.image" width="100" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div  v-if="windoWidth > 1100" class="col-2 d-xl-block order-1">
      <Swiper
        @swiper="setThumbsSwiper"
        :loop="true"
        :spaceBetween="10"
        :slidesPerView="5"
        :freeMode="true"
        :direction="'vertical'"
        :watchSlidesProgress="true"
        :modules="modules"
        class="galleryImage pt-0 thumbslider"
      >
      <SwiperSlide>
          <img :alt="productData.name" :src="productData.image" width="100" />
        </SwiperSlide>
        <SwiperSlide v-if="productData.images!=''" v-for="(image, index) in productData.images" :key="index">
          <img :alt="productData.name" :src="image.image" width="100" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-if="windoWidth < 1100" class="col-12 order-2 px-5 pb-5">
      <Swiper
        @swiper="setThumbsSwiper"
        :loop="true"
        :spaceBetween="30"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :modules="modules"
        class="galleryImage thumbslider"
      >
      <SwiperSlide>
          <img :alt="productData.name"   :src="productData.image" width="100" />
        </SwiperSlide>
        <SwiperSlide v-if="productData.images!=''" v-for="(image, index) in productData.images" :key="index">
          <img :alt="productData.name"   :src="image.image" width="100" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="gallaryModal"
    tabindex="-1"
    aria-labelledby="gallaryModalLabel"
    aria-hidden="true"
    >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-10 order-2 px-md-0">
              <Swiper
                :loop="true"
                :spaceBetween="10"
                :thumbs="{ swiper: modalThumbsSwiper }"
                :effect="'fade'"
                :autoplay="false"
                :modules="modules"
                class="currentImage modalslider"
                >

              <SwiperSlide>
                  <img :src="productData.image" />
                </SwiperSlide>
                <SwiperSlide v-for="(image, index) in productData.images" :key="index">
                  <img :src="image.image" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div class="col-2 order-1">
              <Swiper
                @swiper="setModalThumbsSwiper"
                :loop="true"
                :spaceBetween="10"
                :slidesPerView="4"
                :freeMode="true"
                :direction="'vertical'"
                :watchSlidesProgress="true"
                :modules="modules"
                class="galleryImage thumbslider"
              >
              <SwiperSlide>
                  <img :src="productData.image" width="100" />
                </SwiperSlide>
                <SwiperSlide v-for="(image, index) in productData.images" :key="index">
                  <img :src="image.image" width="100" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;

  img {
    display: block;
    width: auto;
    max-width:100%;
    height: 100%;
    object-fit: cover;
  }
}

:deep(.swiper-button-prev) {
  left:0;
  width: 50px;
    height: 50px;
    &:after{
    background: rgb(255 255 255 / 70%);
    padding: 5px;
    font-size: 27px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    content: '\279E';
    font-family: 'isb-icons';
    color: rgb(0 0 0 / 75%);
    box-shadow:0 0 3px 3px #0000001f;
    font-weight: 700;
    transform: rotateY(180deg);
    }
  }
  :deep(.swiper-button-next) {
    right:0;
  width: 50px;
    height: 50px;
    &:after{
    background: rgb(255 255 255 / 70%);
    padding: 5px;
    font-size: 27px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    content: '\279E';
    font-family: 'isb-icons';
    color: rgb(0 0 0 / 75%);
    box-shadow:0 0 3px 3px #0000001f;
    font-weight: 700;
    }
  }


.swiper {
  width: 100%;
  height: 100%;
  max-height: 500px;
  margin-left: auto;
  margin-right: auto;
}

.galleryImage {
  max-height: 420px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  .swiper-slide {
    border: 1px solid var(--rrtw-secondary);
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }
  .swiper-slide-thumb-active {
    opacity: 1;
  }
}

@media screen and (max-width:1200px){
  .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  &.swiper-slide-thumb-active{
    border:5px solid var(--iseek-primary);
  }
  &:deep(figure){
    width:100%;
  }
  &:deep(img) {
    display: block;
    width: 100%;
    height: unset;
    object-fit: cover;
  }
}
}
.mainSlider .swiper-slide-active:hover img {
    transform: scale(2);
    cursor:zoom-in;
}

.thumbslider .swiper-slide img{
  display: block;
    width: revert-layer;
    height: 100%;
    object-fit: cover;
}
</style>