<template>
  <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a href="#" class="pagination__link pagination__link--arrow"
        :class="isDisabledPrevious ? 'pagination__link--disabled' : ''"
        aria-label="Предыдущая страница"
        @click="paginatePrevBtn(page)">
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
        :class="isDisabledNext ? 'pagination__link--disabled' : ''"
        aria-label="Следующаястраница"
        @click="paginateNextBtn(page)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      isDisabledPrevious: true,
      isDisabledNext: false,
    };
  },
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
    // paginate(page) {
    //   if (page === 1) {
    //     this.isDisabledPrevious = true;
    //   }
    //   if (page > 1) {
    //     this.isDisabledPrevious = false;
    //   }
    //   if (page === this.pages) {
    //     this.isDisabledNext = true;
    //     this.$emit('paginate', page);
    //   }
    //   if (page < this.pages) {
    //     this.isDisabledNext = false;
    //     this.$emit('paginate', page);
    //   }
    // },
    paginatePrevBtn(page) {
      if (page > 1) {
        const newParamPage = page - 1;
        this.$emit('paginate', newParamPage);
        this.isDisabledPrevious = false;
        if (newParamPage === 1) this.isDisabledPrevious = true;
      } else {
        this.isDisabledPrevious = true;
      }
    },
    paginate(page) {
      this.$emit('paginate', page);
    },
    paginateNextBtn(page) {
      if (page < this.pages) {
        const newParamPage = page + 1;
        this.$emit('paginate', newParamPage);
        this.isDisabledNext = false;
        if (newParamPage === this.pages) this.isDisabledNext = true;
      } else {
        this.isDisabledNext = true;
      }
    },
  },
};
</script>
