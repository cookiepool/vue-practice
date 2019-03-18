<template>
    <div class="user">
        <div class="common_bac_color"></div>
        <app-header :title="'个人资料'"></app-header>
        <div>
            <div class="userinfo_part_item userinfo_list_touxiang pdleft">
                <span class="userinfo_part_title gray">基础信息</span>
            </div>            
            <div class="userinfo_part userinfo_list">

                <div class="userinfo_part_item userinfo_list_touxiang">
                    <span class="userinfo_part_title">头像</span>
                    <img class="userinfo_part_avatar" :src="user.avatar">
                </div>
                <div class="userinfo_part_item">
                    <span class="userinfo_part_title">昵称</span>
                    <div class="userinfo_part_right">{{user.name}}</div>
                </div>
                <div class="userinfo_part_item">
                    <span class="userinfo_part_title">性别</span>
                    <select class="hide" name="gender" v-model="selectGender"  @change="selectSex">
                        <option v-for="(value,key) in optionGender" :value="key">{{value}}</option>
                    </select>
                    <div class="right_msg flex_all_center">
                        <p class="select_val">{{optionGender[selectGender]}}</p>
                        <img class="userinfo_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
                    </div>
                </div>
                <!-- 选择生日 -->
                <div class="userinfo_part_item">
                    <span class="userinfo_part_title">生日</span>
                    <input class="hide" @change="selectBirthday" type="date" />
                    <div class="right_msg flex_all_center">
                        <p class="select_val">{{birthday}}</p>
                        <img class="userinfo_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
                    </div>
                </div>


                <div class="userinfo_part_item">
                    <span class="userinfo_part_title">职业</span>
                    <select class="hide" name="gender" v-model="selectProf">
                        <option v-for="(value,key) in optionProf" v-bind:value="key">{{ value }}</option>
                    </select>
                    <div class="right_msg flex_all_center">
                        <p class="select_val">{{optionProf[selectProf]}}</p>
                        <img class="userinfo_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
                    </div>
                </div>
                <div class="userinfo_part_item" v-if="user.fatherid">
                    <span class="userinfo_part_title">师父ID</span>
                    <div class="userinfo_part_right">{{user.fatherid}}</div>
                </div>
            </div>
        </div>
        <!-- 帐号绑定 -->
        <div class="mt12"> 
            <div class="userinfo_part_item pdleft">
                <span class="userinfo_part_title gray">帐号绑定</span>
               
            </div>            
            <div class="userinfo_part userinfo_list">
                <div v-if="mustTips" class="shade"></div>
                <div v-if="mustTips" class="opticity_wrap" @click="mustTips=false"></div>
                <div :class="mustTips?'must_tips':''">              
                    <div class="bindGuide flex_column_center">
                        <h1>完成以下认证</h1>
                        <h2>才能获取更多奖励哦～</h2>
                        <img src="https://static.cattryapp.com/12static/new/img/user_new_tipsArrow2.png">
                    </div>
                    <!-- 验证设备 -->
                    <div class="flex_btn_center pl12" @click="authDevice">
                        <img class="bind_icon" src="https://static.cattryapp.com/12static/new/img/auth_device.png">
                        <div class="bind_item flex_btn_center">
                            <p>验证设备</p>
                            <div v-if="user.bind_device===0" class="flex_center">
                                <i>未绑定</i>
                                <img class="userinfo_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
                            </div>
                            <h3 v-else class="hadauth">已验证</h3>
                        </div>
                    </div> 
                    <!-- 绑定手机                        -->
                    <div class="flex_btn_center pl12" @click="bindPhone">
                        <img class="bind_icon" src="https://static.cattryapp.com/12static/new/img/phone.png">
                        <div class="bind_item flex_btn_center">
                            <p>绑定手机</p>
                            <div v-if="!user.phone" class="flex_center">
                                <i>未绑定</i>
                                <img class="userinfo_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
                            </div>
                            <div v-else class="flex_center">
                                <i class="hadauth">{{user.phone}}</i>
                                <span class="jiebang" @click.stop="canclePhone" v-if="user.canjiebang">解绑</span>
                            </div>
                        </div>
                    </div>
                    <!-- 绑定微信 -->
                    <div class="flex_btn_center pl12" @click="bindWx">
                        <img class="bind_icon" src="https://static.cattryapp.com/12static/new/img/wechat.png">
                        <div class="bind_item flex_btn_center boder_none">
                            <p>绑定微信</p>
                            <div v-if="user.bindWx===0" class="flex_center">
                                <i>未绑定</i>
                                <img class="userinfo_part_forward" src="https://static.cattryapp.com/12static/new/img/forward.png">
                            </div>
                            <h3 v-else class="hadauth">已绑定</h3>
                        </div>
                    </div>    
                </div>                         
            </div>
        </div>        
        <!-- <div class="btn flex_all_center" @click="saveInfo">保存修改</div> -->
    </div>
