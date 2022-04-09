<template>
    <div style="height: 100%">
        <LMap style="height: 91.5%" :zoom="15" :center="mapCenter"
        @click="onMapClicked">
          <LTileLayer :url="mapUrl" :attribution="mapAttribution"></LTileLayer>
            <LPolygon v-for="pLot in lots" :key="`lot-${pLot.name}`" :lat-lngs="pLot.coords" :color="pLot.color"></LPolygon>
          </LMap>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker, LPolygon } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import { lots } from "../parkingLots";

@Component({ components: { LMap, LTileLayer, LMarker, LPolygon } })
export default class WorldMap extends Vue {
  mapCenter = [42.963, -85.891];
  mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  mapAttribution =
    "&copy; <a target='_blank' href='http://osm.org/copyright'>OSM</a>";

  lots = lots;

  onMapClicked(e: any): void {
    // Emit an event to notify the parent element
    console.log(`[${e.latlng.lat}, ${e.latlng.lng}]`);
    this.$emit("map-clicked", e.latlng);
    //console.log(this.$store.state.windowHeight);
  }
}
</script>