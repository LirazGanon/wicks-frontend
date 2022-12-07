<template>
  <app-header main-layout="main-header" />
  
  <section class="top-Dashboard">
      <h4>My Sites</h4>
      <div>
        <h3>{{user.fullname}}'s Backoffice'</h3>
      </div>
  </section>
  <section v-if="user" class="dashboard">


    <ul>
      <li v-for="wap in userWaps">
        {{ wap.name }}
      </li>

    </ul>



    <button @click="logout">Logout</button>

    <!-- <img v-for="wap in userWaps" :src="wap.src" alt="site img"> -->

    <pre>{{ user }}</pre>
    <pre>{{ userWaps.length }}</pre>
    <div v-for="wap in userWaps">{{ wap.name }}</div>
    <ul>
      <li>
      </li>
    </ul>

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
      this.$store.dispatch({type:'logout'})
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