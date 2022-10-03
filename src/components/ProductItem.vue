<template>
    <li class="catalog__item">
      <a class="catalog__pic" href="#" @click.prevent="$emit('goToPage', 'product', {id: product.id})">
        <img v-bind:src="product.image" v-bind:alt="product.title">
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ product.price | numberFormat }} p
      </span>

      <ul class="colors">
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" value="#73B6EA"
            v-model="color">
            <span class="colors__value" style="background-color: #73B6EA;"></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" value="#FFBE15"
            v-model="color">
            <span class="colors__value" style="background-color: #FFBE15;"></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" value="#939393"
            v-model="color">
            <span class="colors__value" style="background-color: #939393;"></span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
  data() {
    return {
      color: '#939393',
    };
  },
  props: ['product'],
  filters: {
    numberFormat
  },
};
</script>
