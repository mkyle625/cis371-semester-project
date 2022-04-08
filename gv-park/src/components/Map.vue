<template>
    <div style="height: 100%">
        <LMap style="height: 91.5%" :zoom="15" :center="mapCenter"
        @click="onMapClicked">
          <LTileLayer :url="mapUrl" :attribution="mapAttribution"></LTileLayer>
          <LPolygon :lat-lngs="lotC1Polygon.coords" :color="lotC1Polygon.color"></LPolygon>
          <LPolygon :lat-lngs="lotC2Polygon.coords" :color="lotC2Polygon.color"></LPolygon>
          <LPolygon :lat-lngs="lotH1Polygon.coords" :color="lotH1Polygon.color"></LPolygon>
          <LPolygon :lat-lngs="lotH2Polygon.coords" :color="lotH2Polygon.color"></LPolygon>
          <LPolygon :lat-lngs="lotKPolygon.coords" :color="lotKPolygon.color"></LPolygon>
          <LPolygon :lat-lngs="lotP1Polygon.coords" :color="lotP1Polygon.color"></LPolygon>
          <LPolygon :lat-lngs="lotP2Polygon.coords" :color="lotP2Polygon.color"></LPolygon>
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
    "&copy; <a target='_blank' href='http://osm.org/copyright'>OSM</a>";
  lotC1Polygon = {
      coords: [
        [42.96909796047934, -85.8890587091446],
        [42.96918435265441, -85.88874220848083],
        [42.96915293733204, -85.88845789432527],
        [42.969054764346296, -85.88826477527618],
        [42.96876431250764, -85.88813066482544],
        [42.96757836486032, -85.88811457157136],
        [42.967920040938616, -85.88908016681673],
        [42.9690195897132, -85.88906943798067],
        [42.969062785870946, -85.88904261589052],
      ],
      color: 'green',
      name: "Lot C1"
  }

lotC2Polygon = {
      coords: [
        [42.968839009013806, -85.889310836792],
        [42.96801041986542, -85.88932693004608],
        [42.96814398384089, -85.88993310928346],
        [42.968198915060036, -85.89052319526672],
        [42.96860731933348, -85.89049637317659],
        [42.9686780044132, -85.88989555835725],
        [42.968878278364656, -85.88936984539033]
      ],
      color: 'green',
      name: "Lot C2"
  }

  lotH1Polygon = {
      coords: [
        [42.962970238697565, -85.8927708864212],
        [42.962911588021186, -85.89217543601991],
        [42.962754458702825, -85.89159607887268],
        [42.96256582561764, -85.89111328125001],
        [42.96231066940285, -85.89065194129945],
        [42.962181066613965, -85.89081287384033],
        [42.96202397195839, -85.89063584804535],
        [42.961285621704036, -85.89177310466766],
        [42.961524913160424, -85.89220225811006],
        [42.96163908835692, -85.89259386062622],
        [42.96181946769992, -85.89255630970003],
        [42.96185874153194, -85.89300155639648],
        [42.96279737865808, -85.89300692081453],
        [42.96282106047182, -85.8927708864212]
      ],
      color: 'green',
      name: "Lot H1"
  }

  lotH2Polygon = {
      coords: [
        [42.96191446752898, -85.89038908481598],
        [42.96116302397008, -85.8894586319275],
        [42.96029383361218, -85.8909097487193],
        [42.96103767636653, -85.89180271016234],
      ],
      color: 'green',
      name: "Lot H2"
  }

  lotKPolygon = {
      coords: [
        [42.961003461491735, -85.88930088630099],
        [42.96031234964714, -85.88849607135083],
        [42.959993156606565, -85.88934534269907],
        [42.95958083972673, -85.8900781076191],
        [42.96009525369286, -85.89067903611522],
        [42.96036339794664, -85.890273562772],
        [42.96042229977808, -85.890316486236],
      ],
      color: 'blue',
      name: "Lot K"
  }

  lotP1Polygon = {
      coords: [
        [42.959790595367124, -85.8891659975052],
        [42.95975132021492, -85.88908553123474],
        [42.95952352383768, -85.8888226747513],
        [42.95952352383768, -85.88882803916931],
        [42.9593701191335, -85.8886617422104],
        [42.95920125125163, -85.88869392871858],
        [42.95913824268709, -85.88865637779237],
        [42.959102871429906, -85.88869392871858],
        [42.95884769587213, -85.88922500610353],
        [42.959377916098525, -85.8898311853409]
      ],
      color: 'blue',
      name: "Lot P1"
  }

    lotP2Polygon = {
      coords: [
        [42.959790595367124, -85.8891659975052],
        [42.95975132021492, -85.88908553123474],
        [42.95952352383768, -85.8888226747513],
        [42.95952352383768, -85.88882803916931],
        [42.9593701191335, -85.8886617422104],
        [42.95920125125163, -85.88869392871858],
        [42.95913824268709, -85.88865637779237],
        [42.959102871429906, -85.88869392871858],
        [42.95884769587213, -85.88922500610353],
        [42.959377916098525, -85.8898311853409]
      ],
      color: 'blue',
      name: "Lot P"
  }

  onMapClicked(e: any): void {
    // Emit an event to notify the parent element
    console.log(`[${e.latlng.lat}, ${e.latlng.lng}]`);
    this.$emit("map-clicked", e.latlng);
    //console.log(this.$store.state.windowHeight);
  }
}
</script>