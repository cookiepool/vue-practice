<template>
<div class="all_wrap">
    <div class="common_bac_color"></div>
    <div class="head_wrap">
        <app-header :title="'微信提现'"></app-header>
        <div class="account flex_column_center">
            <p>{{user.balance}}</p>
            <span>可提现金额（元）</span>
        </div>
        <p class="withdraw_record" @click="goRecord">提现记录</p>
    </div>

    <div class="mid_content">
        <div class="flex_all_center">
            <img src="https://static.cattryapp.com/12static/new/img/wechat_icon.png">
        </div>
        <div class="tips_title flex_btn_center">
             <div class="gray_line"></div>
             <i>请选择提现的金额</i>
             <div class="gray_line"></div>
        </div>
        <div class="gold_wrap flex">
            <div v-for="(item,index) in gold" :key="index" class="gold_btn flex_all_center"  @click="choise_gold(index)" :class="select==index?'select':''">{{item}}元
            </div>
        </div>
        <div class="need_balance flex_btn_center">
            <div></div>
            <div class="flex_center"> 
                <i class="withdraw_word">提现金额</i><span>{{needMoney}}</span>元
            </div>   
        </div>
        <!-- 实名认证 -->
        <div v-if="identity" class="proving">
            <h1>实名认证</h1>
            <div class="input_wrap flex">
                <h2>姓名</h2>
                <input v-if="is_lock" type="text" v-model="name" readonly placeholder="请输入您微信实名认证的姓名">
                <input v-else type="text" v-model="name"  placeholder="请输入您微信实名认证的姓名">
            </div>
        </div>
        <!-- 身份认证 -->
        <div v-if="needMoney>100" class="proving">
            <h1>身份认证</h1>
            <h3>点击拍摄/上传本人手持二代身份证照片</h3>
            <div class="input_wrap flex" @click.capture.stop="handleImg()">
                <h2>照片</h2>
                <input v-if="!upPic&&closeClick&&!UpIdcard"  @change="changePic" type="file" id="file">
                <div v-if="!upPic&&!UpIdcard" class="noUp flex_center">
                    <p>未上传</p>
                    <img src="https://static.cattryapp.com/12static/new/img/withdraw_camera_icon.png">
                </div>
                <div v-else class="hadUp flex_center">
                    <p>已上传</p>
                    <img src="https://static.cattryapp.com/12static/new/img/withdraw_auth_icon.png">
                </div>
            </div>
        </div>     
        <p class="red_tips">*工作日提现次日24点前到账，周五、周六、周日提现延至周一到账</p>   
    </div>

    <div class="btn flex_all_center" :class="canSend?'canSubmit':''" @click="startWithdraw">申请提现</div>

    <div class="shadow flex_all_center flex_column_center" v-if="shadow" @touchmove.prevent>
        <div class="cash_tips flex_column_center">
            <img class="cash_tips_img" :src="cashSuccess?'https://static.cattryapp.com/12static/new/img/withdraw_success.png':'https://static.cattryapp.com/12static/new/img/withdraw_failed.png'" alt="">
            <span class="cash_tips_tile">{{cashSuccess?'提现成功':'提现失败'}}</span>
            <span class="cash_tips_text flex_all_center">{{tips}}</span>
            <div class="cash_sw flex_all_center" @click="goTask">{{goSaveInfo?'去填写资料':'开始做任务'}}</div>
            <p class="cash_detail" v-if="cashSuccess" @click="cashDetail">查看提现详情 ></p>
        </div>
        <img src="https://static.cattryapp.com/12static/new/img/shadow_close.png" alt="" class="cash_tips_close" @click="cashClose">
    </div>

    <div v-if="nameSure">
        <div class="shade" @touchmove.prevent></div>
        <div class="sure_name flex_column_center" @touchmove.prevent>
            <h2>确认提现姓名</h2>
            <h3>为了您的资金能顺利到账，请再次确认姓名是否<span>与微信实名姓名一致!</span></h3>
            <p class="pop_name">姓名：{{name}}</p>
            <div style="width:100%" class="flex_btn_center">
                <div class="btn_wrap flex_all_center" @click="cancelSure">修改</div>
                <div class="btn_wrap redbac flex_all_center" @click="sureName">确认</div>
            </div>
        </div>
    </div>
    <div v-if="IDproving">
        <div class="shade" @touchmove.prevent></div>
        <div class="withdraw_proving_pop">
            <div class="content flex_column_center">
                <img src="https://static.cattryapp.com/12static/new/img/cancel.png" @click="cancel_pop">
                <p class="tips">*为保障您的账号财产安全，提现需要进一步验证本人操作。</p>
                <h2>验证码发送至 {{user.phone}}</h2>
                <div class="pop_input_wrap flex_center">
                    <input v-model="AuthCode" type="number" placeholder="请输入验证码">
                    <div class="pop_btn flex_all_center" @click="sendAuthCode">
                        <p v-if="!hasSend">发送验证码</p>
                        <p v-else>已发送</p>
                    </div>
                </div>
                <div class="pop_sure_btn flex_all_center" @click="checkAuthCode">确定</div>
            </div>
        </div>
    </div>
    <!-- 身份证上传提示弹窗 -->
    <div v-if="showIdPop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="upId_pop flex_column_center">
            <h1>手持二代身份证照片要求</h1>
            <img src="https://static.cattryapp.com/12static/new/img/withdraw_upId_example.png">
            <div style="width:100%" class="flex_column">
                <h2>* 人脸、证件信息清晰可见</h2>
                <h2>* 完整露出手臂</h2>
            </div>
            <div id="IdExamplePop" class="idPop_btn flex_all_center">我知道了</div>
        </div>
    </div>
