<template>
  <div>
      <div class = settingsViewContainer>
        <div class="LogoutBtn">
        <button @click="logoutFirebase">Logout</button>
        </div>
        <NavBar></NavBar>
        <GuestLogin v-if="this.$store.state.isGuest === true"></GuestLogin>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import GuestLogin from "../components/GuestLogin.vue";
import { Auth, getAuth, signOut } from "firebase/auth";

@Component({ components: { NavBar, GuestLogin } })
export default class SettingsView extends Vue {
  auth: Auth | null = null;
  mounted(): void {
    console.log("Logged in as guest: " + this.$store.state.isGuest);
  }

  logoutFirebase(): void {
    console.log("clicked");
    this.auth = getAuth();
    signOut(this.auth);
    this.$store.state.guestLogin = false;
    this.$router.back();
  }
}
</script>

<style scoped>
.LogoutBtn {
        color: #0065a4;
        margin-bottom: 1vh;
        margin-top: 8vh;
        align-content: center;
    }
    .settingsViewContainer {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2vh;
    padding-top: 2vh;
}
</style>