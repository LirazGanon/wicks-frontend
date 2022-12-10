<template>
  <section :class="[mainLayout]" ref="mainHeader">
    <header class="main-header">

      <router-link to="/">
        <span role="img" aria-label="logo">
          <img v-if="!noLogo" class="logo" src="@/assets/logo-black.png" alt="">
        </span>
      </router-link>
      <nav class="main-nav" :class="{ active: !menuOpen }">
        <article class="temp-header">
          <router-link to="/wap">Templates</router-link>
        </article>

        <article class="loggedin-user flex" v-if="loggedInUser">

          <div v-if="loggedInUser" @click="(openDropDown = !openDropDown)" class="user-icon">
            <img :src="loggedInUser.imgUrl || avatarIcon" />
          </div>

          <div class="main-dropdown" :class="{ openMenu: openDropDown }">
            <!-- TODO add v-click-outside="openDropDown = false" -->
              <img :src="loggedInUser.imgUrl || avatarIcon" />
            <p class="username-dropdown">{{loggedInUser.fullname}}</p>
            <router-link :to="`/user/${loggedInUser._id}`">
              BackOffice
            </router-link>


            <div @click="logout" class="logout-user-dash">
              Logout
            </div>
          </div>


        </article>

        <router-link v-else to="/login" v-if="!hideLogin">Login</router-link>
      </nav>



    </header>
  </section>

</template>
<script>
import 'animate.css'
// TODO: remember the wap id

export default {
  props: {
    noLogo: Boolean, mainLayout: String, hideLogin: Boolean
  },
  name: 'main-header',
  data() {
    return {
      avatarIcon: 'https://res.cloudinary.com/wicksin/image/upload/v1670322893/user_ha6zol.png',
      menuOpen: true,
      openDropDown: false
    }
  },
  mounted() {
    // new ResizeObserver(this.resized).observe(this.$refs.mainHeader)
    // TODO: ASK GUY
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    resized() {
      if (!this.$refs.mainHeader) return
      const { offsetWidth } = this.$refs.mainHeader
      if (offsetWidth <= 900) this.menuOpen = false
    },

  }
}
</script>