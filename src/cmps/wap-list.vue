<template>
  <section class="wap-list-container main-layout">

    <div class="bubble-list"></div>

    <h1>Pick one of our professionally designed website templates</h1>
      <h4>Or express your inner creativity and start from blank</h4>

    <section v-if="loading" class="wap-list">
	  <div v-for="n in 5" class="card-preview is-loading">
	    <div class="image"></div>
	    <div class="content" >
	      <h2></h2>
	    </div>
	  </div>
  </section>

    <section v-else-if="isLoading" class="skeleton">
      <div class="skeleton-shmh4b68a9d"></div>
    </section>

    <section v-else>

      <ul class="wap-list">
        <li v-for="template in templates" :key="template._id">
          <wap-preview :template="template" @setIsLoading="toggleIsLoading"  />
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
