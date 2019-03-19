// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Loading from './components/loading/index';
Vue.config.productionTip = false

Vue.prototype.$loading = Loading;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate: function(){  //这个用来兄弟组件之间的通讯
    Vue.prototype.bus = this;
  }
})
