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
     openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const wapContent = {
                key,
                id: this.cmp.id,
                idx,
                type: el.type,
                style: el.style,
                isContainer:true,
                currCmp:'wap-img'
            }

            this.$emit('openEditor', wapContent)
        },
  }
  </script>