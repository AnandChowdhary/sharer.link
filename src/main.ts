import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faWhatsapp,
  faFacebook,
  faTwitter,
  faPinterest,
  faLinkedin,
  faTelegram,
  faFacebookMessenger,
} from '@fortawesome/free-brands-svg-icons';
import './registerServiceWorker';

library.add(faWhatsapp, faFacebook, faTwitter, faPinterest, faLinkedin, faEnvelope, faTelegram, faFacebookMessenger);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
