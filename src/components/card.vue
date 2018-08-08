<template>
    <div>
        <div id="card" v-for="card in cards" :key="card.item_id">
            <router-link :to="{name: router_category[card.category-1], params: { item_id: card.item_id }}">
                <div class="ad" v-if="card.category == 6">
                    <img class="img" :src="card.img_url">
                </div>
                <div class="content" v-else>
                    <p class="category">- {{ card.tag_list[0] && card.tag_list[0].title || category[card.category-1] }} -</p>
                    <p class="title">{{ card.title }}</p>
                    <p class="author">文 / {{ card.author.user_name }}</p>
                    <div class="music" v-if="card.category == 4">
                        <div>
                            <span class="border"></span>
                            <img :src="card.img_url" class="img">
                            <span class="border"></span>
                            <span class="s_of_m">STORIRS OF MUSIC</span>
                            <span class="play_btn"></span>
                        </div>
                        <p class="music_title">{{ card.share_info.title.split(' ').pop() + '·' + card.author.user_name + ' | ' + card.subtitle.split(':')[1] }}</p>
                    </div>
                    <img :src="card.img_url" class="img" v-else>
                    <p class="forward">{{ card.forward }}</p>
                    <p class="subtitle" v-if="card.category == 5">--《{{ card.subtitle.split(':').pop() }}》</p>
                    <div class="label clear">
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
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cards'],
    data() {
        return {
            category: ['阅读', '连载', '问答', '音乐', '影视'],
            router_category: ['essay', 'serialcontent', 'question', 'music', 'movie'],
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
        },
        goDeep: function () {

        }
    }
}
</script>

<style lang="less" scoped>
@import "../style/mixin";
#card {
    margin-bottom: 10px;
    background-color: #fff;

    .ad {
        font-size: 0;
        .img {
            width: 100%;
        }
    }
    .content {
        padding: 10px 20px;

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
            margin-bottom: 10px;
            font-size: 12px;
            color: #808080;
        }
        .img {
            margin: 10px 0;
            width: 100%;
        }
        .music {
            position: relative;
            .img {
                display: block;
                width: 60%;
                margin: 0 auto;
                border-radius: 100%;
            }
            .border {
                display: block;
                height: 1px;
                width: 50%;
                background-color: #e5e5e5;
            }
            .s_of_m {
                position: absolute;
                right: 0;
                font-size: 21px;
                color: #f2f2f2;
                writing-mode: vertical-lr;
            }
            .play_btn {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 50px;
                width: 50px;
                .bgi("../assets/logo.png");
            }
            .music_title {
                margin: 10px 0 15px;
                color: #a6a6a6;
                font-size: 13px;
            }
        }
        .forward,
        .subtitle {
            color: #808080;
            font-size: 14px;
        }
        .subtitle {
            text-align: right;
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
        }
    }
}
</style>
