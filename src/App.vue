<template>
  <component :is="currentPageComponent" :page-params="currentPageParams" />
</template>

<script>
  import MainPage from './pages/MainPage';
  import ProductPage from './pages/ProductPage';
  import NotFoundPage from './pages/NotFoundPage';
  import eventBus from "@/eventBus";

  const routes = {
    main: 'MainPage',
    product: 'ProductPage',
  };

export default {
  components: { MainPage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    }
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    }
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams))
  }
};
</script>
