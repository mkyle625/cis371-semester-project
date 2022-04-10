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
        z-index: 900;
        width: 90vw;
        height: 20vh;
        background-color: white;
        position: absolute;
        bottom: 12vh;
        align-self: center;
        border-radius: 20px;
    }
</style>