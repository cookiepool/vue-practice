<template>
<div class='all_wrap'>
    <div class="head_wrap">
        <app-header  :title="'高额任务未通过详情'"></app-header>
    </div>
    <div class="common_app_msg_wrap divwrap">
        <div class="common_app_msg flex_btn_center divcommon">
            <div class="left_msg flex">
                <img :src="task.icon">
                <div class="word_msg">
                    <h2>{{task.name}}</h2>
                    <i class="submit_time">提交日期：{{task.date}}</i>
                </div>
            </div>
            <div class="right_msg divflex">
                <p class="no_pass">审核未通过</p>
                <p class="fail_page_price">+{{task.money}}元</p>
            </div>
        </div>
    </div>
    <div class="step_wrap">
        <div class="tips_banner flex_all_center">失败原因</div>
        <p>* {{runtime.examine_info}}</p>
    </div>
    <!-- 任务步骤 -->
    <div class="task_step_wrap">
        <div class="tips_banner flex_all_center">任务步骤</div>
        <i class="total_tips">点击图片进入大图模式</i>

        <div class="step_item" v-for="(item,index) in steps" :key="index">
            <div class="step_tips">
                <div class="step_tips_left flex">
                    <div class="red_code"></div>
                    <p>步骤{{index+1}}/{{steps.length}}</p>
                </div>
            </div>
            <img class="accept_img" v-for="(item,index2) in item.url" :key="index2" :src="item.url" @click="showlargeImg({index,index2})" >
            <p class="step_word_tips">{{item.des}}</p>
        </div>

    </div>
    <!-- 底部导航按钮 -->
    <!-- <div class="btn flex_all_center mt11" v-if="runtime.is_complaint != 2" @click="complaint">我要申述</div> -->
    <p class="giveup"></p>
    <!-- 展示大图 -->
    <div class="shade" v-if="showlargeimg"></div>
    <div class="swipe_wrapper" v-if="showlargeimg">
        <img class='cancel' src="https://static.cattryapp.com/12static/new/img/Detail_cancel.png" @click="closeSwipe">
         <p class="index_tips">{{current_showImg_index+1}}/{{imgarr.length}}</p>
        <mt-swipe class="swipe" @change="handleChange" :showIndicators="false" :defaultIndex="current_showImg_index" :auto="0" :prevent="true" :stopPropagation="trues">
            <mt-swipe-item class="swipe_item" v-for="(item,index) in imgarr" :key="index">
                <img :src="item" >
            </mt-swipe-item>
        </mt-swipe>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import {Swipe,SwipeItem} from 'mint-ui';
