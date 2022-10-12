<template>
  <li class="cart__item product">
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
      <button type="button" aria-label="Убрать один товар" @click="minusAmount(amount)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">
      <!-- <input type="text" :value="item.amount" name="count"> -->

      <button type="button" aria-label="Добавить один товар" @click="addAmount(amount)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <!-- <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)"> -->
      <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteCard">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
  import numberFormat from "@/helpers/numberFormat";
  // import { mapMutations } from "vuex";
  import { mapActions } from "vuex";

  export default {
    props: ['item'],
    filters: {numberFormat},
    computed: {
      amount: {
        get() {
          return this.item.amount;
        },
        set(value) {
          this.$store.dispatch('updateCardProductAmount', {productId: this.item.productId, amount: value })
        },
      }
    },
    methods: {
      // ...mapMutations({deleteProduct: 'deleteCardProduct'}),
      ...mapActions(['deleteCardProductAt']),
      deleteCard() {
        this.deleteCardProductAt({productId: this.productId});
      },
      // deleteProduct(productId) {
      //   this.$store.commit('deleteCardProduct', productId)
      // },
      minusAmount (amount) {
        if (this.amount > 0)
        return this.amount -= 1
      },
      addAmount (amount) {
        return this.amount += 1
      },
    }
  }
</script>
