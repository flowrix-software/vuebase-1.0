<script lang="ts">
import { defineComponent } from 'vue';

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Pagination {
  links: Link[];
}

export default defineComponent({
  props: {
    pagination: {
      type: Object as () => Pagination,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePage(url: string | null) {
      if (url) {
        const page = new URL(url).searchParams.get('page');
        if (page) {
          const query = { ...this.$route.query, page: Number(page), ...this.filters };
          this.$router.push({ query });
          this.$emit('page-changed', Number(page));
        }
      }
    },
    checkCurprev(): string | null {
      const currentPage = this.pagination.links.find(link => link.active);
      if (currentPage) {
        const currentPageNumber = Number(currentPage.label);
        return (currentPageNumber - 1).toString();
      }
      return null;
    },
    checkCurnext(): string | null {
      const currentPage = this.pagination.links.find(link => link.active);
      if (currentPage) {
        const currentPageNumber = Number(currentPage.label);
        return (currentPageNumber + 1).toString();
      }
      return null;
    },
  },
});
</script>

<template>
  <section id="padination-section" class="mt-5 pt-5 pb-5">
    <div class="container my-5">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col">
          <nav class="d-none d-md-flex justify-content-center" aria-label="Page navigation example">
            <ul class="pagination ps-1">
              <li v-if="pagination.links[0].url" class="pageItem" :class="{ active: pagination.links[0].active }">
                <a @click.prevent="changePage(pagination.links[0].url)" class="pageLink"
                  :aria-label="pagination.links[0].label">
                  <span><i class="icon icon-arrow-left"></i><i class="icon mx-0 icon-arrow-left"></i> Previous</span>
                </a>
              </li>
              <li class="pageItem" :class="{ active: link.active }"
                v-for="(link, index) in pagination.links.slice(1, -1)" :key="index">
                <a @click.prevent="changePage(link.url)" class="pageLink" :aria-label="link.label">
                  <span v-html="link.label"></span>
                </a>
              </li>
              <li v-if="pagination.links[pagination.links.length - 1].url" class="pageItem"
                :class="{ active: pagination.links[pagination.links.length - 1].active }">
                <a @click.prevent="changePage(pagination.links[pagination.links.length - 1].url)" class="pageLink"
                  :aria-label="pagination.links[pagination.links.length - 1].label">
                  <span>Next <span class="icon icon-arrow-right"></span><span
                      class="icon mx-0 icon-arrow-right"></span></span>
                </a>
              </li>
            </ul>
          </nav>
          <nav class="d-block d-md-none justify-content-center" aria-label="Page navigation example">
            <ul class="pagination ps-1">
              <template v-for="(link, index) in pagination.links" :key="index">
                <li v-if="index == 0 && link.url" class="pageItem" :class="{ active: link.active }">
                  <a @click.prevent="changePage(link.url)" class="pageLink" :aria-label="link.label">
                    <span><i class="icon icon-arrow-left"></i><i class="icon mx-0 icon-arrow-left"></i></span>
                  </a>
                </li>
                <li v-if="index == pagination.links.length - 1 && link.url" class="pageItem"
                  :class="{ active: link.active }">
                  <a @click.prevent="changePage(link.url)" class="pageLink" :aria-label="link.label">
                    <span><span class="icon icon-arrow-right"></span><span
                        class="icon mx-0 icon-arrow-right"></span></span>
                  </a>
                </li>
                <li
                  v-else-if="index == pagination.links.length - 2 || link.label == checkCurprev() || link.label == checkCurnext() || link.active"
                  class="pageItem" :class="{ active: link.active }">
                  <a @click.prevent="changePage(link.url)" class="pageLink" :aria-label="link.label">
                    <span v-html="link.label"></span>
                  </a>
                </li>
              </template>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

.pageLink {
  cursor: pointer;
}

.pageItem>a>span {
  white-space: nowrap;
}
</style>
