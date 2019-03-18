<template>
    <div class="user_bind_phone">
        <div class="common_bac_color"></div>
        <app-header :title="'老账号登录'"></app-header>
        <div class="header_tips">
            <p class="makesure">*请先确认您之前的懒猫账号已经绑定了手机</p>
            <p class="guid">点击获取验证码，收到验证码后填写并提交</p>
        </div>
        <div class="user_bind_phone_part">
            <div class="user_bind_phone_part_item user_bind_phone_num flex_center">
                <span class="user_bind_phone_part_title">手机号</span>
                <input v-model="phone" class="user_bind_phone_code" type="number" placeholder="请输入手机号码"/>
            </div>
            <div class="user_bind_phone_part_item user_bind_phone_yzm flex_btn_center">
                <p class="flex_center">
                    <span class="user_bind_phone_part_title">验证码</span>
                    <input v-model="code" class="user_bind_phone_code" type="number" placeholder="请输入验证码"/>
                </p>
                <p class="get_phone_code flex_all_center" :class="{'code_send':sended}" @click="getCode()">{{hqyzm}}</p>
            </div>
        </div>
        <div class="user_bind_phone_submit flex_all_center" @click="findAccount()">登录</div>
    </div>
</template>

<script>
var timer;
    import api from '@//api/api.js'
    import clientApi from '@//api/clientApi.js'
    import { Toast } from 'mint-ui';
    export default {
        name: "APP",
        data(){
            return {
                sended:false,
                hqyzm:'获取验证码',
                phone:'',
                code:'',
                count:'',
            }
        },
        beforeRouteLeave(to,from,next){
            clearInterval(timer);
            next()
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            getCode(){
                if(this.sended){
                    return false;
                }
                var phone = this.phone;
                // var reg = (/^1[34578]\d{9}$/.test(phone))
                // if(!reg){
                //     return this.$MessageBox.alert('请输入正确的手机号');
                // }
                api.sendPhoneCodeYc({params:{'phone':phone}}).then(res => {
                    console.log(res);
                    if(res.data.status == true){
                        this.sended = true;
                        Toast({message: res.data.msg});
                        const TIME_COUNT = 60;
                        if (!timer) {
                            this.count = TIME_COUNT;
                            timer = setInterval(() => {
                                console.log(this.count);
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count=this.count-1;
                                } else {
                                    clearInterval(timer);
                                    timer = null;
                                }
                                if(this.count <= 0){
                                    this.hqyzm = '获取验证码';
                                    this.sended = false;
                                }else{
                                    this.hqyzm = this.count + 's';
                                }
                            }, 1000)
                        }
                    }else {
                        this.$MessageBox.alert(res.data.msg);
                    }
                });
            },
            findAccount(){
                var code = this.code;
                var _this = this;
                if(code == ''){
                    return this.$MessageBox.alert('验证码不能为空');
                }
                api.common_request('/User/findaccount?code='+code).then(res => {
                    if(res.data.status == true){
                        this.$loadding.open('找回账号中...')
                        clientApi.syncAccount().then((res)=>{
                            this.$loadding.close()
                            if(res.status === "1"){
                                this.$router.replace('/')
                            }else{
                                this.$MessageBox.alert(res.msg)
                            }
                        })
                    }else {
                        this.$MessageBox.alert(res.data.msg);
                    }
                }).catch(()=>{
                    this.$MessageBox.alert('网络异常，请检查您的网络后再试').then(()=>{
                        document.location.reload();
                    })
                });
            }
        }
    }
</script>

<style scoped>
    .header_tips{padding: 1.4286rem 1.1429rem;box-sizing: border-box;}
    .makesure{color: #FF6353;font-weight: bolder}
    .guid{color: #999999;margin-top: 0.8571rem;}
    .user_bind_phone{background-color: #F6F6F6;padding-bottom: 0.7143rem;height: 100%;}
    .user_bind_phone_part{background-color: #fff;margin-top: 0.8571rem;padding: 1.1429rem;box-sizing: border-box;}
    .user_bind_phone_part_item{height: 1.1429rem;}
    .user_bind_phone_part_title{font-size: 1.1429rem;display: block;float: left; color: #1E1E1E;line-height: 1.1429rem;}
    .user_bind_phone_code{margin-left: 0.5714rem;font-size: 1rem;border: 0;outline:none;margin-top: -0.0714rem;}

    .user_bind_phone_num{padding-bottom: 1.1429rem;border-bottom: 0.0714rem solid #F1F1F1;}
    .user_bind_phone_yzm{padding-top: 1.1429rem;}
    .get_phone_code{background-color: #FF6353;color: #fff;border-radius: 1.1429rem;width: 7.1429rem;height: 2.2857rem;}
    .user_bind_phone_submit{margin: 2.2857rem auto;width: 80%;height: 3.1429rem;background-color: #FF6353;color: #fff;border-radius: 1.4286rem;font-size: 1.1429rem;}
    .code_send{opacity: 0.6;}
</style>