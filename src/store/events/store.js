import * as types from '../mutation-types'

// initial state
const state = {
  events: []
}

// getters
const getters = {
  events: state => state.events
}

// actions
const actions = {
  setEvents ({ commit, state }, events) {
    commit(types.SET_EVENTS, events)
  },
  addEvent ({commit, state}, event) {
    commit(types.ADD_EVENT, event.event)
  },
  removeEvent ({commit, state}, event) {
    commit(types.REMOVE_EVENT, event)
  }
}

// mutations
const mutations = {
  [types.SET_EVENTS] (state, events) {
    state.events = events
  },
  [types.ADD_EVENT] (state, event) {
    state.events.push(event)
  },
  [types.REMOVE_EVENT] (state, eventToRemove) {
    let eventsArray = state.events.slice(0)
    eventsArray = eventsArray.filter((event) => {
      if (event._id === eventToRemove._id) {
        return false
      }
      return true
    })
    state.events = eventsArray
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
