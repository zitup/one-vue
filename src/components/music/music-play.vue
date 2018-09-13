<template>
    <div id="music-play">
        <div class="music-wrap">
            <p class="title">爱是一场冒险，为你与生俱来</p>
            <div class="process">
                <div class="process-bar" :style="{ width: progressBarWidth }"></div>
            </div>
            <p class="time-left">03'17"</p>
            <p class="author">曾楠</p>
            <div class="control">
                <span class="last"></span>
                <span class="pause-play"></span>
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

            .process-bar {
                position: relative;
                width: 10%;
                height: 2px;
                background-color: #000;
                transition: .2s ease-in;

                &::after {
                    position: absolute;
                    top: -2px;
                    right: 0;
                    content: '';
                    width: 5px;
                    height: 5px;
                    background-color: #9f9f9f;
                    box-shadow: 0 0 5px 5px #000;
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
            margin-top: 20px;
            text-align: center;

            .last, .next {
                position: relative;
                display: inline-block;
                width: 20px;
                height: 15px;
                border-left: 4px solid #222;

                &::before {
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
                    position: absolute;
                    left: 5px;
                    content: '';
                    width: 0;
                    height: 0;
                    border-width: 8px 13px 8px 0;
                    border-style: solid;
                    border-color: transparent #222 transparent transparent;
                }
            }

            .next {
                transform: rotateY(180deg);
            }

            .pause-play {
                position: relative;
                display: inline-block;
                width: 20px;
                height: 15px;
                margin: 0 15px;

                &::before {
                    position: absolute;
                    left: 5px;
                    content: '';
                    width: 4px;
                    height: 15px;
                    background-color: #222;
                }

                &::after {
                    position: absolute;
                    right: 5px;
                    content: '';
                    width: 4px;
                    height: 15px;
                    background-color: #222;
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

            .loop, .collect, .music-detail {
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
