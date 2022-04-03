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
    export default class LoginView extends Vue {
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
                this.$router.push({ name: "home", params: { loginMethod: "google" } });
                this.loading = false;
            })
            .catch((err: any) => {
                this.loginError = `Authentication error: ${err}`;
                this.loading = false;
                this.lError = true;
            });
        }

        guestLogin(): void {
            this.$router.push({ name: "home", params: { loginMethod: "guest" } });
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
        border: 0.5vh solid white;
        padding: 1.7vh;
        background-color: white;
        color: #0065a4;
    }

    #GuestLoginBtn > span {
        font-size: 2vh;
        border: 0.5vh solid white;
        padding: 1.7vh;
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