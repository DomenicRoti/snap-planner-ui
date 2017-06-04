import axios from 'axios'
import config from '@/assets/config'
import store from '@/store/store'

export default {
  getEvents () {
    return new Promise((resolve, reject) => {
      axios.get(`${config.apiBaseUrl}/event`).then((response) => {
        store.dispatch('setEvents', response.data)
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },

  addEvent (event) {
    return new Promise((resolve, reject) => {
      axios.post(`${config.apiBaseUrl}/event`, event).then((response) => {
        console.log(response)
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },

  removeEvent (event) {
    return new Promise((resolve, reject) => {
      axios.delete(`${config.apiBaseUrl}/event/${event._id}`, {}).then((response) => {
        console.log(response)
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }
}
