<template>
  <li>
    <p>
      {{ wap.name }}
    </p>
    <p>
      {{ wap.desc }}
    </p>
    <img :src="wap.src" :alt="wap.name">
    {{wap._id}}
    <button @click="$emit('removeWap', wap._id)">x</button>
    <button @click="editWap(wap._id)">Edit</button>
    <button @click="prevWap(wap._id)">Preview</button>
    <hr />
    <!-- <button @click="addWapMsg(wap._id)">Add wap msg</button>
      <button @click="printWapToConsole(wap)">Print msgs to console</button> -->

  </li>

</template>

<script>
export default {
  props: {
    wap: Object,
  },
  methods: {
    showToyDetails() {
      this.$router.push('/wap/' + this.wap._id);
    },
    editWap(wapId) {
      this.$router.push(`/wap/edit/${wapId}`);
    },
    prevWap(wapId) {
      this.$router.push(`/wap/preview/${wapId}`);
    },
  },
};
</script>
