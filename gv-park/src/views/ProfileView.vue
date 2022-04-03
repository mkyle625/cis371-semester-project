<template v-if="loginType === 'guest'">
    <div>
        <NavBar></NavBar>
        <GuestLogin></GuestLogin>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";
    import GuestLogin from "../components/GuestLogin.vue";

    @Component({ components: { NavBar, GuestLogin } })
    export default class ProfileView extends Vue {
        
    }
</script>

<style scoped>

</style>