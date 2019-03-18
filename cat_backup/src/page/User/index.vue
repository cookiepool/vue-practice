<template>
    <div class="user">
        <!-- 顶部信息展示 -->
        <div class="user_head_wrap">
            <app-header :title="'个人中心'"></app-header>
            <div class="head_msg flex_btn_center">
                <div class="left_wrap flex_center" @click="userInfo">
                    <img :src="user.avatar"/>
                    <div class="flex_column">
                        <h2>{{user.name}}</h2>
                        <h3>ID:{{user.id}}</h3>
                    </div>
                </div>
                <div class="head_btn flex_all_center" @click="userInfo">编辑资料</div>
            </div>    
            <div class="pd9 flex_btn_center">
                <div class="head_nav bac1 flex_all_center" @click="go_myBill">我的账单</div>
                <div class="head_nav bac2 flex_all_center" @click="userShare">点赞分享</div>
            </div>                    
        </div>
        <div class="user_part user_list mt40">
            <div class="install_wrap flex_btn_center">
                <div class="flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/userIndex_logo.png">
                    <div class="flex_column">
                        <h2>安装懒猫永久入口</h2>
                        <h3>再也不用担心助手失效了</h3>
                    </div>
                </div>
                <div class="install_btn flex_all_center" @click="down_forever">立即安装</div>
            </div>    
        </div>

        <div class="user_part user_list">
            <div class="user_part_item" @click="down_cattryApp">
                <div class="left_msg">
                    <img class="user_part_icon" src="https://static.cattryapp.com/12static/new/img/user_downIcon.png">
                    <span class="part_text">下载懒猫助手</span>
                </div>
                <div class="right_msg flex_center">
                    <i style="margin-right:6px">最新 {{user.version}}</i>
                    <img class="user_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
                </div>    
            </div>
            <div class="user_part_item" v-if="is_show_idcard">
                <div class="left_msg">
                    <img class="user_part_icon" src="https://static.cattryapp.com/12static/new/img/indentify_icon.png">
                    <span class="part_text">验证身份</span>
                </div>
                <div class="right_msg">
                    <div v-if="idcard_status == 1">
                        <span class="user_part_right">已验证</span>
                    </div>
                    <div v-else-if="idcard_status == -1">
                        <div class="user_part_right user_part_blue" @click="bindIdCard">未验证 <img class="user_part_forward" style="float: right;margin-left: 10px;" src="https://static.cattryapp.com/12static/new/img/forward.png" alt=""></div>
                    </div>
                    <div v-else-if="idcard_status == 0">
                        <div class="user_part_right user_part_blue">待审核</div>
                    </div>
                    <div v-else-if="idcard_status == 2">
                        <div class="user_part_right jiebang" @click="reportIdCard">审核失败 <img class="user_part_forward" style="float: right;margin-left: 10px;" src="https://static.cattryapp.com/12static/new/img/forward.png" alt=""></div>
                    </div>
                </div>    
            </div>
            <div class="user_part_item" v-if="user.writefid">
                <div class="left_msg">
                    <img class="user_part_icon" src="https://static.cattryapp.com/12static/new/img/invite.png">
                    <span class="part_text">输入邀请码</span>
                </div>    
                <div class="right_msg">
                    <div v-if="user.father_id">
                        <span class="user_part_right">已领取奖励</span>
                    </div>
                    <div v-else>
                        <span class="user_part_right flex_center" @click="userInvite()">领取现金奖励 <img class="user_part_forward" style="float: right;margin-left: 10px;" src="https://static.cattryapp.com/12static/new/img/forward.png" alt=""></span>
                    </div>
                </div>    
            </div>            
            <div class="user_part_item" @click="lxkf">
                <div class="left_msg">
                    <img class="user_part_icon" src="https://static.cattryapp.com/12static/new/img/userIndex_kefu.png">
                    <span class="part_text">联系客服</span>
                </div>    
                <img class="user_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
            </div>
            <div class="user_part_item" @click="userHelp">
                <div class="left_msg">
                    <img class="user_part_icon" src="https://static.cattryapp.com/12static/new/img/userIndex_help.png">
                    <span class="part_text">帮助中心</span>
                </div>    
                <img class="user_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
            </div>            
        </div>
        <div class="user_part user_list">
            <div class="user_part_item" @click="aboutLm">
                <div class="left_msg">
                    <img class="user_part_icon" src="https://static.cattryapp.com/12static/new/img/about.png">
                    <span class="part_text">关于懒猫试玩</span>
                </div>
                <img class="user_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
            </div>
        </div>
    </div>

