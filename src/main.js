import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store'

import {
    focusDirective,
    rainbowDirective,
    customOnDirective,
    clickOutsideDirective,
  } from '../directives'


import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

const app = createApp(rootCmp)
app.use(router)
app.use(store)

app.directive('focus', focusDirective)
app.directive('rainbow', rainbowDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)

app.mount('#app')
