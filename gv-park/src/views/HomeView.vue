<template>
    <div style="height: 100%">
        <Map/>
        <NavBar></NavBar>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";
    import Map from "../components/Map.vue";

    @Component({ components: { NavBar, Map } })
    export default class HomeView extends Vue {

    }
</script>

<style scoped>

</style>