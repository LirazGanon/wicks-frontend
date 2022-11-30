<template>


  <section v-if="view" class="full">

    <Container group-name="column" :get-child-payload="itemIndex => getChildPayload2(itemIndex)"
      :should-accept-drop="() => true" :should-animate-drop="() => true" @drop="onDrop($event)">
      <Draggable v-for="item in view.cmps" :key="item.id">
        <div class="draggable-item">



          <component :is="(item.type || 'wapHeader')" :info="item.info" />



          <pre>
            {{ item.type }}
            XXXXXXXXXXXXXXXX
          </pre>
        </div>
      </Draggable>

    </Container>




  </section>
</template>
  
<script>
import { Container, Draggable } from "vue3-smooth-dnd";

import wapHeader from './waps/wap-header.cmp.vue'
import wapHero from './waps/wap-hero.cmp.vue'
import wapForm from './waps/wap-form.cmp.vue'
import wapContainer from './waps/wap-container.cmp.vue'

import wapGallery from './waps/wap-gallery.cmp.vue'
import wapContact from './waps/wap-contact.cmp.vue'
import wapReviews from './waps/wap-reviews.cmp.vue'

import wapFooter from './waps/wap-footer.cmp.vue'
import appHeader from "./app-header.vue";


import { wapService } from '../services/wap.service.local.js'
export default {
  name: "wap",
  components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer, wapGallery, wapContact, wapReviews, wapFooter, appHeader },
  data() {
    return {
      view: {}
    }
  },
  created() {
    this.getCurrWap()
  },
  methods: {
    async getCurrWap() {
      const id = this.$route.params.wapId
      const wap = await wapService.getById(id)
      this.view = wap
    },
    getChildPayload2(itemIndex) {
      return this.view.cmps[itemIndex]
    },
    onDrop(dropResult) {
      let result = this.applyDrag(this.view.cmps, dropResult)
      this.view.cmps = result
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      // console.log(dragResult);
      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = { ...payload };
      if (removedIndex !== null) {

        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        itemToAdd.id += this.makeId()
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;

    },
    makeId() {
      return Date.now() / 1500
    },

  },
  computed: {
    wapA() {
      return this.$store.getters.wap
    }
  }
};
</script>