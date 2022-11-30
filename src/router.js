import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import wapApp from './views/wap-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import wapEdit from './views/wap-edit.vue'
import wapPreview from './views/wap-preview.vue'

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
    name: 'wap-edit',
    component: wapEdit
  },
  {
    path: '/wap/:wapId',
    name: 'wap-preview',
    component: wapPreview
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
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

