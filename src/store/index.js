import Vue from "vue";
import Vuex from "vuex";
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardProducts: [
      {productId: 1, amount: 2},
      {productId: 3, amount: 2},
    ],
  },
  mutations: {
    addProductToCard(state, {productId, amount}) {
      const item = state.cardProducts.find(item => item.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cardProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCardProductAmount(state, {productId, amount}) {
      const item = state.cardProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCardProduct(state, productId) {
      state.cardProducts = state.cardProducts.filter(item => item.productId !== productId);
    },
  },
  getters: {
    cardDetailProducts(state) {
      return state.cardProducts.map(item => {
        return {
          ...item,
          product:products.find(p => p.id === item.productId)
        }
      })
    },
    cardTotalPrice(state, getters) {
      return getters.cardDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  }
});
