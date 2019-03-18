<template>
    <div class="user_help all_wrap" v-if="this.data">
        <div class="common_bac_color"></div>
        <app-header :title="'帮助中心'"></app-header>

        <div class="user_help_title flex"><img src="https://static.cattryapp.com/12static/new/img/user_help_cj.png"/>常见问题</div>
        <div class="user_help_part">
            <div class="user_help_item" @click="getMoney"><span>{{this.helps.make_money.title}}</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
            <div class="user_help_item" @click="howApprentice"><span>{{this.helps.shoutu.title}}</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
            <div class="user_help_item" @click="taskSubmit"><span>{{this.helps.task_cant_submit.title}}</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
        </div>

        <div class="user_help_title flex"><img src="https://static.cattryapp.com/12static/new/img/user_help_tx.png"/>提现打款问题</div>
        <div class="user_help_part">
            <div class="user_help_item" @click="noCash"><span>{{this.helps.tixian.title}}</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
            <div class="user_help_item" @click="auditTime"><span>{{this.helps.tixian_shenhe.title}}</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
        </div>

        <div class="user_help_title flex"><img src="https://static.cattryapp.com/12static/new/img/user_help_cz.png"/>操作问题</div>
        <div class="user_help_part">
            <div class="user_help_item" @click="useHelper"><span>{{this.helps.zhushou.title}}</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
            <!--<div class="user_help_item" @click="iosVersion"><span>{{this.helps.ios12.title}}</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>-->
        </div>

        <div class="user_help_title flex"><img src="https://static.cattryapp.com/12static/new/img/user_help_zh.png"/>账号问题</div>
        <div class="user_help_part">
            <div class="user_help_item" @click="findAccountByPhone"><span>手机号找回账号</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
        </div>

        <div class="user_help_title flex"><img src="https://static.cattryapp.com/12static/new/img/user_help_sp.png"/>视频教程</div>
        <div class="user_help_part">
            <div class="user_help_item" @click="helpVideo"><span>帮助视频教程</span><img src="https://static.cattryapp.com/12static/new/img/forward.png"/></div>
        </div>
    </div>
</template>

<script>
    import api from '@//api/api.js'
    export default {
        name: "help",
        data(){
            return {
                data:false,
                helps: {},
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                api.common_request('/Help/index.html').then((res)=>{
                    if(res.data.status == true){
                        this.helps = res.data.data.helps;
                        this.data = true;
                    }
                });
            },
            getMoney(){
                this.$router.push({path:'/userhelpdetail',query:{title:this.helps.make_money.title,content:this.helps.make_money.text}});
            },
            howApprentice(){
                this.$router.push({path:'/userhelpdetail',query:{title:this.helps.shoutu.title,content:this.helps.shoutu.text}});
            },
            taskSubmit(){
                this.$router.push({path:'/userhelpdetail',query:{title:this.helps.task_cant_submit.title,content:this.helps.task_cant_submit.text}});
            },
            noCash(){
                this.$router.push({path:'/userhelpdetail',query:{title:this.helps.tixian.title,content:this.helps.tixian.text}});
            },
            auditTime(){
                this.$router.push({path:'/userhelpdetail',query:{title:this.helps.tixian_shenhe.title,content:this.helps.tixian_shenhe.text}});
            },
            useHelper(){
                this.$router.push({path:'/userhelpdetail',query:{title:this.helps.zhushou.title,content:this.helps.zhushou.text}});
            },
            iosVersion(){
                this.$router.push({path:'/userhelpdetail',query:{title:this.helps.ios12.title,content:this.helps.ios12.text}});
            },
            findAccountByPhone(){
                this.$router.push({path:'/findAccountByPhone'});
            },
            helpVideo(){
                document.location.href = this.helps.video_url;
            }
        },
    }
</script>

<style scoped>
.user_help_title{height: 46px;box-sizing: border-box;padding: 16px;color: #030303;font-size: 16px;font-weight: bold;}
.user_help_title img{margin-right: 8px;height: 16px;}
.user_help_part{width: 100%;padding: 0 14px;background-color: #fff;box-sizing: border-box;}
.user_help_item{display: flex;justify-content: space-between;font-size: 16px;border-bottom: 1px solid #F1F1F1;padding: 14px 0;height: 44px;box-sizing: border-box;}
.user_help_item img{width: 10px;}

</style>