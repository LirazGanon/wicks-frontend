<template>
  <section class=" name-modal">
    <p>This name is already taken.</p>

    <!-- <button @click="close">X</button> -->

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
  created() {
    setTimeout(() => this.$emit('close'), 5000)
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
  computed: {},
  unmounted() { },
};
</script>

<style scoped >
.name-modal {
  width: 300px;
  position: absolute;
  z-index: 100;
  top: 50px;
  height: 30px;
  left: 50%;
  font-size: 14px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  animation: waveIn .3s linear forwards;
  font-family: lato;
  box-shadow: -5px 0 #873dc8;
  padding-inline-start: 6px ;
}

@keyframes waveIn {
  0% {
    width: 0;
    opacity: 0;
  }
  
  100% {
    opacity: 1;
    width: 200px;
  }
}

p {
  margin: 0;
}

button {
  position: absolute;
  right: 10px;
}
</style>