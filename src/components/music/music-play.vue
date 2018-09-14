<template>
    <div ref="music_play" id="music-play" @touchstart.prevent="hideMusicPlay">
        <div class="music-wrap">
            <p class="title">{{ music_play_props.story_title }}</p>
            <div ref="process" class="process" 
                @touchstart.prevent="processTS"
                @touchmove.prevent="processTM"
                @touchend.prevent="processTE"
            >
                <div class="process-bar" :style="{width: processBar}"></div>
                <audio ref="music_audio" @timeupdate="timeupdate" :src="music_play_props.music_src"></audio>
            </div>
            <p class="time-left">{{ timeLeft }}</p>
            <p class="author">{{ music_play_props.music_author }}</p>
            <div class="control">
                <span class="last"></span>
                <span :class="['play-btn', {playing: is_music_play}]" @click="play()"></span>
                <span class="next"></span>
            </div>
            <div class="foot-wrap">
                <span class="loop"></span>
                <span class="logo">看见音乐</span>
                <span class="collect"></span>
                <span class="music-detail"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["music_play_props"],
        data() {
            return {
                is_music_play: false,
                duration: '',
                currentTime: '',
                touch: {
                    initiated: false
                }
            }
        },
        created() {
            this.$nextTick(function() {
                let that = this;
                this.$refs.music_audio.oncanplay = function() {
                    that.duration = that.$refs.music_audio.duration;
                }

            });
        },
        methods: {
            hideMusicPlay: function() {
                this.$refs.music_play.style.display = 'none';
            },
            play: function() {
                this.is_music_play ? this.$refs.music_audio.pause() : this.$refs.music_audio.play();
                this.is_music_play = !this.is_music_play;
            },
            timeupdate: function(e) {
                this.currentTime = e.target.currentTime;
            },
            processTS: function(e) {
                this.touch.initiated = true;
                this.$refs.music_audio.currentTime = (e.touches[0].pageX - 20) / this.$refs.process.clientWidth * this.duration;
            },
            processTM: function(e) {
                if(!this.touch.initiated) {
                    return;
                }
                this.$refs.music_audio.currentTime = (e.touches[0].pageX - 20) / this.$refs.process.clientWidth * this.duration;
            },
            processTE: function(e) {
                this.touch.initiated = false;
            }
        },
        computed: {
            processBar: function() {
                let w = this.currentTime / this.duration * 100 + '%';
                return w;
            },
            timeLeft: function () {
                if (this.duration - this.currentTime == 0) {
                    this.is_music_play = false;
                }

                let t = Math.floor((this.duration - this.currentTime) / 60) + '\'' + Math.floor((this.duration - this.currentTime) % 60) + '\"' ;
                return t;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/mixin";

    #music-play {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, .5);

        .music-wrap {
            padding: 15px 20px 20px;
            background-color: #fff;
        }

        .title {
            text-align: center;
            line-height: 14px;
            font-size: 14px;
            color: #b3b3b3;
        }

        .process {
            width: 100%;
            height: 2px;
            margin-top: 15px;
            background-color: #9f9f9f;
            touch-action: none;

            .process-bar {
                position: relative;
                width: 0;
                height: 2px;
                background-color: #000;
                animation: 1s ease-in;

                &::after {
                    position: absolute;
                    top: -3px;
                    right: 0;
                    content: '';
                    width: 4px;
                    height: 4px;
                    background-color: #9f9f9f;
                    box-shadow: 0 2px 8px 0px #000;
                    border: 2px solid #000;
                    border-radius: 50%;
                }
            }
        }

        .time-left {
            line-height: 12px;
            margin-top: 5px;
            text-align: right;
            font-size: 12px;
            color: #c7c7c7;
        }

        .author {
            line-height: 12px;
            margin-top: 5px;
            text-align: center;
            font-size: 12px;
            color: #cbcbcb;
        }

        .control {
            line-height: 20px;
            margin-top: 20px;
            text-align: center;

            .last,
            .next {
                position: relative;
                display: inline-block;
                width: 20px;
                height: 16px;
                border-left: 4px solid #222;

                &::before,
                &::after {
                    position: absolute;
                    left: -4px;
                    content: '';
                    width: 0;
                    height: 0;
                    border-width: 8px 13px 8px 0;
                    border-style: solid;
                    border-color: transparent #222 transparent transparent;
                }

                &::after {
                    left: 5px;
                }
            }

            .next {
                transform: rotateY(180deg);
            }

            .play-btn {
                position: relative;
                display: inline-block;
                width: 13px;
                height: 16px;
                margin: 0 15px;
                border-width: 8px 0 8px 13px;
                border-style: solid;
                border-color: transparent transparent transparent #000;

                &.playing {
                    border: none;

                    &::before,
                    &::after {
                        position: absolute;
                        left: 1px;
                        content: '';
                        width: 4px;
                        height: 16px;
                        background-color: #222;
                    }

                    &::after {
                        left: auto;
                        right: 1px;
                    }
                }
            }
        }

        .foot-wrap {
            position: relative;
            height: 15px;
            line-height: 15px;
            margin-top: 25px;
            text-align: center;
            font-size: 0;

            .loop,
            .collect,
            .music-detail {
                display: inline-block;
                width: 15px;
                height: 15px;
            }

            .loop {
                position: absolute;
                left: 0;
                .bgi('../../assets/logo.png')
            }

            .collect {
                position: absolute;
                right: 20px;
                .bgi('../../assets/logo.png')
            }

            .music-detail {
                position: absolute;
                right: 0;
                margin-left: 10px;
                .bgi('../../assets/logo.png')
            }

            .logo {
                display: inline-block;
                height: 15px;
                font-size: 12px;
                color: #cccccc;

                &::before {
                    display: inline-block;
                    content: '';
                    height: 12px;
                    width: 12px;
                    vertical-align: middle;
                    .bgi('../../assets/logo.png')
                }
            }
        }
    }
</style>