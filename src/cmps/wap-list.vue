<template>
  <section class="wap-list-container">

    <section v-if="loading" class="skeleton">
      <div v-for="n in 2" class="skeleton-tuazaeqw532"></div>
    </section>

    <section v-else-if="isLoading" class="skeleton">
      <div class="skeleton-shmh4b68a9d"></div>
    </section>

    <ul v-else class="wap-list">
      <li v-for="wap in waps" :key="wap._id">
        <wap-preview :wap="wap" @setIsLoading="toggleIsLoading" />
      </li>
    </ul>



  </section>
</template>

<script>
import wapPreview from "./wap-preview.vue"

export default {
  props: {
    waps: Array,
    loading: Boolean
  },
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    wapPreview,
  },
  methods: {
    remove(wapId) {
      this.$emit('removeWap', wapId)
    },
    toggleIsLoading() {
      this.isLoading = !this.isLoading
      console.log(this.isLoading)
    }
  },
  computed: {
  
  }
}
</script>


<style scoped>
.wap-list-container a {
  margin-bottom: 10px;
  display: inline-block;
}
</style>
