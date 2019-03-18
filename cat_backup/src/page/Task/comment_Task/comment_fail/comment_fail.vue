<template>
<div class="all_wrap">
    <!-- 顶部详情 -->
   <div class="common_head_wrap2">
        <app-header class="common_head_nav" :title="'审核未通过详情'"></app-header>
    </div>
        <div class="common_app_msg_wrap divwrap">
            <div class="common_app_msg flex_btn_center divcommon">
                <div class="left_msg flex">
                    <img :src="data.icon">
                    <div class="word_msg">
                        <h2>天气预报</h2>
                        <i class="submit_time">提交日期：{{data.date}}</i>
                    </div>
                </div>
                <div class="right_msg divflex">
                   <p class="no_pass">审核未通过</p>
                   <p class="fail_page_price">+{{data.money}}元</p>
                </div>
            </div>
        </div>    
    <!-- 任务步骤 -->
    <div class="step_wrap">
        <div class="banner_wrap flex_all_center">失败原因</div>
        <p>* {{data.not_through_description}}</p>
    </div>

    <div class="comment_content">
        <div class="banner_wrap flex_all_center">任务步骤</div>
        <div class="comment_item">
            <div class="key_word_wrap flex">
                <h2>标题必含关键字：</h2>
                <p class="accept_word" v-for="(item,index) in data.keyword_title" :key="index">{{item}}</p>
            </div>
            <div class="item_content flex">
                <input type="text" v-model="data.title" disabled="disabled">
            </div>
        </div>
        <div class="comment_item">
            <div class="key_word_wrap flex">
                <h2>内容必含关键字：</h2>
                <p class="accept_word" v-for="(item,index) in data.keywords_content" :key="index">{{item}}</p>
            </div>
            <div class="item_content flex">
                 <input type="text" v-model="data.content" disabled="disabled">
            </div>
        </div>        
    </div>
  
    <div class="up_screen">
        <div class="banner_wrap flex_all_center">上传截图</div>
        <h2>上传截图凭证<span>（评论、应用二合一图，如样式图）</span></h2>
        <div class="pic_wrap">
            <div class="pic"><img src="https://static.cattryapp.com/12static/new/img/comment_example.png" ></div>
            <div class="pic" v-for="(item,index) in data.images" :key="index">
                <img id="img_content" :src="item" >
            </div>
        </div>
    </div>

</div>    
</template>
<script>
    import api from '@//api/api.js'
    import client from '@//api/clientApi.js'
    export default {
        name:'APP',
        data(){
            return {
                title:'',           //标题
                content:'',         //内容
                cantChange:false,   //后端判断是否可以自定义标题和内容
                base: [],           //应用基本信息
                task: [],
                data: []
            }
        },

        mounted(){
            this.init();
        },
        methods:{
            init(){
                var id = this.$route.query.taskid;
                if(typeof id == "undefined")
                    this.$router.push({path: '/commentList'});

                api.commentFaild({taskid: id}).then(res => {
                    console.log(res)
                    if(res.data.status == true){
                        this.data = res.data.data;
                    } else if(res.data.code == 1000){
                        this.$MessageBox.alert(res.data.msg);
                    }
                })
            },
        },
        beforeRouteLeave(to,from,next){
            if(to.path == "/" || to.path == "/commentList"){
                next();
                return;
            } else {
                next(false);
                this.$router.replace("/commentList");
                return ;
            }
        }

    }
</script>

