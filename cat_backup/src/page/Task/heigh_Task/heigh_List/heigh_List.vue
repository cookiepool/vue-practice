<template>
    <div class="all_wrap">
        <div class="common_bac_color"></div>
            
        <div class="fixed_header">
            <!-- <i class="common_methods" @click="play_method(true)">玩法</i> -->
            <app-header-step class='the_head_wrap' :title="'高额任务'" :step="['下载安装','按要求完成试玩','领取奖励']"></app-header-step>
            <app-headnav :navItem="['投放中','审核中','已完成']" :current_nav="Nav" v-on:navIndex="choseNav"></app-headnav>
        </div>

        <safeTips v-if="!save_info"></safeTips>

        <!-- 投放中列表 -->
        <div v-if="Nav==0 && run_task.length>0" class="list_warp_0">
            <!-- 投放中tips -->
            <div class="task_head_tips flex_btn_center">
                <div class="left_msg flex">
                    <img src="https://static.cattryapp.com/12static/new/img/common_thorw.png" >
                    <p>投放任务</p>
                </div>
                <p class="right_msg">
                    总计{{now_task_total_money}}元
                </p>
            </div>            
            <!--列表 -->
            <div class="list_wrap">
                <div class="common_item flex_btn_center" v-for="(item,index) in run_task" :key="index" @click="start(item.id)">
                    <div class="left_msg flex">
                        <img :src="item.icon">
                        <div class="word_msg">
                            <h2>{{item.name}}</h2>
                            <i>{{item.tag}}</i>
                            <div class='bot_msg flex'>
                                <p class="price">免费</p>
                                <p class="surplus">剩{{item.surplus}}份</p>
                            </div>
                        </div>
                    </div>
                    <div class="right_msg">
                        <div v-if="item.is_in_task == 0" class="right_price">
                            +{{item.money}}<i>元</i>
                        </div>
                        <div v-else-if="item.is_in_task == 1" class="common_ing_btn">
                            <i>进行中</i>
                            <img src="https://static.cattryapp.com/12static/new/img/common_go_forward.png">
                        </div>
                    </div>
                </div>
                <div class="placeholder"></div>
            </div>
        </div>
        <!-- 缺省页 -->
        <div v-if="run_task.length==0&&Nav==0" class="no_appre flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/notask.png">
            <p class="tips1">暂没有任务</p>
            <i>下午三点后任务多多,请准时到场</i>
        </div>

        <!-- 审核中列表 -->
        <div v-if="Nav==1" class="list_warp_sub">
            <div class="common_list_wrap divwrap">
                <!-- v-for项 -->
                <div class="common_item flex_btn_center" v-for="(item,index) in audit" :key="index" @click="edit(item.status,item.id)">   
                    <div class="left_msg flex">
                        <img :src="item.icon">
                        <div class="word_msg flex_column_btn pd6">
                            <h2>{{item.name}}</h2>
                            <i>提交日期：{{item.sub_time}}</i>
                        </div>
                    </div>
                    <div v-if="item.status == 2" class="right_msg theing pd16" >
                        <p class="auditing">审核中</p>  
                        <p class="ok_price">+{{item.money}}元</p>
                    </div> 
                    <div v-else-if="item.status == 1" class="right_msg flex_all_center">
                        <p class="wait_audting">待审核</p>
                        <img class="common_right_arrow" src="https://static.cattryapp.com/12static/new/img/comment_right_arrow.png">
                    </div>
                    <div v-else-if="item.status == 3" class="right_msg flex_all_center pd16">
                        <p class="wait_audting perple">申述中</p>
                        <!-- <img class="common_right_arrow" src="https://static.cattryapp.com/12static/new/img/comment_right_arrow.png"> -->
                    </div>
                </div>
                <div class="placeholder"></div>
                 <div v-if="audit.length==0" class="no_appre flex_column_center">
                    <img src="https://static.cattryapp.com/12static/new/img/notask.png">
                    <p class="tips1">暂无审核中的任务</p>
                    <i>下午三点后任务多多,请准时到场</i>
                </div>               
            </div>
        </div>
        <!-- 已完成列表 -->
        <div v-if="Nav==2" class="list_warp_sub">
            <div class="common_list_wrap">
                <div class="common_item flex_btn_center" v-for="(item,index) in completed" :key="index" @click="complaint(item.status,item.volume_task)">
                    <div class="left_msg flex">
                        <img :src="item.icon">
                        <div class="word_msg flex_column_btn pd6">
                            <h2>{{item.name}}</h2>
                            <i>提交日期：{{item.sub_time}}</i>
                        </div>
                    </div>
                    <div v-if="item.status == 2" class="right_msg" >
                    <p class="ok">审核通过</p>  
                    <p class="ok_price">+{{item.money}}元</p>          
                    </div>
                    <div v-else-if="item.status == 3" class="fail_pass flex">
                        <p>审核未通过</p>
                        <img src="https://static.cattryapp.com/12static/new/img/comment_right_arrow.png">
                    </div>
                </div>
                <div class="placeholder"></div>
                 <div v-if="completed.length==0" class="no_appre flex_column_center">
                    <img src="https://static.cattryapp.com/12static/new/img/notask.png">
                    <p class="tips1">暂无已完成的任务</p>
                    <i>下午三点后任务多多,请准时到场</i>
                </div>                    
            </div>
        </div>
    </div>
