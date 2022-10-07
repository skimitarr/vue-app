<template>
    <button type="button" aria-label="Убрать один товар" v-on:click="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
</template>

<script>

  export default {
    props: ['productAmount'],
    methods: {
      decrement () {
        if (this.productAmount > 0)
        this.$emit('update:productAmount', this.productAmount - 1);
      },
    },
  }
</script>
