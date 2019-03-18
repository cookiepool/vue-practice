<template>
<div class="all_wrap">
    <app-header :title="'懒猫账户处理中心'"></app-header>
    <div class="tips_wrap">
        <p class="mb10">尊敬的用户，您好！</p>
        <p>您的账号由于刷机或抹机导致您无法正常登陆，如果是老用户请选择下面的手机号码找回您的账号。</p>
    </div>

    <div class="item flex_center flex_btn_center" @click="goFind">
        <div class="left_msg flex_center">
            <img src="https://static.cattryapp.com/12static/new/img/indentify_icon.png">
            <p>手机号码找回账号</p>
        </div>
        <img class="forward_icon" src="https://static.cattryapp.com/12static/new/img/forward.png">
    </div>
    <h2 class="bot_tips tc">如需帮助，请联系客服</h2>
</div>    
</template>

<script>
export default {
    name:'APP',
    data(){
        return {
            
        }
    },
    methods:{
        goFind(){
            this.$router.push('/findAccountByPhone')
        }
    }

}
</script>

<style scoped>
.all_wrap{
    min-height: 100%;
    background:rgba(246,246,246,1);
}
.tips_wrap{
    width: 100%;
    height:138px;
    background:rgba(255,230,227,1);
    padding: 20px 16px;
    box-sizing: border-box;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(209,75,75,1);
    line-height:20px;
}
.mb10{
    margin-bottom: 6px
}
.item{
    width: 100%;
    height:48px;
    background:rgba(255,255,255,1);
    margin-top: 24px;
    padding: 0 16px;
    box-sizing: border-box;
}
.left_msg{
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(30,30,30,1);
}
.left_msg img{
    width: 24px;
    margin-right: 16px;
}
.forward_icon{
    width: 10px
}
.bot_tips{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%)
}
</style>
