<template>
<div>
    <div v-if="show" @touchmove.prevent>
        <div class="shade"></div>
        <div class="pop">
            <!-- <img class="cencel" @click="cancel" src="https://static.cattryapp.com/12static/new/img/cancel.png" > -->
            <img class="san" src="https://static.cattryapp.com/12static/new/img/unOpen_pop_bac.png">
            <p class="tips1">您的助手未开启</p>
            <i class="grey_tips">未开启助手，无法保障收益到账</i>
            <div class="start_up flex_all_center" @click="open()">开启助手</div>
            <p class="tips2"><i>无法启动请<span @click="down()">重新下载助手</span></i></p>
        </div>
    </div>
</div>    
</template>

<script>
import common from '../../../api/common.js'
export default{
    data(){
        return {
            show:false
        }
    },
    mounted(){
     
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
        open(){
            location.href="lazycat://";
        },
        down(){
            window.location.href='http://m.cattryapp.com/Share/down/type'
        }
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
     height:24.28rem;
     background:rgba(255,255,255,1);
     border-radius:0.43rem;
     position: fixed;
     top: 24%;
     left: 50%;
     transform: translateX(-50%);
     display: flex;
     flex-direction: column;
     align-items: center;
     z-index: 1000;
}
 .cencel{
     position: absolute;
     width: 1.1rem;
     height: 1.1rem;
     right: 0.8rem;
     top: 0.7rem;
}
 .san{
     width:9rem;
     margin-top: 1.15rem 
}
 .tips1{
     font-size:1.15rem;
     font-family:PingFangSC-Medium;
     font-weight:600;
     color:rgba(51,51,51,1);
     margin-top: 1.2rem;
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
 .grey_tips{
     margin-top: 0.857rem;
     font-size:0.85rem;
     font-family:PingFangSC-Regular;
     color:#666666;
}
 .tips2{
     margin-top: 1.45rem;
}
 .tips2 i{
     color: #9FA8B7;
     font-size: 1rem;
}
 .tips2 span{
     color:rgba(48,152,255,1);
     text-decoration: underline;
}
 
</style>
