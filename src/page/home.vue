<template>
    <div v-if="graphic">
        <headTop :weather="weather" v-if="weather" @ohmyfather="gotoSomeone" :is_not_today="is_not_today" />
        <graphic :graphic="graphic" v-if="graphic" />
        <overview :menu="menu" v-if="menu" />
        <card :cards="cards" v-if="cards" />
    </div>
</template>

<script>
import headTop from '../components/header';
import graphic from '../components/graphic';
import overview from '../components/overview';
import card from '../components/card';

import request from '../service/request'

export default {
    data() {
        return {
            weather: '', //天气
            graphic: '', //图文
            menu: '',    //概览
            cards: '',   //essay、music、movie、question等
            is_not_today: false
        }
    },
    components: {
        headTop,
        graphic,
        overview,
        card
    },
    created() {
        this.gotoSomeone(this.$store.state.date);
    },
    methods: {
        gotoSomeone: function (date) {
            this.is_not_today = date != this.$store.state.today;
            this.$store.commit({
                type: 'setDate',
                date: date
            })
            request.getSomeoneList(date).then(res => {
                this.weather = res.data.weather;
                this.graphic = res.data.content_list[0];
                this.menu = res.data.menu;
                this.cards = res.data.content_list.slice(1);
            })
        }
    }
}
</script>
