<!-- Guest login page ONLY shown on the UserPage and SettingsPage when in guest mode -->

<template>
    <div>
        <div id="GuestLoginComponent">
            <div class="logo">
                <i v-if="this.$store.state.currentPage === 'profile'" class="fa-solid fa-user"></i>
                <i v-if="this.$store.state.currentPage === 'settings'" class="fa-solid fa-gear"></i>
                <span v-if="this.$store.state.currentPage === 'profile'">Profile</span>
                <span v-if="this.$store.state.currentPage === 'settings'">Settings</span>
                <p>Please login to use this feature</p>
            </div>

            <div id="LoginBtn" @click="googleLogin">
                <span class="btn">Login</span>
            </div>

            <i class="fa-solid fa-car-side fa-bounce" v-show="loading"></i>
            <span id="errorBox" v-show="lError">{{loginError}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
        Auth,
        getAuth,
        getRedirectResult,
        GoogleAuthProvider,
        signInWithPopup,
        signInWithRedirect,
        User,
        UserCredential,
    } from "firebase/auth";

@Component
export default class GuestLoginPage extends Vue {
    auth: Auth | null = null;

        loginError = ""; // Holds error status text
        lError = false; // Show error status text
        loading = false; // Show loading indicator

        mounted(): void {
            this.auth = getAuth();
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

                this.$store.state.isGuest = false;
                this.loading = false;
            })
            .catch((err: any) => {
                this.loginError = `Authentication error: ${err}`;
                this.loading = false;
                this.lError = true;
            });
        }
}
</script>

<style scoped>
    #GuestLoginComponent {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
    }

    .btn {
        border-radius: 20px;
    }

    #LoginBtn {
        color: #0065a4;
        margin-bottom: 5vh;
    }

    #LoginBtn > span {
        font-size: 4vh;
        padding: 2vh 10vw;
        background-color: #0065a4;
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
        color: #0065a4;
    }

    .fa-car-side {
        margin-top: 6vh;
    }

    .logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #0065a4;
        font-size: 2vh;
        margin-top: 10vh;
        padding-top: 10vh;
        margin-bottom: 10vh;
    }
</style>
