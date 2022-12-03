<template>
  <section class="wap-preview">

    <img :src="wap.src" :alt="wap.name">

    <div class="preview-btns">
      <button @click="editWap(wap._id)">Edit</button>
      <button @click="prevWap(wap._id)">Preview</button>
    </div>

    <div class="wap-details">
      <span>{{ wap.type }}</span> - <span> {{ wap.name }}</span>
    </div>


  </section>


</template>

<script>
import { wapService } from '../services/wap.service.local';
import { store } from '../store';

export default {
  props: {
    wap: Object,
  },
  data() {
    return {}
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
