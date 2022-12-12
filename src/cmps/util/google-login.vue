<script>
import { googleTokenLogin } from "vue3-google-login"
import { userService } from '../../services/user.service.js'

export default {
  name: 'googleLogin',
  methods: {
    login() {
      googleTokenLogin().then(async (response) => {
        console.log("Handle the response", response)
        const loggedinUser = await userService.googleLogin(response)
        this.$emit('goToUserDash', loggedinUser)
      })
    }
  }

}

</script>


<template>
  
    <button class="google-login" @click="login">
      <img src="https://res.cloudinary.com/wicksin/image/upload/v1670837018/wicks/googlelogo_jdhmp8.png" />
      Login Using Google 
    </button>
</template>