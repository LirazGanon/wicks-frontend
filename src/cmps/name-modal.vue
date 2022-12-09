<template> 
<section class=" name-modal">
    <button @click="close">X</button>
    <h2>this site name is already taken.</h2>
    <h2>please try another one</h2>

</section>

</template>
 <script>
 export default {
 name: 'name-modal',
 props: {},
    components: {},
  data() {
   return {};
    },
  created() {},
 methods: {
    close(){
    this.$emit('close')
    },
},
 computed: {},
 unmounted() {},
  };
  </script>

  <style scoped>
.name-modal{
width: 400px;
height: 200px;
position: absolute;
z-index:100;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #fff;
}
button{
position: absolute;
right:10px;
top:10px;
}

</style>