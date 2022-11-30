<template>
  <app-header />
  <section class="container home text-center">
    <h1>Home Page</h1>
    <h5 class="text-center">
      Powered up Frontend
      <span class="material-symbols-outlined">search</span>

    </h5>
    <img alt="Vue logo" src="@/assets/logo.png">

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
