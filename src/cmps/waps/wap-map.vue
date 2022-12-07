<template>
    <GoogleMap
      api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw"
      style="width: 100%; height: 500px"
      :center="cmp.info.center"
      :zoom="cmp.info.zoom"
    >
      <Marker v-for="m in cmp.info.markers" :options="m" @click="(center = cmp.info.center)" />
    </GoogleMap>
  </template>
  <script>
  import { GoogleMap, Marker } from 'vue3-google-map'
  
  export default {
    name:'dynamic-map-cmp',
    props: {
        cmp: Object,
    },
    components: { GoogleMap, Marker },
    data() {
      return {
     
      }
    },
  }
  </script>