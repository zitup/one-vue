import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
const UserHome = { template: "<div>{{this.$route.name}}</div>" };
import essay from '../components/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home
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
  ]
});
