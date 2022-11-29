<template>
  <section class="wap-list-container">
    <ul class="wap-list">
      <wap-preview v-for="wap in waps" :key="wap._id" :wap="wap" @removeWap="remove" />
    </ul>
  </section>
</template>

<script>
import wapPreview from "./wap-preview.vue"

export default {
  props: {
    waps: Array,
  },
  components: {
    wapPreview,
  },
  methods: {
    remove(wapId) {
      this.$emit('removeWap', wapId)
    }
  },
}
</script>


<style scoped>
.wap-list-container a {
  margin-bottom: 10px;
  display: inline-block;
}
</style>
