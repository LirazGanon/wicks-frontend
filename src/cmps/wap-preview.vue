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
import { wapService } from '../services/wap.service.local';
import { store } from '../store';

export default {
  props: {
    wap: Object,
  },
  data() {
    return {   }
  },
  methods: {
    async editWap(wapId) {
      this.$emit('setIsLoading', true)
      const wapToEdit = await this.$store.dispatch({ type: 'getCustomWap', wapId })
      //  wapService.getCustomWap(wapId)
      console.log(wapToEdit)
      this.$router.push(`/wap/edit/${wapToEdit._id}`);
      this.$emit('setIsLoading', false)
    },
    prevWap(wapId) {
      this.$router.push(`/wap/${wapId}`);
    },
  },
  computed: {

  }
};
</script>
