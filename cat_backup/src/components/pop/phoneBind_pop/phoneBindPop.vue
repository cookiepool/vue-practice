<template>
<div v-if="show" @touchmove.prevent>
    <div class="shade" ></div>
    <div class="update_pop tc flex_column_center">
        <img class="cat" src="https://static.cattryapp.com/12static/new/img/common_noBindPhonePop_icon.png">
        <img class="cancel" @click="closepop" src="https://static.cattryapp.com/12static/new/img/cancel.png">
        <h2>抢任务失败</h2>
        <h3>请<span>校验手机</span>，可提高抢任务成功率哟</h3>
        <div ref="bind" class="update_btn flex_all_center" @click="startUpdate">去校验</div>
    </div>
</div>  
</template>
<script>
import common from '../../../api/common.js'
import clientApi from '../../../api/clientApi.js'
export default{
    data(){
        return {
            show:false,
        }
    },
    methods:{
        showpop(){
            return new Promise((resolve,reject)=>{
                this.show=true;
                var bind = this.$refs.bind;
                if(!bind) return
                bind.addEventListener("click",()=>{
                       resolve()
                })
            })
        },
        closepop(){
            this.show=false
        },
        startUpdate(){
            var param = encodeURIComponent(window.location.href);
            clientApi.pushTelController(param);
            this.show=false
        }
    }
}
</script>
<style scoped>
.cancel{
    position: absolute;
    width: 0.8571rem;
    right: 0.8571rem;
    top:0.8571rem;
    padding: 0.2857rem
}
.update_btn{
    width:15.7143rem;
    height:3.2143rem;
    background:linear-gradient(100deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:1.7857rem;  
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);  
}
.update_pop{
    width:20rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;  
    z-index: 899;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    padding: 4.28rem 1.4286rem 2.2857rem;
    box-sizing: border-box;
}
.update_pop .cat{
    position: absolute;
    width: 130px;
    top: -3.82rem;
    left: 50%;
    transform: translateX(-50%)
}
.update_pop h2{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 16px;
}
.update_pop h3{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1.7rem;  
    margin: 0.5714rem 0 1.91rem
}
.update_pop span{
    color: #FF6353;
}

</style>
