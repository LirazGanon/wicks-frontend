<template>

  <section class="prev-cmp-img-container" v-if="view">
    <Container group-name="column" :get-child-payload="itemIndex => getChildPayload(itemIndex)"
      @drag-start="onDragStart" :should-accept-drop="() => false" :should-animate-drop="() => true"
      @drop="onDrop($event)">


      <Draggable v-for="item in cmps" :key="item.id">
        <div v-if="('All' === filter)" class="draggable-item" @mousedown="isDragging = true" @mouseup="isDragging = false"
        @mouseover="isDragging = false" :class="{ isDragging: isDragging }">
          <img  :src="item.src" />
        </div>
        <div v-else-if="(item.type === filter)" class="draggable-item" @mousedown="isDragging = true" @mouseup="isDragging = false"
        @mouseover="isDragging = false" :class="{ isDragging: isDragging }">
          <img :src="item.src" />
        </div>


      </Draggable>
    </Container>



  </section>

</template>
  
<script>
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  name: "cmps-preview",
  components: { Draggable, Container },
  data() {
    return {
      view: {},
      isDragging: false
    }
  },
  props: {
    cmps: Object,
    filter: String
  },
  created() {
    this.view = [...this.cmps]
  },
  methods: {
    getShouldAcceptDrop(index, sourceContainerOptions, payload) {
      return this.cmps.options.drop
    },
    getShouldAnimateDrop(index, sourceContainerOptions, payload) {
      return this.cmps.options.animate
    },

    getChildPayload(itemIndex) {
      return this.cmps[itemIndex]
    },
    onDrop(dropResult) {
      let result = this.applyDrag(this.view.type, dropResult)
      this.view.type = result
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
        itemToAdd.id += this.makeId()
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },
    makeId() {
      return Date.now() / 1500
    },
    onDragStart(...args) {
    },

  },
  computed: {
    cmpsA() {
      return this.$store.getters.cmps
    }
  }

};
</script>