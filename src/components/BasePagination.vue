<template>
  <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a href="#" class="pagination__link pagination__link--arrow"
        :class="page === 1 ? 'pagination__link--disabled' : ''"
        aria-label="Предыдущая страница"
        @click.prevent="paginatePrevBtn(page)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a href="#" class="pagination__link"
          :class="{'pagination__link--current': pageNumber === page}"
          @click.prevent="paginate(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <a href="#" class="pagination__link pagination__link--arrow"
        :class="page === pages ? 'pagination__link--disabled' : ''"
        aria-label="Следующаястраница"
        @click.prevent="paginateNextBtn(page)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginatePrevBtn(page) {
      if (page > 1) {
        const newParamPage = page - 1;
        this.$emit('paginate', newParamPage);
      }
    },
    paginate(page) {
      this.$emit('paginate', page);
    },
    paginateNextBtn(page) {
      if (page < this.pages) {
        const newParamPage = page + 1;
        this.$emit('paginate', newParamPage);
      }
    },
  },
};
</script>
