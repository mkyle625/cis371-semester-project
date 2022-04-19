<template>
    <div id="weather">
        <div id="header">
            <i class="fa-solid fa-cloud"></i>
            <span>{{weatherCondition}} - {{temperature}}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import axios, { AxiosResponse } from "axios";

    @Component
    export default class Weather extends Vue {
        weatherCondition = "";
        temperature = "";

        mounted() {
            axios.request({
                url: "https://api.openweathermap.org/data/2.5/weather?lat=42.959790595367124&lon=-85.8891659975052&appid=7481c0a9c63f8d54edc0ba3dc45ebcca&units=imperial",
                method: "GET",
                responseType: "json"
            }).then((response: AxiosResponse) => {
                console.log(response.data);
                this.weatherCondition = response.data.weather[0].main;
                this.temperature = response.data.main.temp;
            });
        }
        
    }
</script>

<style scoped>
    #weather {
        z-index: 900;
        width: 10vw;
        height: 10vh;
        background-color: white;
        position: absolute;
        top: 2vh;
        right: 10vh;
        align-self: center;
        border-radius: 20px;
        display: flex;
    }

    #header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    #header > span {
        margin-left: 3vw;
        margin-top: 1.5vh;
        font-size: 1em;
        font-weight: bold;
    }

    #type {
        display: flex;
        flex-direction: row;
    }

    .fa-cloud {
        margin-right: 0vw;
        margin-left: 3.6vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: gray;
    }
</style>