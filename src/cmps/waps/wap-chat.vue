<template>
    <div class="container">
      <h1>About Us</h1>
      <p>We like You</p>
      <!-- <h2>Lets Chat About {{ topic }}</h2> -->
      <label>
        <!-- <input type="radio" value="Politics" v-model="topic" @change="changeTopic" /> -->
        <!-- Politics -->
      </label>
      <label>
        <!-- <input type="radio" value="Love" v-model="topic" @change="changeTopic" /> -->
        <!-- Love -->
      </label>
      <ul>
        <li v-for="(msg, idx) in msgs" :key="idx">
          <span>{{ msg.from }}:</span>{{ msg.txt }}
        </li>
      </ul>
      <hr />
      <form @submit.prevent="sendMsg">
        <input type="text" v-model="msg.txt" placeholder="Your msg" />
        <button>Send</button>
      </form>
    </div>
  </template>
  
  <script>
  import {
    socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_ROOM,
  } from '../../services/socket.service'
  import { utilService } from '../../services/util.service'
  
  export default {
    name: 'chat',
  
    data() {
      return {
        msg: { from: 'Guest', txt: '' },
        msgs: [],
        createdById:'6394911f7446893550efd389',
        wapId:'63958d4e0d8a613c6c766885',
      }
    },
    created() {
        socketService.emit(SOCKET_EMIT_SET_ROOM, this.createdById)

 
      // })
      socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
      socketService.on(SOCKET_EMIT_SEND_MSG, this.addMsg)
    },
    destroyed() {
      socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
      socketService.terminate()
    },
    methods: {   
  
      addMsg(msg) {
        this.msgs.push(msg)
      },
      sendMsg() {
        // socketService.emit(SOCKET_EMIT_SEND_LEAD, {room: wap.createdBy._id, contact, wapId:wap._id} )

        // console.log('Sending', this.msg)
        // TODO: next line not needed after connecting to backend
        this.addMsg(this.msg)
        // setTimeout(() => this.addMsg({ from: 'Dummy', txt: 'Yey' }), 2000)
        // const user = userService.getLoggedinUser()
        // const from = (user && user.fullname) || 'Guest'
        const from = 'Guest'
        this.msg.from = from
        socketService.emit(SOCKET_EMIT_SEND_MSG,{ msg:this.msg, wapId:this.wapId})
        this.msg = { from, txt: '' }
      },
    //   changeTopic() {
    //     socketService.emit(SOCKET_EMIT_SET_ROOM, this.topic)
    //   }
    }
  }
  </script>
  
  <style>
  .pointer {
    /* width: 50px;
    height: 50px; */
    position: absolute
  }
  </style>
  