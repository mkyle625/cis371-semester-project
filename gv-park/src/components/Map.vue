<template>
    <div style="height: 100%">
        <LMap style="height: 91%" :zoom="15" :center="mapCenter"
        @click="onMapClicked">
          <LTileLayer :url="mapUrl" :attribution="mapAttribution"></LTileLayer>
          <LPolygon :lat-lngs="lotHPolygon.coords" :color="lotHPolygon.color"></LPolygon>
          </LMap>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker, LPolygon } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

@Component({ components: { LMap, LTileLayer, LMarker, LPolygon } })
export default class WorldMap extends Vue {
  mapCenter = [42.963, -85.891];
  mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  mapAttribution =
    "&copy; <a target='_blank' href='http://osm.org/copyright'>OpenStreetMap</a>";

  lotHPolygon = {
      coords: [
        [42.959626099504796,-85.89007258415224],
        [42.96029349276785,-85.88858127593996],
        [42.96189520706331,-85.8903729915619],
        [42.961,-85.892],
      ],
      color: 'green'
  }

  onMapClicked(e: any): void {
    // Emit an event to notify the parent element
    console.log(e.latlng);
    this.$emit("map-clicked", e.latlng);
    console.log(this.$store.state.windowHeight);
  }
}
</script>