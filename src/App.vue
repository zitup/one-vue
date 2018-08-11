<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="less">
    @import "./style/common";
    html{
        background-color: #eeeeee;
        font-family: "PingFangSC-Light",sans-serif;
    }
</style>
