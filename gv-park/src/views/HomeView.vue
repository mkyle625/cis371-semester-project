<template>
    <div style="height: 100%">
        <LotOverlay/>
        <Map @lot-tapped="selectLot"/>
        <NavBar/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";
    import Map from "../components/Map.vue";
    import LotOverlay from "../components/LotOverlay.vue";

    @Component({ components: { NavBar, Map, LotOverlay } })
    export default class HomeView extends Vue {
        selectLot(name: string): void {
            // console.log(`Home select: ${name}`);
        }
    }
</script>

<style scoped>

</style>