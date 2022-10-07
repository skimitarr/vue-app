import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CardPage from '@/pages/CardPage';

Vue.use(VueRouter);

const routes = [
  {name: 'main', component: MainPage, path: '/'},
  {name: 'product', component: ProductPage, path: '/product/:id'},
  {name: 'card', component: CardPage, path: '/card'},
  {name: 'notFound', component: NotFoundPage, path: '*'},
];

const router = new VueRouter({
  routes
});

export default router;
