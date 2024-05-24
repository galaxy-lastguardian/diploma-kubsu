// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store/'
import vuetify from './plugins/vuetify'
import axios from "axios";
import {backendURL} from "@/app.config";

Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.baseURL=backendURL
// проверка токена и установка store.state.user при инициализации
if (JSON.parse(localStorage.getItem('user'))) {
  store.dispatch('SetUserFromToken');
}
axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify,
  template: '<App/>'
})
