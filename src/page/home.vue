<template>
    <div v-if="graphic">
        <headTop :weather="weather" v-if="weather" @ohmyfather="gotoSomeone" :is_not_today="is_not_today" />
        <graphic :graphic="graphic" v-if="graphic" />
        <overview :menu="menu" v-if="menu" />
        <card :cards="cards" v-if="cards" />
    </div>
</template>

<script>
    import headTop from '../components/index/header';
    import graphic from '../components/index/graphic';
    import overview from '../components/index/overview';
    import card from '../components/index/card';

    import request from '../service/request'

    export default {
        data() {
            return {
                weather: '', //天气
                graphic: '', //图文
                menu: '', //概览
                cards: '', //essay、music、movie、question等
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
        activated() {
            //解绑detail组件的onscroll事件
            // window.onscroll = '';
        },
        beforeRouteLeave(to, from, next) {
            this.top = document.documentElement.scrollTop
            next();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                window.scrollTo(0, vm.top)
            })
        },
        methods: {
            gotoSomeone: function(date) {
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