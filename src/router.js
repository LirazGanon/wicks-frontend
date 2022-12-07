import { createRouter, createWebHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import wapApp from './views/wap-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import editor from './views/editor.vue'
import wapView from './views/wap-view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/wap',
    name: 'wap-app',
    component: wapApp
  },
  {
    path: '/wap/edit/:wapId',
    name: 'editor',
    component: editor
  },
  {
    path: '/wap/:wapId/:isTemplate?',
    name: 'wap-view',
    component: wapView
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHistory()
  // history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