</div>
</template>

<script>
import api from '@//api/api.js'
import fix from '@//api/fix.js'
import common from '@//api/common.js'
import { Toast } from 'mint-ui'; 
export default {
    name:'APP',
    data(){
        return {
            shadow:false,
            cashSuccess:false,
            tips:'',
            name:'',
            IDcard:'',
            select:0,               //选择的金额索引
            gold:[],    //提现金额
            user:{},
            needMoney:10,
            identity:true,     //是否身份验证
            canSubmit:true,      //能否提现
            IDproving:false,     //身份验证展示
            hasSend:false,       //是否发送验证码
            AuthCode:'',        //输入的验证码
            goSaveInfo:0,       // 去填写资料
            first:false,        //第一次提现
            nameSure:false,     //第一次确认姓名
            is_lock: true,      //是否绑定姓名
            upPic: '',          //上传的图片    
            showIdPop:false,    //展示上传身份证提示弹窗
            UpIdcard:false,     //是否已绑定身份证照片
            closeClick:false,   //是否点击过身份证照片示例关闭按钮
        }
    },

    mounted(){
        this.init();
    },
    watch:{
        name(){
            if(this.name){
                this.canSubmit=true
            }else{
                this.canSubmit=false
            }
        },
    },
    computed:{
        canSend(){
            if(!this.name) return false;
            if(this.needMoney<=100||this.UpIdcard){
                return true
            }else{
               return this.upPic? true : false
            }
        }
    },
    methods:{
        init(){
            api.common_request('/Cash/index.html').then((res)=>{
                console.log(res)
                if(res.data.status == true){
                    if(res.data.data.cashing){
                        return this.$router.replace('/withdrawIng');
                    }
                    this.user = res.data.data.user;
                    this.name = this.user.name;
                    if(!this.user.name){
                        this.first=true;
                        this.canSubmit=false
                    }
                    // this.IDcard = this.user.IDcard;
                    this.goSaveInfo = this.user.gosaveinfo;
                    this.gold = res.data.data.gold;
                    this.needMoney = res.data.data.gold[0];
                    this.is_lock = res.data.data.extends.is_lock == 1 ? true : false;
                    this.UpIdcard = res.data.data.extends.status == 1 ? true : false;
                    console.log(this.UpIdcard);
                }
            }).catch(()=>{
                this.$MessageBox.alert('网络错误，请稍后再试。').then(()=>{
                    return this.$router.replace('/');
                });
            });
        },
        //提现记录
        goRecord(){
            this.$router.push({path:'/myBill',query:{history:true}})
        },  
        //选择金钱
        choise_gold(index){
            this.select=index;
            this.needMoney = this.gold[index];
            if(this.needMoney>=10){
                if(!this.name){   //没有输入姓名或者身份证
                    this.canSubmit=false
                }
            }else{
                this.canSubmit=true;
            }
        },
        startWithdraw(){
            if(!this.canSend) return false;
            if(!this.user.phone||!this.user.bindwx){
                this.$MessageBox.confirm('申请提现需完善个人资料，您目前未完善！',{confirmButtonText:'去完善',})
                .then((response)=>{
                    this.$router.push(`/userinfo?heighLight=${true}`)
                }).catch(()=>{})
            }else if(this.user.balance < 10 || this.user.balance< this.needMoney){
                this.$MessageBox.alert('余额不足，开始做任务继续赚钱吧');
            }else if(this.name == ''){
                this.$MessageBox.alert('请输入您微信实名认证的姓名！');
            }else if(this.first){
                this.nameSure=true
            }else{
                this.withdraw()
            }
        },
        //确认姓名
        sureName(){
            this.nameSure=false
            this.withdraw()
        },
        //修改姓名
        cancelSure(){
            this.nameSure=false
        },
        withdraw(){
            if(this.goSaveInfo){
                this.shadow = true;
                this.tips = '请去个人中心完善个人资料';
                return false;
            }
            this.IDproving=true;  //展示验证弹窗
        },
        goTask(){
            if(this.goSaveInfo){
                this.$router.push('/userinfo')
            }else{
                this.$router.push('/fastList')
            }
        },
        cashClose(){
            this.shadow = false;
            if(this.cashSuccess == true){
                this.$router.push('/');
            }
        },
        cashDetail(){
            this.$router.push('/withdrawIng');
        },
        cancel_pop(){
            this.IDproving=false
        },
        //发送验证码
        sendAuthCode(){
            if(this.hasSend) return;
            api.sendPhoneCodeTx().then((res)=>{
                if(res.data.status==true){
                    alert(res.data.msg);
                    this.hasSend=true
                }else {
                alert(res.data.msg);
            }
            })
        },
        //检查验证码是否正确
        checkAuthCode(){
            var Code = this.AuthCode;
            if(!Code){
                Toast({message:'请输入验证码'})
                return
            }
            var userphone = this.user.phone;
            var param = {code:Code,phone:userphone};
            this.withdrawEnd()
        },
        withdrawEnd(){
            this.cashSuccess = false;
            var time = Date.parse(new Date())/1000;
            var params = this.user.id.toString() + this.needMoney + time;   
            var msg = {'authcode':this.AuthCode,'money':this.needMoney,'name':this.name,'IDcard':this.IDcard,'time':time,'code':fix.fix(params)}         
            this.needMoney>100? msg.img=this.upPic : '';        //大于100的金额需上传身份证
            console.log(msg);
            this.$loadding.open('提现中')
            api.dowxpay(msg).then((res)=>{
                this.$loadding.close();
                this.IDproving=false
                console.log(res);
                this.shadow = true;
                this.cashSuccess = res.data.status;
                if(res.data.status == true){
                    this.tips = '三天内到账，继续去做任务赚钱吧';
                }else{
                    if(res.data.code == 100){
                        this.goSaveInfo = 1;
                    }
                    this.tips = res.data.msg;
                }
            }).catch(()=>{
                this.shadow = true;
                this.tips = '网络错误，请稍后再试。';
                return false;
            });            
        },
        //上传图片
        changePic(){
            var img = document.getElementById("file");
            var fr = new FileReader();
            fr.readAsDataURL(img.files[0]);
            var _this = this;
            fr.onload = function () {
                _this.upPic = this.result;
                console.log(_this.upPic);
            }
        },
        handleImg(e,param){
            if(!this.closeClick&&!this.UpIdcard){
                this.showIdPop=true
                this.$nextTick(()=>{
                    document.getElementById("IdExamplePop").addEventListener('click',()=>{
                        this.showIdPop=false;
                        this.closeClick=true
                        this.$nextTick(()=>{
                            document.getElementById("file").click()
                            this.showIdPop =false
                        })
                    })
                })
            }
        }
    }


}
</script>

