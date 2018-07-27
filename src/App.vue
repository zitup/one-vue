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
    #app{
        background-color: #eeeeee;
    }
</style>
