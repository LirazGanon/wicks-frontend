<template>
  <section class="wap-list-container">
    <ul v-if="waps"  class="wap-list">
      <wap-preview v-for="wap in waps" :key="wap._id" :wap="wap" @removeWap="remove" />
    </ul>
    <section v-if="loading" class="skeleton" >
      <div v-for="n in 2" class="skeleton-tuazaeqw532"></div>
    </section>
  </section>
</template>

<script>
import wapPreview from "./wap-preview.vue"

export default {
  props: {
    waps: Array,
    loading: Boolean
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
