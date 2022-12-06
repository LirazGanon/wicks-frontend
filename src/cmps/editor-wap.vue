<template>



  <section class="page-editor" ref="container" :class="[responsiveClass, myClass, wrapper()]"
    :style="{ maxWidth: conMaxWidth }">

    <section v-if="!cmpsLength" class="wap-placeholder">

    </section>



    <Container group-name="column" :get-child-payload="itemIndex => getChildPayload(itemIndex)"
      :should-accept-drop="() => lirazKing" :should-animate-drop="() => true" @drop="onDrop($event)">
      <Draggable v-if="wapToEdit" v-for="cmp in wapToEdit.cmps" :key="cmp.id">
        <component :is="cmp.type" :cmp="cmp" @openEditor="makeLirazjQueen" @MakeLirazKing="makeLirazKing" />

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


import { templateService } from '../services/template.service.js'
import { wapService } from '../services/wap.service.js'
import { utilService } from "../services/util.service";
import { eventBus } from "../services/event-bus.service";
import { useStore } from "vuex";
import {socketService, SOCKET_EVENT_SEND_UPDATE_WAP, SOCKET_EMIT_GET_UPDATED_WAP} from '../services/socket.service'

export default {
  name: "wap",
  components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer, wapContact, wapReviews, wapFooter, appHeader, wapBgImg },
  props: { wap: Object },
  data() {
    return {
      responsiveClass: [],
      conMaxWidth: null,
      myClass: [],
      lirazKing: false
    }
  },
  created() {
        this.setWapToEdit()
        socketService.on(SOCKET_EMIT_GET_UPDATED_WAP, this.getUpdate())
    },

  mounted() {
    eventBus.on('resizeWap', this.resize)
    eventBus.on('drag',this.makeLirazKing)
    new ResizeObserver(this.resized).observe(this.$refs.container)
  },
  unmounted() {
    this.$store.commit({ type: 'removeWapToEdit' })
  },
  methods: {
    makeLirazKing() {
      this.lirazKing = true
    },
    makeLirazjQueen(ev) {
      this.lirazKing = false
      this.$emit('openEditor', ev)
    },
    getUpdate(wap){
      console.log('baba')
    console.log(wap)
    },

    async setWapToEdit() {
      const id = this.$route.params
      const wapId = (id.wapId)
      console.log(wapId)
      if (!this.$store.getters.getWapToEdit) {
        await this.$store.dispatch({ type: 'setWapToEdit', wapId })
      }
    },

    getChildPayload(itemIndex) {
      const wap = this.$store.getters.getWapToEdit
      return wap.cmps[itemIndex]
    },
    onDrop(dropResult) {
      let wap = this.$store.getters.getWapToEdit
      wap = utilService.copy(wap)
      dropResult = utilService.copy(dropResult)
      dropResult.payload.id = utilService.makeId()

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
    resized() {
      if (!this.$refs.container) return
      const { offsetWidth } = this.$refs.container
      if (offsetWidth < 620) this.responsiveClass = 'mobile'
      if (offsetWidth >= 620) this.responsiveClass = this.small()
      if (offsetWidth >= 860) this.responsiveClass = this.medium()
      if (offsetWidth >= 1024) this.responsiveClass = this.narrow()
      if (offsetWidth >= 1300) this.responsiveClass = this.normal()
      if (offsetWidth >= 1500) this.responsiveClass = this.wide()

    },
    resize(size) {
      const puk = size == '100' ? size + '%' : size + 'px'
      this.conMaxWidth = puk
      if (+size < 500) this.myClass = 'mobile-display'
      if (+size >= 600) this.myClass = 'tablet-display'
      if (size === '100') this.myClass = ''
    },

    wrapper() {
      if (this.conMaxWidth === 420) return 'smartphone'
      if (this.conMaxWidth === 800) return 'tablet'
      return ''
    },
    small() {
      return ['small']
    },
    medium() {
      return [...this.small(), 'medium']
    },
    narrow() {
      return [...this.medium(), 'narrow']
    },
    normal() {
      return [...this.narrow(), 'normal']
    },
    wide() {
      return [...this.normal(), 'wide']
    }
  },
  computed: {
    wapToEdit() {
      return this.$store.getters.getWapToEdit
    },
    cmpsLength() {
      const wap = this.wapToEdit
      // TODO:REMOVE SECOND ?
      return wap?.cmps?.length || 0
    }

  }
};
</script>