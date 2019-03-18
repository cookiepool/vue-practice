<template>
<div>
    <div class="common_bac_color"></div>
    <app-header :title="'关于懒猫'"></app-header>
    <div class="user_about_lm">
        <img src="https://static.cattryapp.com/12static/new/img/lanmao_icon.png"/>
    </div>
    <div class="nav_wrap">
        <div class="nav_item bot flex_btn_center" @click="business">
            <h2>商务合作</h2>
            <div class="flex_center">
                <span>QQ:353023240</span>
                <img src="https://static.cattryapp.com/12static/new/img/forward.png">
            </div>
        </div>
        <div class="nav_item flex_btn_center" @click="userProtocol">
            <h2>用户服务协议</h2>
            <img src="https://static.cattryapp.com/12static/new/img/forward.png">
        </div>        
    </div>
</div>    
</template>
<script>
    import dialog from '../../components/dialog/index.js'
    import api from '@//api/api.js'
    export default {
        name: "APP",
        data(){
            return {
                useragreement:null
            }
        },
        mounted(){
            api.common_request('/Help/useragreement.html').then((res)=>{
                if(res.data.status == true){
                    this.useragreement = res.data.data.useragreement;
                }
            });
        },
        methods:{
            business(){
                this.$router.push('/business');
            },
            userProtocol(){
                // dialog.show("用户协议",this.useragreement);
                // return
                this.$router.push('/user_protocol');
            },
        }
    }
</script>

<style scoped>
 .user_about_lm{
     margin: 2.2857rem auto 2.5rem;
     width: 4.64rem;
}
 .user_about_lm img{
     width: 5.64rem;
}
.nav_wrap{
    background: white;
    padding-left: 1.1429rem;
    box-sizing: border-box;
}
.nav_item{
    padding-right: 1.1429rem;
    box-sizing: border-box;
    height: 3.4286rem;
    font-family:PingFangSC-Regular;
}
.nav_item h2{
    font-size:1.2143rem;
    color:rgba(30,30,30,1);
}
.nav_item span{
    font-size:1.0714rem;
    color:rgba(81,146,245,1);
}
.nav_item img{
    width: 0.6429rem;
    margin-left: 0.7143rem
}
.bot{
    border-bottom: 1px solid #F1F1F1
}
</style>