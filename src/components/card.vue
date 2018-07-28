<template>
    <div>
        <div id="card" v-for="card in cards" :key="card.item_id">
            <p class="category">- {{ card.tag_list[0] && card.tag_list[0].title || category[card.category-1] }} -</p>
            <p class="title">{{ card.title }}</p>
            <p class="author">文 / {{ card.author.user_name }}</p>
            <div class="music" v-if="card.category == 4">
                <div>
                    <span></span>
                    <img :src="card.img_url" class="img">
                    <span></span>
                    <span>STORIRS OF MUSIC</span>
                </div>
                <p>{{ music_title }}</p>
            </div>
            <img :src="card.img_url" class="img" v-else>
            <p class="forward">{{ card.forward }}</p>
            <div class="label">
                <span class="date">{{ getDate(card.post_date) }}</span>
                <div class="operation">
                    <span class="like">
                        <span class="like_logo"></span>
                        <span class="like_count">{{ card.like_count }}</span>
                    </span>
                    <span class="repost"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cards'],
    data() {
        return {
            category: ['ONE STORY', '连载', '问答', '音乐', '影视'],
            music_title: ''
        }
    },
    methods: {
        getDate: function (post_date) {
            let today = new Date().getDate();
            if (post_date.indexOf(today) > -1) {
                return '今天'
            } else {
                let mouth = post_date.substr(5, 2);
                let day = post_date.substr(8, 2);
                return mouth + '月' + day + '日'
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../style/mixin";
#card {
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #fff;

    .category {
        text-align: center;
        font-size: 10px;
        color: #808080;
    }
    .title {
        margin: 10px 0;
        font-size: 16px;
    }
    .author {
        font-size: 12px;
        color: #808080;
    }
    .img {
        margin: 10px 0;
        width: 100%;
    }
    .music {
        .img {
            display: block;
            width: 60%;
            margin: 10px auto;
            border-radius: 100%;
        }
    }
    .forward {
        color: #808080;
        font-size: 13px;
    }
    .label {
        height: 20px;
        line-height: 20px;
        margin-top: 20px;
        color: #808080;
        .date {
            float: left;
            font-size: 10px;
            color: #aaaaaa;
        }
        .operation {
            float: right;
            .like {
                margin-right: 20px;
                .like_logo {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    .bgi("../assets/logo.png");
                }
                .like_count {
                    position: relative;
                    top: -10px;
                    font-size: 10px;
                    color: #a6a6a6;
                }
            }
            .repost {
                display: inline-block;
                width: 15px;
                height: 15px;
                .bgi("../assets/logo.png");
            }
        }
        &:after {
            .clear();
        }
    }
}
</style>
