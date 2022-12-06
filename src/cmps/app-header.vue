<template>
  <section class="main-layout">

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
        <img :src="loggedInUser.imgUrl" />
      </div>
    </section>

    
  </header>
</section>

</template>
<script>
import 'animate.css'
// TODO: remember the wap id

export default {
  props: {
    noLogo: Boolean
  },
  name: 'main-header',
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>