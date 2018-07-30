<template>
    <div v-if="data">
        <headTop :weather="data.weather" v-if="data.weather" />
        <graphic :graphic="graphic" v-if="graphic" />
        <overview :menu="menu" v-if="menu"/>
        <card :cards="cards" v-if="cards"/>
    </div>
</template>

<script>
import headTop from '../components/header';
import graphic from '../components/graphic';
import overview from '../components/overview';
import card from '../components/card';

import fetch from '../config/fetch'

export default {
    data() {
        return {
            data: [],
            graphic: {},
            menu: {},
            cards: []
        }
    },
    components:{
        headTop,
        graphic,
        overview,
        card
    },
    created() {
        fetch('http://v3.wufazhuce.com:8000/api/onelist/4843/0', 'GET')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                this.data = res.data;
                this.graphic = res.data.content_list[0];
                this.menu = res.data.menu;
                this.cards = res.data.content_list.slice(1);
            })
    }
}
</script>
