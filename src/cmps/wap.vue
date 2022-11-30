<template>

  <section v-if="view">

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
import wapHeader from './dynamic/wap-header.cmp.vue'
import wapHero from './dynamic/wap-hero.cmp.vue'
import wapForm from './dynamic/wap-form.cmp.vue'
import wapContainer from './dynamic/wap-container.cmp.vue'

import wapGallery from './dynamic/wap-gallery.cmp.vue'
import wapContact from './dynamic/wap-contact.cmp.vue'
import wapReviews from './dynamic/wap-reviews.cmp.vue'

import wapFooter from './dynamic/wap-footer.cmp.vue'


import { wapService } from '../services/wap.service.local.js'
export default {
  name: "wap",
  components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer,wapGallery,wapContact,wapReviews, wapFooter },
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
      return this.view.layout[itemIndex]
    },
    onDrop(dropResult) {
      let result = this.applyDrag(this.view.layout, dropResult)
      this.view = result
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