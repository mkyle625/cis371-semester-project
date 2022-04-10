<template>
    <div style="max-height: 91.5vh">
        <LMap style="height: 100%" :zoom="16" :center="mapCenter"
        @click="onMapClicked">
          <LTileLayer :url="mapUrl" :attribution="mapAttribution"></LTileLayer>
            <LPolygon v-for="pLot in lots" :key="`lot-${pLot.name}`" 
              :lat-lngs="pLot.coords" :color="pLot.color" :fillColor="pLot.color"
              :weight="lineWeight" :opacity="lineOpacity" :fillOpacity="fillOpacity"
              @click="clickLot(pLot.name)"/>
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
  mapCenter = [42.9642403706251, -85.88916939152114];
  mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  mapAttribution =
    "&copy; <a target='_blank' href='http://osm.org/copyright'>OSM</a>";

  lots = lots; // Pull lots in from parking lots import
  lineWeight = 2; // Polygons - outline weight
  lineOpacity = 0.5; // Polygons - outline opacity
  fillOpacity = 0.15; // Polygons - fill opacity

  onMapClicked(e: any): void {
    // Emit an event to notify the parent element
    // console.log(`[${e.latlng.lat}, ${e.latlng.lng}]`);
    this.$emit("map-clicked", e.latlng);
    //console.log(this.$store.state.windowHeight);
  }

  clickLot(name: string): void {
    console.log(`Selected: ${name}`);
    this.$emit("lot-tapped", name);
  }
}
</script>

<style scoped>
  div {
    flex-grow: 1;
  }
</style>