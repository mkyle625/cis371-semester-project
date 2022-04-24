<template>
    <div id="setup">
        <div class="logo">
                <i class="fa-solid fa-road"></i>
                <span>myGVPark</span>
        </div>
        <div id="welcome">
            <h1>Welcome</h1>
            <p>We notice that you haven't used this app before.</p>
            <p>Please answer the following questions to finish setting up your account.</p>
            <form>
                <label for="parkingPassType">Parking pass type:</label><br />
                <select id="parkingPassType" v-model="userParkingPass">
                    <option disabled=true>Please choose one:</option>
                    <option value="Student Commuter Pass">Student Commuter pass</option>
                    <option value="Lot J Remote Commuter Pass">Lot J Remote Commuter</option>
                    <option value="Allendale Student Resident Pass">Allendale Student Resident</option>
                    <option value="Calder Student Resident Pass">Calder Student Resident</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Pew Student Resident Pass">Pew Student Resident</option>
                    <option value="Remote Resident Seward Ramp Pass">Remote Resident Seward Ramp</option>
                </select>
            </form>
            <form>
                <label for="favoriteLot">Favorite lot:</label><br />
                <select id="favoriteLot" v-model="userFavoriteLot">
                    <option disabled=true>Please choose one:</option>
                    <option value="B">B</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G1">G1</option>
                    <option value="F"> F</option>
                    <option value="G2">G2</option>
                    <option value="G3">G3</option>
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="J">J</option>
                    <option value="K1">K1</option>
                    <option value="K2">K2</option>
                    <option value="M">M</option>
                    <option value="MP">MP</option>
                    <option value="N">N</option>
                    <option value="O">O</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                </select>
            </form>
            <div id="NextBtn" @click="nextButton">
                <span class="btn">Next</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class FirstTimeSetup extends Vue {
        userParkingPass = "";
        userFavoriteLot = "";

        nextButton() {
            this.$emit("nextButton", this.userParkingPass, this.userFavoriteLot);
        }
    }
</script>

<style scoped>
    #setup {
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
        align-items: center;
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

    .btn {
        border-radius: 20px;
    }

    #NextBtn {
        color: #0065a4;
        margin-top: 5vh;
        margin-bottom: 2vh;
    }

    #NextBtn > span {
        font-size: 2vh;
        padding: 2vh 5vw;
        background-color: #0065a4;
        color: white;
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