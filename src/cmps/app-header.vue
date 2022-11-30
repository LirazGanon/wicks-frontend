<template>
  <header>
    <nav class="flex">
      <router-link to="/">
        <span role="img" aria-label="logo">
          <img class="logo" src="@/assets/wicks-header-logo.png" alt="">
        </span>
      </router-link>
      <router-link to="/wap">Waps</router-link>

      <router-link :to="`/wap/edit/` + 123">WapsEdit</router-link>
      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link>
    </nav>
    <section class="loggedin-user flex" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score.toLocaleString() }}</span>
      <div>
        <img :src="loggedInUser.imgUrl" />
      </div>
    </section>
  </header>
</template>
<script>

// TODO: remember the wap id

export default {
  name: 'main-header',
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>