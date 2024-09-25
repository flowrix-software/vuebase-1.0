<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSamples } from '@/stores/Samples';
import { usePages } from '@/stores/Pages';
import Banner from '@/components/innerBanner.vue';
import SideBar from '@/components/Samples/Sidebar.vue';
import TopBar from '@/components/Samples/TopBar.vue';
import SampleCard from '@/components/Samples/SampleProductCard.vue';
import Pagination from '@/components/Pagination.vue';
import Services from '@/components/Services.vue';
import bannerImage from '@/assets/images/coloursamples_banner.webp'
const pageData = usePages().page
const Samples = useSamples();
const filters = ref({});
const samplesData = computed(() => Samples.data);

const updateFilters = (newFilters: any) => {
    filters.value = newFilters;
    Samples.getSamples(null, filters.value);
};
</script>


<template>
    <Banner class="mb-5" :bannerImage="bannerImage" title="Free Fabric & Colour Samples" description="Discover the perfect match for your home with our free fabric and colour samples. Empower your DIY journey with the confidence to make the right choices. Order your free samples today and experience the quality and craftsmanship of our Australian Made window furnishings firsthand. To ensure you receive them quickly, we express post samples daily." />
    <section v-if="samplesData?.products?.data.length" class="pt-5" id="productsGrid">
        <div class="container">
            <div class="row">
                <!-- Sidebar Section -->
                <div class="col-md-3">
                    <SideBar :data="samplesData" @filters-changed="updateFilters" />
                </div>
                <!-- Main Content Section -->
                <div class="col">
                    <!-- Top Bar -->
                    <div class="row sticky-top">
                        <div class="col">
                            <TopBar :data="samplesData.products" />
                        </div>
                    </div>
                    <!-- Product Grid -->
                    <div class="row gx-5" style="row-gap: 30px;">
                        <div class="col-md-4" v-for="product in samplesData.products.data" :key="product.id">
                            <SampleCard :item="product" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pagination -->
    <div v-if="samplesData?.products?.total > samplesData.products.per_page">
        <Pagination :pagination="samplesData.products" :filters="filters" />
    </div>
<Services/>
</template>

<style scoped>
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
        width: 80%;
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
        border: 1px solid #E3E3E3;
        border-radius: 5px;
        padding: 30px;

        img {
            height: 100px;
        }

        h4 {
            font-size: 24px;
            font-weight: 700;
        }
    }
}

:deep(.sidebar)::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
    border-radius: 10px;
}

:deep(.sidebar)::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
}

:deep(.sidebar)::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: -webkit-gradient(linear,
            left bottom,
            left top,
            color-stop(0.44, var(--iseek-secondary)),
            color-stop(0.72, var(--iseek-primary)),
            color-stop(0.86, var(--iseek-primary)));
}
</style>
