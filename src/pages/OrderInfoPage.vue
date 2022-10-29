<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}" >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'card'}" >
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'order'}" >
            Оформление заказа
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{this.$store.state.orderInfo.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{this.$store.state.orderInfo.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{this.$store.state.orderInfo.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{this.$store.state.orderInfo.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{this.$store.state.orderInfo.email}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
              <li class="cart__order" v-for="item in products.basket.items" :key="item.id">
                <h3>{{ item.product.title }}</h3>
                <b>{{ (item.quantity * item.product.price) | numberFormat }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>Доставка: <b>500 ₽</b></p>
              <p>Итого: <b>{{ products.basket.items.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
            </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import { mapGetters } from "vuex";
  import numberFormat from "@/helpers/numberFormat";

  export default {
    created() {
      if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
        return;
      }
      this.$store.dispatch('loadOrderInfo', this.$route.params.id);
    },
    computed: {
      ...mapGetters({products: 'cardInfoOrderProducts', totalPrice: 'cardInfoTotalPrice'}),
    },
    filters: {
      numberFormat
    },
  }
</script>
