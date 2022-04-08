<template>
  <div>
      <GuestLogin v-if="this.$store.state.isGuest === true"></GuestLogin>
      <div v-else class = profileViewContainer> 
            <img class="profile_image" :src="userPhotoURL" v-if="userPhotoURL.length > 0" width="64">
            <div class="profile_data">
                <h1>{{userInfo}}</h1>
                <h2>Parking pass:</h2>
                <p>Student commuter<p>
                <h2>Total votes</h2>
                <p>You have voted 14 times</p>
                <h2>Favorite lots</h2>
                <p>Allendale Lot C1</p>
                <h2>Badges:</h2>
                <div id="LogoutBtn" @click="logoutFirebase">
                <span class="btn">Logout</span>
            </div>
            </div>

         
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";
    import GuestLogin from "../components/GuestLogin.vue";
    import {
        Auth,
        getAuth,
        getRedirectResult,
        GoogleAuthProvider,
        onAuthStateChanged,
        signInWithPopup,
        signInWithRedirect,
        signOut,
        User,
        UserCredential,
    } from "firebase/auth";

    @Component({ components: { NavBar, GuestLogin } })
    export default class ProfileView extends Vue {
        
    userPhotoURL = "";
    auth: Auth | null = null;
    userInfo = "";
    mounted() : void {
        console.log("Logged in as guest: " + this.$store.state.isGuest);
        this.auth = getAuth();
        onAuthStateChanged(this.auth, (user: User | null) => {
        console.log("Auth changed", user);
        if (user) {
            this.userPhotoURL = user.photoURL ?? "";
            this.userInfo = `${user.displayName ?? "No Name"}`;
        }
        });
    }



    logoutFirebase():void{
        console.log('clicked')
        this.auth=getAuth();
        signOut(this.auth);
        this.$router.back();
    }
    }


</script>

<style scoped>
.profile_data {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
    }
.profileViewContainer {
height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
font-size: 2vh;
padding-top: 10vh;

}
.profile_data > h2{
    margin-bottom: 1vh;
    margin-top: 4vh;
}
.profile_data > p{
    margin-bottom: 1px;
}
.profile_data > h1{
    margin-bottom: 3vh;
}
.btn {
        border-radius: 20px;
    }
#LogoutBtn {
        color: #0065a4;
        margin-bottom: 1vh;
        margin-top: 8vh;

    }
#LogoutBtn > span {
        font-size: 4vh;
    }
</style>

 