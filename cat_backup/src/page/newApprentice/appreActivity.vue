<template>
<div class="all_wrap">
    <div class="head_bac"></div>
    <img class="back_icon" src="https://static.cattryapp.com/12static/new/img/common_return.png" @click="back">
    <img class="yuanxiao_bac" src="https://static.cattryapp.com/12static/new/img/top_pic.png">
    <div class="mid_bac">
        <div v-if="entered" class="bm_success">
            <div class="msg flex_column_center">
                <h2>{{appre.valid}}</h2>
                <h3>有效徒弟(名)</h3>
            </div>
            <div class="msg2 flex_column_center">
                <h4>{{appre.invalid}}</h4>
                <h3>作弊徒弟(名)</h3>
            </div>
        </div>
        <!-- 去收徒 -->
        <img v-if="entered" class="start_getAppre" @click="getAppre" src="https://static.cattryapp.com/12static/new/img/get_apprentice.png">
        <div class="white_wrap bac1">
            <img class="banner_top" src="https://static.cattryapp.com/12static/new/img/activity_banner.png">
            <h2>活动时间</h2>
            <div class="flex_center"><h3>2019年3月11日-3月17日</h3></div>
            <h2 class="mt14">报名条件</h2>
            <div class="flex_center"><h3>截止3月11日0点，累计有效徒弟</h3><h1>≤100</h1><h3>人</h3></div>
            <!-- 立即报名 -->
            <img v-if="!entered" class="bm_btn" @click="enroll" src="https://static.cattryapp.com/12static/new/img/signup_btn.png">
        </div>
        
        <img class="segmentation" :class="entered?'mt26':''" src="https://static.cattryapp.com/12static/new/img/award_list.png">
        <div class="word_wrap">
            <div class="flex mb12">
                <div class="index_circle flex_all_center">1</div>
                <p>活动时间：2019年3月11日 00:00:00～2019年3月17日 23:59:59</p>
            </div>        
            <div class="flex mb12">
                <div class="index_circle flex_all_center">2</div>
                <p>活动期间内注册并成功完成一个 [限时任务] 的徒弟计为有效</p>
            </div>
            <div class="flex mb12">
                <div class="index_circle flex_all_center">3</div>
                <p>奖励结算针对报名用户，于3月18日18点前完成审核并发放至账户余额，随时可提现！</p>
            </div>
            <div class="flex mb12">
                <div class="index_circle flex_all_center">4</div>
                <p>活动期间如发现作弊情况，结算时作弊徒弟将从有效徒弟中剔除。且一并扣除师傅分成，同时作弊徒弟所有收益无法提现</p>
            </div>
            <div class="flex mb12">
                <div class="index_circle flex_all_center">5</div>
                <p>活动进行中，如存在严重扰乱平台规则行为，平台有权暂停或提前结束活动</p>
            </div>        
            <div class="flex_center">
                <div class="index_circle flex_all_center">6</div>
                <p>本活动最终解释权归【懒猫试玩】</p>
            </div>
        </div>
        <img class="bottom_pic" src="https://static.cattryapp.com/12static/new/img/bottom_pic.png">
        <!-- 报名失败 -->
        <div v-if="FailPop" @touchmove.prevent>
            <div class="shade"></div>
            <div class="enroll_fail flex_column_center">
                <img class="fail" src="https://static.cattryapp.com/12static/new/img/appreActivity_fail.png">
                <h1>报名失败</h1>
                <h2>您的有效徒弟>100人啦</h2>
                <div class="tips_wrap">
                    <h3>加客服微信：<span>yuan288245</span></h3>
                    <h3>申请成为大使，可拿更高人头费！</h3>
                </div>
                <div class="copy_btn flex_all_center" @click="copyWechat">复制微信号</div>
                <img class="cancel_icon" @click="FailPop=false" src="https://static.cattryapp.com/12static/new/img/common_opcity_cancel.png">
            </div>
        </div>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import { Toast } from 'mint-ui';
