import Vue from "vue";
import Vuex from "vuex";
// import products from '@/data/products';
import axios from 'axios';
import {API_BASE_URL} from "../config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productLoading: false,
    productsLoadingFailed: false,
    spinnerBasket: false,
    cardProducts: [
    //   {productId: 1, amount: 2},
    //   {productId: 3, amount: 2},
    ],
    userAccessKey: null,
    cardProductsData: [],
  },
  mutations: {
    // addProductToCard(state, {productId, amount}) {
    //   const item = state.cardProducts.find(item => item.productId === productId);
    //   if (item) {
    //     item.amount += amount;
    //   } else {
    //     state.cardProducts.push({
    //       productId,
    //       amount,
    //     });
    //   }
    // },
    updateCardProductAmount(state, {productId, amount}) {
      const item = state.cardProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    // deleteCardProduct(state, productId) {
    //   state.cardProducts = state.cardProducts.filter(item => item.productId !== productId);
    // },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
      console.log('updateUserAccessKey ' + state.userAccessKey)
    },
    updateCardProductsData(state, items) {
      state.cardProductsData = items;
    },
    syncCardProducts(state) {
      state.cardProducts = state.cardProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        }
      });
    },
    stateProductLoading(state) {
      return state.productLoading = !state.productLoading;
    },
    stateProductsLoadingFailed(state) {
      return state.productsLoadingFailed = true;
    },
    stateSpinnerBasket(state) {
      return state.spinnerBasket = !state.spinnerBasket;
    },
  },
  getters: {
    cardDetailProducts(state) {
      return state.cardProducts.map(item => {
        const product = state.cardProductsData.find(p => p.product.id === item.productId).product;
        return {
          ...item,
          // product:products.find(p => p.id === item.productId)
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },
    cardTotalPrice(state, getters) {
      return getters.cardDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    productLoading(state) {
      return state.productLoading;
    },
    productsLoadingFailed(state) {
      return state.productsLoadingFailed;
    },
    spinnerBasket(state) {
      return state.spinnerBasket;
    }
  },
  actions: {
    loadCard(context) {
      context.commit('stateProductLoading');
      return axios.get(API_BASE_URL + `/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateCardProductsData', response.data.items);
        context.commit('syncCardProducts');
      })
      .catch(() => context.commit('stateProductsLoadingFailed'))
      .then(() => context.commit('stateProductLoading'))
    },
    addProductToCard(context, {productId, amount}) {
      context.commit('stateSpinnerBasket');
      return (new Promise(resolve => setTimeout(resolve, 0)))
      .then(() => {
        return axios
          .post(API_BASE_URL + `/api/baskets/products`, {
            productId: productId,
            quantity: amount,
          }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              }
          })
          .then(response => {
            context.commit('updateCardProductsData', response.data.items);
            context.commit('syncCardProducts');
            context.commit('stateSpinnerBasket');
          })
      })
    },
    updateCardProductAmount(context, {productId, amount}) {
      // console.log(productId);
      context.commit('updateCardProductAmount', {productId, amount});
      if (amount < 1) return;

      return axios
      .put(API_BASE_URL + `/api/baskets/products`, {
        productId: productId,
        quantity: amount,
      }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          }
      })
      .then(response => {
        context.commit('updateCardProductsData', response.data.items);
      })
      .catch(() => {
        context.commit('syncCardProducts');
      })
    },
    deleteCardProductAt(context, {productId}) {
      return axios
        .delete(API_BASE_URL + `/api/baskets/products`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId,
            }
        })
        .then(response => {
          context.commit('updateCardProductsData', response.data.items);
          context.commit('syncCardProducts');
        })
    },
  },
});