</template>

<script>
    import api from '@//api/api.js'
    import common from '@//api/common.js'
    import clientApi from '@//api/clientApi.js'
    import consts from '@//api/consts.js'
    import ajax from '@//api/ajax.js'
    export default {
        name: "APP",
        data(){
            return {
                user:{},   //个人信息
                sysReply:1,
                kefu:'',
                idcard_status: null, //idcard状态
                is_show_idcard: true,
            }
        },
        activated(){
            this.init()
        },
        methods:{
            init(){
                //获取首页用户信息
                this.$loadding.open()
                api.userIndex()
                    .then((res)=>{
                        console.log(res);
                        this.$loadding.close()
                        if(res.data.status==true){
                            this.user=res.data.data.tuser;
                            this.sysReply = res.data.data.sysReply;
                            this.kefu = res.data.data.kefu;
                            var bid =this.$route.query.bid;
                            // if(bid!=undefined&&bid==1&&this.user.bind_device==false){
                            //     this.$loadding.open('绑定中')
                            //     var _this=this;
                            //     ajax({
                            //         url: consts.clientBaseurl+'/checkDeviceuu_ttExist',
                            //         dataType: 'json',
                            //         timeout:5000,
                            //         success: function(data) {
                            //             if (data.data == true) {
                            //                 ajax({
                            //                     url: consts.clientBaseurl+'/uploadDeviceUU_TT',
                            //                     dataType: 'json',
                            //                     success: function(data) {
                            //                         _this.$loadding.close();
                            //                         if(data.status == 1){
                            //                             var resinfo=JSON.parse(data.data);
                            //                             if(resinfo==''||resinfo==undefined){
                            //                                 _this.$MessageBox.alert('绑定失败请重试1');
                            //                                 return;
                            //                             }
                            //                             if(resinfo.status==1){
                            //                                 _this.$MessageBox.alert('绑定成功');
                            //                                 _this.user.bind_device=true;
                            //                             }else {
                            //                                 _this.$MessageBox.alert(resinfo.info);
                            //                             }
                            //                         }else {
                            //                             _this.$MessageBox.alert('绑定失败请重试2')
                            //                         }
                            //                     },
                            //                     error: function (err) {
                            //                         _this.$loadding.close();
                            //                         _this.$MessageBox.alert('绑定失败请重试3')
                            //                     }
                            //                 });
                            //             }else {
                            //                 _this.$loadding.close();
                            //                 _this.$MessageBox.alert('绑定失败请重试4')
                            //             }
                            //         },
                            //         error: function (err) {
                            //             _this.$loadding.close();
                            //             _this.$MessageBox.alert('绑定失败请重试5')
                            //         }
                            //     });
                            // }
                        }
                    })

                api.idcardInfo().then(res =>{
                    if(res.data.data.is_show_idcard == 0){
                        this.is_show_idcard = false;
                    }
                    if(res.data.data.length == 0){
                        this.idcard_status = -1;
                    } else if(res.data.data.is_usable == 0){
                        //待审核
                        this.idcard_status = 0;
                    } else if(res.data.data.is_usable == 1){
                        //审核通过
                        this.idcard_status = 1;
                    } else if(res.data.data.is_usable == 2){
                        //审核不通过
                        this.idcard_status = 2;
                    }
                })
            
            },
            go_myBill(){
                this.$router.push('/myBill')
            },
            userShare(){
                this.$router.push('/shareList')
            },
            userHelp(){
                this.$router.push('/userhelp');
            },
            lxkf(){
                document.location.href = this.kefu;
            },
            userInfo(){
                this.$router.push('/userinfo');
            },
            userInvite(){
                this.$router.push('/userInvite');
            },
            //绑定身份证
            bindIdCard(){
                this.$router.push('/identity');
            },
            reportIdCard(){
                this.$router.push('/reBindIdcard');
            },
            aboutLm(){
                this.$router.push('/aboutlm');
            },
            down_cattryApp(){
                _hmt.push(['_trackEvent', '用户中心', '下载懒猫助手', '下载']);
                window.location=this.user.down_url
            },
            //懒猫永久入口
            down_forever(){
                _hmt.push(['_trackEvent', '用户中心', '点击懒猫永久入口', '下载永久入口']);
                location.href="https://cattry-static.oss-cn-hangzhou.aliyuncs.com/12static/new/hzrukou_sign.mobileconfig"
            }
        }
    }
