<template>
    <div id="serialList">
        <div class="list_wrap">
            <p class="close" @click="close()"></p>
            <h4 class="title">风从海上来<span v-if="finished == 0">(未完结)</span></h4>
            <ul class="clear">
                <li class="li" v-for="lis in list" :key="lis.id">
                    <router-link :to="'/serialcontent/' + lis.id" :class="{ current: number == lis.number }">{{ lis.number }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import request from '../../service/request';
    export default {
        props: ['serial_id', 'number'],
        data() {
            return {
                title: '',// 名字
                finished: '',// 是否完结
                list: '',// 连载list
                // number: this.$route.params.number
            }
        },
        created() {
            // let serial_id = this.$route.params.serial_id;
            let that = this;
            request.getSerialList(that.serial_id).then(res => {
                this.title = res.data.title;
                this.finished = res.data.finished;
                this.list = res.data.list;
            })

            document.body.style.overflow = 'hidden';
        },
        methods: {
            close: function() {
                document.body.style.overflow = 'inherit';
                this.$router.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    #serialList {
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        z-index: 1;
        overflow: hidden;
        .list_wrap {
            margin-top: 160px;
            padding: 12px 0;
            background-color: #fff;
            .close {
                height: 20px;
                width: 20px;
                margin: 0 12px;
                .bgi("../../assets/logo.png");
                text-align: left;
            }
            .title {
                margin: 0 12px 10px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e8e8e8;
                font-size: 18px;
                color: #000000;
                text-align: center;
            }
            .li {
                float: left;
                width: 12.5%;
                overflow: hidden;
                a {
                    display: block;
                    width: 85%;
                    margin: 0 auto;
                    line-height: 40px;
                    color: #80ace1;
                    font-size: 13px;
                    font-weight: bold;
                    text-align: center;
                    transition: 0.1s ease-out;
                    &:active {
                        box-shadow: 0 0 10px 1px #e3e3e3;
                    }
                    &.current {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>