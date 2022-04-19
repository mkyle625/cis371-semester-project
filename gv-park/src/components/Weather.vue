<template>
    <div id="weather">
        <div id="header">
            <i v-if="weatherCondition === 'Clouds'" class="fa-solid fa-cloud"></i>
            <i v-if="weatherCondition === 'Thunderstorm'" class="fa-solid fa-cloud-bolt"></i>
            <i v-if="weatherCondition === 'Drizzle'" class="fa-solid fa-cloud-rain"></i>
            <i v-if="weatherCondition === 'Rain'" class="fa-solid fa-cloud-showers-heavy"></i>
            <i v-if="weatherCondition === 'Snow'" class="fa-solid fa-snowflake"></i>
            <i v-if="weatherCondition === 'Clear'" class="fa-solid fa-sun"></i>
            <span>{{weatherCondition}} - {{temperature}}°</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import axios, { AxiosResponse } from "axios";

    @Component
    export default class Weather extends Vue {
        weatherCondition = "";
        temperature = 0;
        // Weather conditions
        // Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds
        mounted() {
            axios.request({
                url: "https://api.openweathermap.org/data/2.5/weather?lat=42.959790595367124&lon=-85.8891659975052&appid=7481c0a9c63f8d54edc0ba3dc45ebcca&units=imperial",
                method: "GET",
                responseType: "json"
            }).then((response: AxiosResponse) => {
                console.log(response.data);
                this.weatherCondition = response.data.weather[0].main;
                this.temperature = response.data.main.temp.toFixed(0);
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
        margin-left: 0.5vw;
        margin-top: 1.5vh;
        font-size: 1em;
        font-weight: bold;
        align-content: center;
        justify-content: center;
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

    .fa-cloud-bolt {
        margin-right: 0vw;
        margin-left: 3.6vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: gray;
    }

    .fa-cloud-rain {
        margin-right: 0vw;
        margin-left: 3.6vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: rgb(0, 197, 237);
    }

    .fa-cloud-showers-heavy {
        margin-right: 0vw;
        margin-left: 3.6vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: rgb(1, 26, 218);
    }

    .fa-snowflake {
        margin-right: 0vw;
        margin-left: 3.6vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: gray;
    }

    .fa-sun {
        margin-right: 0vw;
        margin-left: 3.6vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: rgb(236, 236, 9);
    }
</style>