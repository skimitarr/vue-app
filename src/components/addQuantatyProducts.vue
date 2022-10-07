<template>
    <button type="button" aria-label="Добавить один товар" v-on:click="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
</template>

<script>

  export default {
    props: ['productAmount'],
    methods: {
      increment () {
        this.$emit('update:productAmount', this.productAmount + 1);
      },
    },
  }
</script>
