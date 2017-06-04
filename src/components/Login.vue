<template>
  <div>
    <h3>{{formType}}</h3>
    <form v-on:submit.prevent="onFormSubmit">
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" v-model="email" class="form-control" id="email" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
      </div>
      <div v-if="formType === 'register'" class="form-group">
        <label for="password-confirm">Confirm Password</label>
        <input type="password" class="form-control" id="password-confirm" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>

      <div class="alert alert-danger" role="alert" v-if="loginError">{{loginError}}</div>

      <p v-if="formType === 'login'">Not a user? <a data-test-variable="register" href="#" @click.prevent="toggleForms">Register</a></p>
      <p v-if="formType === 'register'">Already have an account? <a href="#" @click.prevent="toggleForms">Login</a></p>
    </form>
  </div>
</template>

<script>
import AccountService from '@/services/account'

export default {
  name: 'login',
  data () {
    return {
      formType: 'login',
      email: '',
      password: '',
      passwordConfirm: '',
      loginError: ''
    }
  },
  methods: {
    toggleForms () {
      if (this.formType === 'login') {
        this.formType = 'register'
      } else {
        this.formType = 'login'
      }
    },
    onFormSubmit () {
      if (this.formType === 'login') {
        this.login()
      } else {
        this.register()
      }
    },
    login () {
      AccountService.login(this.email, this.password).then(() => {
        let redirectURL = this.$route.query.redirect || '/'
        this.$router.replace(redirectURL)
      }).catch((error) => {
        this.loginError = error
      })
    },
    register () {
      AccountService.register(this.email, this.password).then((response) => {
        this.login()
      }).catch((error) => {
        this.loginError = error
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    text-transform: capitalize;
  }
</style>
