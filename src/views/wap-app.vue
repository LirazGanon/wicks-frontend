<template>
  <app-header :mainLayout="'main-layout-header'"/>
    <div class="container">
      <wap-list :templates="templates" :loading="isLoading" />
    </div>
</template>

<script>
import wapList from '../cmps/wap-list.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import appHeader from '../cmps/app-header.vue'
import {socketService, SOCKET_EVENT_GET_UPDATED_WAP, SOCKET_EMIT_SEND_UPDATE_WAP} from '../services/socket.service'

export default {
  name: 'wap-app',
  components: {
    wapList,
    appHeader
  },
  data() {
    return {}
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    templates() {
      return this.$store.getters.templates
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadTemplates' })
    socketService.on(SOCKET_EMIT_SEND_UPDATE_WAP)

  },
  destroyed() {
    // socketService.off(SOCKET_EVENT_GET_UPDATED_WAP)
    // socketService.terminate()
  },
  methods: {
    async addWapMsg(wapId) {
      try {
        await this.$store.dispatch(getActionAddWapMsg(wapId))
        showSuccessMsg('Wap msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add wap msg')
      }
    },
    printWapToConsole(wap) {
      console.log('Wap msgs:', wap.msgs)
    }
  }
}
</script>
