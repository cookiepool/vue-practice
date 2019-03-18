<template>
<div v-cloak class="all_wrap" :class="lj1.status!=2?'bac1':'bac2'">
    <img class="back_icon" src="https://static.cattryapp.com/12static/new/img/common_return.png" @click="back">
    <img v-if="lj1.status!=2" class="head_banner2" src="https://static.cattryapp.com/12static/new/img/fastWithdraw_head1.png">
    <img v-else class="head_banner2" src="https://static.cattryapp.com/12static/new/img/fastWithdraw_head2.png">
    <div v-cloak v-if="lj1.status!==2" class="content_wrap">
        <h2 class="title">新手任务</h2>
        <i>完成任务即可开启进阶任务，体验5元极速提现</i>
        <div class="five_wrap">
            <!-- <div class="detail flex_btn_center">
                <div class="grey_line"></div>
                <div class="left_msg flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/fswithdraw_bindPhone.png">
                    <div class="flex_column">
                        <h2>绑定手机</h2>
                        <p class="bind_word"><span class="bind_reward">奖励0.2元</span></p>
                    </div>
                </div>
                <div v-if="lj1.bindphone!==1" class="blue_btn flex_all_center" @click="go_on_bind">继续完成</div>
                <div v-else class="blue_btn orange_btn flex_all_center">已完成</div>
            </div>  -->
            <div class="detail flex_btn_center">
                <div class="grey_line"></div>
                <div class="left_msg flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/fswithdraw_auth.png">
                    <div class="flex_column">
                        <h2>验证设备</h2>
                        <p class="bind_word"><span class="bind_reward">奖励0.2元</span></p>
                    </div>
                </div>
                <div v-if="lj1.authdevice!==1" class="blue_btn flex_all_center" @click="go_on_bind">继续完成</div>
                <div v-else class="blue_btn orange_btn flex_all_center" @click="go_on_bind">已完成</div>
            </div>             
            <div class="detail mt28 flex_btn_center">
                <div class="grey_line"></div>
                <div class="left_msg flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/fastWithdraw_shareWx.png">
                    <div class="flex_column">
                        <h2>分享懒猫到朋友圈</h2>
                        <p class="bind_word"><span class="bind_reward">0.1元</span>现金奖励</p>
                    </div>
                </div>
                <div v-if="shared!==1" class="blue_btn flex_all_center" @click="go_share">继续完成</div>
                <div v-else class="blue_btn orange_btn flex_all_center">已完成</div>
            </div>                                       
            <div class="detail mt28 flex_btn_center">
                <div class="left_msg flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/fastWithdraw_task.png">
                    <div class="flex_column">
                        <h2>完成一个任务</h2>
                        <div class="flex_center">
                            <div class="grey_column">
                                <div :style="{width:width}" class="red_column"></div>
                            </div>
                            <p><span :class="lj1.num>0?'red':''">{{lj1.num}}</span>/1</p>
                        </div>
                    </div>
                </div>
                <div v-if="lj1.num<1" class="blue_btn flex_all_center" @click="go_on_Task">继续完成</div>
                <div v-else class="blue_btn orange_btn flex_all_center">已完成</div>
            </div>
            <div class="btn flex_all_center" @click="withdrawOne">立即提现1元</div>
            <h4 class="endtime">该任务将于{{endtime}}关闭</h4>
        </div>
    </div>

    <div class="content_wrap mt12" :class="lj1.status==2?'mt32':''">
        <h2 class="title">进阶任务</h2>
        <i>成功收徒弟可获额外奖励，徒弟试玩师傅有高额提成</i>
        <div class="five_wrap" v-if="lj1.status==2">
            <div class="detail flex_btn_center">
                <div class="left_msg flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/fastWithdraw_task.png">
                    <div class="flex_column">
                        <h2>累计完成5个任务</h2>
                        <div class="flex_center">
                            <div class="grey_column">
                                <div :style="{width:width2}" class="red_column"></div>
                            </div>
                            <p><span :class="lj5.num>0?'red':''">{{lj5.num}}</span>/5</p>
                        </div>
                    </div>
                </div>
                <div v-if="lj5.num<5" class="blue_btn flex_all_center" @click="go_on_Task">继续完成</div>
                <div v-else class="blue_btn orange_btn flex_all_center">已完成</div>
            </div>
            <div class="detail mt28 flex_btn_center">
                <div class="left_msg flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/fastWithdraw_appre.png">
                    <div class="flex_column">
                        <h2>累计完成收徒1人</h2>
                        <div class="flex_center">
                            <div class="grey_column">
                                <div :style="{width:width3}" class="red_column"></div>
                            </div>
                            <p><span :class="lj5.tudi>0?'red':''">{{lj5.tudi}}</span>/1</p>
                        </div>
                    </div>
                </div>
                <div v-if="lj5.tudi<1" class="blue_btn flex_all_center" @click="go_on_tudi">继续完成</div>
                <div v-else class="blue_btn orange_btn flex_all_center">已完成</div>
            </div>
            <h4 class="endtime">该任务将于{{endtime}}关闭</h4>
            <div class="btn flex_all_center" @click="withdrawFive">立即提现5元</div>
        </div>
        <img v-else class="suo" src="https://static.cattryapp.com/12static/new/img/fastWithdraw_suo.png">
    </div>
