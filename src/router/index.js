import Vue from "vue";
import Router from "vue-router";
import home from "@/page/home";
const UserHome = { template: "<div>{{this.$route.name}}</div>" };
import essay from "../components/detail";
Vue.use(Router);

export default new Router({
  routes: [
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
      component: essay
    },
    {
      path: "/serialcontent/:item_id",
      name: "Serialcontent",
      component: UserHome
    },
    {
      path: "/question/:item_id",
      name: "Question",
      component: UserHome
    },
    {
      path: "/music/:item_id",
      name: "Music",
      component: UserHome
    },
    {
      path: "/movie/:item_id",
      name: "Movie",
      component: UserHome
    }
  ],
  mode: "hash",
  strict: false,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  }
});