</template>

<script>
    import api from '@//api/api.js';
    import consts from '@//api/consts.js';
    import ajax from '@//api/ajax.js'
    import common from '@//api/common.js'
    import clientApi from '@//api/clientApi.js'
    export default {
        name: "APP",
        data(){
            return {
                user:{},   //个人信息
                birthday:'',
                selectGender:0,
                optionGender:{'0':'请选择','1':'男','2':'女'},
                selectProf:0,
                optionProf:{'0':'请选择','1':'中学生','2':'大学生','3':'上班族', '4':'公务员','5':'自由职业','6':'老板','7':'其他'},
                mustTips:false,
            }
        },
        mounted(){
            this.init();
        },
        beforeRouteLeave(to,from,next){
            this.saveInfo()
            next()
        },
        methods:{
            init(){
                //获取首页用户信息
                api.userInfo()
                .then((res)=>{
                    console.log(res);
                    if(res.data.status==true){
                        this.user=res.data.data.tuser;
                        this.birthday = res.data.data.tuser.birthday;
                        if(res.data.data.tuser.gender){
                            this.selectGender = res.data.data.tuser.gender;
                        }
                        if(res.data.data.tuser.prof){
                            this.selectProf = res.data.data.tuser.prof;
                        }
                        if(this.user.bind_device===0){
                            ajax({
                                url:consts.clientBaseurl+'/v4startss',
                                dataType: 'json',
                                success: function(data) {
                                }
                            })                             
                        }
                    }
                    //是否展示新手引导
                    var heighLight = this.$route.query.heighLight;
                    if(heighLight){
                        this.mustTips=true
                    }
                });
            },
            //选择生日
            selectBirthday(e){
               Vue.set(this,'birthday',e.target.value);
            },
            // 保存信息
            saveInfo(){
                var _this = this;
                // if(!_this.selectGender){
                //     return _this.$MessageBox.alert('请选择性别');
                // }
                // if(!_this.birthday){
                //     return _this.$MessageBox.alert('请选择生日');
                // }
                // if(!_this.selectProf){
                //     return _this.$MessageBox.alert('请选择职业');
                // }
                var postdata = {gender:_this.selectGender,birthday:_this.birthday,prof:_this.selectProf};
                api.saveUserInfo(postdata)
            },
            //绑定手机
            bindPhone(){
                if(this.user.phone) return
                if(!this.user.bind_device){
                    this.$MessageBox.alert('请先验证设备')
                    return
                }
                var param = encodeURIComponent(window.location.href);
                var _this=this;
                ajax({
                    url: consts.clientBaseurl+'/successloginwanpan',
                    dataType: 'json',
                             timeout:5000,
                             success: function(data) {
                                 if (data.status == '1') {
                                    if(data.data.from=='com.chdn.att.ih'){
                                        _this.$MessageBox.confirm('检测到您的助手非最新版，有可能会导致验证失败，请先重新下载助手后再验证手机号。',{ confirmButtonText:'重新下载',cancelButtonText:'关闭'})
                                                .then(action => {
                                          location.href='http://wwwcs.cattryapp.com/Share/down/type';
                                    }).catch(action => {
                                            clientApi.pushTelController(param);
                                        })
                                    }else {
                                        clientApi.pushTelController(param);
                                    }
                                 }else {
                                     clientApi.pushTelController(param);
                                 }
                             },
                             error: function (err) {
                                 console.log(err)
                             }
                         });



            },
            //绑定微信
            bindWx(){
                if(this.user.bindWx) return
                if(!this.user.bind_device){
                    this.$MessageBox.alert('请先验证设备')
                    return
                }                
                this.$router.push('/wechatBind')
            },
            //验证设备
            authDevice(){
                if(this.user.bind_device) return
                common.authDevice(this)    
            },
            //解绑手机
            canclePhone(){
                this.$router.push('/canclePhone');
            },
        }
    }
