<template>
    <div id="tutorial">
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
                    <option value="Student Commuter Pass">(Red) Student Commuter pass</option>
                    <option value="Lot J Remote Commuter Pass">(Purple) Lot J Remote Commuter</option>
                    <option value="Allendale Student Resident Pass">(Yellow) Allendale Student Resident</option>
                    <option value="Calder Student Resident Pass">(Orange) Calder Student Resident</option>
                    <option value="Faculty">(Blue) Faculty</option>
                    <option value="Pew Student Resident Pass">Pew Student Resident</option>
                    <option value="Remote Resident Seward Ramp Pass">Remote Resident Seward Ramp</option>
                </select>
            </form>
            <form>
                <label for="favoriteLot">Favorite lot:</label><br />
                <select id="favoriteLot" v-model="userFavoriteLot">
                    <option disabled=true>Please choose one:</option>
                    <option value="(Red) B">(Red) B</option>
                    <option value="(Red) C1">(Red) C1</option>
                    <option value="(Red) C2">(Red) C2</option>
                    <option value="(Blue) D1">(Blue) D1</option>
                    <option value="(Blue) D2">(Blue) D2</option>
                    <option value="(Blue) E">(Blue) E</option>
                    <option value="(Blue) F">(Blue) F</option>
                    <option value="(Blue) G1">(Blue) G1</option>
                    <option value="(Blue) F">(Blue) F</option>
                    <option value="(Red) G2">(Red) G2</option>
                    <option value="(Red) G3">(Red) G3</option>
                    <option value="(Red) H1">(Red) H1</option>
                    <option value="(Red) H2">(Red) H2</option>
                    <option value="(Purple) J">(Purple) J</option>
                    <option value="(Red) K1">(Red) K1</option>
                    <option value="(Yellow) K2">(Yellow) K2</option>
                    <option value="(Blue) M">(Blue) M</option>
                    <option value="(Green) MP">(Green) MP</option>
                    <option value="(Blue) N">(Blue) N</option>
                    <option value="(Orange) O">(Orange) O</option>
                    <option value="(Yellow) P1">(Yellow) P1</option>
                    <option value="(Yellow) P2">(Yellow) P2</option>
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
    export default class Tutorial extends Vue {
        userParkingPass = "";
        userFavoriteLot = "";

        nextButton() {
            this.$emit("nextButton", this.userParkingPass, this.userFavoriteLot);
        }
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