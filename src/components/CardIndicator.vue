<template>
  <router-link class="header__cart" href="#" aria-label="Корзина с товарами" :to="{name: 'card'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ $store.state.cardProducts.length }}</span>
  </router-link>
</template>

<script>

</script>
