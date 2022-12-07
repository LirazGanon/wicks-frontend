<template>
  <app-header main-layout="main-header"/>
  <section v-if="user">
    <button @click="logout">Logout</button>
    <h1>User Details - {{ user.fullname }}</h1>
    <!-- <h3>{{ user.username }} score: {{ user.score }}</h3> -->
    <img style="max-width: 200px;" :src="user.imgUrl" />
    <img v-for="wap in userWaps" :src="wap.src" alt="">
    {{ userWaps[0] }}
    <!-- <ul>
      <li v-for="review in user.givenReviews" :key="review._id">
        {{ review.txt }}
        <router-link :to="`/user/${review.aboutUser._id}`">
          About {{ review.aboutUser.fullname }}
        </router-link>
      </li>
    </ul> -->
    <ul>
      <li>
      </li>
    </ul>
    <details>
      <summary>Full JSON</summary>
      <pre>{{ user }}</pre>
    </details>
  </section>
</template>

<script>
// import {userService} from '../services/user.service'
import appHeader from '../cmps/app-header.vue'
import { userService } from '../services/user.service'

export default {
  name: 'user-details',

  data() {
    return {
      userWaps: [],
      filterBy: {
        userId: ''
      }
      // user: null
    }
  },
  components: {
    appHeader
  },
  async created() {
    this.filterBy.userId = this.userId
    const userWaps = await this.$store.dispatch({ type: 'getWaps', filterBy: this.filterBy })
    this.userWaps = userWaps
    // const user = await userService.getById(id)
    // this.user = user
  },
  methods: {
    logout() {
      console.log('baba')
      userService.logout()
      this.$router.push('/')
    }
  },
  watch: {
    userId: {
      handler() {
        if (this.userId) {
          this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
        }
      },
      immediate: true,
    },
  },
  computed: {
    user() {
      return this.$store.getters.watchedUser
    },
    userId() {
      return this.$route.params.id
    },
    // userWaps() {
    //   return this.$store.getter.userWaps
    // }
  },
}
</script>