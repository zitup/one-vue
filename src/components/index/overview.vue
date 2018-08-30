<template>
    <div id="overview">
        <div class="volume" :class="{ unfold : unfold }" @click="toggle">
            一个 VOL.{{ menu.vol }}
            <i></i>
        </div>
        <ul class="list" :class="{ unfold : unfold }">
            <li v-for="list in menu.list" :key="list.content_id">
                <i></i>
                <div class="item">
                    <p class="category">{{ list.tag && list.tag.title || category[list.content_type-1] }}</p>
                    <p class="title">{{ list.title }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['menu'],
    data() {
        return {
            unfold: false,
            category: ['ONE STORY', '连载', '问答', '音乐', '影视']
        }
    },
    methods: {
        toggle: function () {
            this.unfold = !this.unfold;
        }
    }
}
</script>

<style lang="less" scoped>
#overview {
    margin: 5px 0;
    background-color: #fff;

    .volume {
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        color: #808080;
        i {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-left: 3px;
            background-image: url(../../assets/logo.png);
            background-size: cover;
            vertical-align: middle;
            transition: transform .5s;
        }
        &.unfold {
            i {
                transform: rotateZ(180deg);
            }
        }
    }

    .list {
        display: none;
        padding-bottom: 20px;
        &.unfold {
            display: block;
        }
        li {
            position: relative;
            margin: 20px 30px 0 20px;
            i {
                display: inline-block;
                height: 12px;
                width: 12px;
                margin-right: 5px;
                background-image: url(../../assets/logo.png);
                background-size: cover;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
            .item {
                display: inline-block;
                margin-left: 24px;
                .category {
                    font-size: 10px;
                    line-height: 10px;
                }
                .title {
                    font-size: 13px;
                    line-height: 13px;
                    margin-top: 6px;
                }
            }
        }
    }
}
</style>