</script>

<style scoped>
.jiebang{
    font-size: 1.0714rem;
    font-weight:500;
    color:rgba(255,99,83,1);
    margin-left: 0.5714rem
}
.opticity_wrap{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 800;
}
.bindGuide{
    font-family:PingFangSC-Medium;
    width: 100%;
    position: absolute;
    top: -9.2857rem;
    z-index: 600;
    color: white;
    font-weight:500;
}
.bindGuide h1{
    font-size: 1.1429rem;
    line-height:1.7143rem;
}
.bindGuide h2{
    font-size: 0.9286rem;
    color: #CCCCCC;
    margin-top: 0.4286rem;
    margin-bottom: 0.8571rem;
}
.bindGuide img{
    width: 2.5714rem;
}
.pl12{
    padding-left: 15.96px;
    box-sizing: border-box;
}
.must_tips{
    position: relative;
    z-index: 600;
    background: white;
}
.bind_item{
    width: 22.8571rem;
    height: 3.4286rem;
    padding-right: 1.1429rem;
    box-sizing: border-box;
    font-family:PingFangSC-Regular;
    border-bottom: 0.0714rem solid #F1F1F1!important;
}
.boder_none{
    border: none!important
}
.bind_item p{
    font-size:1.2143rem;
    color:rgba(30,30,30,1);
}
.bind_item i{
    font-size:1.0714rem;
    color:rgba(81,146,245,1);
}
.bind_icon{
    width: 1.7143rem;
}
.mt12{
    margin-top: 0.8571rem;
}
.pdleft{
    padding-left: 1.14rem;
    box-sizing: border-box;
}
 .user{
     width: 100%;
     background-color: #F6F6F6;
     padding-bottom: 4.285rem;
     box-sizing: border-box;
}
 .userinfo_part{
    background-color: #fff;
}
 .userinfo_part_item{
     padding: 0 1.14rem;
     box-sizing: border-box;
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 3.142rem;
     border-bottom: 1px solid #F1F1F1;
     position: relative;
     background: white;
}
.userinfo_part_title{
     font-size: 1.2143rem;
     display: block;
     float: left;
     color: #1E1E1E;
}
 .userinfo_part_right{
     color: #666666;
     font-size: 1rem;
}
 .userinfo_part_forward{
    width: 9px;
    margin-left: 0.714rem;
}
 .userinfo_list div:first-child{
     margin-top: 0!important;
}
 .userinfo_list div:last-child{
     border: 0;
}
 .userinfo_list_touxiang{
     height: 3.3rem!important;
}
 .userinfo_list_touxiang span{
     line-height: 3.142rem;
}
 .userinfo_part_item .userinfo_part_avatar{
     display: block;
     width: 2.57rem;
     height: 2.57rem;
     border-radius: 50%;
}
 .userinfo_part_right select{
     font-size: 1rem!important;
}
 .userinfo_part_right img{
     float: right;
     margin-left: 0.714rem;
}
 .userinfo_part_blue{
     color: #5594F3;
}
 .hide{
     opacity: 0;
     position: absolute;
     height: 100%;
     right: 0;
}
 .btn{
     width:22.5rem;
     height:3.142rem;
     background:rgba(255,99,83,1);
     border-radius:1.571rem;
     margin: 2.28rem auto 0;
     font-size:1.142rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
}
.gray{
    font-size: 1rem;
    color:rgba(102,102,102,1);
}
.select_val{
    font-size:15px;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
}
.hadauth{
    font-size:15px;
    color:rgba(102,102,102,1)!important;
}
</style>