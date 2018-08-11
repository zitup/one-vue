<template>
    <header>
        <div id="header" @click="getNav">
            <div class="date">
                <span class="day">{{ day }}</span>
                <span class="year_month">{{ headerMonth }}</span>
                <i class="i" :class="{ t: is_display_nav }"></i>
            </div>
            <div class="weather" v-if="!is_not_today">
                <span>{{ weather.city_name }}</span> ·
                <span>{{ weather.climate }}</span>
                <span>{{ weather.temperature }}</span>&nbsp;&nbsp;℃
            </div>
            <div v-else class="today" @click="initToday($event)">
                今天
            </div>
        </div>
        <div id="nav" class="nav" :class="{active: is_display_nav}">
            <div id="nav_wrap">
                <div v-for="monthData in data" :key="monthData[0].date">
                    <p class="month">
                        <span class="l"></span>
                        {{ monthData[0].date.substr(5, 2) }}月
                        <span class="r"></span>
                    </p>
                    <ul id="ul" class="clear">
                        <li v-for="item in monthData" :key="item.id" class="li" :class="{selected: item.date == date}" @click="ohmyfather(item.date)">
                            <img v-lazy="item.cover" class="img">
                            <p class="date">{{ item.date.split(' ')[0].split('-').join('/') }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="date" style="display: none">
            <div class="title">选择日期</div>
            <div class="date_wrap clear">
                <ul class="year">
                    <li>2018年</li>
                    <li>2017年</li>
                    <li>2016年</li>
                    <li>2016年</li>
                    <li>2016年</li>
                    <li>2016年</li>
                </ul>
                <ul class="month">
                    <li v-for="month in month_choice" :key="month">{{ month }}月</li>
                </ul>
            </div>
            <div class="confirm">确定</div>
        </div>
    </header>
</template>

<script>
import request from '../service/request'
export default {
    props: ['weather', 'is_not_today'],
    data() {
        return {
            is_display_nav: false,//图片导航是否显示
            is_selected: false,   //
            is_body_scrool: false,//body是否可以滑动
            is_first_click: true, //第一次点击header判断，避免重复请求
            date: '',             //当下展示的one对应的日期
            today: '',            //最新日期
            day: '',              //header展示one的日
            headerMonth: '',      //header展示one的年月
            month: '',            //本月
            year: '',             //本年
            lastMonth: '',        //滑动加载请求的月份
            lastYear: '',         //滑动加载请求的年份
            data: [],             //图片导航数据
            month_choice: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        }
    },
    created() {
        let date = new Date().toDateString().split(' ');
        let month = new Date().getMonth() + 1;

        //当下展示的one对应的日期
        this.date = this.today = date[3] + '-' + (month > 10 ? month : '0' + month) + '-' + date[2];
        //本月
        this.month = month;
        //本年
        this.year = date[3];
        //header展示的日
        this.day = date[2];
        //header展示的年月
        this.headerMonth = date[1] + '.' + date[3];
    },
    mounted() {

    },
    methods: {
        //重置顶部日期
        setHeaderMonth: function (d) {
            let date = new Date(d).toString().split(' ');
            this.day = date[2];
            this.headerMonth = date[1] + '.' + date[3];
        },
        //获取最近两个月份，用于图片导航初始数据
        getLatestTwomonth: function () {
            let ms = [this.year + '-' + this.month];

            //初始化滑动加载时请求的年月
            this.lastMonth = this.month == 2 ? 12 : this.month == 1 ? 11 : this.month - 2;
            this.lastYear = this.lastMonth > 10 ? this.year - 1 : this.year;
            //如果本月天数小于10天，则获取两个月数据
            if (this.day < 10) {
                this.month > 1 ? ms.push(this.year + '-' + (this.month - 1)) : ms.push((this.year - 1) + '-12')
            }
            return ms;
        },
        //重置上个月，用于滑动加载
        setLastYearMonth: function () {
            this.lastMonth = this.lastMonth > 1 ? this.lastMonth - 1 : 12;
            this.lastYear = this.lastMonth != 12 ? this.lastYear : this.lastYear - 1;
        },
        getNav: function () {
            //弹出层切换开关
            this.is_display_nav = !this.is_display_nav;
            //弹出层时，首页禁止滑动开关
            document.body.style.overflow = this.is_body_scrool ? '' : 'hidden';
            this.is_body_scrool = !this.is_body_scrool;

            //图片导航初始数据
            if (this.is_first_click) {
                //重复点击标识
                this.is_first_click = false;
                let that = this;
                //获取月份
                let ltm = this.getLatestTwomonth();
                request.getLTMdata(ltm).then(res => {
                    that.data.push(res[0].data);
                    that.data.push(res[1].data);
                })
            }

            // 滑动加载上月数据事件
            // 设置一个开关来避免重负请求数据
            let sw = true;
            let $nav = document.getElementById('nav');
            let that = this;
            $nav.onscroll = function () {
                if ($nav.scrollTop + window.innerHeight >= document.getElementById('nav_wrap').offsetHeight) {
                    if (sw) {
                        //关闭开关
                        sw = false;
                        request.getLMData(that.lastYear, that.lastMonth)
                            .then(res => {
                                that.data.push(res.data);
                                //打开开关
                                sw = true;
                                //重置上个月
                                that.setLastYearMonth()
                            })
                    }
                }
            }
        },
        ohmyfather: function (date) {
            //隐藏弹层
            this.is_display_nav = false;
            //打开首页滑动
            document.body.style.overflow = '';
            this.is_body_scrool = !this.is_body_scrool;
            //滑动到顶部
            window.scrollTo(0, 0);
            //重置顶部日期
            this.setHeaderMonth(date);
            //重置当下显示one对应的日期
            this.date = date;
            //
            this.$store.commit({
                type: 'setDate',
                date: date
            })

            this.$emit('ohmyfather', date, this.today)
        },
        //回到今天
        initToday: function (e) {
            this.ohmyfather(this.today);
            e.stopPropagation();
        }
    }
}
</script>

<style lang="less" scoped>
@import "../style/mixin";
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
        .year_month {
            margin: 0 3px 0 5px;
            font-size: 10px;
        }

        .i {
            display: inline-block;
            border-width: 0 0 5px 5px;
            border-style: solid;
            border-color: transparent transparent #333;
            transition: transform 0.3s;
            &.t {
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
    .today {
        float: right;
        height: 26px;
        width: 50px;
        line-height: 26px;
        margin-top: 9px;
        text-align: center;
        font-size: 13px;
        color: #5c5c5c;
        border: 1px solid #d3d3d3;
        border-radius: 3px;
    }
}
.nav {
    display: none;
    position: fixed;
    top: 44px;
    width: 100%;
    height: 95%;
    padding: 0 10px;
    background-color: #fff;
    overflow: scroll;
    z-index: 1;

    &.active {
        display: block;
    }
    .month {
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
        border: 0.8px solid #eeeeee;
        &.selected {
            border: 0.8px solid #333;
        }
        &:nth-of-type(even) {
            float: right;
        }
        .img {
            width: 100%;
            height: 100px;
        }
        .date {
            text-align: center;
            color: #a6a6a6;
            font-size: 13px;
            margin: 6px 0;
        }
    }
}
#date {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    color: #808080;
    font-size: 13px;

    .title {
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-bottom: 1px solid #e2e2e2;
    }
    .date_wrap {
        height: 100px;
        padding: 0 20px;
        .year,
        .month {
            width: 50%;
            height: 100%;
            overflow: scroll;
            text-align: center;
            li {
                margin: 20px 0;
                &:first-child {
                    margin-top: 50px;
                }
                &:last-child {
                    margin-bottom: 45px;
                }
            }
        }
        .year {
            float: left;
        }
        .month {
            float: right;
        }
    }
    .confirm {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-top: 1px solid #e2e2e2;
    }
}
</style>
