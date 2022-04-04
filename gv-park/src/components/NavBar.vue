<!-- Navbar, displayed on all pages except for the Login page -->

<template>
    <div id="NavComponent">
        <div :class="btnMain" @click="btnPress('home')">
            <i class="fa-solid fa-road"></i>
            <span>Parking</span>
        </div>

        <div :class="btnProfile" @click="btnPress('profile')">
            <i class="fa-solid fa-user"></i>
            <span>Profile</span>
        </div>

        <div :class="btnSettings" @click="btnPress('settings')">
            <i class="fa-solid fa-gear"></i>
            <span>Settings</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from "../router";

@Component
export default class NavBar extends Vue {
  mounted() : void {
      this.setStyle();
  }

  btnMain = "NavBtn";
  btnProfile = "NavBtn";
  btnSettings = "NavBtn";

  setStyle() : void {
      switch(this.$route.name) {
          case "home": {
              this.btnMain = "NavBtn active";
              this.btnProfile = "NavBtn";
              this.btnSettings = "NavBtn";
              break;
          } 
          case "profile": {
              this.btnMain = "NavBtn";
              this.btnProfile = "NavBtn active";
              this.btnSettings = "NavBtn";
              break;
          }
          case "settings": {
              this.btnMain = "NavBtn";
              this.btnProfile = "NavBtn";
              this.btnSettings = "NavBtn active";
              break;
          }
      }
  }

  btnPress(selected: string) {
      switch(selected) {
          case "home": {
              if (this.$route.name != "home") {
                 this.$router.replace({ name: "home" });
                 this.$store.state.currentPage = "home";
              }
              break;
          } 
          case "profile": {
              if (this.$route.name != "profile") {
                 this.$router.replace({ name: "profile" });
                 this.$store.state.currentPage = "profile";
              }
              break;
          }
          case "settings": {
              if (this.$route.name != "settings") {
                 this.$router.replace({ name: "settings" });
                 this.$store.state.currentPage = "settings";
              }
              break;
          }
      }
      console.log(`Selected page: ${selected}`);
  }
}
</script>

<style scoped>
    #NavComponent {
        height: 8.5vh;
        width: 100%;
        background-color: #0065a4;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        bottom: 0;
    }

    .NavBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #a5a5a5;
    }

    .active {
        color: white;
    }

    .NavBtn > span {
        font-size: 1.7vh;
    }

    .fa-solid {
        font-size: 4vh;
        margin-bottom: 5px;
    }
</style>
