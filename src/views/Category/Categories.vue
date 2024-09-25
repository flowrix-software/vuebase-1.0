<!-- Categories.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import Banner from '@/components/innerBanner.vue';
import Services from '@/components/Services.vue';
import {useCategories } from '@/stores/Categories';
import CategoryProduct from '@/components/Category/CategoryProductCard.vue';
import Pagination from '@/components/Pagination.vue';

const Categories =useCategories();
const CategoryData = computed(() => Categories.data);

const handlePageChange = (page: number) => {
  Categories.changePage(page);
};


window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
    "remarketing_event": "view_item_list",
    "value": 982,
    "items": [
        {
            "id": "9",
            "google_business_vertical": "retail"
        },
        {
            "id": "10",
            "google_business_vertical": "retail"
        },
        {
            "id": "187",
            "google_business_vertical": "retail"
        },
        {
            "id": "49",
            "google_business_vertical": "retail"
        },
        {
            "id": "47",
            "google_business_vertical": "retail"
        },
        {
            "id": "43",
            "google_business_vertical": "retail"
        },
        {
            "id": "34",
            "google_business_vertical": "retail"
        },
        {
            "id": "39",
            "google_business_vertical": "retail"
        },
        {
            "id": "48",
            "google_business_vertical": "retail"
        },
        {
            "id": "26",
            "google_business_vertical": "retail"
        },
        {
            "id": "21",
            "google_business_vertical": "retail"
        },
        {
            "id": "17",
            "google_business_vertical": "retail"
        },
        {
            "id": "59",
            "google_business_vertical": "retail"
        },
        {
            "id": "77",
            "google_business_vertical": "retail"
        },
        {
            "id": "52",
            "google_business_vertical": "retail"
        },
        {
            "id": "55",
            "google_business_vertical": "retail"
        },
        {
            "id": "13",
            "google_business_vertical": "retail"
        },
        {
            "id": "105",
            "google_business_vertical": "retail"
        },
        {
            "id": "69",
            "google_business_vertical": "retail"
        },
        {
            "id": "64",
            "google_business_vertical": "retail"
        },
        {
            "id": "12",
            "google_business_vertical": "retail"
        },
        {
            "id": "124",
            "google_business_vertical": "retail"
        }
    ],
    "ecommerce": {
        "currencyCode": "AUD",
        "impressions": [
            {
                "id": "9",
                "name": "Automate | Paradigm 15 Channel Remote Control",
                "price": 89,
                "list": "Blinds Spare Parts",
                "position": 1,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Automate | Paradigm 15 Channel Remote Control",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "10",
                "name": "Automate | Pulse 2 Hub",
                "price": 269,
                "list": "Blinds Spare Parts",
                "position": 2,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Automate | Pulse 2 Hub",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "187",
                "name": "Automate | Wand Motor",
                "price": 149,
                "list": "Blinds Spare Parts",
                "position": 3,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Automate | Wand Motor",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "49",
                "name": "Ball Stops",
                "price": 3,
                "list": "Blinds Spare Parts",
                "position": 4,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Ball Stops",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "47",
                "name": "Bottom Rail End Caps - D30",
                "price": 4,
                "list": "Blinds Spare Parts",
                "position": 5,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black,Grey",
                "path": "Blinds Spare Parts > Bottom Rail End Caps - D30",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "43",
                "name": "Bottom Rail End Caps - ISB Silent",
                "price": 4,
                "list": "Blinds Spare Parts",
                "position": 6,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black,Grey",
                "path": "Blinds Spare Parts > Bottom Rail End Caps - ISB Silent",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "34",
                "name": "Ceiling Mount Bracket - Curved Track",
                "price": 3,
                "list": "Blinds Spare Parts",
                "position": 7,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Ceiling Mount Bracket - Curved Track",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "39",
                "name": "Chain Drive Set",
                "price": 18,
                "list": "Blinds Spare Parts",
                "position": 8,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black",
                "path": "Blinds Spare Parts > Chain Drive Set",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "48",
                "name": "Child Safety Cleat",
                "price": 5,
                "list": "Blinds Spare Parts",
                "position": 9,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Child Safety Cleat",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "26",
                "name": "Curtain Wall Mount Bracket - 100mm",
                "price": 8,
                "list": "Blinds Spare Parts",
                "position": 10,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black",
                "path": "Blinds Spare Parts > Curtain Wall Mount Bracket - 100mm",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "21",
                "name": "Curtain Wall Mount Bracket - 75mm",
                "price": 6,
                "list": "Blinds Spare Parts",
                "position": 11,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black",
                "path": "Blinds Spare Parts > Curtain Wall Mount Bracket - 75mm",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "17",
                "name": "Curtain Wand",
                "price": 6,
                "list": "Blinds Spare Parts",
                "position": 12,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Curtain Wand",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "59",
                "name": "ISB Silent Bottom Rail Bumpers",
                "price": 5,
                "list": "Blinds Spare Parts",
                "position": 13,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black,Grey",
                "path": "Blinds Spare Parts > ISB Silent Bottom Rail Bumpers",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "77",
                "name": "Roller Blind Chain",
                "price": 10,
                "list": "Blinds Spare Parts",
                "position": 14,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black,Metal,Stainless Steel",
                "path": "Blinds Spare Parts > Roller Blind Chain",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "52",
                "name": "Single Brackets",
                "price": 10,
                "list": "Blinds Spare Parts",
                "position": 15,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black",
                "path": "Blinds Spare Parts > Single Brackets",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "55",
                "name": "Single Brackets with Covers",
                "price": 15,
                "list": "Blinds Spare Parts",
                "position": 16,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black",
                "path": "Blinds Spare Parts > Single Brackets with Covers",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "13",
                "name": "Solar Panel V2",
                "price": 189,
                "list": "Blinds Spare Parts",
                "position": 17,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Solar Panel V2",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "105",
                "name": "Spring Assist",
                "price": 33,
                "list": "Blinds Spare Parts",
                "position": 18,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Spring Assist",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "69",
                "name": "Top Back Bracket",
                "price": 33,
                "list": "Blinds Spare Parts",
                "position": 19,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black",
                "path": "Blinds Spare Parts > Top Back Bracket",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "64",
                "name": "Top Front Bracket",
                "price": 33,
                "list": "Blinds Spare Parts",
                "position": 20,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "variant": "White,Black",
                "path": "Blinds Spare Parts > Top Front Bracket",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "12",
                "name": "Wall Charger Wand Motor",
                "price": 45,
                "list": "Blinds Spare Parts",
                "position": 21,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Wall Charger Wand Motor",
                "category_path": "Blinds Spare Parts"
            },
            {
                "id": "124",
                "name": "Zero Wall Charger (Q1.1 & Q2.0)",
                "price": 45,
                "list": "Blinds Spare Parts",
                "position": 22,
                "category": "Blinds Spare Parts",
                "brand": "Default",
                "path": "Blinds Spare Parts > Zero Wall Charger (Q1.1 & Q2.0)",
                "category_path": "Blinds Spare Parts"
            }
        ],
        "items": [
            {
                "item_id": "9",
                "item_name": "Automate | Paradigm 15 Channel Remote Control",
                "price": 89,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 1,
                "quantity": 800,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "10",
                "item_name": "Automate | Pulse 2 Hub",
                "price": 269,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 2,
                "quantity": 838,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "187",
                "item_name": "Automate | Wand Motor",
                "price": 149,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 3,
                "quantity": 366,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "49",
                "item_name": "Ball Stops",
                "price": 3,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 4,
                "quantity": 172,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "47",
                "item_name": "Bottom Rail End Caps - D30",
                "price": 4,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 5,
                "quantity": 1488,
                "item_brand": "Default",
                "item_variant": "White,Black,Grey",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "43",
                "item_name": "Bottom Rail End Caps - ISB Silent",
                "price": 4,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 6,
                "quantity": 1441,
                "item_brand": "Default",
                "item_variant": "White,Black,Grey",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "34",
                "item_name": "Ceiling Mount Bracket - Curved Track",
                "price": 3,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 7,
                "quantity": 176,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "39",
                "item_name": "Chain Drive Set",
                "price": 18,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 8,
                "quantity": 944,
                "item_brand": "Default",
                "item_variant": "White,Black",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "48",
                "item_name": "Child Safety Cleat",
                "price": 5,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 9,
                "quantity": 457,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "26",
                "item_name": "Curtain Wall Mount Bracket - 100mm",
                "price": 8,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 10,
                "quantity": 130,
                "item_brand": "Default",
                "item_variant": "White,Black",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "21",
                "item_name": "Curtain Wall Mount Bracket - 75mm",
                "price": 6,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 11,
                "quantity": 979,
                "item_brand": "Default",
                "item_variant": "White,Black",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "17",
                "item_name": "Curtain Wand",
                "price": 6,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 12,
                "quantity": 289,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "59",
                "item_name": "ISB Silent Bottom Rail Bumpers",
                "price": 5,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 13,
                "quantity": 1435,
                "item_brand": "Default",
                "item_variant": "White,Black,Grey",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "77",
                "item_name": "Roller Blind Chain",
                "price": 10,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 14,
                "quantity": 13657,
                "item_brand": "Default",
                "item_variant": "White,Black,Metal,Stainless Steel",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "52",
                "item_name": "Single Brackets",
                "price": 10,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 15,
                "quantity": 945,
                "item_brand": "Default",
                "item_variant": "White,Black",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "55",
                "item_name": "Single Brackets with Covers",
                "price": 15,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 16,
                "quantity": 981,
                "item_brand": "Default",
                "item_variant": "White,Black",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "13",
                "item_name": "Solar Panel V2",
                "price": 189,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 17,
                "quantity": 975,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "105",
                "item_name": "Spring Assist",
                "price": 33,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 18,
                "quantity": 749,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "69",
                "item_name": "Top Back Bracket",
                "price": 33,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 19,
                "quantity": 1975,
                "item_brand": "Default",
                "item_variant": "White,Black",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "64",
                "item_name": "Top Front Bracket",
                "price": 33,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 20,
                "quantity": 1963,
                "item_brand": "Default",
                "item_variant": "White,Black",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "12",
                "item_name": "Wall Charger Wand Motor",
                "price": 45,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 21,
                "quantity": 97,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            },
            {
                "item_id": "124",
                "item_name": "Zero Wall Charger (Q1.1 & Q2.0)",
                "price": 45,
                "item_list_name": "Blinds Spare Parts",
                "item_list_id": "12",
                "index": 22,
                "quantity": 927,
                "item_brand": "Default",
                "item_category": "Blinds Spare Parts"
            }
        ]
    },
    "ga4_event": "view_item_list"
});
window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'CategoryView',  // Custom event name
    pagePath: window.location.href,  // The current route path
    pageTitle: document.title // The dynamic title
  })
</script>

<template>
  <Banner 
    class="mb-5" 
    :title="CategoryData?.category?.name" 
    :description="CategoryData?.category?.description"
    :bannerImage="CategoryData?.category?.image" 
  />
  
  <CategoryProduct :data="CategoryData.products.data" />

  <!-- Pagination -->
  <div>
    <Pagination :pagination="CategoryData.products" @page-changed="handlePageChange" />
  </div>
  
  <Services />
</template>
