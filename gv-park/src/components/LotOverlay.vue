<template>
    <div>
        I am the lot overlay.
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class LotOverlay extends Vue {

    }
</script>

<style scoped>
    div {
        background-color: white;
        border-radius: 20px;
        height: 5vh;
        width: 80vw;
        position: absolute;
        bottom: 10vh;
        z-index: 0;
    }
</style>