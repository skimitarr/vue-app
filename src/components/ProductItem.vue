<template>
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
</template>

<script>
export default {
  props: ['products'],
};
</script>
