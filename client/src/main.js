import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueCompositionApi from '@vue/composition-api';
import store from './store'


Vue.config.productionTip = false

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

router.beforeResolve((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated || window.localStorage.getItem('jwt-token');
  if (to.matched.some(route => route.meta.restricted) && !isAuthenticated) {
    next({ name: 'Login', wantedPath: to.fullPath })
    return 
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
