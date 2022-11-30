<template>
  <!-- <li> -->
  <section class="wap-preview">
    <!-- <p> -->
      <!-- {{ wap.desc }} -->
    <!-- </p> -->
    <img :src="wap.src" :alt="wap.name">
    <!-- {{ wap._id }} -->
    <section class="preview-btns-bg"> </section>
      <!-- <button @click="$emit('removeWap', wap._id)">x</button> -->
   
    <div class="preview-btns">
      <button @click="editWap(wap._id)">Edit</button>
      <button @click="prevWap(wap._id)">Preview</button>
    </div>
    
    <!-- <hr /> -->
    <p>
      {{ wap.name }}
    </p>
  </section>
  <!-- <button @click="addWapMsg(wap._id)">Add wap msg</button>
      <button @click="printWapToConsole(wap)">Print msgs to console</button> -->

  <!-- </li> -->

</template>

<script>
export default {
  props: {
    wap: Object,
  },
  methods: {
    showToyDetails() {
      this.$router.push('/wap/' + this.wap._id);
    },
    editWap(wapId) {
      this.$router.push(`/wap/edit/${wapId}`);
    },
    prevWap(wapId) {
      this.$router.push(`/wap/${wapId}`);
    },
  },
};
</script>
