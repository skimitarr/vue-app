<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" v-on:click="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="productAmount">

    <button type="button" aria-label="Добавить один товар" v-on:click="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

  export default {
    props: ['productAmount'],
    methods: {
      decrement () {
        if (this.productAmount > 0)
        this.$emit('update:productAmount', this.productAmount - 1);
      },
      increment () {
        this.$emit('update:productAmount', this.productAmount + 1);
      },
    },
  }
</script>
