<template>
    <div id="overlay">
        <div id="header">
            <span>Lot {{lot}}</span>
            <i class="fa-solid fa-circle-xmark" @click="closeOverlay"></i>
        </div>
        <div id="type">
            <span>Lot type here - </span>
            <i class="fa-solid fa-exclamation-triangle"></i>
            <p>You can't park here with your pass!</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class LotOverlay extends Vue {
        @Prop() lot!: string;

        closeOverlay(): void {
            this.$emit("closeOverlay");
        }
    }
</script>

<style scoped>
    #overlay {
        z-index: 900;
        width: 90vw;
        height: 30vh;
        background-color: white;
        position: absolute;
        bottom: 12vh;
        align-self: center;
        border-radius: 20px;
        display: flex;
    }

    #header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    #header > span {
        margin-left: 3vw;
        margin-top: 1.5vh;
        font-size: 2em;
        font-weight: bold;
    }

    #type {
        display: flex;
        flex-direction: row;
    }

    #type > span {
        margin-left: 3vw;
        margin-top: 1.5vh;
        font-style: italic;
    }

    .fa-exclamation-triangle {
        color: red;
        font-size : 1em;
        margin-top: 1vw;
    }

    .fa-circle-xmark {
        margin-right: 2vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: gray;
    }
</style>