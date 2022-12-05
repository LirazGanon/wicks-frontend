<template>

  <app-header/>

  <div class="container home">

    <wap-list @removeWap="removeWap" :waps="waps" :loading="isLoading" />

    <hr />
    <form @submit.prevent="addWap()">
      <h2>Add wap</h2>
      <input type="text" v-model="wapToAdd.name" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import wapList from '../cmps/wap-list.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { wapService } from '../services/wap.service.local'
import { getActionRemoveWap, getActionUpdateWap, getActionAddWapMsg } from '../store/modules/wap.store'
import appHeader from '../cmps/app-header.vue'
export default {
  name: 'wap-app',
  components: {
    wapList,
    appHeader
  },
  data() {
    return {
      wapToAdd: wapService.getEmptyWap(),
    }
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
    this.$store.dispatch({ type: 'loadTemplates' })
  },
  methods: {
    async addWap() {
      try {
        await this.$store.dispatch({ type: 'addWap', wap: this.wapToAdd })
        showSuccessMsg('Wap added')
        this.wapToAdd = wapService.getEmptyWap()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add wap')
      }
    },
    async removeWap(wapId) {
      console.log(wapId)
      try {
        await this.$store.dispatch(getActionRemoveWap(wapId))
        showSuccessMsg('Wap removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove wap')
      }
    },
    async updateWap(wap) {
      try {
        wap = { ...wap }
        wap.desc = prompt('New desc?', wap.desc)
        await this.$store.dispatch(getActionUpdateWap(wap))
        showSuccessMsg('Wap updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update wap')
      }
    },
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
