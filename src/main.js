import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Tooltip from '../lib/tooltip'
import vue3GoogleLogin from 'vue3-google-login'






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
  app.use(ElementPlus)
  app.use(Tooltip,{
    delay: 50,
    center: true,
    offsetX: 60,
    offsetY: 20
 })
 app.use(vue3GoogleLogin, {
  clientId: '847813311602-36c40kl53jhbtrvp0o5qt8a6600klboj.apps.googleusercontent.com'
})

 
  
  app.directive('tooltip', Tooltip)
  app.directive('focus', focusDirective)
  app.directive('rainbow', rainbowDirective)
  app.directive('custom-on', customOnDirective)
  app.directive('click-outside', clickOutsideDirective)
  
app.mount('#app')
