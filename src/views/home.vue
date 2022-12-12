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
    <section class="flex home-button">
      <button class="animate__animated animate__slideInRight" @click="doScrolling">Read More</button>
      <button class="animate__animated animate__slideInRight" @click="this.$router.push('/wap')">Start Now</button>
    </section>
  </section>

  <section id="more">
    <section class="top-info">

      <h1>The Freedom to Create the Websites You Want</h1>
      <p>Design and build your own high-quality websites. Whether you’re promoting your business, showcasing your work,
        opening your store or starting a blog - you can do it all with the Wicks website builder.</p>
      <div class="img">
        <img src="https://res.cloudinary.com/wicksin/image/upload/v1670788078/wicks/sample2_burhi1.jpg" alt="">
      </div>
    </section>
    <section class="bottom-info">
      <h1>Start building the website of your dreams</h1>
      <button @click="$router.push('/wap')">Start Now</button>
    </section>

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

    doScrolling() {
      var element = document.querySelector("#more");

      // scroll to element
      element.scrollIntoView({ behavior: 'smooth', block: 'end'});
    }
  }

}
</script>
