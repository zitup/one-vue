<template>
    <div id="music">
        <div class="music_img">
            <img class="img_bg" :src="music_props.feeds_cover">
            <img class="img_av" :src="music_props.cover">
            <p class="music_info">· {{ music_props.music_title }} · {{ music_props.music_author }} | {{ music_props.album }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['music_props']
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

        .img_av {
            position: absolute;
            height: 50%;
            left: 0;
            top: 12px;
            right: 0;
            bottom: 0;
            margin: auto;
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
