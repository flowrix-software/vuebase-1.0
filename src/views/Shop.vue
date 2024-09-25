<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InnerBanner from '@/components/innerBanner.vue'
import Pagination from '@/components/Others/Pagination.vue'
import ProductCard from '@/components/Product/ProductCard.vue'
import { useShopStore } from '@/stores/ShopStore'
// import { usePages } from '@/stores/Pages'
// import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
// import { useSeoMeta } from '@unhead/vue'
// import { useHead } from '@unhead/vue'
// import { useCompanyProfile } from '@/stores/CompanyProfile'
import banner from '@/assets/images/banner.webp'
// const companyProfile = useCompanyProfile()
// const route = useRoute();
let shop = ref<any | null>(null);

// const pagesApi = usePages()

// const pageMeta = computed(() => pagesApi.page)

// const CallPageAPI = async (page: string) => {
//     await pagesApi.getPage(page);
// };

// const metaSettings = (() => {
//     useSeoMeta({
//         title: () => (pageMeta.value && pageMeta.value.meta_title) || '',
//         description: () => (pageMeta.value && pageMeta.value.meta_description) || '',
//         ogDescription: () => (pageMeta.value && pageMeta.value.meta_description) || '',
//         ogTitle: () => (pageMeta.value && pageMeta.value.meta_title) || '',
//         twitterCard: 'summary_large_image',
//     });

//     useHead({
//         title: pagesApi.page ? pagesApi.page.meta_title : '',
//         meta: [
//             {
//                 name: 'robots',
//                 content: pageMeta.value ? pageMeta.value.robots : '',
//             },
//         ],
//         link: [
//             {
//                 rel: 'canonical',
//                 href: window.location.href,
//             },
//         ],
//     });
// })

shop.value = useShopStore().AllShop
onMounted(() => {
    // await CallPageAPI('shop');
    // metaSettings();
    // const slug = route.query;
});

// watch(
//     () => route.params,
//     async (toParams: RouteLocationNormalizedLoaded['params'], previousParams: RouteLocationNormalizedLoaded['params']) => {
//         if (previousParams !== toParams) {
//             let slug: {} = route.query;
//             slug = '';
//             products.value = await productStore.customproducts(slug);
//         }
//     }
// );



// // const sortedCats = computed(() => {
// //     return productStore.shop.categories.slice().sort((a, b) => a.name.localeCompare(b.name));
// // });
</script>

<template>

    <InnerBanner class="mb-5" title="Discover Custom-Made Window Furnishings"
        subtitle="Transform your home with high-quality, Australian Made blinds and curtains. Designed to fit your style and space perfectly, our custom-made products empower you to achieve the perfect look with ease. Select your product below, enter your window sizes for an instant price."
        :bannerImage="banner" />
        <div class="container mt-5" v-if="shop.products.data.length > 0">
            <div class="row g-5">
                <template v-for="product in shop.products.data">
                    <div class="col-md-3">
                        <ProductCard :item="product" />
                    </div>
                </template>
            </div>
            <div class="row">
                <div class="col">
                    <hr class="my-5">
                </div>
            </div>
        </div>
        <section id="padination-section" class="mt-5 pt-5 pb-5"  v-if="shop.products.data.length>0 && shop.products.total > shop.products.per_page">
    <div class="container my-5">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col">
            <Pagination :lastPage="shop.products.last_page" :currentPage="shop.products.current_page" :pagination="shop.products.links"/>
          </div>
        </div>
    </div>
</section>
    <section id="shop-content" class="pt-5 pb-5">
        <div class="container mb-$">
            <div class="row mb-5">
                <div class="col">
                    <h3 class="text-center section-heading">Better Blinds, More Convenience</h3>
                </div>
            </div>
            <div class="row g-5">
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/au-made-01.svg" />
                        <h4 class="mb-3 mt-5">All products Australian Made</h4>
                        <p>We manufacture all our blinds and curtains in our factory in Melbourne, and we source our
                            plantation shutters from trusted Australian Made suppliers.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/backed-01.svg" />
                        <h4 class="mb-3 mt-5">Backed by warranties
                        </h4>
                        <p>You can rest assured that all our products are backed by warranties, because we believe in
                            the
                            quality and longevity of what we create.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/control-01.svg" />
                        <h4 class="mb-3 mt-5">Convenience and control
                        </h4>
                        <p>With our simple DIY process, you can do it all when it suits you. No need to book a quote or
                            wait
                            for tradespeople when it’s time to install.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/delivery-01.svg" />
                        <h4 class="mb-3 mt-5">Fast production and delivery
                        </h4>
                        <p>Every order is custom made to your exact specifications. We work hard to get your order
                            finished
                            and delivered as quickly as possible.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/blinds-01.svg" />
                        <h4 class="mb-3 mt-5">Blinds experts since 2004
                        </h4>
                        <p>iSeekBlinds has been creating outstanding products for a long time, and we will be here to
                            give
                            you advice and support for many more years to come.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="shop-content-item">
                        <img alt="" src="@/assets/images/icons/easy-install-01.svg" />
                        <h4 class="mb-3 mt-5">Easy to measure and install
                        </h4>
                        <p>DIY may seem daunting, but we strive to make it as simple and easy as it can be, regardless
                            of
                            your skill level or previous experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
.cat-heading {
    font-size: 30px;
    font-weight: bold;
    position: relative;
    margin-bottom: 10px;
    padding-bottom: 5px;
    display: inline-block;

    &:after {
        content: "";
        position: absolute;
        width: 70px;
        height: 3px;
        background-color: var(--iseek-secondary);
        bottom: 0;
        left: 0;
    }
}

#shop-content {
    .section-heading {
        font-size: 38px !important;
    }

    .shop-content-item {
        // border: 1px solid #E3E3E3;
        border-radius: 5px;
        text-align: center;
        padding: 30px;

        img {
            height: 100px;
        }

        h4 {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: 700;
        }
    }
}
</style>
