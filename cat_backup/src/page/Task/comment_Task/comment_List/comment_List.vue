<template>
<div class="heigh_list_wrap">
    <div class="common_bac_color"></div>
    <app-header-step :title="'评论任务'" :step="['下载安装','按要求完成试玩','领取奖励']"></app-header-step>
    <app-headnav :navItem="['投放中','审核中','已完成']" :current_nav="Nav" v-on:navIndex="choseNav"></app-headnav>
    <!-- 账户安全提示 -->
    <safeTips v-if="!save_info"></safeTips>
    <!-- 投放中列表 -->
    <div v-if="Nav==0&&nowtask.length>0">
        <!-- 投放中tips -->
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/common_thorw.png" >
                <p>投放任务</p>
            </div>
            <p class="right_msg">
                总计{{sum_now_task}}元
            </p>
        </div>
        <!-- 列表 -->
        <div class="common_list_wrap">
            <div class="common_item flex_btn_center" v-for="(item,index) in nowtask" :key="index" @click="start(item.id)">
                <div class="left_msg flex">
                    <img :src="item.icon">
                    <div class="word_msg">
                        <h2>{{item.name}}</h2>
                        <div class='bot_msg flex'>
                            <p class="price">免费</p>
                            <p class="surplus">剩{{item.surplus}}份</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div v-if="item.status != 0" class="right_price">
                        +{{item.money}}<i>元</i>
                    </div>
                    <div v-else-if="item.status == 0" class="common_ing_btn">
                        <i>进行中</i>
                        <img src="https://static.cattryapp.com/12static/new/img/common_go_forward.png">
                    </div>
                </div>
            </div>
            <div class="placeholder"></div>             
        </div>
    </div>
    <!-- 缺省页 -->
    <div v-if="nowtask.length==0&&Nav==0" class="no_appre flex_column_center">
        <img src="https://static.cattryapp.com/12static/new/img/notask.png">
        <p class="tips1">暂无评论任务</p>
        <i>下午三点后任务多多,请准时到场</i>
    </div> 
    <!-- 审核中列表 -->
    <div v-if="Nav==1">
        <div class="common_list_wrap" v-for="(item,index) in review" :key="index">
            <div class="common_item flex_btn_center">
                <div class="left_msg flex">
                    <img :src="item.icon">
                    <div class="word_msg flex_column_btn pd6">
                        <h2>{{item.name}}</h2>
                        <i>提交日期：{{item.date}}</i>
                    </div>
                </div>
                <div class="right_msg theing" >
                    <p class="auditing">审核中</p>
                    <p class="ok_price">+{{item.money}}元</p>
                </div>
            </div>
            <div class="placeholder"></div>            
        </div>
        <div v-if="review.length==0" class="no_appre flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/notask.png">
            <p class="tips1">暂无审核中的任务</p>
            <i>下午三点后任务多多,请准时到场</i>
        </div>    
    </div>


    <!-- 已完成列表 -->
    <div v-if="Nav==2">
        <div class="common_list_wrap">
                <div class="common_item flex_btn_center"  v-for="(item,index) in complete" :key="index" @click="submit_detail(item.id,item.status)">
                    <div class="left_msg flex">
                        <img :src="item.icon">
                        <div class="word_msg flex_column_btn pd6">
                            <h2>{{item.name}}</h2>
                            <i>提交日期：{{item.date}}</i>
                        </div>
                    </div>
                    <div class="fail_pass flex" v-if="item.status == 4">
                        <p>审核未通过</p>
                        <img src="https://static.cattryapp.com/12static/new/img/comment_right_arrow.png">
                    </div>
                    <div v-else-if="item.status == 2" class="right_msg">
                        <p class="ok">审核通过</p>
                        <p class="ok_price">+{{item.money}}元</p>
                    </div>
                </div>
            <div class="placeholder"></div>
            <div v-if="complete.length==0" class="no_appre flex_column_center">
                <img src="https://static.cattryapp.com/12static/new/img/notask.png">
                <p class="tips1">暂无已完成的任务</p>
                <i>下午三点后任务多多,请准时到场</i>
            </div>    
        </div>

    </div>

