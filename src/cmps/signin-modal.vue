<template>
 <section class="login_modal">

   <div>
     <button @click="login">login</button>
     <button @click="signUp">signup</button>
     <button @click="goToPage">watch without loggin in</button>
    </div>

 </section>
</template>
<script>
export default {
  name: 'signinmodal',
  props: {
    wap: Object,
    user:Object
  },
  components: {},
  data() {
    return {};
  },
  created() { },
  methods: {
  login(){
  
  },
  signUp(){
  
  },
  goToPage(){
  this.$emit('unLoggedPublish',this.wap )
  },
  
  },
  computed: {},
  unmounted() { },
};
</script>

<style>
.login_modal{
width: 400px;
height: 400px;
position: absolute;
right: 50%;
background-color: aqua;
z-index: 100;
}
</style>