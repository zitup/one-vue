import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let day = date.getDate();
let latestDate = year + '-' + (month > 10 ? month : '0' + month) + '-' + day;

const state = {
    today: latestDate, //今天日期：xxxx-xx-xx
    date: latestDate   //选中日期，默认是今天,xxxx-xx-xx
}

export default new Vuex.Store({
    state,
    mutations: {
        setDate(state, payload){
            state.date = payload.date;
        }
    }
})