<template>
    <div style="height: 100%">
        <Map @lot-tapped="selectLot"/>
        <LotOverlay :lot="lot" v-show="showOverlay" @closeOverlay="closeOverlay"/>
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
        lot?: string;
        showOverlay = false;

        selectLot(name: string): void {
            this.lot = name;
            // Change variable twice to force an update
            this.showOverlay = false;
            this.showOverlay = true;
        }

        closeOverlay(): void {
            this.showOverlay = false;
        }
    }
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
    }
</style>