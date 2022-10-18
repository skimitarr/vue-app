<template>
<main class="content container">
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
      152 товара
    </span>
  </div>

  <div class="content__catalog">
    <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
    :category-id.sync="filterCategoryId" :color.sync="filterColor"/>

    <section class="catalog">
      <!-- <div v-if="productsLoading">
        Загрузка товаров...
      </div> -->
      <div id="preloader" v-if="productsLoading">
        <div id="loader"></div>
      </div>
      <div v-if="productsLoadingFailed">Произошла ошибка при загурзке товаров
        <button @click.prevent="loadProducts">Попробовать еще раз</button>
      </div>
      <ProductList v-bind:products="products" />
      <BasePagination :page="page" v-bind:count="countProducts" :per-page="productsPerPage" @paginate="changePage"/>
    </section>
  </div>
</main>
</template>

<style>
  .catalog {
    position: relative;
  }
  #preloader {
      position: fixed;
      background-color: rgb(198, 243, 241);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
  }
  #loader {
      display: block;
      position: relative;
      left: 50%;
      top: 50%;
      width: 150px;
      height: 150px;
      margin: -75px 0 0 -75px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #9370DB;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
  }
  #loader:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #BA55D3;
      -webkit-animation: spin 3s linear infinite;
      animation: spin 3s linear infinite;
  }
  #loader:after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #FF00FF;
      -webkit-animation: spin 1.5s linear infinite;
      animation: spin 1.5s linear infinite;
  }
  @-webkit-keyframes spin {
      0%   {
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      100% {
          -webkit-transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }
  @keyframes spin {
      0%   {
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      100% {
          -webkit-transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }
</style>

<script>
// import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import {API_BASE_URL} from "../config";

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      colorId: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    // filteredProducts() {
    //   let filteredProducts = products;
    //   if (this.filterPriceFrom > 0) {
    //     filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
    //     console.log(this.filterPriceFrom)
    //   }
    //   if (this.filterPriceTo > 0) {
    //     filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
    //   }
    //   if (this.filterCategoryId) {
    //     filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
    //     console.log(this.filterCategoryId)
    //   }
    //   if (this.filterColor) {
    //     for (let product of products) {
    //       filteredProducts = filteredProducts.filter((product) => product.colors.includes(this.filterColor));
    //     }
    //   }
    //   return filteredProducts;
    // },
    products() {
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      return this.productsData
      ? this.productsData.items.map (product => {
        return {
          ...product,
          image: product.image.file.url
        }
      })
      : [];
    },
    countProducts() {
      // return this.filteredProducts.length;
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        return axios.get(API_BASE_URL + `/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor,
          }
        })
        .then(response => this.productsData = response.data)
        .catch(() => this.productsLoadingFailed = true)
        .then(() => this.productsLoading = false);
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  }
};
</script>
