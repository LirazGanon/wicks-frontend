
<!-- thisns needed to be edited:
lat lng with input to change the markers(cmp.info.markers.position.lat/.lng)
center with input
-->

<template>
  {{ cmp.info.markers }}
  <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 500px"
    :center="cmp.info.center" :zoom="cmp.info.zoom" @click="mapClicked">
    <Marker v-for="m in cmp.info.markers" :options="m" @click="(center = cmp.info.center)">
      <InfoWindow>
        <div id="contet">
          <div id="siteNotice"></div>

          <h1 id="firstHeading" class="firstHeading" v-if="m.title" contenteditable="true"
            @click.stop@mousedown.stop="openEditor('heading')">title
          </h1>

          <div id="bodyContent">

            <b contenteditable="true" @click.stop@mousedown.stop="openEditor('title')">sub title</b>

            <p v-if="m.details" contenteditable="true" @mousedown.stop="openEditor('details')">
              here you can write things about your buissness or whatever it is that you want to share with the visitors
              in your site about the place. make it short and informative!
            </p>
          </div>
        </div>
      </InfoWindow>
    </marker>
  </GoogleMap>
</template>
<script>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

export default {
  name: 'dynamic-map-cmp',
  props: { cmp: Object, isSelected: Boolean },
  components: { GoogleMap, Marker, InfoWindow },
  data() {
    return {

    }
  },

  methods: {
    //   openSectionEditor() {
    //     const payload = {
    //       el: { type: 'section' },
    //       currCmp: this.cmp,
    //       path: this.getPath()
    //     }
    //     this.$emit('openEditor', payload)
    //   },
    //   openEditor(key, idx) {
    //     let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
    //     el = utilService.copy(el)
    //     const payload = {
    //       key,
    //       path: this.getPath(idx),
    //       el,
    //       currCmp: this.cmp,
    //       elIdx: idx
    //     }
    //     this.$emit('openEditor', payload)
    //   },
    //   updateCmp(ev, key, idx) {
    //     let wap = this.$store.getters.getWapToEdit
    //     wap = utilService.copy(wap)
    //     const path = this.getPath(idx)
    //     let cmp = utilService.copy(this.cmp)
    //     let el
    //     if (idx !== undefined) {
    //       el = cmp.info[key][idx]
    //     } else {
    //       el = cmp.info[key]
    //     }
    //     if (el.txt === ev.target.innerText) return
    //     el.txt = ev.target.innerText

    //     wap.cmps[path.fatherIdx] = cmp
    //     try {
    //       this.$store.dispatch({ type: 'updateWapFull', wap })
    //     } catch {
    //       console.log('ops')
    //     }
    //   },
    //   getPath(idx) {
    //     const wap = this.$store.getters.getWapToEdit
    //     const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
    //     return { fatherIdx: cmpIdx, elIdx: idx, id: this.cmp.id }
    //   },

    mapClicked() {
      GoogleMap.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        console.log(mapsMouseEvent.latLng)
        infoWindow.setContent(
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
      });
    }

},

computed: {
  selected() {
    return this.isSelected ? 'selected1' : ''
  }
}
}
</script>