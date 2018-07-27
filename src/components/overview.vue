<template>
    <div id="overview">
        <div class="volume" :class="{ unfold : unfold }" @click="toggle">
            一个 {{ lists[0].volume }}
            <i></i>
        </div>
        <ul class="list" :class="{ unfold : unfold }">
            <li v-for="list in lists" :key="list.id">
                <i></i>
                <div class="item">
                    <p class="category">ONE STORY</p>
                    <p class="title">{{ list.title }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['lists'],
    data() {
        return {
            unfold: false
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
            background-image: url(../assets/logo.png);
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
                background-image: url(../assets/logo.png);
                background-size: cover;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
            .item {
                display: inline-block;
                margin-left: 20px;
                .category {
                    font-size: 12px;
                }
                .title {
                    font-size: 15px;
                }
            }
        }
    }
}
</style>
