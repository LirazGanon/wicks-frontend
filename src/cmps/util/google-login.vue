<script setup>
import { googleTokenLogin } from "vue3-google-login"
import { userService } from '../../services/user.service.js'

const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response)
    userService.googleLogin(response)
  })
}
</script>


<template>
  <button class="google-login" @click="login">Login Using Google</button>
</template>