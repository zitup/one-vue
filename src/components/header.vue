<template>
    <header id="header">
        <div class="date">
            <span class="day">{{ getDate() }}</span>
            <span class="year_mouth">{{ getMouth() }}</span>
            <i></i>
        </div>
        <div class="weather">
            <span>{{ weather.city_name }}</span> ·
            <span>{{ weather.climate }}</span>
            <span>{{ weather.temperature }}</span>&nbsp;&nbsp;℃
        </div>
    </header>
</template>

<script>
export default {
    props: ['weather'],
    methods: {
        getDate: function(){
            return new Date().getDate();
        },
        getMouth: function(){
            let date = new Date().toString().split(' ');
            return date[1] + '.' + date[3];
        }
    }
}
</script>

<style lang="less" scoped>
    #header{
        height: 44px;
        padding: 0 20px;
        border-bottom: .5px solid #e6e6e6;
        background-color: #fff;

        .date {
            float: left;
            height: 44px;
            line-height: 44px;
            font-size: 0;
            font-weight: bold;

            .day{
                font-size: 26px;
            }
            .year_mouth{
                margin: 0 3px 0 5px;
                font-size: 10px;
            }

            i{
                display: inline-block;
                border-width: 5px 0 5px 5px;
                border-style: solid;
                border-color: transparent transparent #333;
            }
        }

        .weather{
                float: right;
                font-size: 11px;
                color: #808080;
                margin-top: 22px;
        }
    }
</style>
