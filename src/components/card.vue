<template>
    <div id="card">
        <p class="category">- 连载 -</p>
        <p class="title">风从海上里6</p>
        <p class="author">文/姚瑶</p>
        <img src="../assets/" alt="">
        <p class="forward"></p>
        <div>
            <span class="date"></span>
            <div>
                <span class="like">
                    <span class="like_logo"></span>
                    <span class="like_count">{{ graphic.like_count }}</span>
                </span>
                <span class="repost"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    #card{
        padding: 10px 20px;
        margin-bottom: 20px;
        background-color: #fff;

        .category{
            text-align: center;
            font-size: 10px;
            color: #808080;
        }
        .title{
            font-size: 16px;
        }
        .author{
            font-size: 12px;
        }
        img{
            width: 100%;
        }
        .forward{
            
        }
    }
</style>
