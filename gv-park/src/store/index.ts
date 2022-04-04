import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
     isGuest: false,
 },
 getters: {
        isGuest: state => {
            return state.isGuest;
        } 
        
 },
 mutations: {},
 actions: {}
});