<style scoped>
.idPop_btn{
    width:15.7143rem;
    height:3.1429rem;
    border-radius:1.5714rem;
    border:1px solid rgba(255,99,83,1);
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
    margin-top: 2.1429rem;
}
.upId_pop{
    padding: 2.2857rem 1.1429rem 1.7143rem;
    background: white;
    position: fixed;
    top: 14%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 500;
}
.upId_pop h1{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.upId_pop img{
    width: 17.8571rem;
    margin: 1.4286rem 0 1.1429rem;
}
.upId_pop h2{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    margin-bottom: 0.2857rem
}

.hadUp{
    position: absolute;
    height: 100%;
    right: 1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(81,146,245,1);
    z-index: 10;
}
.hadUp img{
    width: 1.2857rem!important;
    margin-left: 0.5714rem
}
.noUp{
    position: absolute;
    height: 100%;
    right: 1.1429rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    z-index: 0;
}
.noUp img{
    width: 1.7143rem!important;
    margin-left: 0.5714rem
}
#file{
    position: absolute;
    width: 80%;
    height: 100%;
    right: 0;
    opacity: 0;
    z-index: 1;
}
.red_tips{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,99,83,1);
    line-height:1.4286rem;
    margin-top: 1.1429rem;
}
.sure_name{
    width:19.7143rem;
    height:17.7143rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    padding: 2.2857rem 1.4286rem 1.7143rem;
    box-sizing: border-box;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 800;
}
.sure_name h2{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 0.8571rem
}
.sure_name h3{
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:1.7143rem;
}
.sure_name span{
    color: #FF6353;
}
.btn_wrap{
    width:7.8571rem;
    height:2.8571rem;
    border-radius:1.5714rem;
    border:1px solid #999999;
    font-size:1.1429rem;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
}
.redbac{
    background:rgba(255,99,83,1);
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    border:0.0714rem solid rgba(255,99,83,1);
}
.pop_name{
    font-size:1.1429rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    margin: 1.7143rem 0 2.2857rem;
}
.withdraw_word{
    font-size:1.1429rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    margin-right: 0.5714rem
}
.withdraw_record{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    position: fixed;
    right: 1rem;
    top: 1rem;
    color: white;
    z-index: 200;
}
.pop_input_wrap input{
     width: 70%;
     height: 70%;
     font-size: 1.1428571428571428rem;
     background: white;
     margin-left: 0;
}
 .pop_input_wrap input::-webkit-input-placeholder{
     font-family:PingFangSC-Regular;
     color:rgba(204,204,204,1);
}
 .pop_btn{
     width:6.714285714285714rem;
     height:2.2857142857142856rem;
     border-radius:1.1428571428571428rem;
     border:1px solid rgba(255,99,83,1);
     font-size:1rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
}
 .pop_sure_btn{
     width:15.714285714285714rem;
     height:3.142857142857143rem;
     background:rgba(255,99,83,1);
     border-radius:1.5714285714285714rem;
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     margin-top: 2rem;
}
 .withdraw_proving_pop{
     width:20rem;
     height:19.857142857142858rem;
     background:rgba(255,255,255,1);
     border-radius:0.7142857142857143rem;
     position: fixed;
     top: 12rem;
     left: 50%;
     transform: translate(-50%);
     z-index: 500;
}
 .content{
     padding: 2.5714285714285716rem 1.4285714285714286rem 0;
     box-sizing: border-box;
     position: relative;
}
 .content img{
     position: absolute;
     right: 0.8571428571428571rem;
     top: 0.8571428571428571rem;
     width: 0.8571428571428571rem;
     padding: 0.2857142857142857rem;
}
 .content .tips{
     width:17.142857142857142rem;
     font-size:1rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
     line-height:1.4285714285714286rem;
}
 .content h2{
     font-size:1rem;
     font-family:PingFangSC-Regular;
     color:rgba(0,0,0,1);
     margin: 1.6428571428571428rem 0 0.9285714285714286rem;
     align-self: flex-start 
}
 .pop_input_wrap{
     width: 100%;
     height: 3.4285714285714284rem;
     border-bottom: 0.07142857142857142rem solid rgba(241,241,241,1) 
}
 .all_wrap{
     width: 100%;
     padding-bottom: 4.285714285714286rem;
}
 .proving h1{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top:1.4285714285714286rem;
}
.proving h3{
    font-size:13px;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    margin-top: 8px
}
 .input_wrap{
     width:22.785714285714285rem;
     height:3.142857142857143rem;
     background:rgba(246,246,246,1);
     border-radius:0.14285714285714285rem;
     padding: 0 1.0714285714285714rem;
     box-sizing: border-box;
     align-items: center;
     margin-top: 0.854rem;
     position: relative;
}
 .input_wrap h2{
     font-size: 1.1428571428571428rem;
     white-space: nowrap;
}
 input{
     border: none;
     outline: none;
     background:rgba(246,246,246,1);
     margin-left: 0.42857142857142855rem;
     width: 15rem;
     font-size: 0.9285714285714286rem;
}
 .head_wrap{
     width: 100%;
     height: 14rem;
     background: url('https://static.cattryapp.com/12static/new/img/withdraw_head_bac.png');
     background-size: 100% 100%;
     box-sizing: border-box;
}
 .account p{
     font-size:2.5714285714285716rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     line-height:2rem;
     margin-top:1.2857142857142858rem 
}
 .account span{
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,255,255,1);
     margin-top: 0.8571428571428571rem 
}
 .mid_content{
     width:25.071428571428573rem;
     background:rgba(255,255,255,1);
     border-radius:0.5714285714285714rem;
     margin: -4.285714285714286rem auto 0;
     padding: 1.7142857142857142rem 1.1428571428571428rem;
     box-sizing: border-box;
     position: relative;
}
 .mid_content img{
     width: 4rem 
}
 .tips_title{
     margin-top: 1.7142857142857142rem;
     font-size:1rem;
     font-family:PingFangSC-Regular;
     color:rgba(102,102,102,1);
     margin-bottom: 1.2857142857142858rem;
}
 .gray_line{
     width:6.285714285714286rem;
     height:0.07142857142857142rem;
     background:rgba(241,241,241,1);
}
 .gold_wrap{
     flex-wrap: wrap;
     padding-bottom: 2.142857142857143rem;
}
 .gold_btn{
     width:6.714285714285714rem;
     height:3.2857142857142856rem;
     background:rgba(255,255,255,1);
     border-radius:0.42857142857142855rem;
     border:1px solid rgba(255,99,83,1);
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
     margin: 0 0.35714285714285715rem 0.8571428571428571rem;
}
 .select{
     background:rgba(255,99,83,1);
     color: white 
}
 .need_balance{
     display: flex;
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Regular;
     color:rgba(51,51,51,1);
}
 .need_balance span{
     font-size:1.2857142857142858rem;
     font-family:PingFangSC-Semibold;
     font-weight:600;
     color:rgba(255,99,83,1);
}
 .btn{
     width:22.5rem;
     height:3.142857142857143rem;
     background:rgba(255,146,135,1);
     border-radius:1.5714285714285714rem;
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     margin: 2.2857142857142856rem auto 3.7142857142857144rem;
}
 .canSubmit{
     background:rgba(255,99,83,1);
}
 .tips{
     line-height: 1.2857142857142858rem;
     font-size: 0.9285714285714286rem;
}
 .tips span{
     color: #FF6353;
}
 .shadow{
     position: fixed;
     top: 0;
     width: 100%;
     height: 100%;
     z-index: 200;
     background:rgba(51,51,51,0.92) 
}
 .cash_tips{
     background-color: #fff;
     width: 20rem;
     border-radius: 0.5714285714285714rem;
}
 .cash_tips_img{
     margin-top: -2.142857142857143rem;
}
 .cash_tips_tile{
     font-size: 1.2857142857142858rem;
     font-weight: bolder;
     margin: 1.6428571428571428rem 0 0.8571428571428571rem;
}
 .cash_tips_text{
     color: #666666;
     line-height: 1.4285714285714286rem;
}
 .cash_sw{
     width: 15.714285714285714rem;
     height: 3.142857142857143rem;
     background: linear-gradient(to right,#FF7757,#F63B53);
     margin: 2.857142857142857rem 1.4285714285714286rem;
     color: #fff;
     font-size: 1.1428571428571428rem;
     border-radius: 1.7857142857142858rem;
}
 .cash_detail{
     margin-bottom: 1.1428571428571428rem;
     color: #5192F5;
}
 .cash_tips_close{
     margin-top: 2.857142857142857rem;
} 
</style>
