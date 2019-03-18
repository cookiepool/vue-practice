<template>
<div class="all_wrap" v-cloak>
     <div class="common_bac_color"></div>
    <!-- 新手引导1 -->
    <div class="new_guide1 flex_column_center" v-if="newGuide==1">
        <div class="shade" @touchmove.prevent></div>
        <div class="word_guide1 flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/home_direct.png">
            <p>点击进入<span>「 个人中心 」</span></p>
        </div>
        <div class="bottom_guide flex_column_center">
            <div class="guide_btn flex_all_center" @click="imKnow">我知道了</div>
            <div class='guide_dot_wrap flex'>
                <div class="guide_dot" :class="newGuide==1?'dot_light':''"></div>
                <div class="guide_dot" :class="newGuide==2?'dot_light':''"></div>
            </div>
        </div>
    </div>
    <!-- 新手引导2 -->
    <div v-if="newGuide==2">
        <div class="shade" @touchmove.prevent></div>
        <div class="new_guide2">
            <p>
                <img class="star" src="https://static.cattryapp.com/12static/new/img/home_guide_star.png">奖励实时到账<br>快来做任务吧～
                <img class="guide2_direct" src="https://static.cattryapp.com/12static/new/img/home_direct.png">
            </p>
        </div>
        <div class="bottom_guide flex_column_center">
            <div class="guide_btn flex_all_center" @click="imKnow">我知道了</div>
            <div class='guide_dot_wrap flex'>
                <!-- <div class="guide_dot" :class="newGuide==1?'dot_light':''"></div> -->
                <!-- <div class="guide_dot" :class="newGuide!==2?'dot_light':''"></div> -->
            </div>
        </div>        
    </div>
    <!-- 顶部信息展示 -->
    <i id="hideAnnounce">{{systemAnnouncements.title}}</i>
    <div class="head_wrap">
        <h1 v-if="save_info!==1" class="find_account" @click="findAccount">老账号登录</h1>
        <h2 class="head_title">懒猫试玩</h2>
        <div class="msg_wrap">
            <img class="msg_entry" @click="go_my_msg" src="https://static.cattryapp.com/12static/new/img/home_msg_entry.png">
            <div v-if="sysReply>0" class="msg_num flex_all_center">{{sysReply}}</div>
        </div>
        <div class="head_msg_wrap">
            <div class="flex_center w160" @click="user_center">
                <img class="avatar" :src="user.img">
                <div class="avatar_name flex_column" >
                    <h2>{{user.name}}</h2>
                    <i class="flex_all_center">进入个人中心</i>
                </div>
            </div>
            <div class="head_balance_wrap flex_btn_center">
                <div class="left_wrap" @click="withdraw">
                    <div class="balance_detail flex_column_center">
                        <h2>我的余额(元)</h2>
                        <h3>{{user.balance}}</h3>
                        <img class="withdraw_btn" src="https://static.cattryapp.com/12static/new/img/home_withdraw_btn.png">
                        <div class="gray_line"></div>
                    </div>
                </div>
                <div class="right_wrap flex">
                    <div class="right_item flex_column_center">
                        <h2>今日收益(元)</h2>
                        <h4>{{user.todaySumMoney}}</h4>
                    </div>
                    <div class="right_item flex_column_center">
                        <h2>累计收益(元)</h2>
                        <h4>{{user.sumMoney}}</h4>
                    </div>                    
                </div>
            </div>
            <div v-if="showAnnouncement" class="announce_wrap flex_btn_center">
                <div class="left_msg flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/home_radio.png">
                    <div id="the_word_wrap" class="word_wrap" @click="go_announcement">
                        <p id="Announce">{{systemAnnouncements.title}}</p>
                    </div>
                </div>
                <img class="home_cancel" src="https://static.cattryapp.com/12static/new/img/home_redCancel.png" @click="cancel_announcement">            
            </div>

        </div>
    </div>
    <div class=mid_wrap>
    <!-- 一元极速提现 -->
    <div v-cloak v-if="!newGuide&&user.yytx.isShow">
        <img v-if="user.yytx.taskType==1" class="fast_withdraw" src="https://static.cattryapp.com/12static/new/img/home_newTask.png" @click="fastWithdraw">
        <img v-else class="fast_withdraw" src="https://static.cattryapp.com/12static/new/img/home_newTask1.png" @click="fastWithdraw">
    </div>

    <!-- 首页大虾引导 -->
    <img  v-else-if="dxshare" class="dx_guide" :src="dximg" @click="godx">

    <!-- 支付宝活动 -->
    <div v-else-if="!dxshare&&showAppreActivity" class="dx_guide_box">
        <p class="dx_guide_time">3月11日-3月17日</p>
        <img class="dx_guide fix" src="https://static.cattryapp.com/12static/new/img/march_appreActivity_yx_banner.png" @click="go_zfb">
    </div>
    <!-- 限时任务   高额任务 -->
    <div class="middle_nav flex_btn_center" :class="user.yytx.isShow?'mt06':''">
        <div class="fast_task compad" :class="newGuide==2?'task_light':''" @click="go_fast_task">
            <p>试玩赚钱</p>
            <i>无审核 收益秒到</i>
        </div>
        <div class="right_nav flex_column">
            <div class="invite_task compad" @click="apprentice">
                <p>收徒赚钱</p>
                <i class="fixtop">收徒1人 赚20元</i>
            </div>
            <div class="register_bac compad compad_fix2" @click="go_heigh_task">
               <p>注册赚钱</p>
                <i>任务简单 奖励高</i>             
            </div>
        </div>
    </div>
    <!-- 普通任务导航 -->
    <div class="more_getMoney">
        <h1 class="more_title">更多赚钱</h1>    
        <div class="task_item_wrap flex">
            <div class="item flex_center border_right border_bottom" @click="go_union_task">
                <img src="https://static.cattryapp.com/12static/new/img/home_alliance2.png">
                <div class="flex_column">
                    <h2>联盟任务</h2>
                    <h3>不一样的试玩</h3>
                </div>
            </div>
            <div class="item flex_center border_bottom"  @click="go_game_task">
                <img src="https://static.cattryapp.com/12static/new/img/home_game2.png">
                <div class="flex_column">
                    <h2>游戏任务</h2>
                    <h3>边玩边赚钱</h3>
                </div>
            </div>
            <div class="item flex_center border_right" @click="go_comment_task">
                <img src="https://static.cattryapp.com/12static/new/img/home_comment2.png">
                <div class="flex_column">
                    <h2>好评任务</h2>
                    <h3>好评奖现金</h3>
                </div>
            </div>    
            <div class="item flex_center border_left_top">
                <img src="https://static.cattryapp.com/12static/new/img/home_expect_.png">
                <div class="flex_column">
                    <h2>敬请期待</h2>
                    <h3>努力开发中...</h3>
                </div>
            </div>                     
        </div>
    </div>  
    <!-- 更多福利  -->
    <div class="more_fuli">
        <h1 class="more_title">更多福利</h1>
        <div class="flex pl16">
            <div class="item flex_column_center" @click="zfb_Activity">
                <img src="https://static.cattryapp.com/12static/new/img/home_zfb_icon.png">
                <h2>支付宝红包</h2>
            </div>
            <div class="item flex_column_center" @click="welfare_daily">
                <img src="https://static.cattryapp.com/12static/new/img/home_fuli_everyday.png">
                <h2>每日福利</h2>
            </div>   
            <div class="item flex_column_center" @click="goAd">
                <img class="interact_ad" src="https://static.cattryapp.com/12static/new/img/home_interact_ad.png">
                <h2>拆红包</h2>
            </div>                       
        </div>
    </div>
    </div>
    <div class="bot_wrap">
        <div class="new_research flex_all_center" @click="survey">意见反馈</div>
        <h2 class="bot_msg">懒猫试玩唯一官方网址 cattryapp.com</h2>
    </div>
    <!-- 无痕模式弹窗 -->
    <div v-if="notrace">
        <div class="shade" @touchmove.prevent></div>
        <div class="Notrace_tips flex_column_center" @touchmove.prevent>
            <h2>提示</h2>
            <p>请关闭<span>无痕浏览</span>模式，当前模式无法保存您的收益</p>
            <img class="example" src="https://static.cattryapp.com/12static/new/img/notrace.png">
            <i>正常模式示例</i>
        </div>
        <img class="notrace_line" src="https://static.cattryapp.com/12static/new/img/notrace_line.png" @touchmove.prevent>
        <img class="notrace2" src="https://static.cattryapp.com/12static/new/img/notrace2.png" @touchmove.prevent>
    </div>    
    <!-- 视频教程 -->
    <div v-if="showvideo" @touchmove.prevent>
        <div class="shade"></div>
        <div class="video_wrap">
            <video width="340" height="240" autoplay="autoplay" controls>
                <source src="https://static.cattryapp.com/12static/new/active_task.mp4" type="video/mp4">
            </video>
            <img @click="showvideo=false" src="https://static.cattryapp.com/12static/new/img/common_opcity_cancel.png">
        </div>
    </div>
    <!--快速抢任务入口-->
    <div class="fast_grap_task_wrap" @click="handleGrapFastTask">
        <!--快速抢任务-->
        <img v-if="!hasGrapTask" class="grap_task_show" src="https://static.cattryapp.com/12static/new/img/grap_task.png">
        <!--正在任务-->
        <img v-if="hasGrapTask" class="now_task_show" src="https://static.cattryapp.com/12static/new/img/now_task.png">
    </div>
