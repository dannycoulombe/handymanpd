import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import JSONms from '@/plugins/jsonms'
import i18n from '@/plugins/i18n';
import './filters'
import '@/plugins/vue-masonry';
import '@/directives/show-timeout';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/index.scss'
import '@/styles/vuetify-rem.scss'

Vue.config.productionTip = false

// const screenWidth = window.screen.availWidth;
const onWindowResize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 1441) {
    document.documentElement.style.fontSize = 'calc(' + screenWidth + 'px / 1441 * 16)';
  }
}
window.addEventListener('resize', onWindowResize);
onWindowResize();

Vue.use(JSONms, { i18n, router });

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');
