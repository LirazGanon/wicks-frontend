import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
// export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SEND_MSG = 'incoming-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'

// update wap events
export const SOCKET_EMIT_SET_USER_EDITOR= 'user-entered-editor'
export const SOCKET_EMIT_SEND_UPDATE_WAP= 'set-wap'
export const SOCKET_EVENT_GET_UPDATED_WAP = 'updated-wap'

// export const SOCKET_EVENT__GET_POINTER = 'send-pointer-pos'
// export const SOCKET_EMIT_SEND_POINTER = 'get-pointer-pos'

// MOUSE EVENTS
export const SOCKET_GET_MOUSE = 'mouse-move'
export const SOCKET_SEND_MOUSE = 'user-mouse-move'



const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(()=>{
        const user = userService.getLoggedinUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
  },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    login() {   
    },
    logout() {   
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    // Functions for easy testing of pushed data
    testChatMsg() {setWa
      this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
    },
    testUserUpdate() {
      this.emit(SOCKET_EVENT_USER_UPDATED, {...userService.getLoggedinUser()/*, score: 555*/})
    },
  }
  window.listenersMap = listenersMap;
  return socketService
}


// Basic Tests
function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}

function msg(msg) {
  console.log(msg)
  socketService.emit(msg)
}
function sendPointer(ev){
console.log(ev)
  socketService.emit(ev.clientx)
}

socketService.on('baba', cb('puk'))
socketService.on('incoming-msg')
socketService.on('send-pointer-pos', sendPointer)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)