Vue.component(Swipe, Swipe);
Vue.component(SwipeItem, SwipeItem);
export default {
    name:'APP',
    data(){
        return {
            steps:[],                   //步骤信息
            showlargeimg:false,          //展示步骤大图
            imgarr:[],                  //步骤图数组
            current_showImg_index:0,    //当前swipe大图索引
            sure:false,                 //是否已明白
            task: {                     //任务基本信息
                name: "--",
                money: "0.00",
                icon: ""
            },
            runtime: [],
        }
    },

    mounted(){
        this.init()
    },
    updated(){

    },

    methods:{
        init(){
            var id = this.$route.query.id;
            //获取数据
            this.$loadding.open("加载中..");
            api.heighDetail({taskid:id}).then(res=>{
                console.log(res.data.data)
                if(res.data.status == true){
                    this.$loadding.close();
                    this.steps = res.data.data.steps;
                    this.runtime = res.data.data.runtime;
                    var imgarr = [];
                    for(let i = 0;i < this.steps.length; i++){
                        for(let j=0; j<this.steps[i].url.length;j++){
                            imgarr.push(this.steps[i].url[j].url)
                        }
                    }
                    this.imgarr = imgarr;
                    this.task = res.data.data.volumetask;      //任务基本信息
                    var create_time = res.data.data.runtime.create_time;
                    create_time = this.timestampToTime(create_time)
                    this.task.create_time = create_time
                } else {
                    this.$loadding.close();
                }
            });

        },
        showlargeImg(e){
           var imgindex = e.index+e.index2;
           this.current_showImg_index = imgindex;
           this.showlargeimg = true
        },
        //切换轮播图
        handleChange(index){
            this.current_showImg_index = index
        },
        //关闭轮播图
        closeSwipe(){
            this.showlargeimg = false
        },
        //我已明白，开始任务
        imsure(){
            if(true != this.sure){
                //点击明白  从此明白了
                var id = this.$route.query.id;
                var _this = this;
                api.heightTaskClick({taskid: id}).then(res => {
                    if(true == res.data.status){
                        _this.sure = true;
                        window.open(_this.task.url);
                    }
                })
            } else {
                window.open(this.task.url); 
            }
        },
        complaint(){
            var _this = this;
            // this.$MessageBox.confirm("每个任务只有一次申述的机会,请确认资料无误再申述;否则申述可能会不成功").then(action => {
            //     if(action == "confirm"){
            //         _this.$router.push({path: '/heighComplaint',query:{detail_id: _this.runtime.id}});
            //     }
            // }).catch(action => {

            // })
            this.$MessageBox.confirm('每个任务只有一次申述的机会,请确认资料无误再申述;否则申述可能会不成功',{ confirmButtonText:'继续申述',cancelButtonText:'取消'})
            .then(action => {
                _this.$router.push({path: '/heighComplaint',query:{detail_id: _this.runtime.id}});
            }).catch(action => {
                
            })
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            // var h = date.getHours() + ':';
            // var m = date.getMinutes() + ':';
            // var s = date.getSeconds();
            return Y+M+D
        },
    },

    beforeRouteLeave(to,from,next){
        if(to.path == "/" || to.path == "/heighList" || to.path == "/heighComplaint"){
            next();
            return;
        } else {
            next(false);
            this.$router.replace("/heighList");
            return ;
        }
    }
}
</script>

