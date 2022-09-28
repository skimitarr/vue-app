<template>
  <ul class="catalog__list">
    <ProductItem v-for='product in products' :product="product" :key='product.id'>
    </ProductItem>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>

<!-- <template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for='(product, index) in products' :key='index'>
      <a class="catalog__pic" href="#">
        <img v-bind:src="product.image" v-bind:alt="product.title">
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ product.price }} p
      </span>

    </li>
  </ul>
</template>

<script>
export default {
  props: ['products'],
};
</script> -->
