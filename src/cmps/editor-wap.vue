<template>


  <section class="page-editor" ref="container" :class="[responsiveClass, myClass, wrapper()]"
    :style="{ maxWidth: conMaxWidth }">


    <pointer v-for="pointer in pointers" :pointer="pointer" :key="pointer.id" />
    <section v-if="!cmpsLength" class="wap-placeholder">

    </section>



    <Container group-name="column" orientation="vertical" :drop-placeholder="{
      className: 'drop-placeholder',
      animationDuration: '200',
      showOnTop: true
    }" :get-child-payload="itemIndex => getChildPayload(itemIndex)" :should-accept-drop="() => shouldAcceptDrop"
      :should-animate-drop="() => true" @drop="onDrop($event)">

      <Draggable v-if="wapToEdit" v-for="cmp in wapToEdit.cmps" :key="cmp.id">

        <component :is="cmp.type" :cmp="cmp" @openEditor="openEditor" @acceptDrop="acceptDrop"
          :isSelected="selectedId === cmp.id ? true : false" @deselect="(selectedId = null)" />

      </Draggable>

    </Container>

  </section>



</template>
  
<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import pointer from '../cmps/pointer.vue'
import wapHeader from '../cmps/waps-edit/wap-header-edit.vue'
import wapHero from '../cmps/waps-edit/wap-hero-edit.vue'
import wapForm from '../cmps/waps-edit/wap-form-edit.vue'
import wapContainer from '../cmps/waps-edit/wap-container-edit.vue'


import wapMap from '../cmps/waps-edit/wap-map-edit.vue'
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
import { socketService, SOCKET_EVENT_GET_UPDATED_WAP, SOCKET_EMIT_SET_USER_EDITOR, SOCKET_GET_MOUSE, SOCKET_SEND_MOUSE } from '../services/socket.service'

export default {
  name: "wap",
  components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer, wapContact, wapReviews, wapFooter, appHeader, wapBgImg, wapMap, pointer },
  props: { wap: Object },
  data() {
    return {
      responsiveClass: [],
      conMaxWidth: null,
      myClass: [],
      shouldAcceptDrop: false,
      selectedId: null,
      pointers: [],
      isEditorMode: true,
    }
  },
  async created() {
    await this.setWapToEdit()
    socketService.on(SOCKET_EVENT_GET_UPDATED_WAP, this.getUpdate)
    // TODO:LEHOZI MEHEARA
    socketService.on(SOCKET_SEND_MOUSE)
    socketService.on(SOCKET_GET_MOUSE, this.handleUsersPointer)
  },

  mounted() {
    eventBus.on('resizeWap', this.resize)
    eventBus.on('drag', this.acceptDrop)
    eventBus.on('reselect', this.selectNew)
    new ResizeObserver(this.resized).observe(this.$refs.container)
  },
  unmounted() {
    this.$store.commit({ type: 'removeWapToEdit' })
  },
  destroyed() {
    // socketService.off(SOCKET_EVENT_GET_UPDATED_WAP)
    socketService.off(SOCKET_EMIT_SET_USER_EDITOR)
    socketService.off(SOCKET_GET_MOUSE)
  },

  methods: {
    acceptDrop() {
      this.shouldAcceptDrop = true
    },
    openEditor(ev) {
      this.shouldAcceptDrop = false
      this.selectedId = ev.path.id
      console.log('this.selectedId:', this.selectedId)
      this.$emit('openEditor', ev)
    },
    getUpdate(wap) {
      this.$store.commit({ type: 'updateWap', wap })
    },
    selectNew(id) {
      // console.log('hereee:')
      this.selectedId = id
    },

    async setWapToEdit() {
      const { wapId } = this.$route.params
      socketService.emit(SOCKET_EMIT_SET_USER_EDITOR, wapId)

      if (!this.$store.getters.getWapToEdit) {
        await this.$store.dispatch({ type: 'setWapToEdit', wapId });


        // const userId = userService.getLoggedinUser().id
        // TODO:LEHOZI MEHEARA
        // this.pointerId = utilService.makeId()
        const container = this.$refs.container
        container.addEventListener('mousemove', ({ clientX, clientY }) => {
          const mouseLoc = { x: clientX, y: clientY }
          socketService.emit(SOCKET_SEND_MOUSE, mouseLoc)
        })
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
      if (offsetWidth < 550) this.responsiveClass = 'mobile'
      if (offsetWidth >= 550) this.responsiveClass = this.small()
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
      if (this.conMaxWidth === 460) return 'smartphone'
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
    },
    handleUsersPointer({ loc, id }) {
      const idx = this.pointers.findIndex(pointer => pointer.id === id)
      const pos = {
        top: loc.y + 'px',
        left: loc.x + 'px'
      }
      if (idx === -1) {
        const color = utilService.getRandomColor()
        const pointer = {
          id,
          color,
          pos
        }
        this.pointers.push(pointer)
      } else {
        this.pointers[idx].pos = pos
      }

      // console.log(this.$refs)
      // var color
      // console.log('baba')
      // if (!this.pointers.includes(id)) {
      //   color = utilService.getRandomColor()
      //   const idx = this.pointers.length
      //   this.pointers.push(id)
      //   setTimeout(() => {
      //     this.pointers.splice(idx, 1)
      //   }, 10000);
      // }
      // const elPointer = document.querySelector(`.${id}`)
      // // console.log(elPointer)
      // elPointer.style.color = color
      // elPointer.style.left = loc.x + 'px'
      // elPointer.style.top = loc.y + 'px'
    },
    closeModal() {
      this.isModalOpen = false
    },
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

<style>
.pointer {
  position: absolute;
  font-size: 50px;
  z-index: 1000;
}

.material-symbols-outlined.pointer {
  font-variation-settings:
    'FILL' 1,
    'wght' 700,
    'GRAD' 0,
    'opsz' 48
}
</style>