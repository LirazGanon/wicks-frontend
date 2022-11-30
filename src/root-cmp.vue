<template>
  
  <main>
    <user-msg />
    {{ checkParams }}
    <router-view />
  </main>


</template>

<script>


import { store } from './store'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'


export default {

  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })

  },
  components: {
    userMsg
  },

}
</script>