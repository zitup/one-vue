<template>
    <div id="graphic">
        <img class="img" :src="graphic.img_url" alt="">
        <span class="title_pic_info">{{ graphic.title + ' | ' + graphic.pic_info }}</span>
        <p class="forward">{{ graphic.forward }}</p>
        <span class="words_info">{{ graphic.words_info }}</span>
        <div class="label">
            <div class="find">
                <i class="find_logo"></i>
                发现
            </div>
            <div class="operation">
                <span class="note"></span>
                <span class="collection"></span>
                <span class="repost"></span>
                <span class="like">
                    <span class="like_logo"></span>
                    <span class="like_count">{{ graphic.like_count }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['graphic'],
    data(){
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
    #graphic{
        text-align: center;
        background-color: #fff;

        .img{
            width: 100%;
            margin-top: 44px;
        }
        .title_pic_info, .words_info{
            font-size: 12px;
            color: #808080;
        }
        .forward{
            margin: 40px 30px 30px;
            text-align: left;
            font-size: 13px;
        }
        .label{
            height: 20px;
            margin-top: 40px;

            .find{
                float: left;
                margin-left: 20px;
                font-size: 10px;
                .find_logo{
                    display: inline-block;
                    height: 15px;
                    width: 15px;
                    background-image: url('../assets/logo.png');
                    background-size: cover;
                    vertical-align: middle;
                }
            }
            .operation{
                float: right;
                >span{
                    display: inline-block;
                    height: 15px;
                    width: 15px;
                    margin-right: 25px;
                    background-size: cover;
                    &.note{
                        background-image: url('../assets/logo.png');
                    }
                    &.collection{
                        background-image: url('../assets/logo.png');
                    }
                    &.repost{
                        background-image: url('../assets/logo.png');
                    }
                    &.like{
                        width: auto;
                        .like_logo{
                            display: inline-block;
                            height: 15px;
                            width: 15px;
                            background-image: url('../assets/logo.png');
                            background-size: cover;
                            &.active{
                                background-image: url('../assets/logo.png');
                            }
                        }
                        .like_count{
                            position: relative;
                            top: -10px;
                            font-size: 10px;
                            color: #a6a6a6;
                        }
                    }
                    &:last-child{
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>

