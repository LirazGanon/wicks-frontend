<template>
  <section class="container home flex column">
    <app-header :noLogo="true" class="home" :mainLayout="'main-layout-header'" />

    <!-- <h1>Home Page</h1>
    <h5 class="text-center">
      Powered up Frontend
      <span class="material-symbols-outlined">search</span>

    </h5> -->
    <img alt="Vue logo" src="@/assets/logo-white.png"  class="animate__animated animate__bounce animate__delay-1s">
    <h1 class="animate__animated animate__slideInLeft">Build Amazing Sites</h1>
    <button class="animate__animated animate__slideInRight" @click="this.$router.push('/wap')">Start Now</button>

  </section>



</template>

<script>
import appHeader from '../cmps/app-header.vue'

export default {

  name: 'home',
  components:{appHeader},
  data() {
    return {
    }
  },
  computed: {
    
  },
  created() {
  },
  methods: {
  }

}
</script>
