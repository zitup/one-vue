<template>
    <div id="musicInfo" ref="music">
        <header class="nav">
            <span class="sp_1" :class="{ active: a_p == 'lyric' }" @click="toggle('lyric')">歌词</span>
            <span class="sp_2" :class="{ active: a_p == 'info' }" @click="toggle('info')">信息</span>
            <span class="close" @click="close()">x</span>
        </header>
        <div class="lyric" v-html="f_lyric" :class="{ active: a_p == 'lyric' }"></div>
        <div class="info" :class="{ active: a_p == 'info' }">
            <img class="img" :src="cover">
            <div v-html="f_info"></div>
        </div>
        <div class="switch">
            <span class="sp_3" :class="{ active: a_p == 'lyric' }"></span>
            <span class="sp_4" :class="{ active: a_p == 'info' }"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['lyric', 'info', 'cover'],
        data() {
            return {
                f_lyric: this.lyric.replace(/\r/g, '<br>'),
                f_info: this.info.replace(/\r/g, '<br>'),
                a_p: 'lyric' // 活跃的项目active_project
            }
        },
        created() {
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
            document.getElementsByTagName('html')[0].style.height = '100%';
            document.body.style.overflow = 'auto';
            document.body.style.height = '100%';
        },
        methods: {
            toggle: function(k) {
                if (k == this.a_p) {
                    return;
                }
                this.a_p = this.a_p == 'lyric' ? 'info' : 'lyric';
                window.scrollTo(0, 0);
            },
            close: function() {
                document.getElementsByTagName('html')[0].style.overflow = '';
                document.getElementsByTagName('html')[0].style.height = '';
                document.body.style.overflow = '';
                document.body.style.height = '';
                this.$router.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    #musicInfo {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 50px;
        background-color: #fff;
        z-index: 1;
        .nav {
            position: fixed;
            top: 0;
            width: 100%;
            height: 35px;
            background-color: #fff;
            box-shadow: 0px 0px 30px 15px #fff;
            text-align: center;
            font-size: 0;
            .sp_1,
            .sp_2 {
                display: inline-block;
                height: 20px;
                line-height: 20px;
                width: 60px;
                margin-top: 15px;
                text-align: center;
                color: #8e8e8e;
                font-size: 12px;
                border: 1px solid #808080;
                &.active {
                    color: #fff;
                    background-color: #808080;
                }
            }
            .sp_1 {
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }
            .sp_2 {
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
            }
            .close {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 15px;
            }
        }
        .lyric,
        .info {
            display: none;
            margin-top: 20px;
            line-height: 23px;
            text-align: center;
            font-size: 13px;
            background-color: #fff;
            &.active {
                display: block;
            }
            .img {
                width: 100px;
                margin-bottom: 20px;
                vertical-align: bottom;
            }
        }
        .lyric {
            padding-bottom: 200px;
        }
        .switch {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 45px;
            background-color: #fff;
            text-align: center;
            box-shadow: 0 0 30px 15px #fff;
            .sp_3,
            .sp_4 {
                display: inline-block;
                height: 6px;
                width: 6px;
                background-color: #e5e5e5;
                border-radius: 50%;
                &.active {
                    background-color: #333;
                    box-shadow: 0 0 6px 0 #333;
                }
            }
            .sp_3 {
                margin-right: 10px;
            }
        }
    }
</style>