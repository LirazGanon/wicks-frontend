<template>
  <section class="wap-preview ">
    <img v-if="template.src" :src="template.src" :alt="template.name">
    <div v-else class="wapless">BLANK</div>
    <div class="preview-btns">
      <button @click="editWap(template._id)">Edit</button>
      <button @click="viewTemplate(template._id)">Preview</button>
    </div>

    <div class="wap-details">
      <span> {{ template.name }}</span>
    </div>


  </section>


</template>

<script>
import { wapService } from '../services/wap.service';
import { store } from '../store';

export default {
  props: {
    template: Object,
  },
  data() {
    return {}
  },
  methods: {
    async editWap(wapId) {
      this.$emit('setIsLoading', true)
      console.log(wapId)
      const wap = await this.$store.dispatch({ type: 'setWapToEdit', wapId })
      console.log(wap)
      this.$router.push(`/wap/edit/${wap._id}`);
      this.$emit('setIsLoading', false)
    },
    viewTemplate(templateId) {
      this.$router.push(`/wap/${templateId}`);
      console.log(this.template)
    },
  },
  computed: {

  }
};
</script>