</template>
<script>
import api from '@//api/api.js'
import { Toast } from 'mint-ui'
import dialog from '../../../../components/dialog/index.js'
import safeTips from '@//components/safety_tips/safety_tips.vue'
export default {
    name:'APP',
    data(){
        return {
            testarr:[],
            Nav:0,
            run_task:[],    //进行中的任务
            now_task_total_money: 0, //进行中总金额
            completed: [],  //已完成列表
            audit: [],  //待审核列表
            aftertask: [], //未开始列表
            isShowDialog: false,
            guide: null,
            save_info:1,   //是否完善账户信息
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
            api.heighList().then((res)=>{
                console.log(res);
                if(res.data.status == true){
                    this.run_task = res.data.data.run_task;
                    this.completed = res.data.data.completed;
                    this.audit = res.data.data.waitaudit;
                    this.now_task_total_money = res.data.data.totalnow_money_now;
                    this.save_info = res.data.data.save_info;
                    this.$loadding.close();
                } else {
                    this.$loadding.close();
                }
            }).catch(res => {
                this.$loadding.close();
                Toast("服务器繁忙, 请稍后再试");
            })
        },
        // 切换顶部导航
        choseNav(e){
            if(e == 0){
                _hmt.push(['_trackEvent', '高额任务', '切换到投放中', '切换列表']);
                this.Nav = 0;
            } else if(e == 1) {
                _hmt.push(['_trackEvent', '高额任务', '切换到审核中', '切换列表']);
                this.Nav = 1;
            } else {
                _hmt.push(['_trackEvent', '高额任务', '切换到已完成', '切换列表']);
                this.Nav = 2;
            }
        },
        start(id){
            var _is_click_heigh = localStorage.getItem("_is_click_heigh");
            if(_is_click_heigh == null){
                this.play_method();
                localStorage.setItem("_is_click_heigh",true);
                return ;
            }
            api.heightTaskStart({taskid: id}).then(res => {
                console.log(res.data)
                var _this = this;
                if(res.data.status == true){
                    this.$router.push({path: '/heighDetail',query:{id:id}})
                } else {
                    if(res.data.code == 1000){
                        this.$MessageBox.alert(res.data.msg);
                    } else if(res.data.code == 2001){
                        this.$MessageBox.confirm('有其他进行中的任务,是否放弃？',{ confirmButtonText:'不放弃',cancelButtonText:'放弃'})
                        .then(action => {
                        }).catch(action => {
                            api.heightTaskAbandon({}).then(ret => {
                                if(ret.data.status == true){
                                    _this.start(id);
                                } else {
                                    this.$MessageBox.alert(res.data.msg);
                                }
                            }) 
                        })
                    }
                }
            })
        },
        edit(status,id){
            if(status == 2 || status == 3) return false;
            this.$router.push({path: '/heighEdit',query:{detail_id:id}});
        },
        complaint(status,id){
            if(status == 2) return ;
            this.$router.push({path: '/heighFail',query:{id:id}});
        },
        play_method(){
            if(this.guide == null){
                api.heighGuide({}).then(res => {
                    if(res.data.status == true){
                        this.guide = res.data.data.html;
                            dialog.show("高额任务玩法",this.guide);
                    } else {
                        Toast("服务器繁忙,请稍后再试");
                    }
                }).catch(res => {
                    this.$MessageBox.alert("网络异常,请稍后再试");
                })
            } else {
                    dialog.show("高额任务玩法",this.guide);
            }  
        }
    },
    // beforeRouteLeave(to,from,next){
    //     if(to.path == "/" || to.path == "/heighDetail" || to.path == "/heighEdit" || to.path == "/heighFail"){
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
    .all_wrap{
        width: 100%;
        height: 100%;
        background:rgba(246,246,246,1);
    }
    .list_warp_0{
        margin-top: 0.7143rem
    }
    .list_warp_sub{
        /* padding-top: 8.42rem; */
    }
    .throwing_tips{
        width:100%;
        height:2.142rem;
        font-size:0.928rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height: 2.142rem;
    }
    .throwing_tips img{
        width: 1.1428rem;
        margin-right: 0.571rem;
    }
    .list_wrap{
        padding: 0 1.142rem;
        box-sizing: border-box;
        background: white;
        position: relative;
        min-height: 100%;
    }
    .wait_begin_tips{
        width:100%;
        height:2.85rem;
        font-size:0.928rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .wait_begin_tips img{
        width: 1.148rem;
        margin-right: 0.71rem;
    }
    .divwrap{
        padding-right: 0
    }
    .pd16{
        margin-right: 1.14rem
    }
    .right_msg .wait_audting{
        font-size:1.142rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(9,187,7,1);
    }
    .right_msg .common_right_arrow{
        width: 0.642rem;
        margin-left: 0.57rem;
        padding-right: 1.142rem;
    }

</style>