</script>

<style scoped>
.install_wrap{
   height:5.1429rem; 
}
.install_wrap img{
    width: 2.8571rem;
    margin-right: 0.8571rem
}
.install_wrap h2{
    font-size:1.2143rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.install_wrap h3{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    margin-top: 0.7143rem;
}
.install_btn{
    width:6.8571rem;
    height:2.4286rem;
    background:linear-gradient(124deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:1.2143rem;
    font-size:1.0714rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.pd9{
    padding: 0 0.72rem;
    box-sizing: border-box
}
.head_nav{
    width: 12.9286rem;
    height: 6.4286rem; 
    padding: 0 0 1rem 3.7143rem;
    box-sizing: border-box;
    font-size:1.2143rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
}
.bac1{
    background: url('https://static.cattryapp.com/12static/new/img/userIndex_mybill.png');
    background-size: 100% 100%;
}
.bac2{
    background: url('https://static.cattryapp.com/12static/new/img/userIndex_good.png');
    background-size: 100% 100%;
}
.head_msg{
    padding: 0 1rem;
    box-sizing: border-box;
    color:rgba(255,255,255,1);
    font-family:PingFangSC-Regular;
    margin-top: -.2rem;
    margin-bottom: .3rem;
}
.head_msg img{
    width: 4rem;
    margin-right: 0.8571rem;
    border: 2px solid white;
    border-radius: 50%;
}
.head_msg h2{
    font-size:1.2143rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
}
.head_msg h3{
    margin-top: 0.7857rem;
}
.head_btn{
    width:6.2857rem;
    height:2rem;
    border-radius:1.0714rem;
    border:1px solid rgba(255,255,255,1);
}
.user_part_item i{
    font-size:1.0714rem;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
}
.bindPhpne{
    font-size:1rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
}
.user{
    background-color: #F6F6F6;
    padding-bottom: 2.7142rem;
    box-sizing: border-box;
    width: 100% ;
    min-height: 100%;
}
 .user_part{
    padding: 0 1.142rem;
    box-sizing: border-box;
     background-color: #fff;
     margin-top: .857rem;
}
 .user_head_wrap{
     width:100%;
     height:10.85rem;
     background:url('https://static.cattryapp.com/12static/new/img/user_head_bac.png');
     background-size: 100% 100%;
     padding: 0.714rem 0 0;
     box-sizing: border-box;
}
 .user_detail_head{
     width: 100%;
     height: 3.214rem;
     background:linear-gradient(124deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 0 0.8rem;
     box-sizing: border-box;
     color: white;
     font-size:1.285rem;
     font-family:PingFangSC-Semibold;
     font-weight:600;
     z-index: 10;
}
 .user_detail_head img{
     width: 0.7rem;
     padding: 0.5rem 0.6rem 0.5rem 0.2rem;
}
 .user_message{
     color: white;
     position: relative;
}
 .user_message span{
     position: absolute;
     top: -0.714rem;
     background-color: #fff;
     color: #f00;
     font-size: 0.642rem;
     width:0.857rem;
     border-radius: 50%;
     text-align: center;
     font-weight: normal;
     padding-left: 0.0714rem;
}
 .user_part_item{
     height:3.428rem;
     border-bottom: 1px solid #F1F1F1;
     position: relative;
     display: flex;
     align-items: center;
     justify-content: space-between;
     box-sizing: border-box;
}
 .user_part_item img{
     display: block;
     float: left;
}
 .user_part_icon{
     width: 1.714rem;
}
 .part_text{
     font-size:1.2143rem;
     display: block;
     float: left;
     margin-left: 1.142rem;
     padding-top: 0.285rem;
}
 .user_part_right{
     color: #666666;
     font-size: 1rem;
     float: right;
}
 .user_part_forward{
     width: 0.5714rem;
}
 .user_list div:first-child{
     margin-top: 0!important;
}
 .user_list div:last-child{
     border: 0;
}
 .user_list .jiebang{
     color: #FF6353;
}
 .user_part_blue{
     color: #5594F3;
}
 .mt40{
     margin-top: 3.9rem;
 }
</style>