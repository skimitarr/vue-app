<template>
  <div>
    <main id="preloader" v-if="productLoading">
        <div id="loader"></div>
    </main>
    <!-- <main class="content container" v-else-if="!productLoading">Не удалось загрузить корзину</main> -->
    <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}" >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CardItem v-for="item in products" :key="item.productId" :item="item" />
            <!-- <li class="cart__item product" v-for="item in products" :key="item.productId">
              <div class="product__pic">
                <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
              </div>
              <h3 class="product__title">
                {{ item.product.title }}
              </h3>
              <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" :value="item.amount" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                {{ (item.amount * item.product.price) | numberFormat }} ₽
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li> -->
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit" :disabled="products.length === 0">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
  </div>
</template>

<script>
  import numberFormat from "@/helpers/numberFormat";
  import { mapGetters } from "vuex";
  import CardItem from "@/components/CardItem";
  // import { mapActions } from 'vuex';
  // import axios from 'axios';
  // import {API_BASE_URL} from "../config";

  export default {
    // data() {
    //   return {
    //     productLoading: true,
    //     // productLoadingFailed: false,
    //   };
    // },
    components: {CardItem},
    filters: {
      numberFormat
    },
    computed: {
      ...mapGetters({products: 'cardDetailProducts', totalPrice: 'cardTotalPrice', productLoading: 'productLoading'}),
      // products() {
      //   return this.$store.getters.cardDetailProducts
      // }
    },
    // methods: {
    //   ...mapActions(['loadCard']),
    //   preloading() {
    //     // console.log(this.products.length === 0)
    //     // this.productLoading = true;
    //     // this.productLoadingFailed = false;
    //     // return axios.get(API_BASE_URL + `/api/baskets`)
    //     // .then(response => this.productData = response.data)
    //     // .catch(() => this.productLoadingFailed = true)
    //     // .then(() => this.productLoading = false);
    //     this.loadCard();
    //     console.log(this.products.length)
    //     if(!this.products.length === 0) {
    //       this.productLoading = false;
    //     } else {

    //     }
    //     // console.log(this.productLoading)
    //   }
    // },
    // watch: {
    //   '$route.params.id': {
    //     handler() {
    //       this.preloading();
    //     },
    //     immediate: true
    //   }
    // },
  }
</script>
