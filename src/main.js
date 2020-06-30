import Vue from 'vue';
import App from './index.vue';
import router from './vendors/routes';
import axios from './vendors/axiosInstance';

import '@/assets/content/app.scss';
import '@/assets/content/bootstrap.scss';
import '@/assets/content/utils.scss';
import '@/assets/content/component.scss';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
