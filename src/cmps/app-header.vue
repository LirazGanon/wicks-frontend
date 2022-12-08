<template>
  <section :class="[mainLayout]" ref="mainHeader">
    <header class="main-header">

      <router-link to="/">
        <span role="img" aria-label="logo">
          <img v-if="!noLogo" class="logo" src="@/assets/logo-black.png" alt="">
        </span>
      </router-link>
      <nav class="main-nav" :class="{ active: !menuOpen }">
        <article>
          <router-link to="/wap">Templates</router-link>
        </article>
        <!-- 
        <article>

          <router-link to="/review">Reviews</router-link>
        </article>
        <article>

          <router-link to="/chat">Chat</router-link>
        </article> -->

        <article class="loggedin-user flex" v-if="loggedInUser">
          <router-link :to="`/user/${loggedInUser._id}`">
            {{ loggedInUser.fullname }}
          </router-link>
          <!-- <span>{{ loggedInUser.score.toLocaleString() }}</span> -->
          <div>
            <img :src="loggedInUser.imgUrl || avatarIcon" />
          </div>
        </article>
        <router-link v-else to="/login" v-if="!hideLogin">Login</router-link>
      </nav>

      <div class="burger" :class="{ active: !menuOpen }" @click="(menuOpen = !menuOpen)">
        <span style="--i: -1"></span>
        <span style="--i: 0"></span>
        <span style="--i: 1"></span>
      </div>



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

    }
  },
  mounted() {
    // new ResizeObserver(this.resized).observe(this.$refs.mainHeader)
    // new ResizeObserver(this.resized).observe(this.$refs.mainHeader)
    // TODO: ASK GUY
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