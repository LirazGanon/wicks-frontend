<template>
  <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 500px"
    :center="cmp.info.center" :zoom="cmp.info.zoom">
    <Marker v-for="m in cmp.info.markers" :options="m" @click="(center = cmp.info.center)">
      <InfoWindow>
        <div id="contet">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading" >{{m.title}}</h1>
          <div id="bodyContent">
            <p >
              <b v-if="m.title">{{m.title}}</b>
            </p>
            <p v-if="m.details">
            {{m.details}}
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
  props: {
    cmp: Object,
  },
  components: { GoogleMap, Marker,InfoWindow },
  data() {
    return {

    }
  },
  methods:{
    mapClicked(ev) {
console.log(ev.latLng.lat())
console.log(ev.latLng.lng())
// console.log(this. GoogleMap)
      // GoogleMap.addListener("click", (mapsMouseEvent) => {
      //   // Close the current InfoWindow.
        infoWindow.close();

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
    }
  }
}
</script>