<template>
  <section class="wap-list-container main-layout">

    <section v-if="loading" class="skeleton">
      <div v-for="n in 2" class="skeleton-tuazaeqw532"></div>
    </section>

    <section v-else-if="isLoading" class="skeleton">
      <div class="skeleton-shmh4b68a9d"></div>
    </section>

    <section v-else>

      <h1>Pick one of our professionally designed website templates</h1>
      <h4>Or express your inner creativity and start from blank</h4>
      <ul class="wap-list">
        <li v-for="template in templates" :key="template._id">
          <wap-preview :template="template" @setIsLoading="toggleIsLoading" />
        </li>
      </ul>

    </section>




  </section>
</template>

<script>
import wapPreview from "./wap-preview.vue"

export default {
  props: {
    templates: Array,
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
