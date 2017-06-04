import * as types from '../mutation-types'

// initial state
const defaultUserInfo = {
  'id': null,
  'email': ''
}
const state = {
  auth: {
    status: false
  },
  userInfo: defaultUserInfo
}

// getters
const getters = {
  auth: state => state.auth,
  userInfo: state => state.userInfo
}

// actions
const actions = {
  authenticate ({ commit, state }, auth) {
    commit(types.SET_AUTH_STATUS, auth)
  },
  setUserInfo ({commit, state}, info) {
    commit(types.SET_USER_INFO, info)
  }
}

// mutations
const mutations = {
  [types.SET_AUTH_STATUS] (state, auth) {
    state.auth = auth
  },
  [types.SET_USER_INFO] (state, info) {
    state.userInfo.id = info.id
    state.userInfo.email = info.email
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
