import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginView from "../views/LoginView.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "login",
        component: LoginView,
    },
    {
        path:"/home/",
        name: "home",
        component: () =>
            import("../views/HomeView.vue"),
    },
    {
        path:"/profile/",
        name: "profile",
        component: () =>
            import("../views/ProfileView.vue"),
    },
    {
        path:"/settings/",
        name: "settings",
        component: () =>
            import("../views/SettingsView.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;