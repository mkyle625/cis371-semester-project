<template>
    <div>
        <div id="LoginComponent">
            <div class="logo">
                <i class="fa-solid fa-road"></i>
                <span>myGVPark</span>
            </div>

            <div id="LoginBtn" @click="btnPress('login')">
                <span class="btn">Login</span>
            </div>

            <div id="GuestLoginBtn" @click="btnPress('guestLogin')">
                <span class="btn">Guest Login</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    @Component
    export default class LoginView extends Vue {
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

    .fa-solid {
        font-size: 4vh;
        margin-bottom: 5px;
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