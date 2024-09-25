<script setup lang="ts">
import { computed } from 'vue';
import defaultBanner from '@/assets/images/banner.webp';

const props = defineProps({
  bannerImage: String,
  title: String,
  description: String
});

const bannerImageUrl = computed(() => {
  return props.bannerImage || defaultBanner;
});
</script>

<template>
  <section
    class="banner_section inner_small_banner parallaxie d-none d-md-flex align-items-center clearfix"  
    :style="{ backgroundImage: `url(${bannerImageUrl})` }">
    <div class="banner_content">
      <h1 v-if="props.title">{{ props.title }}</h1>
      <h1 v-else>Flowing Drapes or Classic Blinds to Lift your Living Room</h1>
      <div v-if="props.description" v-html="props.description"></div>
      <div class="small" v-else>A living room is a place we go to connect, relax and unwind. It's often the first room we consider when redecorating!</div>
    </div>
  </section>
  <section class="d-flex d-md-none mt-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 v-if="props.title">{{ props.title }}</h1>
          <h1 v-else>Flowing Drapes or Classic Blinds to Lift your Living Room</h1>
          <div v-if="props.description" v-html="props.description"></div>
          <h2 class="small" v-else>A living room is a place we go to connect, relax and unwind. It's often the first room we consider when redecorating!</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.inner_small_banner {
  background-image: url(@/assets/images/inner-banner.webp);
  align-content: center;
  background-position: top !important;
  min-height: 50vh !important;
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll;
  justify-content: start;

  &:before {
    background: rgba(0, 0, 0, .4);
    content: "";
    left: 0;
    position: absolute;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .banner_content {
    left: 0;
    min-height: 28vh;
    top: calc(50% - 14vh);
    width: 43vw;
    min-width: 320px;
    padding: 50px 50px;
    background-color: rgba(217, 227, 240, 0.8);
    h1{
      font-size: 3rem;
      white-space: wrap;
      line-height: 1.3;
      font-weight:900;
      color: #356EAC;
      margin-top: 0;
      margin-bottom: 2.2rem;

    }
  }
}
</style>
