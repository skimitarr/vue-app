<template>
  <div>
    <main id="preloader" v-if="productsLoading">
      <div id="loader"></div>
    </main>
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}" >
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" href="#" :to="{name: 'card'}" >
              Корзина
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>

        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ products.length }} товара
        </span>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
          <div class="cart__field">
            <div class="cart__data">
              <BaseFormText v-model="formData.name" title="ФИО" placeholder="Введите ваше полное имя" :error="formError.name"/>

              <!-- <BaseFormField title="ФИО" :error="formError.name">
                <input class="form__input" v-model="formData.name" type="text" name="name" placeholder="Введите ваше полное имя">
              </BaseFormField> -->

              <!-- <label class="form__label">
                <input class="form__input" v-model="formData.name" type="text" name="name" placeholder="Введите ваше полное имя">
                <span class="form__value">ФИО</span>
                <span class="form__error" v-if="formError.name">{{ formError.name }}</span>
              </label> -->

              <BaseFormText v-model="formData.address" title="Адрес доставки" placeholder="Введите ваш адрес" :error="formError.address"/>

              <!-- <label class="form__label">
                <input class="form__input" v-model="formData.address" type="text" name="address" placeholder="Введите ваш адрес">
                <span class="form__value">Адрес доставки</span>
                <span class="form__error" v-if="formError.address">{{ formError.address }}</span>
              </label> -->

              <BaseFormText v-model="formData.phone" title="Телефон" placeholder="Введите ваш телефон" :error="formError.phone"/>

              <!-- <label class="form__label">
                <input class="form__input" v-model="formData.phone" type="tel" name="phone" placeholder="Введите ваш телефон">
                <span class="form__value">Телефон</span>
                <span class="form__error" v-if="formError.phone">{{ formError.phone }}</span>
              </label> -->

              <BaseFormText v-model="formData.email" title="Email" placeholder="Введите ваш Email" :error="formError.email"/>

              <!-- <label class="form__label">
                <input class="form__input" v-model="formData.email" type="email" name="email" placeholder="Введи ваш Email">
                <span class="form__value">Email</span>
                <span class="form__error" v-if="formError.email">{{ formError.email }}</span>
              </label> -->

              <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" placeholder="Ваши пожелания" :error="formError.comment"/>
              <!-- <label class="form__label">
                <textarea class="form__input form__input--area" v-model="formData.comments" name="comments" placeholder="Ваши пожелания"></textarea>
                <span class="form__value">Комментарий к заказу</span>
                <span class="form__error" v-if="formError.comments">{{ formError.comments }}</span>
              </label> -->
            </div>

            <div class="cart__options">
              <h3 class="cart__title">Доставка</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                    <span class="options__value">
                      Самовывоз <b>бесплатно</b>
                    </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                    <span class="options__value">
                      Курьером <b>500 ₽</b>
                    </span>
                  </label>
                </li>
              </ul>

              <h3 class="cart__title">Оплата</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="card">
                    <span class="options__value">
                      Картой при получении
                    </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                    <span class="options__value">
                      Наличными при получении
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div class="cart__block">
            <!-- <ProductsOrder/> -->
            <ul class="cart__orders">
              <li class="cart__order" v-for="item in products" :key="item.productId">
                <h3>{{ item.product.title }}</h3>
                <b>{{ (item.amount * item.product.price) | numberFormat }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>Доставка: <b>500 ₽</b></p>
              <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }}</b></p>
            </div>

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
          <div class="cart__error form__error-block" v-if="formErrorMessage">
            <h4>Заявка не отправлена!</h4>
            <p>
              {{ formErrorMessage }}
            </p>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
  import BaseFormText from '@/components/BaseFormText';
  import BaseFormTextarea from '@/components/BaseFormTextarea';
  import numberFormat from "@/helpers/numberFormat";
  import { mapGetters } from "vuex";
  import axios from 'axios';
  import {API_BASE_URL} from "@/config";
  import ProductsOrder from '@/components/ProductsOrder';

  export default {
    data() {
      return {
        formData: {},
        formError: {},
        formErrorMessage: '',
        productsLoading: false,
      }
    },
    components: {BaseFormText, BaseFormTextarea, ProductsOrder},
    filters: {
      numberFormat
    },
    computed: {
      ...mapGetters({products: 'cardDetailProducts', totalPrice: 'cardTotalPrice'}),
    },
    methods: {
      order() {
        this.productsLoading = true;
        this.formError = {};
        this.formErrorMessage = '';
        axios.post(API_BASE_URL + `/api/orders`, {
          ...this.formData
        }, {
          params: {
          userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(response => {
          this.$store.commit('resetCard');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
        })
        .catch(error => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
        .then(() => this.productsLoading = false);
      }
    }
  }
</script>
