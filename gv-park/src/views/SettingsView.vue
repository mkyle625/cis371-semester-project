<template>
  <div>
    <NavBar></NavBar>
    <GuestLogin v-if="this.$store.state.isGuest === true"></GuestLogin>
    <div v-else class="settingsViewContainer">
      <form>
        <label for="parkingPassType">Parking pass type:</label><br />
        <select id="parkingPassType">
          <option value="studentCommuterPass">Student Commuter pass</option>
          <option value="lotJCommuterPass">Lot J Remote Commuter</option>
          <option value="allendaleStudentPass">
            Allendale Student Resident
          </option>
          <option value="calderStudentPass">Calder Student Resident</option>
          <option value="pewStudentPass">Pew Student Resident</option>
          <option value="remoteResidentSewardPass">
            Remote Resident Seward Ramp
          </option>
        </select>
      </form>

      <div class="LogoutBtn" @click="logoutFirebase">
        <span>Logout</span>
      </div>
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
    var e = document.getElementById("parkingPassType");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;
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