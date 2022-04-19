<template>
    <div id="weather">
        
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import axios, { AxiosResponse } from "axios";

    @Component
    export default class Weather extends Vue {
        mounted() {
            axios.request({
                url: "https://api.openweathermap.org/data/2.5/weather?lat=42.959790595367124&lon=-85.8891659975052&appid=7481c0a9c63f8d54edc0ba3dc45ebcca",
                method: "GET",
                responseType: "json"
            }).then((response: AxiosResponse) => {
                console.log(response.data);
            });
        }
        
    }
</script>

<style scoped>
    
</style>