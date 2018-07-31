<template>
    <header>
        <div id="header" @click="getNav">
            <div class="date">
                <span class="day">{{ getDate() }}</span>
                <span class="year_mouth">{{ getMouth() }}</span>
                <i class="i" :class="{ t: is_display_nav }"></i>
            </div>
            <div class="weather">
                <span>{{ weather.city_name }}</span> ·
                <span>{{ weather.climate }}</span>
                <span>{{ weather.temperature }}</span>&nbsp;&nbsp;℃
            </div>
        </div>
        <div class="nav" :class="{active: is_display_nav}">
            <p class="mouth">
                <span class="l"></span>
                07月
                <span class="r"></span>
            </p>
            <ul>
                <li v-for="item in data" :key="item.maketime" class="li" :class="{selected: new Date(item.maketime).toLocaleDateString().indexOf(date) > -1}">
                    <img :src="item.hp_img_url" class="img">
                    <p class="date">{{ item.maketime.split(' ')[0].split('-').join('/') }}</p>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import fetch from '../config/fetch'
export default {
    props: ['weather'],
    data(){
        return {
            is_display_nav: false,
            is_selected: false,
            is_body_scrool: false,
            date: new Date().toLocaleDateString(),
            data: []
        }
    },
    methods: {
        getDate: function () {
            return new Date().getDate();
        },
        getMouth: function () {
            let date = new Date().toString().split(' ');
            return date[1] + '.' + date[3];
        },
        getNav: function () {
            this.is_display_nav = !this.is_display_nav;
            document.body.style.overflow = this.is_body_scrool ? '' : 'hidden';
            this.is_body_scrool = !this.is_body_scrool;
            fetch('http://v3.wufazhuce.com:8000/api/hp/bymonth/2018-07', 'GET')
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    this.data = res.data;
                })
        }
    }
}
</script>

<style lang="less" scoped>
#header {
    width: 100%;
    height: 44px;
    padding: 0 20px;
    position: fixed;
    z-index: 1;
    border-bottom: 0.5px solid #e6e6e6;
    background-color: #fff;

    .date {
        float: left;
        height: 44px;
        line-height: 44px;
        font-size: 0;
        font-weight: bold;

        .day {
            font-size: 26px;
        }
        .year_mouth {
            margin: 0 3px 0 5px;
            font-size: 10px;
        }

        .i {
            display: inline-block;
            border-width: 0 0 5px 5px;
            border-style: solid;
            border-color: transparent transparent #333;
            transition: transform .3s;
            &.t{
                transform: rotateZ(180deg);
            }
        }
    }

    .weather {
        float: right;
        font-size: 11px;
        color: #808080;
        margin-top: 22px;
    }
}
.nav {
    display: none;
    position: fixed;
    top: 44px;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    background-color: #fff;
    overflow: scroll;
    z-index: 1;

    &.active{
        display: block;
    }
    .mouth {
        height: 20px;
        margin: 10px 0 15px;
        text-align: center;
        color: #a6a6a6;
        .l,
        .r {
            height: 1px;
            width: 42%;
            margin-top: 10px;
            background-color: #eeeeee;
        }
        .l {
            float: left;
        }
        .r {
            float: right;
        }
    }

    .li {
        float: left;
        width: 48%;
        margin-bottom: 20px;
        font-size: 0;
        border: .8px solid #eeeeee;
        &.selected{
            border: .8px solid #333;
        }
        &:nth-of-type(even) {
            float: right;
        }
        .img{
            width: 100%;
            height: 100px;
        }
        .date{
            text-align: center;
            color: #a6a6a6;
            font-size: 13px;
            margin: 6px 0;
        }
    }
}
</style>