</div>   
</template>

<script>
import api from '../../api/api.js'
import common from '../../api/common.js'
export default {
    name:'APP',
    data(){
        return {
            bindwx:0,
            lj1:{status:null,num:null,bindphone:null,authdevice:null},
            lj5:{status:null,num:null,tudi:null},
            endtime:'',
            shareUrl:'',
            shared:null,        //分享朋友圈是否完成
        }
    },

    mounted(){
        this.init()
    },
    computed:{
        bindphone(){
            return this.lj1.bindphone/1*100+'%'
        },
        authdevice(){
            return this.lj1.authdevice/1*100+'%'
        },
        width(){    
            return this.lj1.num/1*100+'%'
        },
        width2(){  
            console.log(this.lj5.num);
            return this.lj5.num/5*100+'%'
        },
        width3(){
            return this.lj5.tudi/1*100+'%'
        }
    },
    methods:{
        init(){
            this.$loadding.open()
            api.fsmsg().then(res=>{
                this.$loadding.close()
                var msg = res.data.data;
                console.log(msg);
                this.shareUrl = msg.shareUrl;
                this.bindwx = msg.bindwx;
                this.lj1.status = msg.lj1;
                this.lj1.num = msg.task>=1? 1 : 0;
                this.lj1.bindphone = msg.bindphone;
                this.lj1.authdevice = msg.authdevice;
                this.lj5.status = msg.lj5;
                var lj5Task = msg.task-1>0? msg.task-1 : 0;   //五元提现当前完成的任务量
                this.lj5.num = lj5Task>5? 5 : lj5Task;
                this.lj5.tudi = msg.tudi>1? 1: msg.tudi;
                this.endtime = this.timestampToTime(msg.deadline)
                this.shared = msg.shared;                       //分享朋友圈是否完成
                if(this.lj1.status==2&&this.lj5.status==2){
                    this.$router.replace('/')
                }
            })
        },
        //立即提现一元
        withdrawOne(){
            if(this.lj1.status==0){
                this.$MessageBox.alert('还未达成任务目标')
                return
            }
            if(this.lj1.status==1){
                if(!this.bindwx){   
                     this.$MessageBox.confirm('未绑定微信，无法确认您的微信账户并打款',{confirmButtonText:'去关注'})
                     .then(()=>{
                        this.$router.push('/wechatBind')
                     }).catch(()=>{})
                }else{              //已关注
                    var param = {type:1}
                    this.$loadding.open()
                    api.fstWithdraw(param).then((res)=>{
                        this.$loadding.close()
                        if(res.data.status==true){
                            this.$MessageBox.alert('立即提现成功，请登录微信查收').then(()=>{
                                location.reload()
                            })
                        }else{
                            this.$MessageBox.alert(res.data.msg)
                        }
                    })
                }
            }
        },
        //立即提现五元
        withdrawFive(){
            if(this.lj5.status==0){
                this.$MessageBox.alert('还未达成任务目标')
                return
            }
            if(this.lj5.status==1){
                if(!this.bindwx){   //未关注公众号
                    this.$MessageBox.confirm('未绑定微信，无法确认您的微信账户并打款',{confirmButtonText:'去关注'})
                    .then(()=>{
                        this.$router.push('/wechatBind')
                    }).catch(()=>{})
                }else{              //已关注
                    var param = {type:5}
                    this.$loadding.open()
                    api.fstWithdraw(param).then((res)=>{
                        this.$loadding.close()
                        console.log(res.data);
                        if(res.data.status==true){
                            this.$MessageBox.alert('立即体现成功，请登录微信查收')
                            .then(()=>{
                                this.$router.replace('/')
                            })
                           
                        }else{
                            this.$MessageBox.alert(res.data.msg)
                        }
                    })
                }
            }
        },
        //继续完成绑定手机,验证设备
        go_on_bind(){
           common.authDevice(this)
        },
        go_share(){
            window.location.href=this.shareUrl
        },
        //继续完成任务
        go_on_Task(){
            this.$router.push('/fastList')
        },
        //继续完成收徒
        go_on_tudi(){
            this.$router.push('/appreHome')
        },

        back(){
             window.history.length>1?  this.$router.go(-1) : this.$router.replace('/')
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            return Y+M+D
        }        
    }


}
</script>

