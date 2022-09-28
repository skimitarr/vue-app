<template>
    <li class="catalog__item">
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

      <ul class="colors">
        <li class="colors__item">
          <label class="colors__label" for="id1">
            <input class="colors__radio sr-only" type="radio" value="#73B6EA"
            id="id1" v-model="color">
            <span class="colors__value" style="background-color: #73B6EA;"></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label" for="id2">
            <input class="colors__radio sr-only" type="radio" value="#FFBE15"
            id="id2" v-model="color">
            <span class="colors__value" style="background-color: #FFBE15;"></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label" for="id3">
            <input class="colors__radio sr-only" type="radio" value="#939393"
            id="id3" v-model="color">
            <span class="colors__value" style="background-color: #939393;"></span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
export default {
  data() {
    return {
      color: '#939393',
    };
  },
  props: ['product'],
};
</script>
