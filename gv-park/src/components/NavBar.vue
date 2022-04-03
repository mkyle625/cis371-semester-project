<!-- Navbar, displayed on all pages except for the Login page -->

<template>
    <div id="NavComponent">
        <div class="NavBtn" @click="btnPress('main')">
            <i class="fa-solid fa-road"></i>
            <span>Parking</span>
        </div>

        <div class="NavBtn" @click="btnPress('profile')">
            <i class="fa-solid fa-user"></i>
            <span>Profile</span>
        </div>

        <div class="NavBtn" @click="btnPress('settings')">
            <i class="fa-solid fa-gear"></i>
            <span>Settings</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  currentPage = "main";

  btnPress(selected: string) {
      switch(selected) {
          case "main": {
              this.currentPage = "main";
              break;
          } 
          case "profile": {
              this.currentPage = "profile";
              break;
          }
          case "settings": {
              this.currentPage = "settings";
              break;
          }
      }
      console.log(`Selected page: ${selected}`);
  }
}
</script>

<style scoped>
    #NavComponent {
        height: 10vh;
        width: 100%;
        background-color: #0065a4;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .NavBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
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
