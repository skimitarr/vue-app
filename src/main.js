// import { createApp } from 'vue';
// import App from './App.vue';
// import router from '@/router/index';
// import { message1, message2 } from './data';
// import { alertMessage } from './alert';

// import {message, data} from "./data"
// import data from "./data";

// createApp(App).mount('#app');

// alert(message)
// alert(data.message)

// alert(message1);
// alert(message2);

// alertMessage(message1);
// alertMessage(message2);


import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
import store from '@/store/index';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
