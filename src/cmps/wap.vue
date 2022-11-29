<template>

  <section v-if="view">

    <Container group-name="column" :get-child-payload="itemIndex => getChildPayload2(itemIndex)"
      :should-accept-drop="() => true" :should-animate-drop="() => true" @drop="onDrop($event)">
      <Draggable v-for="item in view.layout" :key="item.id">
        <div class="draggable-item">
          {{ item.data }}
        </div>
      </Draggable>
    </Container>



  </section>
</template>
  
<script>
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  name: "wap",
  components: { Draggable, Container },
  data() {
    return {
      view: {}
    }
  },
  props: {
    wap: Object,
  },
  created() {
    this.view = this.wap
  },
  methods: {
    getChildPayload2(itemIndex) {
      return this.view.layout[itemIndex]
    },
    onDrop(dropResult) {
      let result = this.applyDrag(this.view.layout, dropResult)
      this.view.layout = result
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      console.log(dragResult);
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
    wapA(){
      return this.$store.getters.wap
    }
  }
};
</script>