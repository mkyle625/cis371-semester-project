<template>
    <div>
        <NavBar></NavBar>
        <GuestLogin v-if="this.$store.state.isGuest === true"></GuestLogin>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";
    import GuestLogin from "../components/GuestLogin.vue";

    @Component({ components: { NavBar, GuestLogin } })
    export default class SettingsView extends Vue {
        mounted() : void {
            console.log("Logged in as guest: " + this.$store.state.isGuest);
        }
    }
</script>

<style scoped>

</style>