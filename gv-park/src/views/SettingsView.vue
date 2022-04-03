<template>
    <div>
        <NavBar></NavBar>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";

    @Component({ components: { NavBar } })
    export default class SettingsView extends Vue {

    }
</script>

<style scoped>

</style>