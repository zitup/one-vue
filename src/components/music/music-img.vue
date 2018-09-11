<template>
    <div>
        <div class="music_img">
            <img class="img_bg" :src="music_props.feeds_cover">
            <div class="img_cd" :class="{ play: is_music_play }"></div>
            <img class="img_avatar" :src="music_props.cover" @click="play()">
            <div class="play_bg">
                <div class="play_btn"></div>
            </div>
            <p class="music_info">· {{ music_props.music_title }} · {{ music_props.music_author }} | {{ music_props.album }}</p>
            <audio ref="audio" id="audio" :src="music_props.music_id"></audio>
        </div>
    </div>
</template>

<script>
export default {
    props: ['music_props'],
    data() {
        return {
            is_music_play: false
        }
    },
    methods: {
        play: function() {
            this.is_music_play ? this.$refs.audio.pause() : this.$refs.audio.play();
            this.is_music_play = !this.is_music_play;
        }
    }
}
</script>

<style lang="less" scoped>
    .music_img {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 60%;

        .img_bg {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
        }

        .img_cd {
            position: absolute;
            left: 0;
            top: 5%;
            right: 0;
            bottom: 0;
            margin: auto;
            height: 0;
            width: 30%;
            padding-top: 30%;
            background-color: #000;
            border-radius: 50%;
            transition: .2s ease-in;

            &.play {
                left: 13%;
            }
        }

        .img_avatar {
            position: absolute;
            height: 50%;
            left: 0;
            top: 5%;
            right: 0;
            bottom: 0;
            margin: auto;
        }

        .play_bg {
            position: absolute;
            left: 0;
            right: 0;
            top: 5%;
            bottom: 0;
            margin: auto;
            height: 0;
            width: 12%;
            padding-top: 12%;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, .6);

            .play_btn {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                height: 0;
                width: 0;
                border-width: 10px 0 10px 10px;
                border-style: solid;
                border-color: transparent transparent transparent #fff;
            }
        }

        .music_info {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 25px;
            font-size: 12px;
            text-align: center;
            color: #d8d8d8;
        }
    }
</style>
