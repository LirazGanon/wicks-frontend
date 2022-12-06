<template>
  <header class="main-header">
    <router-link to="/">
      <span role="img" aria-label="logo">
        <img v-if="!noLogo" class="logo" src="@/assets/logo-black.png" alt="">
      </span>
    </router-link>
    <nav class="flex">
      <router-link to="/wap">Template</router-link>

      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link>
    </nav>
    <section class="loggedin-user flex" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <!-- <span>{{ loggedInUser.score.toLocaleString() }}</span> -->
      <div>
        <img :src="loggedInUser.imgUrl||avatarIcon" />
      </div>
    </section>
  </header>
</template>
<script>
import 'animate.css'
// TODO: remember the wap id

export default {
  props: {
    noLogo: Boolean
  },
  name: 'main-header',
  data() {
    return {
      avatarIcon: 'https://res.cloudinary.com/wicksin/image/upload/v1670322893/user_ha6zol.png'
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>