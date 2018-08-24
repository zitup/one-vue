<template>
    <div id="serialList">
        <div class="list_wrap">
            <p class="close"></p>
            <h4 class="title">风从海上来</h4>
            <ul class="clear">
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
                <li class="li">
                    <a href="">1</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    #serialList {
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        z-index: 1;
        overflow: hidden;
        .list_wrap {
            margin-top: 160px;
            padding: 12px 0;
            background-color: #fff;
            .close {
                height: 20px;
                width: 20px;
                margin: 0 12px;
                .bgi("../assets/logo.png");
                text-align: left;
            }
            .title {
                margin: 0 12px 10px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e8e8e8;
                font-size: 18px;
                color: #000000;
                text-align: center;
            }
            .li {
                float: left;
                width: 12.5%;
                overflow: hidden;
                a {
                    display: block;
                    width: 85%;
                    margin: 0 auto;
                    line-height: 40px;
                    color: #80ace1;
                    font-size: 13px;
                    font-weight: bold;
                    text-align: center;
                    transition: 0.1s ease-out;
                    &:active {
                        box-shadow: 0 0 10px 1px #e3e3e3;
                    }
                }
            }
        }
    }
</style>