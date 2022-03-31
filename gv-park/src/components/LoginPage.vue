<!-- The login page, shown when navigating to our app, allows user to login with Google or as a guest -->

<template>
    <div id="LoginComponent">
        <div class="logo">
            <i class="fa-solid fa-road"></i>
            <span>myGVPark</span>
        </div>

        <div class="LoginBtn" @click="btnPress('login')">
            <span>Login</span>
        </div>

        <div class="GuestLoginBtn" @click="btnPress('guestLogin')">
            <span>Guest Login</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { component } from 'vue/types/umd';

@Component
export default class LoginPage extends Vue {
    btnPress(selected: string) {
        switch(selected) {
            case "login": {
                // Do something with Firebase here!

                break;
            } 
            case "guestLogin": {
                // Hide login and continue to app
                
                break;
            }
        }
    }
}
</script>

<style scoped>
    #LoginComponent {
        height: 100vh;
        width: 100%;
        background-color: #0065a4;
    }

    .LoginBtn {
        color: white;
        margin-bottom: 5vh;
    }

    .LoginBtn > span {
        font-size: 4vh;
        border: 0.5vh solid white;
        padding: 1.7vh;
        background-color: white;
        color: #0065a4;
    }

    .GuestLoginBtn > span {
        font-size: 2vh;
        border: 0.5vh solid white;
        padding: 1.7vh;
        color: white;
    }

    .fa-solid {
        font-size: 4vh;
        margin-bottom: 5px;
    }

    .logo {
        display: flex;
        flex-direction: column;
        color: white;
        font-size: 2vh;
        margin-top: 10vh;
        padding-top: 10vh;
        margin-bottom: 10vh;
    }
</style>
