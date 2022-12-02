<template>


  <section v-if="view" class="page-editor">

    <Container group-name="column" :get-child-payload="itemIndex => getChildPayload2(itemIndex)"
      :should-accept-drop="() => true" :should-animate-drop="() => true" @drop="onDrop($event)">
      <Draggable v-if="wapToEdit" v-for="item in wapToEdit.cmps" :key="item.id">


        <!-- 
          <pre>
            {{ item }}
            XXXXXXXXXXXXXXX
          </pre> -->
        <component :is="(item.type || 'wap-header')" :cmp="item" @log="log" @openEditor="$emit('openEditor', $event)" />


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
export default {
  name: "wap",
  components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer, wapContact, wapReviews, wapFooter, appHeader, wapBgImg },
  data() {
    return {
      view: {}
    }
  },
  created() {
    this.getCurrWap()
  },
  unmounted() {
    this.$store.commit({ type: 'removeWapToEdit' })
  },
  methods: {
    async getCurrWap() {
      const id = this.$route.params.wapId
      if (!this.$store.getters.getWapToEdit) {
        await this.$store.dispatch({ type: 'setWapToEdit', id })
      }
      const wap = this.$store.getters.getWapToEdit
      this.view = JSON.parse(JSON.stringify(wap))
    },
    log(id) {
      console.log(this.view.cmps.findIndex(cmp => cmp.id == id))
    },
    getChildPayload2(itemIndex) {
      return this.view.cmps[itemIndex]
    },
    onDrop(dropResult) {
      let result = this.applyDrag(this.view.cmps, dropResult)
      console.log(result);
      this.view.cmps = result
      const wap = JSON.parse(JSON.stringify(this.view))
      this.$store.dispatch({ type: 'updateWap', wap })
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
    wapToEdit() {
      return this.$store.getters.getWapToEdit
    }
  }
};
</script>