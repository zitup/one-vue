<template>
    <div id="detail" v-if="author[0]">
        <div class="header" ref="header" :class="{ no_display: is_header_display }">
            <span class="back" @click="goback()"></span>
            <span class="collect"></span>
            <p class="title">{{ headerTitle }}</p>
        </div>
        <div class="detail_wrap">
            <p class="title">{{ title }}</p>
            <div class="author_wrap">
                <span class="author">文／{{ author[0].user_name }}</span>
                <router-link :to="{ name: moreInfo_name, params: moreInfo_params}" v-if="category != 'Essay' && category != 'Question'">
                    <span :class="moreInfo_class"></span>
                </router-link>
                <!-- <router-link :to="{ name: 'serialList', params: { lyric: lyric }}" v-if="category == 'Music'">
                    <span class="serialInfo"></span>
                </router-link> -->
            </div>
            <div class="reading" @click="audioControl()" v-if="audio.src">
                <div class="progress" :style="{ width: progressBarWidth }"></div>
                <span>图标</span>
                <span>有声阅读</span> |
                <span>{{ audio.anchor }}</span>
                <span class="date">{{ getAudioTime() }}</span>
                <audio :src="audio.src" id="audio" @timeupdate="updatetime"></audio>
            </div>
            <div class="q_subtitle" v-if="category == 'Question'">
                <p class="asker">{{ asker }}问：</p>
                <p class="subtitle">{{ title }}</p>
                <p class="answerer">{{ answerer }}答：</p>
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
        <router-view></router-view>
    </div>
</template>

