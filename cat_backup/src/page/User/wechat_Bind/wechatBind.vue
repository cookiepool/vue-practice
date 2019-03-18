<template>
<div class="all_wrap">
    <app-header :title="'微信绑定'"></app-header>
    <div class="step1">
        <h1>步骤1<span>/2</span></h1>
        <h2>长按存储二维码图片，打开微信扫一扫识别该二维码，找到公众号（或微信搜索公众号 <span>懒猫SW</span> )</h2>
        <img class="qrImg" src="https://static.cattryapp.com/12static/new/img/qrcode_sw.png">
    </div>
    <div class="step1">
        <h1>步骤2<span>/2</span></h1>
        <h2>关注后，点击“获取验证码”（如图示）</h2>
        <img class="authImg" src="https://static.cattryapp.com/12static/new/img/wechatBind_get_auth.png">
        <h3>输入您的验证码，进行绑定</h3>
        <input v-model="code" type="text" placeholder="请输入6位验证码">
    </div>
    <div class="btn flex_all_center" @click="bind">确认绑定</div>
    <!-- 绑定失败弹窗,已绑定 -->
    <div v-if="hadbindPop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="bindpop flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/wechatBind_hadotherAccount.png">
            <h1>绑定失败</h1>
            <h2>该微信号已绑定其它懒猫账号，是否切换帐号到“{{nickname}}”</h2>
            <div class="red_btn flex_all_center" @click="switchAccount">切换帐号</div>
            <div class="red_btn opticityBtn mt16 flex_all_center" @click="hadbindPop=false">重新绑定</div>
        </div>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import clientApi from '@//api/clientApi.js'

export default {
    name:'APP',
    data(){
        return {
            code:'',            //验证码
            hadbindPop:false,   //已绑定弹窗
            id:'',              //已绑定懒猫ID
            nickname:'',        //已绑定昵称
        }
    },

    mounted(){

    },

    methods:{
        init(){

        },
        bind(){
            this.$loadding.open('绑定中')
            var curcode = this.code;
            var param = {code:curcode}
            axios.post("user/savewx",param)
            .then(res=>{
                this.$loadding.close()
                if(res.data.status===true){
                    var msg = res.data.data
                    if(msg.type===1){       //已绑定微信
                        this.hadbindPop=true;
                        this.id=msg.id;
                        this.nickname = msg.name;
                    }else if(msg.type===2){
                        this.$MessageBox.alert('绑定微信成功').then(()=>{
                            this.$router.go(-1)
                        })
                    }
                    
                }else{
                    this.$MessageBox.alert(res.data.msg)
                }
            })
            .catch(err=>{
                this.$MessageBox.alert('请求超时，请检查网络状态')
            })
        },
        switchAccount(){
            var param={
                userid:this.id,
                code:this.code,
            };
            this.$loadding.open('正在切换帐号')
            axios.post("user/changeAccountByWx",param).then(res=>{
                this.$loadding.close()
                if(res.data.status===true){
                    this.$loadding.open('正在切换帐号')
                    clientApi.syncAccount().then((res)=>{
                        this.$loadding.close()
                        if(res.status === "1"){
                            this.$MessageBox.alert('切换账号成功').then(()=>{
                                this.$router.replace('/')
                            })
                        }else{
                            this.$MessageBox.alert(res.msg)
                        }
                    })
                }else{
                    this.$MessageBox.alert(res.data.msg)
                }
            }).catch(err=>{
                this.$MessageBox.alert('请求超时，请检查网络状态')
                 this.$loadding.close()
            })
        },

    }

}
</script>

<style scoped>
.fixTop{
    top: 32%!important
}
.mt16{
    margin-top: 16px;
}
.red_btn{
    width:200px;
    height:40px;
    background:linear-gradient(100deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:22px;
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.opticityBtn{
    background: white!important;
    border:1px solid rgba(255,99,83,1);
    color: #FF6353!important
}
.bindpop{
    width:280px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 500;
    padding: 64px 20px 32px;
    box-sizing: border-box;
}
.bindpop img{
    width: 105px;
    position: absolute;
    top: -36px;
    left: 50%;
    transform: translateX(-50%);
}
.bindpop h1{
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
}
.bindpop h2{
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:24px;  
    margin: 16px auto 32px;
    text-align: center;
}
.all_wrap{
    min-height: 100%;
    background:rgba(246,246,246,1);
    padding-bottom: 48px;
}
.step1{
    width:351px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    margin: 12px auto;
    padding: 16px 16px 24px;
    box-sizing: border-box;
}
.step1 h1{
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.step1 h1 span{
    font-size: 12px
}
.step1 h2{
    margin-top: 16px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:20px;
}
.step1 h2 span{
    color: #FF6353;
}
.step1 h3{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:20px;
}
.qrImg{
    width: 130px;
    display: block;
    margin: 12px auto 0
}
.authImg{
    width: 320px;
    margin: 8px 0 16px
}
input{
    border: none;
    outline: none;
    width:319px;
    height:44px;
    background:rgba(246,246,246,1);
    padding: 8px 14px;
    box-sizing: border-box;
    color: #666666;
    margin-top: 8px;
}
input::-webkit-input-placeholder{
    color:rgba(204,204,204,1);
}
.btn{
    width:315px;
    height:46px;
    background:rgba(255,99,83,1);
    border-radius:22px; 
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin: 32px auto 0
}
</style>