<style scoped>
.common_app_msg_wrap{
    margin-top: -54px
}
.common_app_msg{
    border-bottom: none;
    padding-bottom: 0
}
.right_msg .no_pass{
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
    line-height:16px;
    white-space: nowrap
}
.right_msg .fail_page_price{
    font-size:16px;
    font-family:HelveticaNeue-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:16px;
    align-self: flex-end;
    margin-top: 8px;
}
.step_wrap{
    width:351px;
    background:rgba(255,255,255,1);
    border-radius:8px;  
    margin:32px auto 0;
    position: relative;
    padding: 44px 16px 24px;
    box-sizing: border-box;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
}
.shade{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 800;
}
.cancel{
    width: 36px;
    position: absolute;
    left: 0;
    top: -44px;
}
.swipe{
    position: relative;
}
.index_tips{
    position: absolute;
    top: -38px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    color: white;
}
.giveup{
     font-size:1rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(102,102,102,1);
     line-height:1rem;
     text-align: center;
     margin: 1.2857142857142858rem 0 0;
     padding-bottom: 2.7142857142857144rem;
}
.swipe_wrapper{
    width: 338px;
    height: 550px;
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}
.swipe_item{
    width: 100%;
    height: 100%;
    position: relative;
}
.swipe_item img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.all_wrap{
    width: 100%;
    height: 100%;
    background:rgba(246,246,246,1);
}
 .head_nav{
    position: absolute;
    top: 0;
    left: 0;
}
 .head_wrap{
     width: 100%;
     height: 115px;
     box-sizing: border-box;
     background: url('https://static.cattryapp.com/12static/new/img/heighDetail_head.png');
     background-size: 100% 100%;
}
 .decorate{
     width:2.285rem;
}
 .time_wrap{
     width:1.857rem;
     height:1.571rem;
     background:rgba(255,255,255,1);
     border-radius:0.142rem;
     margin: 0 0.285rem;
}
 .time_wrap i{
     font-size:1.142rem;
     font-family:HelveticaNeue-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
}
 .app_msg{
     width:25.07142rem;
     height:5.42857rem;
     background:rgba(255,255,255,1);
     box-shadow:0rem 0.1428rem 0.5714rem 0rem rgba(0,0,0,0.1);
     border-radius:0.5714rem;
     padding: 0 1.142rem;
     box-sizing: border-box;
     position: absolute;
     bottom: -1.6571rem;
     left: 50%;
     transform: translateX(-50%);
     z-index: 100;
}
 .app_msg .left_msg{
     align-items: center;
}
 .app_msg .left_msg img{
     width: 4rem;
     height: 4rem;
     border-radius:0.5714rem;
     margin-right: 0.8571rem;
}
 .app_msg .left_msg h2{
     font-size:1.142rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(30,30,30,1);
     line-height:1.142rem;
     margin-bottom: 0.714rem;
}
.app_msg .left_msg i{
   font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(148,148,148,1);
}
 .app_msg .left_msg .price{
     font-size:0.785rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,150,0,1);
     padding: 0.142rem 0.285rem;
     background:rgba(255,150,0,0.2);
     border-radius:0.1428rem;
     margin-right: 0.428571rem;
}
 .app_msg .left_msg .surplus{
     font-size:0.785rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,99,83,1);
     padding: 0.142rem 0.4285rem;
     background:rgba(255,99,83,0.2);
     border-radius:0.1428rem;
}
 .app_msg .right_msg{
     font-size:1.228rem;
     font-family:HelveticaNeue-Medium;
     font-weight:500;
     color:#333333;
     flex-direction: column;
}
 .app_msg .right_msg h2{
     align-self: flex-end
 }
 .app_msg .right_msg p{
     font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
    margin-bottom: 8px;
    white-space: nowrap;
 }
 .app_msg .right_msg i{
     font-size: 1rem;
}
 .task_step_wrap{
     width:25.071428571428573rem;
     margin: 32px auto 0;
     background:rgba(255,255,255,1);
     border-radius:0.5714285714285714rem;
     padding: 1.4571428571428572rem 1.1428571428571428rem 0;
     box-sizing: border-box;
     position: relative;
}
 .tips_banner{
     width:9rem;
     height:2.2857142857142856rem;
     background:linear-gradient(126deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
     border-radius:0rem 1.1428571428571428rem 1.1428571428571428rem 0rem;
     position: absolute;
     top: -0.7857142857142858rem;
     left: -1.4285714285714286rem;
     color: white;
     font-size:1.2142857142857142rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
}
 .total_tips{
     position: absolute;
     right: 1.1428571428571428rem;
     top: 2.8285714285714284rem;
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(148,148,148,1);
}
 .step_item{
     padding: 1.1685714285714286rem 0rem 24px;
     box-sizing: border-box;
     border-bottom: 0.07142857142857142rem solid rgba(241,241,241,1);
}
 .red_code{
     width:0.5714285714285714rem;
     height:0.5714285714285714rem;
     background:rgba(255,99,83,1);
     border-radius: 50%;
     margin-right: 0.35714285714285715rem;
}
 .step_tips_left{
     align-items: center;
}
 .step_tips p{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(51,51,51,1);
}
 .step_tips i{
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(148,148,148,1);
}
 .accept_img{
     margin-top: 1.2857142857142858rem;
     width: 4.785714285714286rem;
     height: 8.571428571428571rem;
     margin-right: 0.5714285714285714rem 
}
 .step_word_tips{
     line-height: 20px;
     font-size:1rem;
     font-family:PingFangSC-Regular;
     color:rgba(102,102,102,1);
     margin-top: 1.1428571428571428rem;
}
 .btn{
    width:22.5rem;
    height:3.142857142857143rem;
    background:rgba(255,99,83,1);
    border-radius:1.5714285714285714rem;
    margin: 32px auto 0;
    font-size:1.1428571428571428rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: 32px!important;
}
 .grey{
     background:rgba(204,204,204,1);
     margin-bottom: 2.7142857142857144rem;
}
.mt11{
    margin-top: 1.2rem
}
</style>
