<template>
<div class="tips_wrap flex_btn_center" @click="go_complete_msg">
    <div class="flex_center">
        <img class="safe_icon" src="https://static.cattryapp.com/12static/new/img/common_safety_icon.png">
        <h2>账户安全等级低，请完善账号绑定！</h2>
    </div>
    <div class="flex_center">
        <h3>去绑定</h3>
        <img class="arrow" src="https://static.cattryapp.com/12static/new/img/common_red_arrow.png">
    </div>
</div>    
</template>

<script>
import router from '../../router//router'
export default {
    name:'APP',
    methods:{
        go_complete_msg(){
            this.$router.push({path:'/userinfo',query:{heighLight:true}})
        }
    }

}
</script>

<style scoped>
.tips_wrap{
    width:24.5rem;
    height:2.2857rem;
    background:rgba(255,235,235,1);
    border-radius:1.1429rem;
    padding: 0 1.0714rem;
    box-sizing: border-box;
    margin: 0.7143rem auto 0;
}
.safe_icon{
    width: 1.4286rem;
    margin-right: 0.5rem
}
.arrow{
    width: 1.1429rem;
    margin-left: 0.1429rem
}
h2{
    font-size:0.8571rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);  
}
h3{
    font-size:0.7857rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,99,83,1);
}
</style>