import common from '../../api/common.js';
export default {
    name:'APP',
    data(){
        return {
            entered:false,
            appre:{},
            FailPop:false,
        }
    },

    mounted(){
        this.init()
    },

    methods:{
        init(){
            this.$loadding.open()
            axios.get("NewApprentice/getcount").then(res=>{
                this.$loadding.close()
                this.entered = res.data.status;
                if(this.entered === false) return;
                this.appre = res.data.data
            }).catch(err=>{
                console.log(err)
            })
        },
        //报名
        enroll(){
            _hmt.push(['_trackEvent', '收徒活动', '点击报名', '点击']);
            axios.get("NewApprentice/enroll").then(res=>{
                if(res.data.status==true){
                    Toast({message: '报名成功',duration: 2000});
                    this.init()
                }else if(res.data.code==='-102'){
                    this.FailPop=true
                }else{
                     this.$MessageBox.alert(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })            
        },
        //去收徒
        getAppre(){
            _hmt.push(['_trackEvent', '收徒活动', '点击去收徒', '点击']);
            this.$router.push('/appreHome')
        },
        // 复制微信号
        copyWechat(){
            common.copy_word('yuan288245').then(()=>{
                Toast({message: '复制成功',duration: 2000});
            })
        },
        back(){
           window.history.length>1?  this.$router.go(-1) : this.$router.replace('/')
        },
    }


}
</script>

<style scoped>
.yx_lantern{
    width: 3.8571rem;
    position: absolute;
    right: 0;
    top: 7.4286rem;
    z-index: 10;
}
.appreActivity_shuoming{
    width: 8.5714rem;
    display: block;
    margin-top: 2.5714rem;
}
.yuanxiao_bac{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
}
.cancel_icon{
    width: 1.8571rem;
    position: absolute;
    bottom: -4.1429rem;
    left: 50%;
    transform: translateX(-50%)
}
.copy_btn{
    width:15.7143rem;
    height:3.1429rem;
    background:rgba(255,99,83,1);
    border-radius:1.5714rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: 1.4286rem;
}
.enroll_fail{
    width:20rem;
    background:rgba(255,255,255,1);
    border-radius:0.6429rem;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 600;
    padding: 6rem 0 2.2857rem;
    box-sizing: border-box;
}
.enroll_fail h1{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.enroll_fail h2{
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:1.4286rem;  
    margin: 0.5714rem 0 1.4286rem;
}
.tips_wrap{
    width:17.1429rem;
    height:4.4286rem;
    border: 0.0714rem dashed transparent; 
    background: linear-gradient(rgba(255,252,238,1),rgba(255,252,238,1)) padding-box, 
    repeating-linear-gradient(-45deg,white 0, #FFA340 0.35em,white 0,white 0.85em); 
    padding: 0.7143rem 0 0 1.0714rem;
    box-sizing: border-box;
}
.tips_wrap h3{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.2857rem;
    margin-bottom: 0.2857rem
}
.tips_wrap span{
    color: #D14B4B;
    font-weight: 500
}
.fail{
    width: 10.8571rem;
    position: absolute;
    top: -3.8571rem;
    left: 50%;
    transform: translateX(-50%)
}
.mt26{
    margin-top: 1.5714rem!important
}
.bm_success{
    width: 25.071rem;
    height: 6.286rem;
    background: url('https://static.cattryapp.com/12static/new/img/status_board.png');
    background-size: 100% 100%;
    display: block;
    margin: .2rem auto 0;
    position: relative;
    z-index: 10;
}
.bm_success div{
    width: 6.7143rem;
    height: 4.2857rem;
    position: absolute;
    top: 1rem;
    /* padding-top: 2.286rem; */
    padding-left: .5rem;
    box-sizing: border-box;
}
.bm_success .msg{
    left: 7rem;
}
.bm_success .msg2{
    right: 1.8rem;
    padding-left: -.5rem
}
.bm_success h2{
    font-size:1.4286rem;
    font-family:HelveticaNeue-Medium;
    font-weight:500;
    color:rgba(255,76,76,1);
    line-height:1.7857rem;
}
.bm_success h3{
    font-family:PingFangSC-Regular;
    color:rgba(26,26,26,1);
    line-height:1.4286rem;
    margin-top: 0.2857rem
}
.bm_success h4{
    font-size:1.4286rem;
    font-family:HelveticaNeue-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:1.7857rem;
}
.start_getAppre{
    display: block;
    width: 24.714rem;
    position: relative;
    z-index: 10000;
    margin: .1rem auto 2.8rem;
}
.mb12{
    margin-bottom: 0.8571rem
}
.index_circle{
    width:1.2857rem;
    height:1.2857rem;
    background:rgba(255,255,180,1);
    border-radius: 50%;
    margin-right: 0.5714rem;
    color: #FF4C4C;
    font-size: 0.8571rem;
}
.word_wrap{
    padding: 1.1429rem;
    box-sizing: border-box;
}
.word_wrap p{
    width: 22.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:1.4286rem;
}
.mt14{
    margin-top: 1rem
}
.head_bac{
    height: 13.8rem;
    background: linear-gradient(157deg,rgba(2,40,128) 0%, rgba(2,40,128))
}
.mid_bac{
    height: 100%;
    background: #62C224;
    z-index: -2;
    margin-top: -0.2857rem;
}
.all_wrap{
    min-height: 100%;
    box-sizing: border-box;
}
.back_icon{
    width: 0.7143rem;
    position: absolute;
    top: 0.7143rem;
    left: 0.8571rem;
    z-index: 100;
    padding: 0.2857rem
}
.appreActivity_head{
    width: 100%;
    position: absolute;
    left: 0;
    top: 1.1429rem
}
.white_wrap{
    margin: .15rem auto;
    position: relative;
    z-index: 8;
    padding: 2.286rem 2.286rem;
    box-sizing: border-box;
    border-radius: .714rem;
}
.bac1{
    width: 24rem;
    max-height: 16.571rem;
    background-color: #fff;
}
.white_wrap h1{
    color: #FF2F2F;
    font-family:PingFangSC-Medium;
    font-weight:500;
}
.white_wrap h2{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:1.2857rem;
    margin-bottom: 0.4286rem;
}
.white_wrap h3{
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:1.4286rem;
}
.white_wrap i{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.4286rem;
    margin-left: 0.2857rem
}
.banner_top{
    position: absolute;
    left: 0.5rem;
    right: 0;
    top: -2.286rem;
    display: block;
    width: 23rem;
    /* margin: -3rem auto 0; */
}
.bm_btn{
    display: block;
    width: 18.8571rem;
    margin: 1.4rem auto 0
}
.segmentation{
    /* display: block; */
    width: 26.5rem;
    margin: 1.1rem auto 0;
    position: relative;
    z-index: 99;
}
.bottom_pic{
    width: 26.786rem;
    height: 7.5rem;

}
</style>