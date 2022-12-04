<template>




  <section class="page-editor">

    <section v-if="!wapToEdit.cmps.length" class="wap-placeholder">
      
    </section>

    <Container group-name="column" :get-child-payload="itemIndex => getChildPayload(itemIndex)"
      :should-accept-drop="() => true" :should-animate-drop="() => true" @drop="onDrop($event)">
      <Draggable v-if="wapToEdit" v-for="cmp in wapToEdit.cmps" :key="cmp.id">
        <component :is="cmp.type" :cmp="cmp" @openEditor="$emit('openEditor', $event)" />

      </Draggable>

    </Container>


  </section>
</template>
  
<script>
import { Container, Draggable } from "vue3-smooth-dnd";

import wapHeader from '../cmps/waps-edit/wap-header-edit.vue'
import wapHero from '../cmps/waps-edit/wap-hero-edit.vue'
import wapForm from '../cmps/waps-edit/wap-form-edit.vue'
import wapContainer from '../cmps/waps-edit/wap-container-edit.vue'

import wapContact from '../cmps/waps-edit/wap-contact-edit.vue'
import wapReviews from '../cmps/waps-edit/wap-reviews-edit.vue'

import wapFooter from '../cmps/waps-edit/wap-footer-edit.vue'
import wapBgImg from '../cmps/waps-edit/wap-bg-img-edit.vue'
import appHeader from "./app-header.vue";


import { wapService } from '../services/wap.service.local.js'
import { utilService } from "../services/util.service";
export default {
  name: "wap",
  components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer, wapContact, wapReviews, wapFooter, appHeader, wapBgImg },
  props: { wap: Object },
  data() {
    return {

    }
  },
  async created() {
    const id = this.$route.params.wapId
    try{
      this.$store.dispatch({ type: 'setWapToEdit', id })
    } catch {
      console.log('cannot load wap');
    }
  },
  unmounted() {
    this.$store.commit({ type: 'removeWapToEdit' })
  },
  methods: {

    getChildPayload(itemIndex) {
      const wap = this.$store.getters.getWapToEdit
      return wap.cmps[itemIndex]
    },
    onDrop(dropResult) {
      let wap = this.$store.getters.getWapToEdit
      wap = utilService.copy(wap)

      let result = this.applyDrag(wap.cmps, dropResult)
      wap.cmps = result

      
      try {
        this.$store.dispatch({ type: 'updateWapFull', wap })
      } catch {
        console.log('ops');
      }
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = { ...payload };
      if (removedIndex !== null) {

        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;

    },
  },
  computed: {
    wapToEdit() {
      return this.$store.getters.getWapToEdit
    },
 
  }
};
</script>