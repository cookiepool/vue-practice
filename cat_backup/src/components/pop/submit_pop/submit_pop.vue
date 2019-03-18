<template>
<div>
    <div v-if="show" @touchmove.prevent>
        <div class="shade"></div>
        <div class="pop flex_column_center">
            <img class="san" src="https://static.cattryapp.com/12static/new/img/submit_head_cat.png">
            <p class="tips1">审核提交成功</p>
            <p class="tips2">等待审核,审核通过后次日到账</p>
            <div class="start_up flex_all_center" @click="open()">继续试玩</div>
            <div class="tips3 flex_all_center">查看审核详情<img src="https://static.cattryapp.com/12static/new/img/submit_go_back.png"></div>
        </div>
    </div>
</div>
</template>

<script>
import clientApi from '@//api/clientApi.js'
export default{
    data(){
        return {
            show:false,
            name:'',
            icon:'',
            rank:null,
        }
    },
    methods:{
        showpop(){
            return new Promise((resolve,reject)=>{
                this.show=true
                resolve()
            })
        },
        closepop(){
            return new Promise((resolve,reject)=>{
                this.show=false
                resolve()
            })
        },
    }

}

</script>

<style scoped>
.shade{
     width: 100%;
     height: 100%;
     position: fixed;
     top: 0;
     left: 0;
     background: rgba(0, 0, 0, 0.6);
     z-index: 200;
}
 .pop{
     width:20rem;
     height:19.071428571428573rem;
     background:rgba(255,255,255,1);
     border-radius:0.7142857142857143rem;
     position: fixed;
     top: 24%;
     left: 50%;
     transform: translateX(-50%);
     z-index: 999;
}
 .cencel{
     position: absolute;
     width: 1.1rem;
     height: 1.1rem;
     right: 0.8rem;
     top: 0.7rem;
}
 .san{
     width: 11.071428571428571rem;
     height: 7.357142857142857rem;
     margin-top: -2.5rem;
}
 .tips1{
     font-size:1.15rem;
     font-family:PingFangSC-Medium;
     font-weight:600;
     color:rgba(51,51,51,1);
     margin-top: 1.7rem;
}
 .start_up{
     margin-top: 1.85rem;
     width:15.71rem;
     height:3.14rem;
     background:linear-gradient(100deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
     border-radius:1.785rem;
     font-size:1.142rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
}
 .tips2{
     height:1rem;
     font-size:1rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(102,102,102,1);
     line-height:1rem;
     margin-top: 1.7rem;
}
 .tips2 span{
     color: #333333;
     font-size: 1rem;
     font-weight: 600 
}
 .tips3{
     height:0.9285714285714286rem;
     font-size:0.9285714285714286rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(81,146,245,1);
     line-height:0.9285714285714286rem;
     margin-top: 1.47rem;
    /* display: flex;
     */
}
 .tips3 img{
     width: 0.35714285714285715rem;
     height: 0.6428571428571429rem;
     margin-left:0.5714285714285714rem;
}
 .app_msg{
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(84,84,84,1);
     line-height:1.2142857142857142rem;
     margin-top: 2rem;
}
 .app_msg img{
     width: 2.5714285714285716rem;
     height: 2.5714285714285716rem;
     margin-right: 0.5714285714285714rem;
}
 .app_msg span{
     font-weight: 600;
     color: #FF6353;
     margin: 0 0.14285714285714285rem;
}
 

</style>
