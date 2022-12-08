<template>
  <app-header main-layout="main-header" />

  <section v-if="user" class="dashboard">

    <section class="top-dashboard">
      <h4>My Sites</h4>
      <div class="user-name">
        <h4>{{ user.fullname }}'s BackOffice</h4>
      </div>
    </section>
    <main class="dashboard-content">

      <section class="left-user-nav">
        <div class="wap-left-dash" v-for="wap in userWaps" @click="(chosenWap = wap)"> {{ wap.name }}</div>

        <div @click="logout" class="logout-user-dash">
          Logout
        </div>

      </section>

      <section class="main-dashboard">


        <section class="chosen-wap-display" v-if="chosenWap">

          <img v-if="chosenWap.src" :src="chosenWap.src" alt="" class="chosen-wap-img">
          <div v-else class="chosen-wap-img">placeholder</div>
          <h3>{{ chosenWap.name }}</h3>
          <div class="wap-actions-dash">

            <button @click="editWap(chosenWap._id)">Edit</button>
            <button @click="viewTemplate(chosenWap._id)">Preview</button>
          </div>

        </section>
        <section class="dashboard-stats">

          <pre>{{user}}</pre>

        </section>

        <section class="wap-table">
          <ul class="table-head flex">
            <li>name</li>
            <li>email</li>
            <li>request</li>
            <li>date</li>
          </ul>
          <ul class="table-body flex">
            <li>puki</li>
            <li>puki@gmail.com</li>
            <li>I want a new site!</li>
            <li>two hours ago</li>
          </ul>
        </section>


      </section>
    </main>




    <!-- <img v-for="wap in userWaps" :src="wap.src" alt="site img"> -->

    <!-- <pre>{{ user }}</pre>
    <pre>{{ userWaps.length }}</pre>
    <div v-for="wap in userWaps">{{ wap.name }}</div>
     -->
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
      },
      chosenWap: null
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
    this.chosenWap = userWaps[0]
    // const user = await userService.getById(id)
    // this.user = user
  },
  methods: {
    logout() {
      console.log('baba')
      this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')
    },
    async editWap(wapId) {
      this.$emit('setIsLoading', true)
      console.log(wapId)
      const wap = await this.$store.dispatch({ type: 'setWapToEdit', wapId })
      console.log(wap)
      this.$router.push(`/wap/edit/${wap._id}`);
      this.$emit('setIsLoading', false)
    },
    viewTemplate(wapId) {
      this.$router.push({ path: `/wap/${wapId}` });
      console.log(this.template)
    },
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