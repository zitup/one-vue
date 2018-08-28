import Vue from "vue";
import Router from "vue-router";
import home from "@/page/home";
import detail from "../components/detail";
import serialList from "../components/serialList";
Vue.use(Router);

export default new Router({
    routes: [
    {
        path: "/",
        redirect: "/one"
    },
    {
        path: "/one",
        name: "home",
        component: home,
        meta: {
            keepAlive: true
        }
    },
    {
        path: "/essay/:item_id",
        name: "Essay",
        component: detail
    },
    {
        path: "/serialcontent/:item_id",
        name: "Serialcontent",
        component: detail,
        children: [
        {
            path: "/seriallist",
            name: "serialList",
            component: serialList,
            props: true
        }]
    },
    {
        path: "/question/:item_id",
        name: "Question",
        component: detail
    },
    {
        path: "/music/:item_id",
        name: "Music",
        component: detail
    },
    {
        path: "/movie/:item_id",
        name: "Movie",
        component: detail
    }],
    // mode: "history",
    // strict: true,
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         if (from.meta.keepAlive) {
    //             from.meta.savedPosition = document.body.scrollTop;
    //         }
    //         return { x: 0, y: to.meta.savedPosition || 0 };
    //     }
    // }
});