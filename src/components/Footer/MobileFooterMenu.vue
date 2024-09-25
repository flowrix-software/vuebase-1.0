<script setup>
import { onMounted, computed } from 'vue'
import { useNavMenu } from '@/stores/NavMenu'

const navMenuStore = useNavMenu()
onMounted(() => {
    navMenuStore.topMenu(3, 'footer')
})

const footerMenuItems = computed(() => {
    const footerMenu = navMenuStore.Menu.find(menu => menu.location === 'footer')
    return footerMenu ? footerMenu.items : []
})
</script>

<template>
    <div class="col-12">
        <div class="accordion bg-transparent" id="accordionExample">
            <div class="accordion-item bg-transparent border-0" v-for="(menu, index) in footerMenuItems" :key="index">
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
                                <a :href="item.url">{{ item.title }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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
</style>