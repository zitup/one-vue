<template>
    <div>
        <headTop :weather="data.weather" v-if="data.weather" />
        <graphic :graphic="data.content_list[0]" v-if="data.content_list" />
        <overview :lists="data.content_list" v-if="data.content_list"/>
    </div>
</template>

<script>
import headTop from '../components/header';
import graphic from '../components/graphic';
import overview from '../components/overview';

export default {
    data() {
        return {
            data: []
        }
    },
    components:{
        headTop,
        graphic,
        overview
    },
    created() {
        fetch('http://v3.wufazhuce.com:8000/api/onelist/4845/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android', {
            method: 'GET'
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                this.data = res.data;
            })
    }
}
</script>
