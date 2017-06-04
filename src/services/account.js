// import Vue from 'vue'
import store from '../store/store'

import axios from 'axios'
import config from '@/assets/config'

export default {
  getUserInfo () {
    return new Promise((resolve, reject) => {
      let token = window.localStorage.getItem('token')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`
        axios.get(`${config.apiBaseUrl}/user`).then((response) => {
          console.log(response)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          window.localStorage.setItem('auth', false)
          window.localStorage.removeItem('token')
          reject()
        })
      } else {
        window.localStorage.setItem('auth', false)
        window.localStorage.removeItem('token')
        reject()
      }
    })
  },
  login (email, password) {
    return new Promise((resolve, reject) => {
      axios.post(`${config.apiBaseUrl}/authenticate`, {
        email: email,
        password: password
      }).then((response) => {
        let token = response.data.token
        window.localStorage.setItem('auth', true)
        window.localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `${token}`
        store.dispatch('authenticate', true)
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error.response.data.message)
      })
    })
  },
  register (email, password) {
    return new Promise((resolve, reject) => {
      axios.post(`${config.apiBaseUrl}/register`, {
        email: email,
        password: password
      }).then((response) => {
        store.dispatch('authenticate', true)
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
        reject(error.response.data.message)
      })
    })
  }
}
