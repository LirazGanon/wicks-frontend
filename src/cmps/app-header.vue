<template>
  <section class="main-layout" ref="header">

    <header class="main-header" >

      <router-link to="/">
        <span role="img" aria-label="logo">
          <img v-if="!noLogo" class="logo" src="@/assets/logo-black.png" alt="">
        </span>
      </router-link>
      <nav class="flex">
        <router-link to="/wap">Template</router-link>

        <router-link to="/review">Reviews</router-link>
        <router-link to="/chat">Chat</router-link>
        <section class="loggedin-user flex" v-if="loggedInUser">
          <router-link :to="`/user/${loggedInUser._id}`">
            {{ loggedInUser.fullname }}
          </router-link>
          <!-- <span>{{ loggedInUser.score.toLocaleString() }}</span> -->
          <div>
            <img :src="loggedInUser.imgUrl || avatarIcon" />
          </div>
        </section>
        <router-link v-else to="/login">Login / Signup</router-link>
      </nav>

      <!-- <div class="burger" @click="toggleMenu">
        <span style="--i: -1"></span>
        <span style="--i: 0"></span>
        <span style="--i: 1"></span>
      </div> -->



    </header>
  </section>

</template>
<script>
import 'animate.css'
// TODO: remember the wap id

export default {
  props: {
    noLogo: Boolean,
  },
  name: 'main-header',
  data() {
    return {
      avatarIcon: 'https://res.cloudinary.com/wicksin/image/upload/v1670322893/user_ha6zol.png',
      menuOpen: false,
      
    }
  },
  mounted(){
    // new ResizeObserver(this.resized).observe(this.$refs.header)

  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    resized() {
      if (!this.$refs.header) return
      const { offsetWidth } = this.$refs.header
      if (offsetWidth < 550) console.log('puki');
      else console.log('yay');
    }
  }
}
</script>