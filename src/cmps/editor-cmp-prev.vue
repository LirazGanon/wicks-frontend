<template>

  <section v-if="view">
    <Container group-name="column" :get-child-payload="itemIndex => getChildPayload(itemIndex)"
      @drag-start="onDragStart" :should-accept-drop="() => false" :should-animate-drop="() => false"
      @drop="onDrop($event)">
      <Draggable v-for="item in view" :key="item.id">
        <div class="draggable-item">
          {{ item }}
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
      view: {}
    }
  },
  props: {
    cmps: Object,
  },
  created() {
    this.view = { ...this.cmps }
  },
  methods: {
    getShouldAcceptDrop(index, sourceContainerOptions, payload) {
      return this.cmps.options.drop
    },
    getShouldAnimateDrop(index, sourceContainerOptions, payload) {
      return this.cmps.options.animate
    },

    getChildPayload(itemIndex) {
      return this.view.cmps[itemIndex]
    },
    onDrop(dropResult) {
      let result = this.applyDrag(this.view.type, dropResult)
      this.view.type = result
      console.log('payload:', result.payload)
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
      // console.log(args);
    },

  },
  computed: {
    cmpsA() {
      return this.$store.getters.cmps
    }
  }

};
</script>