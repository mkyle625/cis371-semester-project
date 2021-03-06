<template>
    <div>
        <div id="LoginComponent">
            <div class="logo">
                <i class="fa-solid fa-road"></i>
                <span>myGVPark</span>
            </div>

            <div id="LoginBtn" @click="googleLogin">
                <span class="btn">Login</span>
            </div>

            <div id="GuestLoginBtn" @click="guestLogin">
                <span class="btn">Guest Login</span>
            </div>

            <i class="fa-solid fa-car-side fa-bounce" v-show="loading"></i>
            <span id="errorBox" v-show="lError">{{loginError}}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import router from "../router";
    import store from "../store";
    import {
        Auth,
        getAuth,
        GoogleAuthProvider,
        signInWithPopup,
        User,
        UserCredential,
    } from "firebase/auth";
import { DocumentReference, setDoc, getDoc } from "@firebase/firestore";
import { db } from "../myconfig";
import { doc } from "firebase/firestore";

    @Component
    export default class LoginView extends Vue {
        auth: Auth | null = null;

        loginError = ""; // Holds error status text
        lError = false; // Show error status text
        loading = false; // Show loading indicator

        mounted(): void {
            this.auth = getAuth();
            console.log("Logged in as guest: " + this.$store.state.isGuest);
        }

        googleLogin(): void {
            this.lError = false;
            this.loading = true;
            const provider = new GoogleAuthProvider();
            // signInWithRedirect(this.auth!, provider);
            // getRedirectResult(this.auth!)
            // .then((result) => {
            //     this.$router.push({name: "home"});
            // })
            // .catch((error) => {
            //     this.loginError = error;
            //     this.lError = true;
            // })
            signInWithPopup(this.auth!, provider)
            .then((cred: UserCredential) => {
                console.log(`Login successful: ${cred.user.displayName}`);
                const userInfo:DocumentReference = doc(db, "USERS", cred.user.uid);
                setDoc(userInfo, { name: cred.user.displayName, lastLogin: this.getDate() /*, firstLogin: null*/ }, {merge: true});
                // getDoc(userInfo).then((tempDoc: DocumentSnapshot) => {
                //     const data = tempDoc.data()!;
                //     if (data.firstLogin == null) {
                //         this.$store.state.isFirstTime = true;
                //     }
                //     else {
                //         this.$store.state.isFirstTime = data.firstLogin;
                //     }
                // });
                this.$store.state.isGuest = false;
                this.getFavoriteLots();
                this.$router.push({ name: "home" });
                this.loading = false;
            })
            .catch((err: any) => {
                this.loginError = `Authentication error: ${err}`;
                this.loading = false;
                this.lError = true;
            });
        }

        guestLogin(): void {
            this.loading = true;
            this.$router.push({ name: "home" });
            this.$store.state.isGuest = true;
            this.loading = false;
        }

        getDate(): string {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date+' '+time;
            return dateTime;
        }

        async getFavoriteLots():Promise<void>{
    
            if(this.$store.state.guestLogin !== "true"){
                const auth = getAuth();
                const userId = auth.currentUser?.uid;
                
                const profileCollectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
                const doc = await profileCollectionRef.get();
                const collectedData = doc.data();
                if(!collectedData){
                    console.log("no matching doc")
                }
                else{
                    this.$store.state.favoritedLots = collectedData.FavoriteLots;
                    console.log(`Favorite lots loaded: ${this.$store.state.favoritedLots}`);
                }
            }
        }
    }
</script>

<style scoped>
    #LoginComponent {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #0065a4;
    }

    .btn {
        border-radius: 20px;
    }

    #LoginBtn {
        color: white;
        margin-bottom: 5vh;
    }

    #LoginBtn > span {
        font-size: 4vh;
        padding: 2vh 10vw;
        background-color: white;
        color: #0065a4;
    }

    #GuestLoginBtn > span {
        font-size: 2vh;
        border: 1.5px solid white;
        padding: 1.7vh 6vw;
        color: white;
    }

    #errorBox {
        margin-top: 5vh;
        text-align: center;
        color: rgb(255, 125, 125);
    }

    .fa-solid {
        font-size: 4vh;
        margin-bottom: 5px;
        color: white;
    }

    .fa-car-side {
        margin-top: 6vh;
    }

    .logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        font-size: 2vh;
        margin-top: 10vh;
        padding-top: 10vh;
        margin-bottom: 10vh;
    }
</style>