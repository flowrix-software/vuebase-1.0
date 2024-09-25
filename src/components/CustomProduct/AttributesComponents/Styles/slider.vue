<script setup>
  import { watch } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { useCustomScript } from "@/stores/CustomScripts/CustomeScript";
  import contentPopup from '../PopupContent/Popup.vue'

  import SlideSlide from './SingleSlide.vue'
  import 'swiper/swiper-bundle.css';
  const CustomScript = useCustomScript();
  // Import required modules from 'swiper/modules'
  import { Navigation, Virtual } from 'swiper/modules';
  const props = defineProps({'attribute':Object,'group':Object});

  CustomScript.SelectedOptions
  
  function goToPrev() {
    // You can access the swiper instance directly via DOM query or refs if necessary
    document.querySelector(`.swiper-container${props.attribute.id}`).swiper.slidePrev();
  }
  
  function goToNext() {
    document.querySelector(`.swiper-container${props.attribute.id}`).swiper.slideNext();
  }
//   watch(
//   () => CustomScript.SelectedOptions,
//   () => {

//     const curentslider = CustomScript.SelectedOptions.vid;
//     const swiperInstance = document.querySelector(`.swiper-container_${curentslider}`).swiper;
//     if (swiperInstance) {
//       swiperInstance.update(); // Update swiper when SelectedOptions changes
//     }
//   },
//   { deep: true } // Watch deeply if SelectedOptions is an object or array
// );

const groupedObjects = (objects) => {
  const groups = {}
  objects.forEach((obj) => {
    const parent = obj.parent
    if (!groups[parent]) {
      groups[parent] = []
    }
    groups[parent].push(obj)
  })

  return groups
}
  </script>
  <template>
    <div class="row">
 
        <div class="col-md-12 d-flex justify-content-between">
            <label class="attribute-label">{{ attribute.title }}
              <contentPopup :attribute="attribute"/>
            </label>
            <div class="slider-nav-buttons d-flex gap-3 justify-content-end" style="opacity: 1;">
                <span @click="goToPrev()" :class="`icon-arrow-left icon-arrow-left${props.attribute.id}`"></span>
                <span @click="goToNext()" :class="`icon-arrow-right icon-arrow-right${props.attribute.id}`"></span>
            </div>
        </div>
        <div class="col-md-12">
          <template v-for="(atitems,key) in groupedObjects(attribute.values)">
            <div :class="`attributeslider swiper-container_${key}`">
                <!-- Swiper -->
                <Swiper
                :modules="[Virtual, Navigation]"
                :slides-per-view="5"
                :space-between="20"
                virtual
                :navigation="{ nextEl: `.icon-arrow-right${props.attribute.id}`, prevEl: `.icon-arrow-left${props.attribute.id}` }"
                >
                <SwiperSlide
                    v-for="(slideContent, index) in atitems"
                    :key="index"
                    :virtualIndex="index"
                >
                    <SlideSlide :attribute="attribute" group="group" :slide="slideContent"/>
                </SwiperSlide>
                </Swiper>                
            </div>
          </template>
        </div>
    </div>
  </template>
  <style>
 .slider-nav-buttons{
  .icon-arrow-left,
  .icon-arrow-right {
    color: #fff;
    cursor: pointer;
    background: #333;
    border-radius: 50%;
    place-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display:flex;
    &:hover{
        background: var(--iseek-secondary);
    }
    &.swiper-button-disabled{
        background: #ccc;
        opacity:0.5;
    }
    /* top: 50%; */
    /* transform: translateY(-50%); */
    /* z-index: 10; */
  }
}
.attributeslider{
    .swiper-slide{
    height:unset !important;
    overflow: hidden;
  }
}
  </style>