<template>
    <div>
        <div id="header">
            <span>Lot {{lot}}</span>
            <i class="fa-solid fa-circle-xmark" @click="closeOverlay"></i>
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
    div {
        z-index: 900;
        width: 90vw;
        height: 20vh;
        background-color: white;
        position: absolute;
        bottom: 12vh;
        align-self: center;
        border-radius: 20px;
        display: flex;
    }

    #header {
        flex-direction: row;
        justify-content: space-between;
    }

    #header > span {
        margin-left: 3vw;
        margin-top: 1.5vh;
        font-size: 2em;
        font-weight: bold;
    }

    .fa-circle-xmark {
        margin-right: 2vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: gray;
    }
</style>