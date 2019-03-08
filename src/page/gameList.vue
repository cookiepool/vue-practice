<template>
<div>
    <div v-if="awardData" class="container">
        <div :style="{ width: btnWidth + '%'}" class="title-btn" v-for="(item, index) of awardData" :key="index" @click.stop="switchTab(index)">{{ item.Title }}</div>
    </div>
    <ul>
        <li v-for="(val, key) in singleTabData.List" :key="key">{{ val.TaskContent }}</li>
    </ul>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data: function(){
        return {
            awardData: [], //奖励数据
            btnWidth: 0, //切换按钮宽度
            singleTabData: {} //当前按钮标题的数据
        }
    },
    mounted: function() {
        axios.get('http://m.cattryapp.com/GameTask/getTaoJinDetail?idTask=274').then((res)=>{
            this.awardData = res.data.SubTaskList;
            this.btnWidth = 100 / (this.awardData.length);
            this.singleTabData = this.awardData[0];
            console.log(this.singleTabData)
        }).catch(function(err){
            console.log(err);
        })
    },
    methods: {
        switchTab: function(index) {
            this.singleTabData = this.awardData[index];
        }
    }
}
</script>
<style>
    body,div,p{
        margin: 0;
        padding: 0;
    }
    .container{
        display: flex;
        justify-content: space-between;
    }
    .title-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
    }
</style>

