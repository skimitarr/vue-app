<template>
    <li class="catalog__item">
      <!-- <a class="catalog__pic" href="#" @click.prevent="goToPage('product', {id: product.id})">
        <img v-bind:src="product.image" v-bind:alt="product.title">
      </a> -->
      <router-link class="catalog__pic" href="#" :to="{name: 'product', params: {id: product.id}}">
        <img v-bind:src="product.image" v-bind:alt="product.title">
      </router-link>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ product.price | numberFormat }} p
      </span>

      <!-- <ul class="colors">
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
      </ul> -->
      <ul class="colors">
        <li class="colors__item" v-for="color in product.colors" :key="color.code + color.id + color.title">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" :value="color.code" v-model="currentColor">
            <span class="colors__value" :style="{ 'background-color': color.code }"></span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
import goToPage from "@/helpers/goToPage";
import numberFormat from "@/helpers/numberFormat";

export default {
  data() {
    return {
      currentColor: '',
    };
  },
  props: ['product'],
  filters: {
    numberFormat
  },
  methods: {
    goToPage
  },
};
</script>
