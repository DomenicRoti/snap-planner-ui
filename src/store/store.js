import Vue from 'vue'
import Vuex from 'vuex'

import account from './account/store'
import events from './events/store'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    account,
    events
  },
  strict: debug
})
