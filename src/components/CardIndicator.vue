<template>
  <div>
    <div class="lds-dual-ring" v-if="spinnerBasket"></div>
    <div v-else>
      <router-link class="header__cart" href="#" aria-label="Корзина с товарами" :to="{name: 'card'}">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{ $store.state.cardProducts.length }}</span>
      </router-link>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters({spinnerBasket: 'spinnerBasket'}),
    },
  }
</script>

<style>
  .lds-dual-ring {
  display: inline-block;
  width: 32px;
  height: 32px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fcf;
    border-color: #fcf transparent #fcf transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