<style scoped>
.bind_word{
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
}
.bind_word span{
    color:rgba(255,75,75,1);
}
.bind_reward{
    color:#FF4B4B
}
.grey_line{
    width:19.9286rem;
    height:0.0714rem;
    background:rgba(241,241,241,1);
    position: absolute;
    bottom: -0.9286rem;
    right: -1.1429rem;
}
.endtime{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1.2143rem;
    margin: 1.1429rem 0 0;
    text-align: center;
}
#app{
    min-height: 100%;
}
.all_wrap{
     width: 100%;
     min-height: 100%;
     padding: 8.142857142857142rem 0 2.857142857142857rem;
     box-sizing: border-box;   
}
.bac1{
    background: linear-gradient(138deg,rgba(255,99,208,1) 0%,rgba(246,59,83,1) 100%);
}
.bac2{
    background:linear-gradient(315deg,rgba(107,105,255,1) 0%,rgba(203,105,249,1) 100%);
}
 .head_banner{
     position: absolute;
     top: 3rem;
     left: 0;
     width: 100% 
}
 .head_banner2{
     position: absolute;
     top: 0rem;
     right: 0;
     width: 100% 
}
 .back_icon{
     z-index: 200;
     width: 1rem;
     padding: .5rem .6rem;
     position: absolute;
     left: .514rem;
     top: .542rem 
}
 .word_icon{
     width: 15.714285714285714rem;
     position: absolute;
     top: 5.428571428571429rem;
     left: 1.2857142857142858rem;
}
 .content_wrap{
     width:25.071428571428573rem;
     background:rgba(255,255,255,1);
     border-radius:0.5714285714285714rem;
     margin: 3.58rem auto 0;
     z-index: 100;
     padding:1.7142857142857142rem 0 0;
     box-sizing: border-box;
     position: relative;
}
 .content_wrap .title{
     padding-left: 1.1428571428571428rem;
     font-size:1.2857142857142858rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(0,0,0,1);
     margin-bottom: 0.5714285714285714rem;
}
 .content_wrap i{
     padding-left: 1.1428571428571428rem;
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     line-height: 1.2857142857142858rem;
}
 .content_wrap img{
     width: 3rem;
     margin-right: 1.0714285714285714rem 
}
 .five_wrap{
     padding: 2rem 1.142rem 1.34rem 
}
 .mt28{
     margin-top: 2rem;
}
 .detail{
  position: relative;
}
 .suo{
     width: 100%!important;
}
 .left_msg h2{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(51,51,51,1);
     margin-bottom: 0.8571428571428571rem;
}
 .grey_column{
     width:7.142857142857143rem;
     height:0.42857142857142855rem;
     background:rgba(224,224,224,1);
     border-radius:0.21428571428571427rem;
     margin-right: 0.8571428571428571rem;
     position: relative;
}
 .red_column{
     position: absolute;
     top: 0;
     left: 0;
     height: 100%;
     border-radius:0.21428571428571427rem;
     background: #FF6353;
}
 .blue_btn{
     width:5.142857142857143rem;
     height:2.2857142857142856rem;
     background:rgba(81,146,245,1);
     border-radius:1.1428571428571428rem;
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
}
 .orange_btn{
     background:rgba(255,163,64,1)!important;
}
 .btn{
     width:15.714285714285714rem;
     height:3.142857142857143rem;
     background:linear-gradient(134deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
     border-radius:1.5714285714285714rem;
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     margin: 2.2857142857142856rem auto 0;
}
 .red{
     color: #FF6353;
}
 .mt12{
     margin-top: 0.8571428571428571rem!important 
}
 .mt32{
     margin-top: 3.58rem!important 
}
 
</style>
