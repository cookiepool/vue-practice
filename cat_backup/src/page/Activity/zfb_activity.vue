<template>
<div class="all_wrap">
    <img class="all_bac" src="https://static.cattryapp.com/12static/new/img/activity_zfb_bac.png">
    <img class="back_icon" src="https://static.cattryapp.com/12static/new/img/common_return.png" @click="back">
    <div class="step1 flex_column_center">
        <h2 class="step_word tc">复制下方文字，打开支付宝搜索领取红包</h2>
        <h3>641050723</h3>
        <img class="btn" src="https://static.cattryapp.com/12static/new/img/activity_zfb_btn.png" @click="copy">
    </div>
    <div class="step2 flex_column_center">
        <h2 class="step_word tc">长按下方二维码保存至相册，打开支付宝 扫一扫领取红包</h2>
        <img class="qr_code" src="https://static.cattryapp.com/12static/new/img/activity_zfb_qrCode.png">
        <p class="tips">通过以上方式获取红包 </p>
        <p class="tips">到任意实体店消费即可<span>抵扣现金</span></p>
    </div>
    <h1 class="tc">注意事项</h1>
    <div class="tips_word flex_center">
        <div class="cirlce flex_all_center">1</div><p>红包有效期3天，过期作废</p>
    </div>
    <div class="tips_word flex">
        <div class="cirlce flex_all_center">2</div><p>每个支付宝账号每天可领取1次红包，使用红包后才可再次领取</p>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import common from '@//api/common.js'
import { Toast } from 'mint-ui';
export default {
    name:'APP',
    data(){
        return {

        }
    },

    mounted(){
        
    },

    methods:{
        init(){
            
        },
        copy(){
            common.copy_word(641050723).then(()=>{
                Toast('复制成功')
            })
            window.location.href="alipay://"
        },
        back(){
            window.history.length>1?  this.$router.go(-1) : this.$router.replace('/')
        }
    }

}
</script>

<style scoped>
.back_icon{
     z-index: 200;
     width: .71rem;
     padding: .5rem .6rem;
     position: absolute;
     left: .514rem;
     top: .542rem 
}
.tips_word{
    padding-left: 1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-bottom: 0.8571rem;
}
.tips_word p{
    width: 22.6429rem;
    line-height:1.5714rem;
}
.cirlce{
    width:1.2857rem;
    height:1.2857rem;
    background:rgba(255,255,180,1);
    border-radius: 50%;
    font-size:0.8571rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(56,151,255,1);
    margin-right: 0.5714rem
}
h1{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin: 0.1429rem 0 1.4286rem;
}
.tips{
    width: 18.5714rem;
    font-size:1.0714rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:2rem;
}
.tips span{
    font-size: 1.7143rem;
    color: #FFFFB4;
}
.all_wrap{
    min-height: 100%;
    background:linear-gradient(315deg,rgba(48,217,255,1) 0%,rgba(50,141,255,1) 100%);
    padding: 5.7143rem 0 2.8571rem;
    box-sizing: border-box;
}
.all_bac{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.step1{
    width: 23.4286rem;
    height: 13.5714rem;
    background: url('https://static.cattryapp.com/12static/new/img/activity_zfb_step1Bac.png');
    background-size: 100% 100%;
    margin: 0 auto;
    padding-top: 3.2857rem;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
}
.step2{
    width: 26.7857rem;
    height: 24.1429rem;
    background: url('https://static.cattryapp.com/12static/new/img/activity_zfb_step2Bac.png');
    background-size: 100% 100%;
    padding-top: 2.5714rem;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    margin: -0.5714rem auto 0
}
.qr_code{
    width: 8rem;
    margin:0.7143rem 0 2rem;
}
.step_word{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.5714rem;
    width: 18.5714rem;
}
h3{
    font-size:1.7143rem;
    font-family:HelveticaNeue-Bold;
    font-weight:bold;
    color:rgba(255,76,76,1);
    line-height:2.0714rem;
    letter-spacing:0.1429rem;
    margin-top: 0.1429rem;
}
.btn{
    width: 15.7143rem;
    margin-top: 1rem;
}
</style>
