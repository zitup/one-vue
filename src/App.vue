<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="less">
    @import "./style/common";
    html {
        background-color: #eeeeee;
        font-family: "PingFangSC-Light", sans-serif;
    }
</style>