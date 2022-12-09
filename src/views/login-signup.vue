<template>

  <section class="whole-login">
    <div class="bubble-move"></div>
    <div class="bubble-move"></div>
    <div class="bubble-move"></div>

    <app-header :hideLogin="true" :mainLayout="'main-layout-header'" />
    <div v-if="loggedinUser" class="login-page">
      <h3>
        Loggedin User:
        {{ loggedinUser.fullname }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <section class="login-form" :class="{ signup: isLogin }">

        <section v-if="!isLogin">
          <h2>Login </h2>
          <form @submit.prevent="doLogin">
            <input type="text" v-model="loginCred.username" placeholder="Username">
            <input type="password" v-model="loginCred.password" placeholder="Password">
            <p class="fail-to-login">{{ msg }}</p>
            <button>Login</button>
            <p>Not a member yet? <span @click="(isLogin = !isLogin)">signup </span>OR:</p>
          </form>
          <google-login/>
        </section>

        <section v-else>
          <form @submit.prevent="doSignup">
            <h2>Signup</h2>
            <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
            <input type="email" v-model="signupCred.email" placeholder="Email" />
            <input type="text" v-model="signupCred.username" placeholder="Username" />
            <input type="password" v-model="signupCred.password" placeholder="Password" />
            <!-- <img-uploader @uploaded="onUploaded"></img-uploader> -->
            <p class="fail-to-login">{{ msg }}</p>
            <button>Signup</button>
            <p>Already have an account? <span @click="(isLogin = !isLogin)">Log in</span></p>

          </form>

        </section>

      </section>
    </div>

  </section>

</template>

<script>

import appHeader from '../cmps/app-header.vue'
import imgUploader from '../cmps/img-uploader.vue'
import googleLogin from '../cmps/util/google-login.vue'

googleLogin
export default {
  name: 'login-signup',
  props: {},
  components: {
    imgUploader,
    appHeader,
    googleLogin
  },
  data() {
    return {
      msg: '',
      loginCred: { username: '', password: '' },
      signupCred: { username: '', password: '', fullname: '', email: '' },
      isLogin: false
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {

    async doLogin() {

      // TODO:MAKE IT ASSENTIAL TO FILL THE INPUT AND GET RID OF THIS CONDITION
      if (!this.loginCred.username || !this.loginCred.password) {
        this.msg = 'The username/password are incorrect.'
        setTimeout(() => {
          this.msg = ''
        }, 5000)
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        console.log(this.loggedinUser)
        const loggedinUserId = this.loggedinUser._id
        this.$router.push(`/user/${loggedinUserId}`)
      } catch (err) {
        console.log(err)
        this.msg = 'The username/password are incorrect.'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        setTimeout(() => {
          this.msg = ''
        }, 5000)
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })

      this.$router.push('/')

    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    }

  },
  watch:{
    loggedinUser(){
      this.$router.push('/')
    }
  }
}
</script>