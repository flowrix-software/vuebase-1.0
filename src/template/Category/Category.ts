import { computed, defineComponent } from 'vue';
import Banner from '@/components/01/innerBanner.vue';
import SidebarFilters from '@/components/01/Category/Filters/SidebarFilters.vue';
import {useCategories } from '@/stores/Categories';
import CategoryProduct from '@/components/01/Category/CategoryProductCard.vue';
import Pagination from '@/components/01/Pagination.vue';

export default defineComponent({
    name:'Category',
    components:{
        Banner,
        CategoryProduct,
        Pagination,
        SidebarFilters
    },
    setup() {
        
        const Categories =useCategories();
        const CategoryData = computed(() => Categories.data);
        
        const handlePageChange = (page: number) => {
          Categories.changePage(page);
        };
        return{
            CategoryData,
            handlePageChange,
        }
    },
})
