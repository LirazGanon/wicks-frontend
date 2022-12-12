<template>
  <app-header main-layout="main-header" />

  <section v-if="user" class="dashboard">

    <section class="top-dashboard">
      <h4>My Sites</h4>
      <div class="user-name">
        <h4>{{ user.fullname }}'s Back-Office</h4>
      </div>
    </section>
    <main class="dashboard-content" v-if="userWaps.length">

      <section class="left-user-nav">
        <div class="wap-left-dash" v-for="(wap, idx) in publicWaps" @click="chooseWap(wap)"
          :class="{ selected: wap?._id === chosenWap?._id }"> {{ wap?.pathName
          }}
        </div>
        <!-- @click="(chosenWap = wap) -->
      </section>
      <section class="main-dashboard">
        <section class="top-half">
          <chosen-wap-display :info="chosenWap" />
          <!-- <admin-chat :info="chosenWap"/> -->
          <contacts-table :info="chosenWap?.usersData?.contacts" />

        </section>


        <div class="bottom-half">
          <charts v-if="chosenWap" :info="chosenWap?.usersData.activity" />
        </div>
      </section>

    </main>


    <dash-board-place-holder :user="user" :temp="templates" v-else />
    <!-- <pre>{{ chosenWap?.usersData.activity }}</pre> -->

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
import contactsTable from '../cmps/contacts-table.vue'
import chosenWapDisplay from '../cmps/chosen-wap-display.vue'
import dashBoardPlaceHolder from '../cmps/dash-board-place-holder.vue'
import charts from '../cmps/charts.vue'
import adminChat from '../cmps/admin-chat.vue'
import { socketService, SOCKET_EVENT_GET_LEAD, SOCKET_EMIT_SET_ROOM } from '../services/socket.service.js'
import { utilService } from '../services/util.service'
import { showUserMsg } from '../services/event-bus.service'

export default {
  name: 'user-details',

  data() {
    return {
      userWaps: [],
      filterBy: {
        userId: ''
      },
      chosenWap: null,

      // user: null
    }
  },
  components: {
    appHeader,
    contactsTable,
    chosenWapDisplay,
    dashBoardPlaceHolder,
    charts,
    adminChat
  },
  async created() {
    this.filterBy.userId = this.userId
    const userWaps = await this.$store.dispatch({ type: 'getWaps', filterBy: this.filterBy })
    console.log(userWaps)
    this.userWaps = userWaps
    this.chosenWap = this.wapById || this.userWaps.find(wap => wap.pathName)
    // socket service signin:
    socketService.emit(SOCKET_EMIT_SET_ROOM, this.userId)
    socketService.on(SOCKET_EVENT_GET_LEAD, this.getLead)

    // this.testData.datasets[0].data = userWaps[0].usersData.activity.map(i => i.visits)
    // this.testData.datasets[1].data = userWaps[0].usersData.activity.map(i => i.signups)
    // this.setData()
    const user = await userService.getById(this.userId)
    this.user = user
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')
    },
    async editWap(wapId) {
      this.$emit('setIsLoading', true)
      // console.log(wapId)
      const wap = await this.$store.dispatch({ type: 'setWapToEdit', wapId })
      // console.log(wap)
      this.$router.push(`/wap/edit/${wap._id}`);
      this.$emit('setIsLoading', false)
    },
    viewTemplate(wapId) {
      this.$router.push({ path: `/wap/${wapId}` });
      // console.log(this.template)
    },
    localeDate(at) {
      const date = new Date(at)
      return new Intl.DateTimeFormat('en-US').format(date)
    },
    async getLead(data) {
      // let wap = await this.$store.dispatch({ type: 'getWapById', id: data.wapId })
      // wap = utilService.copy(wap)
      // wap.usersData.contacts.unshift(data.contact)
      // this.chosenWap.usersData.contacts.unshift(data.contact)
      this.$store.commit({ type: 'updateUserWapLocally', wapId: data.wap._id, wap: data.wap, contact: data.contact })
      showUserMsg(`user sended msg from site ${data.wap.pathName}`)
      // this.chosenWap = wap
      const userWaps = this.$store.getters.getUserWaps
      // this.userWaps = userWaps
      const idx = userWaps.findIndex(currWap => currWap._id === this.chosenWap._id)
      this.chosenWap = userWaps[idx]
    },
    chooseWap(wap) {
      // console.log(wap._id)
      this.$router.push(`/user/${this.userId}/${wap._id}`)
      this.chosenWap = wap
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
    templates() {
      return this.$store.getters.templates
    },
    wapById() {
      const id = this.$route.params.wapId
      return this.userWaps.find(userWap => userWap._id === id)
    },
    tableData() {
      return this.chosenWap?.usersData?.contacts
    },
    publicWaps() {
      return this.userWaps.filter(wap => wap.pathName)
    }

    // userWaps() {
    //   return this.$store.getter.userWaps
    // }
  },
}
</script>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>