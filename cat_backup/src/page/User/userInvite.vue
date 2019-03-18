<template>
    <div class="user">
        <div class="common_bac_color"></div>
        <app-header :title="'邀请码'"></app-header>
        <div class="user_invite_part user_invite_list">
            <div class="user_invite_part_item">
                <span class="user_invite_part_title">邀请码</span>
                <input v-model="inviteCode" class="user_invite_code" type="number" placeholder="请输入邀请码"/>
            </div>
        </div>
        <div class="user_invite_submit flex_all_center" @click="submitCode()">提交领取奖励</div>
    </div>
    
</template>

<script>
    import api from '@//api/api.js'
    export default {
        name: "invite",
        data(){
            return {
                inviteCode:'',
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            submitCode(){
                api.inviteCode({'fatherid':this.inviteCode}).then(res => {
                    if(res.data.status == true){
                        this.$MessageBox.alert(res.data.msg).then(res => {
                            this.$router.go(-1);
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
    .user{background-color: #F6F6F6;padding-bottom: 10px;height: 100%;width: 100%;}
    .user_invite_part{background-color: #fff;margin-top: 20px;padding: 16px;box-sizing: border-box;}
    .user_invite_part_item{height: 16px;}
    .user_invite_part_title{font-size: 16px;display: block;float: left; color: #1E1E1E;line-height: 16px;}
    .user_invite_code{margin-left: 8px;color: #CCCCCC;font-size: 14px;border: 0;outline:none;margin-top: -1px;}

    .user_invite_submit{margin: 32px auto;width: 80%;height: 44px;background-color: #FF6353;color: #fff;border-radius: 20px;font-size: 16px;}

</style>