<script>
    import request from '../../service/request';
    import serialList from './serialList'
    export default {
        components: {
            serialList
        },
        data() {
            return {
                category: '', // 文章类别
                is_header_display: false, // 滑动隐藏header标识
                title: '', // 标题
                tag_title: '', // header特殊标题
                content: '', // 内容
                editor: '', // 编辑
                author: [], // 作者信息
                audio: { // audio相关信息
                    src: '',
                    anchor: '',
                    audio_duration: '',
                    currentTime: ''
                },
                is_audio_play: false, // 音频是否播放，默认false
                comments: [], // 评论数据
                lastCommentId: '', // 最后一个评论的id，用于获取下批评论
                // category: {
                //     Essay: '阅读',
                //     Serialcontent: '连载',
                //     Question: '问答',
                //     Music: '音乐',
                //     Movie: '影视'
                // },
                doc_scrollTop: '', // 滚动高度
                is_comment_load: false, // 避免评论加载的重复请求
                no_comment: false // 评论加载完毕标识
            }
        },
        created() {
            this.category = this.$route.name;
            this._setData();
            // 从home跳转过来会出发scroll事件，待解...
        },
        beforeRouteLeave(to, from, next) {
            window.removeEventListener('scroll', this.addWScroll);
            next();
        },
        methods: {
            goback: function() {
                this.$router.push({ name: 'home' });
            },
            // audio播放暂停控制
            audioControl: function() {
                let audio = document.getElementById('audio');

                this.is_audio_play ? audio.pause() : audio.play();

                this.is_audio_play = !this.is_audio_play;
            },
            // 获取audio时长
            getAudioTime: function() {
                return Math.floor(this.audio.audio_duration / 60) + ':' + this.audio.audio_duration % 60;
            },
            updatetime: function(e) {
                this.audio.currentTime = e.target.currentTime;
            },
            _setData: function() {
                let item_id = this.$route.params.item_id;
                let m = 'get' + this.category;

                // 获取内容和评论
                let that = this;
                request[m](item_id).then(res => {
                    that.comments = res[1].data.data;
                    that.lastCommentId = res[1].data.data.slice(-1)[0].id;
                    that._handleData(res[0]);
                    window.addEventListener('scroll', that.addWScroll, false);
                });
            },
            // 添加滚动事件
            addWScroll: function() {
                let item_id = this.$route.params.item_id;
                let that = this;
                if (!this.is_comment_load && document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 1 && document.documentElement.offsetHeight > 0) {
                    if (this.no_comment) {
                        // 弹框：一个：没有评论啦...
                        alert('no comments');
                        return;
                    }
                    this.is_comment_load = true;
                    request.getMC(that.category, item_id, that.lastCommentId).then(res => {
                        if (res.data.data.length == 0) {
                            that.no_comment = true;
                            that.is_comment_load = false;
                            // 弹框：一个：没有评论啦...
                            alert('no comments');
                            return;
                        }
                        that.comments = that.comments.concat(res.data.data);
                        that.lastCommentId = res.data.data.slice(-1)[0].id;
                        that.is_comment_load = false;
                    })
                }
                // setScrollTop
                this.doc_scrollTop = document.documentElement.scrollTop;
            },
            /**
             *          eassy                serialcontent  question        music        movie 
             * title    hp_title             title          question_title  story_title  title
             * content  hp_content           content        answer_content  story        content
             * editor   hp_author_introduce  charge_edt     charge_edt      charge_edt   charge_edt+editor_email
             */
            _handleData: function(res) {
                let data = res.data;

                switch (this.category) {
                    case 'Essay':
                        this.title = data.hp_title;
                        this.content = data.hp_content;
                        this.editor = data.hp_author_introduce.slice(1, -1);
                        this.author = data.author_list;
                        this.tag_title = data.tag_list[0] && data.tag_list[0].title;
                        break;
                    case 'Serialcontent':
                        this.title = data.title;
                        this.content = data.content;
                        this.editor = data.charge_edt.slice(1, -1);
                        this.author = data.author_list;
                        this.moreInfo_name = 'serialList';
                        this.moreInfo_params = {
                            serial_id: data.serial_id,
                            number: data.number
                        }
                        this.moreInfo_class = 'serial_sp'
                        break;
                    case 'Question':
                        this.title = data.question_title;
                        this.content = data.answer_content;
                        this.editor = data.charge_edt.slice(1, -1);
                        this.author = data.author_list;
                        this.asker = data.asker.user_name;
                        this.answerer = data.answerer.user_name;
                        break;
                    case 'Music':
                        this.title = data.story_title;
                        this.content = data.story;
                        this.editor = data.charge_edt.slice(1, -1);
                        this.author = data.author_list;
                        this.moreInfo_name = 'musicInfo';
                        this.moreInfo_params = {
                            lyric: data.lyric
                        };
                        this.moreInfo_class = 'music_sp';
                        break;
                    case 'Movie':
                        this.title = data.data[0].title;
                        this.content = data.data[0].content;
                        this.editor = data.data[0].charge_edt + data.data[0].editor_email;
                        this.author = data.data[0].author_list;
                        this.moreInfo_name = 'movieInfo';
                        this.moreInfo_params = {

                        };
                        this.moreInfo_class = 'movie_sp';
                        break;
                }

                if (data.audio) {
                    this.audio.src = data.audio;
                    this.audio.anchor = data.anchor;
                    this.audio.audio_duration = data.audio_duration;
                }
            }
        },
        computed: {
            // header名字
            headerTitle: function() {
                if (this.doc_scrollTop > 80) {
                    return this.title;
                } else {
                    return this.tag_title || this.$store.state.category[this.$route.name]
                }
            },
            // audio进度条控制
            progressBarWidth: function() {
                let w = this.audio.currentTime / this.audio.audio_duration * 100 + '%';
                return w;
            }
        },
        watch: {
            // 随滑动隐藏或显示header
            doc_scrollTop: function(newVal, oldVal) {
                if (newVal < oldVal) {
                    this.$refs.header.style.opacity = 1
                } else {
                    this.$refs.header.style.opacity = 0
                }
            },
            '$route' (to, from) {
                if (from.name == 'serialList') {
                    this._setData();
                    document.body.style.overflow = 'inherit';
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/mixin";
    #detail {
        background-color: #fff;
        .header {
            position: fixed;
            top: 0;
            height: 50px;
            width: 100%;
            line-height: 50px;
            padding: 0 12px;
            text-align: center;
            font-size: 14px;
            border-bottom: 1px solid #e6e6e6;
            background-color: #fff;
            transition: .2s linear;
            overflow: hidden;
            z-index: 1;
            &.no_display {
                opacity: 0;
            }
            span {
                height: 20px;
                width: 20px;
                margin-top: 15px;
                background-image: url(../../assets/logo.png);
                background-size: 100%;
            }
            .back {
                float: left;
            }
            .collect {
                float: right;
            }
            .title {
                margin: 0 40px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .detail_wrap {
            padding: 0 20px;
            margin-top: 50px;
            .title {
                padding-top: 30px;
                line-height: 36px;
                font-size: 24px;
                font-weight: 700;
            }
            .author_wrap {
                margin-top: 30px;
                line-height: 32px;
                .author {
                    font-size: 12px;
                }
                a span {
                    float: right;
                    width: 16px;
                    height: 16px;
                    margin-top: 8px;
                }
                .serial_sp {
                    .bgi("../../assets/logo.png")
                }
                .music_sp {
                    .bgi("../../assets/logo.png")
                }
                .movie_sp{
                    .bgi("../../assets/logo.png")
                }
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
            .q_subtitle {
                margin-top: 30px;
                .asker {
                    font-size: 12px;
                }
                .subtitle {
                    margin-top: 15px;
                    padding-bottom: 20px;
                    font-size: 14px;
                    border-bottom: 1px solid #f2f2f2;
                }
                .answerer {
                    font-size: 12px;
                    margin-top: 30px;
                }
            }
            .content {
                margin-top: 20px;
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