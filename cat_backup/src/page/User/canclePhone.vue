<template>
    <div class="user_cancle_phone">
        <div class="common_bac_color"></div>
        <app-header :title="'解绑手机号'"></app-header>
        <div class="user_cancle_phone_part">
            <div class="user_cancle_phone_part_item flex_btn_center">
                <div>
                    <span class="user_cancle_phone_part_title">手机号</span>
                    <input v-model="phone" class="user_cancle_phone_input" type="number" placeholder="请输入手机号码"/>
                </div>
            </div>
            <div class="user_cancle_phone_part_item flex_btn_center">
                <div>
                    <span class="user_cancle_phone_part_title">验证码</span>
                    <input v-model="code" class="user_cancle_phone_input" type="number" placeholder="请输入验证码"/>
                </div>
                <p class="get_phone_code flex_all_center" :class="{'code_send':sended}" @click="getCode()">{{hqyzm}}</p>
            </div>
            <div class="user_cancle_phone_part_item flex_btn_center user_cancle_phone_reason">
                <div>
                    <span class="user_cancle_phone_part_title">解绑理由</span>
                    <input v-model="reason" class="user_cancle_phone_input" type="text" placeholder="请输入解绑理由"/>
                </div>
            </div>
        </div>
        <div class="user_cancle_phone_submit flex_all_center" @click="submitCode()">取消绑定</div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import api from '@//api/api.js'
    export default {
        name: "bindPhone",
        data(){
            return {
                sended:false,
                hqyzm:'获取验证码',
                phone:'',
                code:'',
                reason:'',
            }
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
                if(phone == ''){
                    return this.$MessageBox.alert('手机号不能为空');
                }
                if(phone.length != 11){
                    return this.$MessageBox.alert('请输入正确的手机号')
                }
                api.sendPhoneCode({params:{'phone':phone}}).then(res => {
                    if(res.data.status == true){
                        this.sended = true;
                        Toast({message: res.data.msg,position: 'top'});
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    clearInterval(this.timer);
                                    this.timer = null;
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
            submitCode(){
                var phone = this.phone;
                var code = this.code;
                var reason = this.reason;
                if(phone == ''){
                    return this.$MessageBox.alert('手机号不能为空');
                }
                if(phone.length != 11){
                    return this.$MessageBox.alert('请输入正确的手机号')
                }
                if(code == ''){
                    return this.$MessageBox.alert('验证码不能为空');
                }
                if(reason == ''){
                    return this.$MessageBox.alert('亲，我们期望您填写一下解绑的理由');
                }

                api.canclePhone({'phone':phone,'code':code,'des':reason}).then(res => {
                    if(res.data.status == true){
                        this.$MessageBox.alert(res.data.msg).then(res => {
                            this.$router.replace({path: '/'});
                        });
                    }else {
                        this.$MessageBox.alert(res.data.msg);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .user_cancle_phone{background-color: #F6F6F6;padding-bottom: 10px;height: 100%;}
    .user_cancle_phone_part{margin-top: 27px; background-color: #fff;padding: 0 16px;box-sizing: border-box;}
    .user_cancle_phone_part_item{height: 48px;box-sizing: border-box;display: flex;justify-content: start;border-bottom: 1px solid #F1F1F1;}
    .user_cancle_phone_part div:last-child{border: 0;}
    .user_cancle_phone_part_title{display:inline-block;font-size: 16px; color: #1E1E1E;line-height: 16px;width: 64px;}
    .user_cancle_phone_input{color: #CCCCCC;font-size: 14px;border: 0;outline:none;}

    .get_phone_code{background-color: #FF6353;color: #fff;border-radius: 16px;width: 100px;height: 32px;}
    .user_cancle_phone_submit{margin: 32px auto;width: 80%;height: 44px;background-color: #FF6353;color: #fff;border-radius: 20px;font-size: 16px;}
    .code_send{opacity: 0.6;}

</style>