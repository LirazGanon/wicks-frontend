<template>
  <app-header />
    <div class="container">
      <wap-list :waps="waps" :loading="isLoading" />
    </div>
</template>

<script>
import wapList from '../cmps/wap-list.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import appHeader from '../cmps/app-header.vue'
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
    waps() {
      return this.$store.getters.waps
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadWaps' })
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
