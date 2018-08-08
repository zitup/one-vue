<template>
    <div id="detail">
        <p class="title">{{ content.hp_title }}</p>
        <p class="author">文／{{ content.hp_author }}</p>
        <div class="reading">
            <div class="progress"></div>
            <span>图标</span>
            <span>有声阅读</span> |
            <span>{{ content.anchor }}</span>
            <span class="date">date</span>
        </div>
        <div class="content" v-html="content.hp_content"></div>
        <p class="editor">{{ content.hp_author_introduce.slice(1, -1) }}</p>
        <div class="author_title">作者</div>
        <div class="author_info clear">
            <img :src="content.author[0].web_url" class="img">
            <div class="info">
                <p class="name">{{ content.author[0].user_name }}</p>
                <p class="brief">{{ content.author[0].summary }}</p>
            </div>
            <span class="follow">关注</span>
        </div>
        <div class="comment">评论列表</div>
    </div>
</template>

<script>
import request from '../service/request';
export default {
    data() {
        return {
            content: {
                hp_author_introduce: '',
                author: [{ user_name: '', web_url: '', summary: '' }]
            },
            comment: {}
        }
    },
    created() {
        let category = this.$route.name, item_id = this.$route.params.item_id;
        let m = 'get' + category;

        request[m](item_id).then(res => {
            this.content = res[0].data;
            this.comment = res[1].data;
        })
    }
}
</script>

<style lang="less" scoped>
@import "../style/mixin";
#detail {
    padding: 0 20px;
    background-color: #fff;
    .title {
        padding-top: 30px;
        line-height: 36px;
        font-size: 24px;
        font-weight: 700;
    }
    .author {
        margin-top: 30px;
        font-size: 12px;
        line-height: 32px;
    }
    .reading {
        position: relative;
        height: 46px;
        line-height: 34px;
        margin-top: 26px;
        padding: 6px 10px;
        border: 1px solid #666666;
        border-radius: 5px;
        font-size: 16px;
        .progress {
            width: 1px;
            max-width: 100%;
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            background: rgba(0, 0, 0, 0.05);
        }
        .date {
            float: right;
        }
    }
    .content {
        margin-top: 30px;
    }
    .editor {
        margin-top: 30px;
        color: #808080;
        line-height: 18px;
        font-size: 12px;
    }
    .author_title,
    .comment {
        line-height: 21px;
        font-size: 14px;
        font-weight: normal;
        padding-bottom: 10px;
        &:after {
            content: "";
            height: 4px;
            background-color: black;
            clear: both;
            width: 60px;
            display: block;
            margin-top: 8px;
        }
    }
    .author_title {
        margin-top: 34px;
    }
    .author_info {
        padding: 10px 0;
        .img {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .info {
            float: left;
            margin-left: 12px;
            max-width: 66%;
            .name {
                font-size: 14px;
                line-height: 21px;
            }
            .brief {
                font-size: 12px;
                line-height: 21px;
                color: #808080;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .follow {
            float: right;
            width: 44px;
            padding: 6px 0px;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            color: #808080;
            border: 1px solid rgba(128, 128, 128, 0.6);
            border-radius: 2px;
            &.fans{
                background-color: #D9D9D9;
                border: none;
            }
        }
    }
    .comment {
        margin-top: 30px;
    }
}
</style>

<style>
.content p {
    text-align: justify;
    font-size: 16px;
    margin: 0 0 20px 0;
    line-height: 32px;
}
</style>
