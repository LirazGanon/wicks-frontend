<template>
  <div  class="alert" ref="msg" >
    {{ msg }}
  </div>
</template>


<script>
import { eventBus, SHOW_MSG } from "../services/event-bus.service.js"

export default {
  name:'user-msg',
  created() {
    eventBus.on(SHOW_MSG, (msg) => {
      const el = this.$refs.msg
      console.log(el);
      this.msg = msg
      var delay =  2000
      // this.alive = true
      el.classList.add('shown')
      window.scrollTo({top: 0, behavior: 'smooth'});
      setTimeout(() => {
        // this.alive = false
        el.classList.remove('shown')
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
}
</script>