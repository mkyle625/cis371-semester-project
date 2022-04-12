<template>
    <div id="tutorial">
        <div class="logo">
                <i class="fa-solid fa-road"></i>
                <span>myGVPark</span>
        </div>
        <div id="welcome">
            <h1>Welcome</h1>
            <p>We notice that you haven't used this app before.</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class TutorialOverlay extends Vue {
        
    }
</script>

<style scoped>
    #tutorial {
        z-index: 900;
        width: 90vw;
        height: 80vh;
        background-color: white;
        position: absolute;
        bottom: 12vh;
        align-self: center;
        border-radius: 20px;
        display: flex;
    }

    #welcome {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
    
    #welcome > span {
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

    .logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: black;
        font-size: 1.5em;
        margin-top: 2vh;
        padding-top: 2vh;
        margin-bottom: 2vh;
    }
</style>