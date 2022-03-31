<template>
  <div id="app">
    <LoginPage/> <!-- Later, add this only to certain views or use v-show -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GuestLoginPage from './components/GuestLoginPage.vue';
import LoginPage from './components/LoginPage.vue';
import MainPage from './components/MainPage.vue';
import NavBar from './components/NavBar.vue';
import SettingsPage from './components/SettingsPage.vue';
import UserPage from './components/UserPage.vue';

@Component({
  components: {
    GuestLoginPage,
    LoginPage,
    MainPage,
    NavBar,
    SettingsPage,
    UserPage,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#NavComponent {
  position: absolute;
  bottom: 0;
}
</style>
