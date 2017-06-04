// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/store'
import AccountService from '@/services/account'
import EventsService from '@/services/events'
import { mapGetters } from 'vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    AccountService.getUserInfo().then(() => {
      EventsService.getEvents()
    })
  },
  computed: mapGetters([
    'auth'
  ]),
  watch: {
    auth (auth) {
      if (auth) {
        AccountService.getUserInfo().then(() => {
          EventsService.getEvents()
        })
      }
    }
  }
})
