<template>
  <section class="container home flex column">
    <app-header :noLogo="true" class="home" :mainLayout="'list-layout-header'" />

    <!-- <h1>Home Page</h1>
    <h5 class="text-center">
      Powered up Frontend
      <span class="material-symbols-outlined">search</span>

    </h5> -->
    <img alt="Vue logo" src="@/assets/logo-white.png" class="animate__animated animate__bounce animate__delay-1s">
    <h1 class="animate__animated animate__slideInLeft">Build Amazing Websites</h1>
    <section class="flex">
      <a href="#more"><button class="animate__animated animate__slideInRight">Read More</button></a>
      <button class="animate__animated animate__slideInRight" @click="this.$router.push('/wap')">Start Now</button>
    </section>
  </section>

  <section id="more">
    <section class="top-info">
      <h1>The Freedom to Create the Websites You Want</h1>

    </section>
    <section class="top-bottom-info"></section>
  </section>



</template>

<script>
import appHeader from '../cmps/app-header.vue'

export default {

  name: 'home',
  components: { appHeader },
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
