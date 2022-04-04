import { faHome } from "@fortawesome/free-solid-svg-icons";
import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
     isGuest: true,
     currentPage: "home",
     user: {
            id: "",
            name: "",
     }
 },
 getters: {
        isGuest: state => {
            return state.isGuest;
        } 
        
 },
 mutations: {},
 actions: {}
});