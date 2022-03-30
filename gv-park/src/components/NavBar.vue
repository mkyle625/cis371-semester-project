<!-- Navbar, displayed on all pages except for the Login page -->

<template>
    <div id="NavComponent">
        <input type="button"/>
        <input type="button"/>
        <input type="button"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  
}
</script>

<style scoped>
    div {
        height: 10vh;
        background-color: #006eff;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
