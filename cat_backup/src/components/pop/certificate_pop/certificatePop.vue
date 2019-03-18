<template>
<div v-if="show" @touchmove.prevent>
    <div class="shade" ></div>
    <div class="update_pop tc flex_column_center">
        <img class="cat" src="https://static.cattryapp.com/12static/new/img/home_certificate_icon.png">
        <img class="cancel" @click="closepop" src="https://static.cattryapp.com/12static/new/img/cancel.png">
        <h2>请安装证书验证设备唯一性</h2>
        <h3>苹果官方认证，不存在任何风险！</h3>
        <div ref="bind" class="update_btn flex_all_center" @click="startUpdate">安装证书</div>
        <div class="flex_center">
            <img class="safaty_icon" src="https://static.cattryapp.com/12static/new/img/certificate_safe_icon.png">
            <p class="safety_url" @click="go_safety">全方位安全保障</p>
        </div>
    </div>
</div>  
</template>
<script>
import common from '@//api/common.js'
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
                        common.authDevice(this)     //验证设备
                        resolve()
                })
            })
        },
        closepop(){
            this.show=false
        },        
        startUpdate(){
            this.show=false
        },
        go_safety(){
            location.href="http://m.cattryapp.com/web/safety"
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
    margin-bottom: 1.8571rem;
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
    padding: 5.71rem 1.4286rem 1.71rem;
    box-sizing: border-box;
}
.update_pop .cat{
    position: absolute;
    width: 10.3571rem;
    top: -2.82rem;
    left: 50%;
    transform: translateX(-50%)
}
.update_pop h2{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.update_pop h3{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1.7rem;  
    margin: 0.791rem 0 1.91rem
}
.safaty_icon{
    width: 1rem;
    margin-right: 0.4286rem;
}
.safety_url{
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(81,146,245,1);
    text-decoration: underline
}
</style>
