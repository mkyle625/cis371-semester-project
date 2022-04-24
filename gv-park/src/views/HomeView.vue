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
            this.$store.state.isFirstTime = false;
            this.loadFireBaseData();
            // ONLY FOR TESTING
            // Set isFirstTime to true
            //this.$store.state.isFirstTime = true;
            //if (this.$store.state.isFirstTime === true) {
                //this.showTutorial = true;
            //}
            //this.showTutorial = true;
        }

        selectLot(name: string): void {
            this.lot = name;
            // Change variable twice to force an update
            this.showOverlay = false;
            this.showOverlay = true;
        }

        nextButton() {
            this.showTutorial = false;
            this.setFireBaseData();
        }

        closeOverlay(): void {
            this.showOverlay = false;
        }

        // Grab firebase data and check if it's their first time
        async loadFireBaseData() {
            if (this.$store.state.isGuest !== true) {
                const auth = getAuth();
                const userID = auth.currentUser?.uid;
                const profileCollectionRef = db.collection("USERS").doc(userID);
                const document = await profileCollectionRef.get();
                const data = document.data();
                
                if (data?.firstLogin === null || data?.firstLogin === undefined) {
                    // Populate empty profile
                    const newProfile = {
                        parkingPassType: null,
                        TotalVotes: 0,
                        FavoriteLots: null,
                        Badges: "Verified",
                    };

                    await profileCollectionRef.collection("Profile Info").doc("ProfileView").set(newProfile).then(() => {
                        console.log("Instantiated new profile");
                    });

                    // Show the first time setup
                    this.$store.state.isFirstTime = true;
                    this.showTutorial = true;

                    // Update doc and merge firstLogin to false
                    //await profileCollectionRef.set({ firstLogin: false }, { merge: true });
                }
                else {
                    this.$store.state.isFirstTime = data?.firstLogin;
                }
            
            }
        }

        async setFireBaseData() {
            if (this.$store.state.isGuest !== true) {
                const auth = getAuth();
                const userID = auth.currentUser?.uid;
                const profileCollectionRef = db.collection("USERS").doc(userID);
                const document = await profileCollectionRef.get();
                const data = document.data();
                
                await profileCollectionRef.set({ firstLogin: false }, { merge: true });
            
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