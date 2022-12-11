<template>
    <div class="container">
        <div class="pointer material-symbols-outlined " ref="pointer" 
        v-if="pointers.length" v-for="(pointer, idx) in pointers" :class="pointers[idx]">arrow_selector_tool</div>
        <h1>About Us</h1>
        <p>We like You</p>
        <h2>Lets Chat About {{ topic }}</h2>
        <label>
            <input type="radio" value="Politics" v-model="topic" @change="changeTopic" />
            Politics
        </label>
        <label>
            <input type="radio" value="Love" v-model="topic" @change="changeTopic" />
            Love
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
    {{info.createdBy}}
    {{info._id}}
</template>
  
<script>
import {
    socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_ROOM,
    SOCKET_GET_MOUSE, SOCKET_SEND_MOUSE
} from '../services/socket.service'
import { utilService } from '../services/util.service'

export default {
    name: 'chat',
    props: {
        info: Object
    },
    data() {
        return {
            msg: { from: 'Guest', txt: '' },
            msgs: [],
            topic: 'Love',
            pointers: [],
            pointerId: null
        }
    },
    created() {
        // console.log(this.info.createdBy._id)
        socketService.emit(SOCKET_EMIT_SET_ROOM, this.info.createdBy._id)
    //     socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
    //     socketService.on(SOCKET_EMIT_SEND_MSG, this.addMsg)
    // socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
    },
    addMsg(msg) {
            this.msgs.push(msg)
        },
        sendMsg() {
            // console.log('Sending', this.msg)
            // TODO: next line not needed after connecting to backend
            this.addMsg(this.msg)
            // setTimeout(() => this.addMsg({ from: 'Dummy', txt: 'Yey' }), 2000)
            const user = userService.getLoggedinUser()
            const from = (user && user.fullname) || 'Guest'
            this.msg.from = from
            socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
            this.msg = { from, txt: '' }
        },
        changeTopic() {
            // socketService.emit(SOCKET_EMIT_SET_ROOM, this.romm)
        },

    destroyed() {
        socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
        // socketService.terminate()
    },
    methods: {
        // handleUsersPointer(e, id) {
        //     if (!this.pointers.includes(id)) this.pointers.push(id)
        //     const elPointer = document.querySelector(`.${id}`)
        //     elPointer.style.color = 'blue'
        //     elPointer.style.left = e.x + 'px'
        //     elPointer.style.top = e.y + 'px'
        // },

        // getCursorElement(id) {
        //   var elementId = 'cursor-' + id;
        //   var element = document.getElementById(elementId);
        //   if (element == null) {
        //     element = document.createElement('div');
        //     element.id = elementId;
        //     element.className = 'cursor';
        //     // Perhaps you want to attach these elements another parent than document
        //     // document.appendChild(element);
        //   }
        //   return element;
        // },



       
    }
}
</script>
  
<style>
/* .pointer { */
    /* width: 50px;
    height: 50px; */
    /* position: absolute */
/* } */

</style>
  