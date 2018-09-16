import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let day = date.getDate();
let latestDate = year + '-' + (month > 10 ? month : '0' + month) + '-' + day;

const state = {
    today: latestDate, // 今天日期：xxxx-xx-xx
    date: latestDate, // 选中日期，默认是今天,xxxx-xx-xx
    category: {
        Essay: '阅读',
        Serialcontent: '连载',
        Question: '问答',
        Music: '音乐',
        Movie: '影视'
    },
    is_music_play: false // 音乐播放状态
}

export default new Vuex.Store({
    state,
    mutations: {
        setDate(state, payload) {
            state.date = payload.date;
        },
        updateMusicState(state, payload) {
            state.is_music_play = payload.is_music_play;
        }
    }
})