</div>
</template>

<script>
var wordTimer   //计时器
import api from '../../api/api.js'
import fix from '../../api/fix'
import clientApi from '../../api/clientApi.js'
import common from '../../api/common.js'
import pop from '../../components/pop/unOpen_pop/divpop.js'
import test from '../../components/pop/submit_pop/submit_pop'
export default {
    data(){
        return {
            user:{yytx:{type:'-1'}},   //个人信息
            is12:null,
            systemAnnouncements:{},
            showAnnouncement:false,
            kefu:'',
            iKnow:1,                    // 0-新手引导未点击，1-新手引导界面点击一次，2-代表新手引导界面点击完毕
            notrace:false,              //无痕模式提示
            dxshare:'',                 //大虾广告
            dximg:'',                   //大虾广告图片
            adUrl:'',                   //广告跳转地址
            adImg:'',                   //广告图片地址
            sysReply:'0',               //消息提醒
            showCattry_down:true,       //展示底部懒猫永久下载地址
            showvideo:false,            //视频播放展示
            save_info:null,             //是否展示帐号找回  
            showAppreActivity:false,    //是否展示收徒活动
            hasGrapTask: false, //是否有快速抢任务在进行
            grapTaskId: '',  //当前快速抢任务任务ID
            FaskTaskList: [], //快速任务列表
            nowGetTaskStatus: [] //当前获取到任务的状态
        }
    },
    mounted(){      
       let t = Date.now() - new Date('2019/3/11 00:00:00').getTime();
       if(t>0) {
           this.showAppreActivity = true;
       }
    },
    updated(){
        //公告轮播
        this.horseRace()
    },  
    activated(){
        clearInterval(wordTimer);
        this.init()  
    },
    deactivated(){        //离开页面清除定时器
        clearInterval(wordTimer);
    },

    computed:{
        // 新手引导步骤
        newGuide(){
            var user = this.user;
            if(user.isNew&&!localStorage.hadNewGuide){  //新用户且未做过新手引导
                if(this.iKnow==0){
                    return 1
                }else if(this.iKnow==1){
                    localStorage.hadNewGuide=true
                    return 2
                }else{
                    return false
                }
            }else{
                return false
            }
        }
    },
    methods:{
        //检查无痕浏览模式
        checkPrivate(){
            return new Promise((resolve,reject)=>{
                try {
                    window.openDatabase(null, null, null, null);
                    localStorage.oldUser = true; 
                    resolve()
                }catch(_){
                    this.notrace=true
                }
            })
        },
        init(){
            //检测浏览器
            //检测客户端
            if(!sessionStorage.homeCache) {
                this.$loadding.open();
            }
            common.commonClientLogin(3)
            .then(()=>{
                this.checkPrivate().then(()=>{  //检测无痕模式
                    this.get_index_data().then(()=>{
                        sessionStorage.homeCache = true
                        this.$loadding.close()
                    })
                })
            })
            .catch((err)=>{
                if(err==2){
                    this.$MessageBox.alert('懒猫助手未能连接服务器,请重新打开懒猫助手!')
                }else{
                    this.helperUnopen()
                }
            })
        },
        get_index_data:function (){
            //获取首页用户信息
            return new Promise((resolve,reject)=>{
                api.getHomeMsg().then((res)=>{
                    console.log(res)
                    if(res.data.status==true){ 
                        this.handleCertificate()
                        localStorage.oldUser = true;     //localStorage存取老用户   
                        var msg =  res.data.data;
                        this.user=msg.userinfo;
                        this.systemAnnouncements = msg.systemAnnouncements;
                        this.kefu = msg.kefu;
                        this.dxshare = msg.dxshare;
                        this.dximg = msg.dximg;
                        this.adImg = msg.adImg;
                        this.adUrl = msg.adUrl;
                        var sysReply = msg.sysReply>99? '99+':msg.sysReply;
                        this.sysReply = sysReply;
                        this.is12 = msg.is12;
                        this.save_info = msg.save_info;
                        //通过cookie判断是否显示公告（点击过关闭）
                        var cookie = this.getCookie('annnoucement');   
                        cookie? this.showAnnouncement=false : this.showAnnouncement=true;
                        resolve()  
                        //师徒活动奖励结算
                        axios.get('/NewApprentice/index.html')
                        .then((res)=>{
                            console.log(res);
                        })  
                        .catch(()=>{
                            var error = JSON.stringify(err+'----appre-catch');
                            var param = {err:error}
                            api.clientErrlog(param)                           
                        })            
                    }else{
                        if(res.data.code == 1001){
                            this.dologin().then(()=>{
                                resolve()  
                            })
                        }else{
                            this.$MessageBox.alert(res.data.msg)
                            resolve() 
                        }
                    }
                })
                .catch((err)=>{
                    resolve()
                    // this.$MessageBox.alert('服务器网络错误，请刷新或稍后再试，如有疑问请联系客服')
                    var error = JSON.stringify(err+'----index-catch');
                    var param = {err:error}
                    api.clientErrlog(param)
                })
                //初始化快速抢任务入口
                api.grapFastTaskInit().then((res)=>{
                    if(res.data.status){
                        console.log(res);
                        this.hasGrapTask = Boolean(res.data.data.isActive);
                        if(res.data.data.taskid){
                            this.grapTaskId = res.data.data.taskid;
                        }
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            })
        },
        //获取快速任务列表
        getFastTaskList(){
            return new Promise((resolve, reject)=>{
                api.goGetFastTask().then((res)=>{
                    resolve(res.data);
                }).catch((err)=>{
                    console.log(err);
                });
            });
        },
        //尝试请求任务列表的任务
        requestFastTask(){
            this.getFastTaskList().then((res)=>{
                console.log(res);
                if(res.data.length == 0 || res.data.taskid.task_id.length == 0 || res.data.taskid.task_id === 'undefined'){
                    this.$MessageBox.alert('暂时没有适合你的任务，休息一下再抢～', '通知');
                }
                else{
                    this.$loadding.open('抢任务中..');
                    console.log(res.data.taskid.task_id)
                    var taskid = res.data.taskid.task_id; //得到任务id列表
                    var _this = this;
                    (function loop(index){
                        var nowDate = new Date();
                        var nowTime = nowDate.getTime();
                        var code = fix.fix(nowTime.toString + taskid[index]);
                        var param = { taskid: taskid[index], time: nowTime, code: code };
                        api.starttask(param).then((res)=>{
                            console.log(res);
                            if(res.data.status == true){
                                console.log("获取任务成功");
                                _this.$loadding.close();
                                var clickData = { taskid: taskid[index] };
                                api.remarkClickEvent({ params: clickData })
                                .then(res => {
                                    console.log(res);
                                    _this.$router.push({
                                        path: "./fastDetail",
                                        query: { taskid: taskid[index] }
                                    });
                                })
                                .catch(err=>{
                                    _this.$MessageBox.alert('remarkClickEvent出错，请联系客服');
                                })
                            }else{
                                console.log("当前任务获取失败，继续下一个任务");
                                if(++index < taskid.length){
                                    loop(index);
                                }
                                if(index >= taskid.length){
                                    console.log("对不起，暂时没有你可以做的任务");
                                    _this.$loadding.close();
                                    _this.$MessageBox.alert('暂时没有适合你的任务，休息一下再抢～', '通知');
                                }
                            }
                        });
                    })(0);
                    // var _this = this
                    // for(var i = 0; i < res.data.taskid.task_id.length; i++){
                    //     (function(i){
                    //         var nowDate = new Date();
                    //         var nowTime = nowDate.getTime();
                    //         var code = fix.fix(nowTime.toString() + taskid);
                    //         var param = { taskid: taskid[i], time: nowTime, code: code}
                    //         api.starttask(param).then((res)=>{
                    //             console.log(res);
                    //             console.log(taskid[i]);
                    //             // return;
                    //             if(res.data.status == true){
                    //                 var clickData = { taskid: taskid[i] };
                    //                 api.remarkClickEvent({ params: clickData })
                    //                 .then(res => {
                    //                     console.log('wwww')
                    //                     _this.$router.push({
                    //                         path: "/fastDetail",
                    //                         query: { taskid: taskid[i]}
                    //                     });
                    //                 })
                    //                 .catch(err=>{
                    //                     this.$MessageBox.alert('暂时没有适合你的任务，休息一下再抢～', '通知');
                    //                 })                                                                  
                    //             }
                    //             // _this.nowGetTaskStatus.push(res.data.status);
                    //             // if(_this.nowGetTaskStatus.length === taskid.length){
                    //             //     for(var j = 0; j < _this.nowGetTaskStatus.length; j++){
                    //             //         if(_this.nowGetTaskStatus[j] == true){
                    //             //             //888888
                    //             //             // var clickData = { taskid: taskid[i] };
                    //             //             // api.remarkClickEvent({ params: clickData })
                    //             //             // .then(res => {
                    //             //             //     console.log(res);
                    //             //             //     this.$loadding.close();
                    //             //             //     this.$router.push({
                    //             //             //         path: "./fastDetail",
                    //             //             //         query: { taskid: taskid[i] }
                    //             //             //     });
                    //             //             // })
                    //             //             // .catch(err=>{
                    //             //             //     this.$MessageBox.alert('remarkClickEvent出错，请联系客服');
                    //             //             // })
                    //             //             _this.nowGetTaskStatus = []; //再次点击前需要清空里面的信息
                    //             //             break;
                    //             //         }else if(j == _this.nowGetTaskStatus.length - 1){
                    //             //             console.log(j);
                    //             //             _this.nowGetTaskStatus = [];
                    //             //             _this.$MessageBox.alert('暂时没有适合你的任务，休息一下再抢～', '通知');
                    //             //         }
                    //             //     }
                    //             // }
                    //         }).catch((err)=>{

                    //         });
                    //     })(i);
                    // }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        //快速任务入口逻辑
        handleGrapFastTask(){
            if(this.hasGrapTask == true){
                this.$router.push({
                    path: "/fastDetail",
                    query: {taskid: this.grapTaskId}
                });
            }
            else{
                this.requestFastTask();
            }
        },
        //安装证书后的处理
        handleCertificate(){
            var param = this.$route.query;
            // if(param.changeId){
            //     this.$MessageBox.alert('检测到此设备已注册懒猫帐号，将切换到已有的懒猫账户')
            //     .then(()=>{
            //         this.$loadding.open('切换中')
            //         clientApi.syncAccount().then((res)=>{
            //             this.$loadding.close()
            //             if(res.status === "1"){
            //                 window.location.href="http://m.cattryapp.com"
            //             }else{
            //                 this.$MessageBox.alert(res.msg)
            //             }
            //         })
            //     })

            // }

            if(param.existUser){
                // this.$MessageBox.confirm(`该微信号已绑定其它懒猫帐号，是否切换帐号到${param.existUser}?  当前帐号收益可通过新设备找回`)
                this.$MessageBox.confirm(`该微信号已绑定其它懒猫帐号，是否切换帐号到【${param.existUser}】? <br><br> ps:登陆新设备可找回收益`,'提示',{htmlfomat:true})
                .then(()=>{
                    this.$loadding.open('切换中');
                    axios.get("index/changeUser")
                    .then((response)=>{
                        if(response.data.status==true){
                            clientApi.syncAccount().then((res)=>{
                                this.$loadding.close()
                                if(res.status === "1"){
                                    window.location.href="http://m.cattryapp.com"
                                }else{
                                    this.$MessageBox.alert(res.msg)
                                }
                            })     
                        }else{
                            this.$MessageBox.alert(response.data.msg)
                        }
                    })
                    .catch(()=>{
                        this.$MessageBox.alert('服务器网络错误')
                        this.$loadding.close()
                    })
                })
            }
        },
        dologin:function () {
            return new Promise((resolve,reject)=>{
                clientApi.isClientLogin()
                .then((response) =>{
                    if (response.data.status == 1) {
                        resolve()
                    }else{
                        //登录服务器
                        var openudid = response.data.openudid;
                        var idfa = response.data.idfa;
                        var type = 0;
                        var isjailbreak = 1;
                        if (response.data.type) type = response.data.type;
                        if (type == 1) type = 2;//客户端1是ipad ，服务端2是ipad
                        if (type == 2) type = 1;
                        if (response.data.isjailbreak) isjailbreak = response.data.isjailbreak;
                        //登录服务器
                        var nowDate = new Date();
                        var nowTime = nowDate.getTime() / 1000;
                        var logindata = {openudid:openudid,idfa:idfa,type:type,time:nowTime};
                        this.dologinserver(logindata).then(()=>{
                            resolve()
                        })
                    }
                })
                .catch((err) =>{
                    resolve()
                    // this.$MessageBox.alert('服务器网络错误，请刷新或稍后再试，如有疑问请联系客服')
                    var param = {err:err}
                    api.clientErrlog(param)
                });
            })
        },

        dologinserver:function (data) {
            return new Promise((resolve,reject)=>{
                api.serverdologin(data).then( (response)=> {
                    console.log(response)
                    if(response.data.status == 1){
                        //登录成功,从新取取首页数据
                        this.get_index_data().then(()=>{
                            resolve()
                        });
                    }else{
                        //登录错误
                        resolve()
                        this.$MessageBox.alert(response.data.info);
                    }
                }).catch( (err) =>{
                    this.$MessageBox.alert(response.data.info);
                    resolve()
                });
            })
        },
        // 首页助手未开启
        helperUnopen(){
            pop.show()    //老用户正常弹窗
        },
        //信任弹框打开助手
        trustOpenHelper(){
            if(this.trust_msg.Clicked==false) return;
            location.href="lazycat://"
        },
        //打开助手
        openHelper(){
            location.href="lazycat://"
        },
        //新手引导我知道了
        imKnow(){
            var iKnow = this.iKnow;
            iKnow++
            this.iKnow = iKnow
        },
        //关闭公告
        cancel_announcement(){
            this.setCookie('annnoucement',true,1)    //存储cookie      
            this.showAnnouncement=false
        },
        //进入公告页
        go_announcement(){
            _hmt.push(['_trackEvent', '首页', '点击公告', '公告']);
            this.$router.push({path: '/announcement',query:{content:this.systemAnnouncements.content,title:this.systemAnnouncements.title}})
        },
        //新手任务
        fastWithdraw(){
            api.typecount()
            this.$router.push('./fastWithdraw')
        },
        //大虾试玩
        godx(){
            _hmt.push(['_trackEvent', '首页', '点击大虾广告', '进入广告页']);
            window.location.href=this.dxshare
        },
        //互动广告
        goAd(){
            _hmt.push(['_trackEvent', '首页', '点击互动广告', '进入广告页']);
            window.location.href=this.adUrl
        },
        kefuclick(){
            _hmt.push(['_trackEvent', '首页', '点击客服', '客服']);
            window.location = this.kefu;
        },
        //高额任务
        go_heigh_task(){
            this.$router.push('/heighList');
            _hmt.push(['_trackEvent', '首页', '点击高额任务', '进入列表']);
        },
        //快速任务
        go_fast_task(){
            this.$router.push('/fastList');
            _hmt.push(['_trackEvent', '首页', '点击快速任务', '进入任务列表']);
        },
        go_comment_task(){
            this.$router.push('/commentList');
             _hmt.push(['_trackEvent', '首页', '点击评论任务', '进入任务列表']);
        },
        go_game_task(){
            this.$router.push('/gameList');
            _hmt.push(['_trackEvent', '首页', '点击游戏任务', '进入任务列表']);
        },
        go_union_task(){
            try{
                this.$router.push('/unionList');
                _hmt.push(['_trackEvent', '首页', '点击联盟任务', '进入任务列表']);
            }catch(err){
                var error = JSON.stringify(err+'----go_union_task-catch');
                var param = {err:error}
                api.clientErrlog(param)                       
            }            
        },
        // 用户中心
        user_center(){
            try{
                this.$router.push('/user');
                _hmt.push(['_trackEvent', '首页', '点击头像', '进入用户中心']);
            }catch(err){
                var error = JSON.stringify(err+'----user_center-catch');
                var param = {err:error}
                api.clientErrlog(param)                       
            }
         },
        apprentice(){
            this.$router.push('/appreHome');
            _hmt.push(['_trackEvent', '首页', '点击收徒任务', '收徒任务']);
        },
        //立即提现
        withdraw(){
            try{
                this.$router.push('/withdraw')
                _hmt.push(['_trackEvent', '首页', '点击提现', '提现']);
            }catch(err){
                var error = JSON.stringify(err+'----withdraw-catch');
                var param = {err:error}
                api.clientErrlog(param)       
            }
        },
        //闪电借钱
        go_Electricity(){
            window.location.href="http://p1.bqteach.com/category/2";
            _hmt.push(['_trackEvent', '首页', '点击闪电借钱', '前往闪电借钱']);
        },
        //支付宝活动
        go_zfb(){
            _hmt.push(['_trackEvent', '首页', '点击元宵收徒活动', '点击']);
            this.$router.push('/appreActivity')
        },   
        //支付宝活动
        zfb_Activity(){
            _hmt.push(['_trackEvent', '首页', '点击支付宝活动', '点击']);
            this.$router.push('/zfbActivity')
        },
        //每日福利
        welfare_daily(){
            _hmt.push(['_trackEvent', '首页', '点击每日福利', '点击']);
            window.location.href="https://game.baichuanhd.com.cn/show.htm?app_key=6e483251c7064c2b"
        },
        //我的消息
        go_my_msg(){
            this.$router.push('/MessageList')
        },
        //找回账号
        findAccount(){
            this.$router.push('/findAccountByPhone')
        },
        //问卷调查
        survey(){
            _hmt.push(['_trackEvent', '首页', '点击问卷调查', '问卷调查']);
            window.location='https://www.wjx.cn/jq/33905288.aspx'
        },
        //播放视频
        startVideo(){
            this.showvideo=true
        },
        //设置cookie
        setCookie(cname,cvalue,exdays){
            var d = new Date();
            d.setTime(d.getTime()+(exdays*24*60*60*1000));
            var expires = "expires="+d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },  
        //获取cookie
        getCookie(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) 
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        },
        //轮播公告
        horseRace(){
            if(this.showAnnouncement==false) return
            var Announce = document.getElementById("hideAnnounce")
            var the_word_wrap = document.getElementById("the_word_wrap")
            if(!Announce) return
            if(Announce.getBoundingClientRect().width<the_word_wrap.getBoundingClientRect().width) return
            var box = document.getElementById("Announce")
            if(!box) return 
            let distance = 0 
            wordTimer = setInterval(()=>{
                if(-distance+15>Announce.getBoundingClientRect().width){
                    distance=35
                }
                distance--;
                box.style.transform = 'translateX('+distance+'px)'
            },50)
        },
    }

}
</script>

<style scoped>
.mid_wrap{
    background: white;
    padding-top: 0.75rem;
    margin-top: -1.4286rem;
}
.head_balance_wrap{
    width:24.5714rem;
    height:4.7143rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    margin-top: 0.7143rem;
}
.head_balance_wrap .left_wrap{
    width: 10rem;
    height: 100%;
    position: relative;
}
.balance_detail{
    width: 6.5714rem;
    height: 100%;
    justify-content: center;
}
.head_balance_wrap h2{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    margin-bottom: 0.4286rem
}
.head_balance_wrap h4{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1); 
    margin-top: 0.2857rem;
}
.head_balance_wrap .left_wrap h3{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,108,81,1);
    line-height:1.7857rem;
}
.head_balance_wrap .gray_line{
    position: absolute;
    width:1px;
    height:2.2857rem;
    background:rgba(241,241,241,1);
    right: 0;
    top: 50%;
    transform: translateY(-50%)
}
.withdraw_btn{
    width: 3.1429rem;
    position: absolute;
    right: 0.5714rem;
    bottom: 1rem;
}
.head_balance_wrap .right_wrap{
    width: 14.5714rem;
    height: 100%;
}
.head_balance_wrap .right_item{
    width: 50%;
    height: 100%;
    justify-content:center
}
.fix{
    margin-bottom: -0.2rem!important
}
.w160{
    width: 11.4286rem
}
.find_account{
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    position: absolute;
    top: 1rem;
    left: 1.1429rem;
}
.msg_wrap{
    position: absolute;
    top: 0.314rem;
    right: .55rem;
}
.msg_num{
    width:0.7143rem;
    height:0.7143rem;
    background:rgba(255,255,255,1);
    border-radius: 50%;
    font-size:0.5714rem;
    font-family:PingFangSC-Semibold;
    color:rgba(255,99,83,1);
    position: absolute;
    right: .2rem;
    top: .3rem;
}
.Electricity_borrow{
    width: 24.5rem;
    height: 5rem;
    background: url('https://static.cattryapp.com/12static/new/img/Electricity_borrowing.png');
    background-size: 100% 100%;
    margin: 1.1429rem auto 0;
    padding: 1.1429rem;
    box-sizing: border-box;
}
.Electricity_borrow h2{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-bottom: 0.5714rem
}
.Electricity_borrow h3{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
}
.moreH{
    height: 8.1429rem!important;
}
.lessH{
    height: 5.2857rem!important;
    padding: 1.1rem 0 0 1.14rem!important;
}
.video_wrap{
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 800;
}
.video_wrap img{
    width: 2.1429rem;
    padding: 0.2143rem;
    position: absolute;
    bottom: -4.2857rem;
    left: 50%;
    transform: translateX(-50%)
}
.all_wrap{
    background:rgba(245,245,245,1);
}
.down_btn{
    width:6.2857rem;
    height:2.2857rem;
    background:linear-gradient(124deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:1.1429rem; 
    font-size:0.9286rem; 
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.home_down_cancel{
    width: 1.1429rem;
    padding: 0.2857rem;
    margin-left: 0.5714rem
}
.msg_entry{
    width: 1.7143rem;
    padding: .3rem .5rem
}
.gray_separate{
    height: 0.8571rem;
    background:rgba(245,245,245,1);
}
.rotate15{
    transform: rotate(5deg);
    margin: 0.5714rem 0 0 1.1429rem
}
.head_msg_wrap{
    width: 100%;
    padding: 0 1.1429rem;
    box-sizing: border-box;
}
.head_msg_wrap .avatar{
    width: 3.7143rem;
    height: 3.7143rem;
    border-radius: 50%;
    border: 0.1429rem solid white;
    margin-right: 0.5714rem
}
.avatar_name h2{
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:1.4286rem;
    margin-bottom: 0.5714rem;
    width: 7rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.avatar_name i{
    width:6.2857rem;
    height:1.5714rem;
    border:1px solid rgba(255,255,255,1);
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    border-radius: 0.8571rem
}
.dx_guide_box{
    position: relative;
}
.dx_guide_time{
    position: absolute;
    right: 6.2rem;
    bottom: .771rem;
    color: #006922;
    font-size: 12px;
}
.dx_guide{
    width: 24.571rem;
    height: 5.714rem;
    display: block;
    margin: 0 auto 0;
    margin-bottom: -0.7143rem;
}
.notrace2{
    width: 13.4286rem;
    position: fixed;
    bottom: 0.7143rem;
    right: 0.7143rem;
    z-index: 999;
}
.notrace_line{
    width: 3.1429rem;
    position: fixed;
    bottom: 8.5714rem;
    right: 6.7857rem;
    z-index: 999;
}
.Notrace_tips{
    width:19.7143rem;
    height:18.0714rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    padding: 2.2857rem 1.4286rem 2rem;
    box-sizing: border-box;
    z-index: 999;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%)
}
.Notrace_tips h2{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 0.8571rem
}
.Notrace_tips p{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.7143rem;
}
.Notrace_tips .example{
    width: 11.0714rem;
    margin: 0.8571rem 0 0.5714rem;
}
.Notrace_tips i{
    font-size:0.8571rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
#hideAnnounce{
    position: absolute;
    top: -999px;
}
.fast_withdraw{
    width: 24.5rem;
    display: block;
    margin: 0 auto;
}
.mt06{
    margin-top: 0.6rem!important
}
.bot_wrap{
    height: 13.2857rem;
    padding-top: 2.2857rem;
    box-sizing: border-box;
}
 .new_research{
     font-size: 1.1rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
     text-decoration:underline
 }
.bot_msg{
     width:8.571428571428571rem;
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(153,153,153,1);
     line-height:1.2142857142857142rem;
     margin: 2.857142857142857rem auto 0;
     text-align: center;
}
 .head_wrap{
     width:100%;
     height:17.2857rem;
     background:url('https://static.cattryapp.com/12static/new/img/home_head_newBac2.png');
     background-size: 100% 100%;
     padding: 0.7142857142857143rem 0 0;
     box-sizing: border-box;
     position: relative;
}
 .head_title{
     font-size:1.2142857142857142rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     text-align: center;
     margin-bottom: 1.571rem;
}
 .word_guide1{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     position: absolute;
     top: 10rem;
     left: 50%;
     transform: translate(-50%);
     z-index: 300;
}
 .word_guide1 img{
     margin-left: -30%;
     width: 4.285714285714286rem;
     margin-bottom: 1.1285714285714286rem;
}
 .word_guide1 span{
     color: #5192F5;
}
 .bottom_guide{
     position: absolute;
     bottom: 1.5rem;
     z-index: 1200;
     left: 50%;
     transform: translate(-50%);
}
 .guide_btn{
     width:6.857142857142857rem;
     height:2.5714285714285716rem;
     border-radius:0.2857142857142857rem;
     border:1px solid rgba(255,255,255,1);
     color:rgba(255,255,255,1);
     margin-bottom: 1.4285714285714286rem;
}
 .guide_dot{
     width:0.5rem;
     height:0.5rem;
     background:rgba(255,255,255,1);
     opacity:0.4;
     border-radius: 50%;
     margin: 0 0.35714285714285715rem;
}
 .dot_light{
     opacity: 1;
}
 .task_light{
     position: relative;
     z-index: 300;
     border: 2px dashed white;
     border-radius: 0.8571428571428571rem 
}
 .new_guide2 p{
     position: absolute;
     top: 11.5rem;
     left: 56%;
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     line-height:1.5714285714285714rem;
     z-index: 300;
}
 .new_guide2 .star{
     width: 1.8571428571428572rem;
     position: absolute;
     left: -2.4285714285714284rem;
}
 .new_guide2 .guide2_direct{
     width: 3.5714285714285716rem;
     position: absolute;
     bottom: -5.285714285714286rem;
     left: -1.5714285714285714rem;
     transform: rotate(255deg) 
}
 .announce_wrap{
    width:24.5714rem;
    height:2.31rem;
    border-radius:0.4286rem;
    background:rgba(255,252,238,1);
    padding: 0 16.0006px;
    box-sizing: border-box;
    margin-top: 0.5714rem;
}
 .announce_wrap .left_msg{
     display: flex;
}
 .announce_wrap .left_msg img{
     width: 1.1428571428571428rem;
     height: 1.1428571428571428rem;
     margin-right: 0.7142857142857143rem;
}
 .announce_wrap .left_msg .word_wrap{
    width: 20rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-family:PingFangSC-Regular;
    color:rgba(255,99,83,1);
    line-height:1.4286rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
 .home_cancel{
     width: 0.6rem;
     padding: 0.3rem;
     margin-right: -0.42857142857142855rem;
}
 .income{
     margin-top: 0.8rem;
}
 .middle_nav{
     height: 11.1429rem;
     padding: 0 1.1428571428571428rem;
     box-sizing: border-box;
     margin-top: 1.14rem;
}
 .middle_nav .right_nav{
     height: 100%;
     justify-content: space-between;
}
 .fast_task{
     width: 12rem;
     height: 11.1429rem;
     background: url('https://static.cattryapp.com/12static/new/img/home_fast_bac2.png');
}
 .invite_task{
     width: 11.7143rem;
     height: 6.2143rem;
     background: url('https://static.cattryapp.com/12static/new/img/home_invite_bac2.png');
}
 .register_bac{
     width: 11.7143rem;
     height: 4.2857rem;
     background: url('https://static.cattryapp.com/12static/new/img/home_register_bac2.png');
}
 .compad{
     padding: 1.1429rem 0 0 0.8571rem;
     box-sizing: border-box;
     font-size:1.2857142857142858rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     line-height:1.2857142857142858rem;
     background-size: 100% 100%;
}

.compad_fix2{
    padding: 0.8571rem
}

 .compad i{
     display: inline-block;
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,255,255,1);
     margin-top: 0.62rem;
}
.compad_fix2 i{
    margin-top: 0.32rem!important;
}
.more_getMoney{
    margin-top: 1.7143rem;
}
.more_title{
    font-size:1.2857rem;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(102,102,102,1);
    margin-left: 1.1429rem;
}
.task_item_wrap{
    flex-wrap: wrap;
    margin-top: .1rem;
}
.task_item_wrap .item{
    width: 50%;
    height: 6.2857rem;
    padding-left: 1.1429rem;
    box-sizing: border-box;
}
.task_item_wrap img{
    width: 3.4286rem;
    margin-right: 1.1429rem
}
.task_item_wrap h2{
    font-size:1.2143rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.task_item_wrap h3{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:1.2857rem;
    margin-top: 0.4286rem
}
.border_right{
    border-right: 1px solid #F1F1F1;
}
.border_bottom{
    border-bottom: 1px solid #F1F1F1;
}
.interact_ad{
    animation: sway 1.5s ease-in-out;
    animation-iteration-count: infinite;
}
.more_fuli{
    margin-top: 1.7143rem;
    padding-bottom: 2.2857rem
}
.more_fuli .item{
    width: 6.1429rem;
    height: 5.0714rem;
}
.more_fuli img{
    width: 3.2143rem;
    margin-bottom: 0.8571rem
}
.more_fuli h2{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
}
.pl16{
    margin-top: 1.4286rem;
    padding-left: 1.1429rem;
}
 @keyframes sway
 {
    0% {transform: rotate(0deg)}
    16% {transform: rotate(0deg)}
    30.5%{transform: rotate(20deg)}
    35.5%{transform: rotate(20deg)}
    50%{transform: rotate(0deg)}
    66%{transform: rotate(0deg)}
    80.5%{transform: rotate(-20deg)}
    85.5%{transform: rotate(-20deg)}
    100%{transform: rotate(0deg)}
 }

/*快速抢任务*/
.fast_grap_task_wrap{
    position: fixed;
    z-index: 100;
    width: 6.143rem;
    height: 5.571rem;
    right: 0;
    bottom: 20%;
    background-position: center;
    background-repeat: no-repeat;
    /* background-size: contain; */
    background-size: 6.143rem 5.571rem;
    animation: catAnima 2s infinite;
}
.grap_task_show{
    position: absolute;
    bottom: .286rem;
    left: .5rem;
    width: 4.643rem;
    height: 1.357rem;
}
.now_task_show{
    position: absolute;
    bottom: .286rem;
    left: .7rem;
    width: 4.429rem;
    height: 1.429rem;
}
@keyframes catAnima
{
    from {
        background-image: url('https://static.cattryapp.com/12static/new/img/cat_hand_up.png');
    }
    to{
        background-image: url('https://static.cattryapp.com/12static/new/img/cat_hand_down.png');
    }
}
</style>