</div>    
</template>

<script>
import safeTips from '@//components/safety_tips/safety_tips.vue'
import api from '@//api/api.js'
export default {
    name:'APP',
    data(){
        return {
            Nav: 0,  //顶部导航索引
            nowtask:[], //进行中列表
            review: [], //审核中列表
            complete: [],  //已完成列表
            sum_now_task: 0,
            audit: [],  //审核列表
            aftertask: [],  //未开始列表
            surplus: {         //任务剩余时间
                h: 0,       //时
                m: 0,       //分
                s: 0,       //秒
                all: 0         //剩余秒数
            },
            tools: {
                timer: null      //定时器
            },
            save_info:1
        }
    },

    mounted(){
        this.init()
    },
    components:{
        safeTips:safeTips
    },
    methods:{
        init(){
            this.$loadding.open("加载中..");
            api.commentList().then((res)=>{
                console.log(res);
                this.$loadding.close();
                if(res.data.status == true){
                    this.nowtask = res.data.data.nowtask;
                    this.complete = res.data.data.complete;
                    this.review = res.data.data.review;
                    this.sum_now_task = res.data.data.sum_now_task;
                    this.save_info = res.data.data.save_info;
                }
            })
        },
        // 切换顶部导航
        choseNav(e){
            if(e == 0){
                this.Nav=0
                this.showlist = this.nowtask;
                _hmt.push(['_trackEvent', '评论任务', '切换到投放中', '切换列表']);
            } else if(e == 1) {
                this.Nav=1
                this.showlist = this.audit;
                _hmt.push(['_trackEvent', '评论任务', '切换到审核中', '切换列表']);
            } else {
                this.Nav=2
                this.showlist = this.completed;
                _hmt.push(['_trackEvent', '评论任务', '切换到已完成', '切换列表']);
            }
        },
        start(id){
            api.commentStart({taskid:id}).then(res => {
                if(res.data.status == true){
                    this.$router.push({path: '/commentDetail',query:{taskid:id}});
                    return false;
                } else if(res.data.code == 1000){
                    this.$MessageBox.alert(res.data.msg);
                } else if(res.data.code == 3002) {
                    var _this = this;
                    this.$MessageBox.confirm(res.data.msg).then(act => {
                        if(act == "confirm"){
                            api.commentAbandon({}).then(res => {
                                if(res.data.status == true){
                                    _this.start(id);
                                } else if(res.data.code == 1000){
                                    _this.$MessageBox.alert(res.data.msg);
                                }
                            })
                        }
                    })
                }
            })
        },
        submit_detail(id,status){
            if(status != 4)
                return ;

            this.$router.push({path:"/commentFail",query:{taskid: id}});
        }
    },
    // beforeRouteLeave(to,from,next){
    //     if(to.path == "/" || to.path == "/commentDetail" || to.path == "/commentFail"){
    //         next();
    //         return;
    //     } else {
    //         next(false);
    //         this.$router.replace("/");
    //         return ;
    //     }
    // }
}
</script>

<style scoped>
    .task_head_tips{
        margin-top: 0.8571428571428571rem
    }
    .heigh_list_wrap{
        width: 100%;
        height: 100%;
    }
    .throwing_tips{
        width:100%;
        height:2.857142857142857rem;
        font-size:0.9285714285714286rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height: 2.857142857142857rem;
    }
    .throwing_tips img{
        width: 1.1428571428571428rem;
        margin-right: 0.5714285714285714rem;
    }
    .wait_begin_tips{
        width:100%;
        height:2.857142857142857rem;
        font-size:0.9285714285714286rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .wait_begin_tips img{
        width: 1.1428571428571428rem;
        margin-right: 0.7142857142857143rem;
    }


</style>
