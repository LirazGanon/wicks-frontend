<template>
  
  <main>
    <user-msg />
    <router-view />
  </main>


</template>

<script>


import { store } from './store'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'


export default {

  async created() {
    await this.$store.dispatch({type: 'loadCmps'})
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })

  },
  components: {
    userMsg
  },

}
</script>