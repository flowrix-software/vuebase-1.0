<script setup lang="ts">
import AddMenuIcon1 from '@/assets/images/menu/menu-icon-add-01.webp'
import AddMenuIcon2 from '@/assets/images/menu/menu-icon-add-02.webp'
import AddMenuIcon3 from '@/assets/images/menu/menu-icon-add-03.webp'

const wordpressUrl = import.meta.env.VITE_APP_WORDPRESS_URL;

interface MenuItem {
    title: string;
    url: string;
    image: string;
    sortorder: number;  // Adding sortorder property
}

interface Props {
    menuData: MenuItem[];
    parentItem: MenuItem;
}

defineProps<Props>();

const hasadditionalclass = (title: string) => {
    if (title != 'Motorise & Automate' && title != 'How to Guides') {
        return 'has-aditional'
    }
}
</script>

<template>
    <div class="drop-down has-additional">
        <div class="drop-down-container">
            <ul class="icons-nav" :class="hasadditionalclass(parentItem.title)">
                <li v-for="item in menuData" :key="item.sortorder">
                    <a :href="wordpressUrl + item.url">
                        <!-- <i class="icon" :style="{ 'background-image': 'url(' + MenuIcon1 + ')' }"></i><span>{{item.title}}</span> -->
                        <i class="icon"
                            :style="{ 'background-size': 'contain', 'background-image': 'url(\'' + item.image + '\')' }"></i><span>{{
                                item.title }}</span>
                    </a>
                    <!-- <RouterLink v-else :to="{ name: 'Product', params: { slug: item.url } }"><i class="icon" :style="{ 'background-image': 'url(' + MenuIcon1 + ')' }"></i><span>{{ item.title }}</span></RouterLink> -->
                </li>
            </ul>

            <ul class="additional-nav" v-if="parentItem.title == 'Roller Blinds'">
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
            <ul class="additional-nav" v-if="parentItem.title == 'Curtains'">
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
            <ul class="additional-nav" v-if="parentItem.title == 'Shutters'">
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
</template>
<style scoped>
.icon {
    background-size: contain;
}
</style>