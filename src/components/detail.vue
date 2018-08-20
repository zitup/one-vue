<template>
    <div id="detail" v-if="author[0]" ref="detail">
        <div class="header" :class="{ no_display: is_header_display }">
            <span class="back" @click="goback()"></span>
            {{ getHTitle() }}
            <span class="collect"></span>
        </div>
        <div class="detail_wrap">
            <p class="title">{{ title }}</p>
            <p class="author">文／{{ author[0].user_name }}</p>
            <div class="reading" @click="audioControl()" v-if="audio.src">
                <div class="progress" :style="{ width: progressBarWidth }"></div>
                <span>图标</span>
                <span>有声阅读</span> |
                <span>{{ audio.anchor }}</span>
                <span class="date">{{ getAudioTime() }}</span>
                <audio :src="audio.src" id="audio" @timeupdate="updatetime"></audio>
            </div>
            <div class="content" v-html="content"></div>
            <p class="editor">{{ editor }}</p>
            <div class="author_title">作者</div>
            <div class="author_info clear">
                <img :src="author[0].web_url" class="img">
                <div class="info">
                    <p class="name">{{ author[0].user_name }}</p>
                    <p class="brief">{{ author[0].summary }}</p>
                </div>
                <span class="follow">关注</span>
            </div>
            <div class="comment_title">评论列表</div>
            <div class="comment clear" v-for="(comment, index) in comments" :key="comment.id + Math.random()" :class="{is_top_comment: index == 7}">
                <div>
                    <img v-lazy="comment.user.web_url" class="img">
                    <span class="name">{{ comment.user.user_name + comment.id }}</span>
                    <span class="date">{{ comment.created_at.slice(0, -3) }}</span>
                </div>
                <p v-if="comment.quote" class="quote">{{ comment.touser.user_name }}: {{ comment.quote }}</p>
                <p class="c_content">{{ comment.content }}</p>
                <div class="c_label">
                    <span>pinglun</span>
                    <span>{{ comment.praisenum }}</span>
                </div>
                <div v-if="index == 7" class="top_comment">
                    <span class="l"></span>
                    以上是热门评论
                    <span class="r"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import request from '../service/request';
    export default {
        data() {
            return {
                is_header_display: false,//滑动隐藏header标识
                title: '',              //标题
                content: '',            //内容
                editor: '',             //编辑
                author: [],             //作者信息
                audio: {                //audio相关信息
                    src: '',
                    anchor: '',
                    audio_duration: '',
                    currentTime: ''
                },
                is_audio_play: false,   //音频是否播放，默认false
                comments: [],           //评论数据
                lastCommentId: '',      //最后一个评论的id，用于获取下批评论
                category: {
                    Essay: 'ONE STORY',
                    Serialcontent: '连载',
                    Question: '问题',
                    Music: '音乐',
                    Movie: '影视'
                }
            }
        },
        created() {
            let category = this.$route.name,
                item_id = this.$route.params.item_id;
            let m = 'get' + category;

            //获取内容和评论
            let that = this;
            request[m](item_id).then(res => {
                that.comments = res[1].data.data;
                that.lastCommentId = res[1].data.data.pop().id;
                that._handleData(res[0]);
            });
            //延迟添加详情页滚动事件，否则从home跳转过来会自动执行一次，待解...
            setTimeout(this.addWScroll, 2000);
        },
        methods: {
            goback: function() {
                this.$router.back();
            },
            //获取header名称
            getHTitle: function(){
                if(document.documentElement.scrollTop > 80) {
                    return this.title;
                }else{
                    return this.category[this.$route.name]
                }
            },
            //audio播放暂停控制
            audioControl: function() {
                let audio = document.getElementById('audio');

                this.is_audio_play ? audio.pause() : audio.play();

                this.is_audio_play = !this.is_audio_play;
            },
            //获取audio时长
            getAudioTime: function() {
                return Math.floor(this.audio.audio_duration / 60) + ':' + this.audio.audio_duration % 60;
            },
            updatetime: function(e) {
                this.audio.currentTime = e.target.currentTime;
            },
            //添加滚动事件
            addWScroll: function() {
                let item_id = this.$route.params.item_id;
                //滑到底部加载评论
                let that = this;
                let is_scroll_load = false;
                window.onscroll = function() {
                    if (!is_scroll_load && document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 1) {
                        is_scroll_load = true;
                        request.getMC(item_id, that.lastCommentId).then(res => {
                            that.comments = that.comments.concat(res.data.data);
                            that.lastCommentId = res.data.data.pop().id;
                            is_scroll_load = false;
                        })
                    }
                }

                let startP = '';
                this.$refs.detail.ontouchstart = function(e) {
                    startP = document.documentElement.scrollTop;
                }
                this.$refs.detail.ontouchmove = function() {
                    that.is_header_display = startP < document.documentElement.scrollTop ? true : false;
                }
            },
            /**
             *          eassy                serialcontent  question        music        movie 
             * title    hp_title             title          question_title  story_title  title
             * content  hp_content           content        answer_content  story        content
             * editor   hp_author_introduce  charge_edt     charge_edt      charge_edt   charge_edt+editor_email
             */
            _handleData: function(res) {
                let category = this.$route.name,
                    data = res.data;
                if(category == 'Essay'){
                    this.title =data.hp_title;
                    this.content =data.hp_content;
                    this.editor = data.hp_author_introduce.slice(1, -1);
                    this.author =data.author_list;
                }
                if(category == 'Serialcontent'){
                    this.title =data.title;
                    this.content =data.content;
                    this.editor = data.charge_edt.slice(1, -1);
                    this.author =data.author_list;
                }
                if(category == 'Question'){
                    this.title =data.question_title;
                    this.content =data.answer_content;
                    this.editor = data.charge_edt.slice(1, -1);
                    this.author = data.author_list;
                }
                if(category == 'Music'){
                    this.title = data.story_title;
                    this.content = data.story;
                    this.editor = data.charge_edt.slice(1, -1);
                    this.author = data.author_list;
                }
                if(category == 'Movie'){
                    this.title = data.title;
                    this.content = data.content;
                    this.editor = data.charge_edt + data.editor_email;
                    this.author = data.author_list;
                }
                if(data.audio){
                    this.audio.src = data.audio;
                    this.audio.anchor = data.anchor;
                    this.audio.audio_duration = data.audio_duration;
                }
            }
        },
        computed: {
            //audio进度条控制
            progressBarWidth: function() {
                let w = this.audio.currentTime / this.audio.audio_duration * 100 + '%';
                return w;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../style/mixin";
    #detail {
        background-color: #fff;
        .header {
            position: fixed;
            top: 0;
            height: 50px;
            width: 100%;
            line-height: 50px;
            padding: 0 20px;
            text-align: center;
            font-size: 14px;
            border-bottom: 1px solid #e6e6e6;
            background-color: #fff;
            transition: .2s linear;
            overflow: hidden;
            &.no_display {
                height: 0;
            }
            span {
                height: 20px;
                width: 20px;
                margin-top: 15px;
                background-image: url(../assets/logo.png);
                background-size: 100%;
            }
            .back {
                float: left;
            }
            .collect {
                float: right;
            }
        }
        .detail_wrap {
            padding: 0 20px;
            margin-top: 50px;
        }
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
        .comment_title {
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
                &.fans {
                    background-color: #d9d9d9;
                    border: none;
                }
            }
        }
        .comment_title {
            margin-top: 30px;
        }
        .comment {
            padding: 10px 0;
            border-bottom: 1px solid #eaeaea;
            font-size: 0;
            &.is_top_comment {
                border-bottom: none;
            }
            .img {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                vertical-align: top;
            }
            .name {
                margin-left: 10px;
                font-size: 13px;
                color: #979797;
            }
            .date {
                float: right;
                font-size: 12px;
                color: #808080;
            }
            .quote {
                margin: 10px 0 0 20px;
                padding: 0 10px;
                line-height: 25px;
                border: 1px solid #eaeaea;
                font-size: 13px;
            }
            .c_content {
                margin: 10px 0 0 20px;
                line-height: 25px;
                font-size: 13px;
            }
            .c_label {
                margin-top: 15px;
                font-size: 10px;
                color: #666666;
                text-align: right;
            }
            .top_comment {
                font-size: 12px;
                color: #eaeaea;
                text-align: center;
                .l,
                .r {
                    height: 1px;
                    width: 35%;
                    margin-top: 8px;
                    background-color: #eaeaea;
                }
                .l {
                    float: left;
                }
                .r {
                    float: right;
                }
            }
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