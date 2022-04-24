<template>
  <div>
    <NavBar></NavBar>
    <GuestLogin v-if="this.$store.state.isGuest === true"></GuestLogin>
    <div v-else class="settingsViewContainer">
      <form>
          <label for="parkingPassType">Parking pass type:</label><br />
          <select id="parkingPassType" v-model="selectedPassType">
            <option disabled=true>Please choose one</option>
            <option value="Student Commuter Pass">Student Commuter pass</option>
            <option value="Lot J Remote Commuter Pass">Lot J Remote Commuter</option>
            <option value="Allendale Student Resident Pass">
              Allendale Student Resident
            </option>
            <option value="Calder Student Resident Pass">Calder Student Resident</option>
            <option value="Pew Student Resident Pass">Pew Student Resident</option>
            <option value="Remote Resident Seward Ramp Pass">
              Remote Resident Seward Ramp
            </option>
          </select>
        </form>
    <button @click="saveToFirebase">Save</button>
    
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
import { db } from "../myconfig";

@Component({ components: { NavBar, GuestLogin } })
export default class SettingsView extends Vue {
  auth: Auth | null = null;
  selectedPassType = "";

  mounted(): void {
    console.log("Logged in as guest: " + this.$store.state.isGuest);
  }

  logoutFirebase(): void {
   console.log("clickedLogout");
    this.auth = getAuth();
    signOut(this.auth);
    this.$store.state.guestLogin = false;
    this.$router.back();
  }
  async saveToFirebase():Promise<void>{
    console.log("clicked");
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const collectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
    const parkingPassFieldRef = await collectionRef.update({parkingPassType:this.selectedPassType}).then(()=>{
      console.log("Saved !!!")
    });
  }
}
</script>

<style scoped>
button {
  margin-top: 3vh;
  padding: 4vw 3vh;
  border-radius: 20px;
  background-color: #0065a4;
  color: white;
  border: none;
}

select {
  padding: 1vh 3vw;
  border-radius: 10px;
  font-weight: bold;
}

.LogoutBtn {
  background-color: #0065a4;
  color: white;
  margin-bottom: 1vh;
  margin-top: 5vh;
  align-content: center;
  padding: 5vw 5vh;
  border-radius: 20px;
}

.LogoutBtn > span {
  font-size: 20px;
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