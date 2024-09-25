<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const { pagination } = defineProps(['pagination', 'lastPage', 'currentPage'])
const updateQuery = (pageLabel) => {
  const { brands } = route.query;
  let updatedQuery = {};

  if (brands) {
    updatedQuery = { ...route.query, page: pageLabel };
  } else if (route.query.hasOwnProperty('producttype')) {
    updatedQuery = { ...route.query, page: pageLabel }; // replace 'yourBrandValue' with your actual value
  }
  if (pageLabel == 'Next &raquo;' && route.query.page == undefined) {
    updatedQuery = { ...route.query, page: 2 };
  }
  else if (pageLabel == 'Next &raquo;' && route.query.page != undefined) {
    updatedQuery = { ...route.query, page: parseInt(route.query.page) + 1 };
  }

  if (pageLabel == '&laquo; Previous' && route.query.page == undefined) {
    updatedQuery = { ...route.query, page: 1 };
  }
  else if (pageLabel == '&laquo; Previous' && route.query.page != undefined) {
    updatedQuery = { ...route.query, page: parseInt(route.query.page) - 1 };
  }

  return { query: updatedQuery };
};

const scrollToPosition = () => {
  setTimeout(function () {
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });

    // document.querySelector('body').innerHTML +='<div class="loading laodingdiv"></div>';

  }, 100);
};
const windoWidth = window.innerWidth
</script>
<template>
  <nav class="d-flex justify-content-center" aria-label="Page navigation example">
    <ul class="pagination ps-1">
      <template v-for="(link, index) in pagination" :key="index">
        <li v-if="index == 0 && currentPage > 1" class="pageItem" :class="{ active: link.active }">
          <router-link @click="scrollToPosition" class="pageLink" :to="updateQuery(link.label)"
            :aria-label="link.label">
            <span>
              <i class="icon icon-arrow-left"></i><i class="icon mx-0 icon-arrow-left"></i>
              <template v-if="windoWidth > 991">Previuos</template>
            </span>
          </router-link>
        </li>
        <li v-else-if="index >= 1 && index < pagination.length - 1" class="pageItem" :class="{ active: link.active }">
          <router-link @click="scrollToPosition" class="pageLink" :to="updateQuery(link.label)"
            :aria-label="link.label">
            <span v-html="link.label"></span>
          </router-link>
        </li>
        <li v-if="index == pagination.length - 1 && lastPage != currentPage" class="pageItem"
          :class="{ active: link.active }">
          <router-link @click="scrollToPosition" class="pageLink" :to="updateQuery(link.label)"
            :aria-label="link.label">
            <span> <template v-if="windoWidth > 991">Next</template> <span class="icon icon-arrow-right"></span><span
                class="icon mx-0 icon-arrow-right"></span></span>
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
  <!-- <nav class="d-block d-md-none justify-content-center" aria-label="Page navigation example">
    <ul class="pagination ps-1">
      <template v-for="(link, index) in pagination" :key="index">
      <li  v-if="index == 0" class="pageItem" :class="{ active: link.active }">
        <router-link class="pageLink" :to="updateQuery(link.label)" :aria-label="link.label">
          <span><i class="icon icon-arrow-left"></i><i class="icon mx-0 icon-arrow-left"></i></span>
        </router-link>
      </li>
      <li v-if="index == pagination.length - 1" class="pageItem" :class="{ active: link.active }">
       <router-link   class="pageLink" :to="updateQuery(link.label)" :aria-label="link.label">
         <span><span class="icon icon-arrow-right"></span><span
             class="icon mx-0 icon-arrow-right"></span></span>
       </router-link>
     </li>

     <li  v-else-if="index>0" class="pageItem" :class="{ active: link.active }">
       <router-link class="pageLink" :to="updateQuery(link.label)" :aria-label="link.label">
         <span v-html="link.label"></span>
       </router-link>
     </li>
      
    </template>
    </ul>
  </nav> -->
</template>
<style scoped lang="scss">
ul.pagination {
  overflow-x: auto;
  padding-bottom: 10px;

  .pageItem {
    margin: 0 10px;

    a {
      border: 1px solid #C5C5C5;
      display: flex;
      padding: 10px 15px;
      line-height: 1;
      font-size: 16px;
      border-radius: 5px;
      color: #000;
      font-weight: 500;
      align-items: center;
      justify-content: center;

      .icon {
        font-size: 14px;
        line-height: 0;
        height: 0;
        display: inline-block;
        color: var(--iseek-secondary);

      }
    }

    &:first-child a {
      border: 2px solid var(--iseek-secondary);
    }

    &:last-child a {
      border: 2px solid var(--iseek-secondary);
    }

    &.active {
      a {
        background: var(--iseek-secondary);
        border: 2px solid var(--iseek-secondary);
        color: #fff !important;
      }
    }
  }
}

.pageItem>a>span {
  white-space: nowrap;
}
</style>