<style scoped>
    .common_app_msg_wrap{
        position: relative;
        margin-top: -2.857142857142857rem;
        z-index: 99;
    }
    .common_app_msg{
        padding-bottom: 0;
        border-bottom: none;
    }
    .right_msg .no_pass{
        font-size:1.1428571428571428rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,99,83,1);
        line-height:1.1428571428571428rem;
        white-space: nowrap
    }
    .right_msg .fail_page_price{
        font-size:1.1428571428571428rem;
        font-family:HelveticaNeue-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:1.1428571428571428rem;
        align-self: flex-end;
        margin-top: 0.5714285714285714rem;
    }
    .all_wrap{
        width: 100%;
        background:rgba(246,246,246,1);
        padding-bottom: 3.5714285714285716rem;
    }
    .common_head_wrap2{
        width: 100%;
        height: 7.5rem;
        box-sizing: border-box;
        background: url('https://static.cattryapp.com/12static/new/img/heighDetail_head.png');
        background-size: 100% 100%;
        position: relative;
    }
    .step_wrap{
        width:25.071428571428573rem;
        background:rgba(255,255,255,1);
        border-radius:0.5714285714285714rem;
        margin:2.2857142857142856rem auto 0;
        position: relative;
        padding: 3.357142857142857rem 1.1428571428571428rem;
        box-sizing: border-box;
        font-size:1rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,99,83,1);
    }
    .banner_wrap{
        width:9rem;
        height:2.2857142857142856rem;
        background:linear-gradient(126deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
        border-radius:0rem 1.1428571428571428rem 1.1428571428571428rem 0rem;
        position: absolute;
        top: -0.8571428571428571rem;
        left: -0.8571428571428571rem;
        font-size:1.2142857142857142rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .step_word p{
        margin-left: 1rem;
        margin-bottom: 1.1428571428571428rem;
    }
    .btn{
        width:15.714285714285714rem;
        height:3.142857142857143rem;
        background:rgba(81,146,245,1);
        border-radius:1.5714285714285714rem;
        color: white;
        font-size:1.1428571428571428rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        margin: 1.4285714285714286rem auto 0;
    }
    .comment_content{
        width:25.071428571428573rem;
        background:rgba(255,255,255,1);
        border-radius:0.5714285714285714rem;
        margin:2.5714285714285716rem auto 0;
        position: relative;
        padding: 2.857142857142857rem 1.1428571428571428rem 1.4285714285714286rem;
        box-sizing: border-box;
    }
    .comment_tips{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(102,102,102,1);
        line-height:1rem;
    }
    .comment_tips span{
        color: #FF6353;
    }
    .comment_content img{
        width: 9.285714285714286rem;
        height: 10rem;
        margin: 0.8571428571428571rem 0 1.1428571428571428rem;
        margin-right: 0.7142857142857143rem;
    }
    .comment_item{
        margin-bottom: 0.8571428571428571rem;
    }
    .comment_item h2{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(30,30,30,1);
    }
    .item_content{
        width:22.785714285714285rem;
        min-height:3.142857142857143rem;
        background:rgba(74,144,226,0.07);
        border-radius:0.2857142857142857rem;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.7142857142857143rem 0.8571428571428571rem;
        box-sizing: border-box;
    }
    .item_content input{
        width: 17.85rem;
        white-space:normal;
        outline: none;
        border:0;
        background: rgba(241,248,251,1);
        font-family:PingFangSC-Regular;
        color:#999999;
        line-height:1rem;
        z-index: 100;
        font-size: 1.1428571428571428rem;
    }
    .item_content .right_copy_wrap{
        margin-left: 0.7142857142857143rem;
        height: 1.8571428571428572rem;
        padding-left: 0.42857142857142855rem;
        border-left: 0.07142857142857142rem solid rgba(74,144,226,0.2);
        font-size:1.1428571428571428rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(74,144,226,1);
        white-space: nowrap;
    }
    .key_word_wrap{
        margin-bottom: 0.7142857142857143rem;
        align-items: center;
    }
    .accept_word{
        padding: 0.2857142857142857rem 0.5714285714285714rem;
        border: 1px solid rgba(48,152,255,1);
        color: #4A90E2;
        border-radius: 0.7142857142857143rem;
    }
    .up_screen{
        width:25.071428571428573rem;
        height:19.857142857142858rem;
        background:rgba(255,255,255,1);
        border-radius:0.5714285714285714rem;
        position: relative;
        margin: 2.5714285714285716rem auto 0;
        padding: 3.142857142857143rem 1.1428571428571428rem 1.7142857142857142rem;
        box-sizing: border-box;
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
    }
    .up_screen span{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(102,102,102,1);
    }
    .pic_wrap{
        margin-top: 0.78rem;
        display: flex;
    }
    .pic_wrap .pic{
        width: 7.38rem;
        height: 12.96rem;
        margin-right: 1.5rem;
    }
    .pic_wrap .pic form{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .pic_wrap form input{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
    }
    .pic img{
        width: 100%;
        height: 100%;
    }

</style>
