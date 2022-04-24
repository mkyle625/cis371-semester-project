<template>
    <div style="height: 100%">
        <Map @lot-tapped="selectLot"/>
        <LotOverlay :lot="lot" v-show="showOverlay" @closeOverlay="closeOverlay" :v-key="lot"/>
        <FirstTimeSetup v-if="this.$store.state.isGuest === false && this.$store.state.isFirstTime === true" v-show="showTutorial" @nextButton="nextButton"/>
        <NavBar/>
        <Weather/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";
    import Map from "../components/Map.vue";
    import LotOverlay from "../components/LotOverlay.vue";
    import FirstTimeSetup from "../components/FirstTimeSetup.vue";
    import Weather from "../components/Weather.vue";
    import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
    import { db } from "../myconfig";

    @Component({ components: { NavBar, Map, LotOverlay, FirstTimeSetup, Weather } })
    export default class HomeView extends Vue {
        lot = "none";
        showOverlay = false;
        showTutorial = true;

        mounted() {
            this.loadFireBaseData();
            // ONLY FOR TESTING
            // Set isFirstTime to true
            this.$store.state.isFirstTime = true;
            if (this.$store.state.isFirstTime === true) {
                this.showTutorial = true;
            }
            this.showTutorial = true;
        }

        selectLot(name: string): void {
            this.lot = name;
            // Change variable twice to force an update
            this.showOverlay = false;
            this.showOverlay = true;
        }

        nextButton() {
            this.showTutorial = false;
        }

        closeOverlay(): void {
            this.showOverlay = false;
        }

        // Grab firebase data and check if it's their first time
        async loadFireBaseData() {
            if (this.$store.state.isGuest !== true) {
                const auth = getAuth();
                const userID = auth.currentUser?.uid;
                const profileCollectionRef = db.collection("USERS").doc(userID).collection("Profile Info").doc("ProfileView");
                const document = await profileCollectionRef.get();
                const data = document.data();
                // ONLY FOR TESTING
                // Manually set to true
                this.$store.state.isFirstTime = false;//data?.isFirstTime;
                this.showTutorial = true;
                // if (data?.isFirstTime === true) {
                //     this.showTutorial = true;
                // }
                // else {
                //     this.showTutorial = false;
                // }
            }
        }
    }
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
    }
</style>