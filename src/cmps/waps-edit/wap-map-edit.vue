
<!-- thisns needed to be edited:
lat lng with input to change the markers(cmp.info.markers.position.lat/.lng)
center with input
-->

<template>
  <form @submit.prevent="searchLocation">
    <input type="text" placeholder="🔍 Search a location"/>
  </form>



  <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 500px"
    :center="cmp.info.center" :zoom="cmp.info.zoom" @click="mapClicked">
    <Marker v-for="(m, idx) in cmp.info.markers" :options="m" @click="markerClicked('markers', idx)">
      <InfoWindow>
        <div id="contet">
          <div id="siteNotice"></div>

          <h1 id="firstHeading" class="firstHeading" v-if="m.title" contenteditable="true"
            @click.stop @mousedown.stop="openEditor('heading')">title
          </h1>

          <div id="bodyContent">

            <b contenteditable="true" @click.stop @mousedown.stop="openEditor('title')">sub title</b>

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
  emits: ['openEditor', 'acceptDrop'],
  // props: { cmp: Object, isSelected: Boolean },
  components: { GoogleMap, Marker, InfoWindow },
  data() {
    return {
      API_KEY : 'AIzaSyDGWeJL2TG9pFic9i1BQLN5-5_jx1YbQNc',
      cmp: {
        "id": "wc0snc93d1",
        "type": "wap-map",
        "info": {
          "markers": [
            {
              "label": "TLV",
              "title": "Tel-Aviv",
              "details": "a nice city in the middle of israel.",
              "position": {
                "lat": 32.0853,
                "lng": 34.7818
              }
            },
            {
              "label": "JRL",
              "title": "Jerusalem",
              "details": "the capital of Israel. the holy city..",
              "position": {
                "lat": 31.7683,
                "lng": 35.2137
              }
            },
            {
              "label": "RHT",
              "title": "Rehovot",
              "details": "the best city in Israel. the king Guy lives there. you can jump to coffee anytime.",
              "position": {
                "lat": 31.8928,
                "lng": 34.8113
              }
            }
          ],
          "center": {
            "lat": 32.0853,
            "lng": 34.7818
          },
          "zoom": 10
        }
      },
    }
  },

  methods: {
    // openSectionEditor() {
    //   const payload = {
    //     el: { type: 'section' },
    //     currCmp: this.cmp,
    //     path: this.getPath()
    //   }
    //   this.$emit('openEditor', payload)
    // },
    // openEditor(key, idx) {
    //   let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
    //   el = utilService.copy(el)
    //   const payload = {
    //     key,
    //     path: this.getPath(idx),
    //     el,
    //     currCmp: this.cmp,
    //     elIdx: idx
    //   }
    //   this.$emit('openEditor', payload)
    // },
    // updateCmp(ev, key, idx) {
    //   let wap = this.$store.getters.getWapToEdit
    //   wap = utilService.copy(wap)
    //   const path = this.getPath(idx)
    //   let cmp = utilService.copy(this.cmp)
    //   let el
    //   if (idx !== undefined) {
    //     el = cmp.info[key][idx]
    //   } else {
    //     el = cmp.info[key]
    //   }
    //   if (el.txt === ev.target.innerText) return
    //   el.txt = ev.target.innerText

    //   wap.cmps[path.fatherIdx] = cmp
    //   try {
    //     this.$store.dispatch({ type: 'updateWapFull', wap })
    //   } catch {
    //     console.log('ops')
    //   }
    // },
    // getPath(idx) {
    //   const wap = this.$store.getters.getWapToEdit
    //   const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
    //   return { fatherIdx: cmpIdx, elIdx: idx, id: this.cmp.id }
    // },

    mapClicked(ev) {
      console.log(ev.latLng.lat())
      console.log(ev.latLng.lng())
      // console.log(this. GoogleMap)
      // GoogleMap.addListener("click", (mapsMouseEvent) => {
      //   // Close the current InfoWindow.
      //   infoWindow.close();

      //   // Create a new InfoWindow.
      //   infoWindow = new google.maps.InfoWindow({
      //     position: mapsMouseEvent.latLng,
      //   });
      //   console.log(mapsMouseEvent.latLng)
      //   infoWindow.setContent(
      //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      //   );
      //   infoWindow.open(map);
      // });
    },
    markerClicked(idx) {
      console.log(idx)
    },
    searchLocation(ev) {
      console.log(ev.target.value)
      this.getLocationByName(ev.target.value)
    },

    getLocationByName(txt) {
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${txt}&key=${API_KEY}`
        )
        .then((loc) => {
          const { lat, lng } = loc.data.results[0].geometry.location
          this.cmp.info.center= { lat, lng }
        })
        .catch((err) => {
          console.log('Not enabled to get any location / API Key wrong.', err)
          throw err
        })
    },
  },

  computed: {
    selected() {
      return this.isSelected ? 'selected1' : ''
    }
  }
}
</script>