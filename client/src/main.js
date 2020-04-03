import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueCompositionApi from '@vue/composition-api';


Vue.config.productionTip = false

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
