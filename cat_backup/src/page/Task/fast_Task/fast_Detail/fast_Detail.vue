<template>
<div class="all_wrap">
    <div class="common_head_wrap2">
        <app-header class="common_head_nav" :title="'任务详情'"></app-header>
        <div class="common_head_time flex_btn_center">
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
            <div class="middle_wrap flex">
                <p>任务还有</p>
                <div class='common_time_wrap flex_all_center'><i>{{surplusTime.h}}</i></div>
                <span>:</span>
                <div class='common_time_wrap flex_all_center'><i>{{surplusTime.m}}</i></div>
                <span>:</span> 
                <div class='common_time_wrap flex_all_center'><i>{{surplusTime.s}}</i></div>
                <p>结束</p>
            </div>
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
        </div>

        <div class="common_app_msg_wrap">
            <div class="common_app_msg flex_btn_center">
                <div class="left_msg flex">
                    <img :src="task.app.icon">
                    <div v-cloak class="word_msg" v-if="task.app.type==2">
                        <!--<h2 v-if="!copyClick" class="search_keyword mt08">点击下方复制关键词</h2>-->
                        <h2  class="search_keyword">搜索关键词</h2>
                        <!--<h2 v-if="!copyClick" class="search_keyword mt08">搜索关键词</h2>-->
                        <h3 v-if="!copyClick" class="keyword_detail">***</h3>

                        <h3  v-else class="keyword_detail">“{{task.app.keyword}}”</h3>
                    </div>
                    <div v-cloak class="word_msg" v-else>
                        <h2 class="search_keyword">{{task.app.name}}</h2>
                    </div>
                </div>
                <div class="right_msg">
                    +{{task.app.price}}<i>元</i>
                </div>
            </div>
            <div v-cloak class="waring flex_all_center" v-if="task.app.type==2">
                <i>App store 搜索排名约第<span>{{task.app.ranking}}</span>位</i>
            </div>
        </div>
    </div>
    <!-- 任务步骤 -->
    <div class="step_wrap">
        <div class="placeholder"></div>
        <div class="banner_wrap flex_all_center">任务步骤</div>
        <div class="step_item">
            <div class="title_tips">
                <h2>步骤1/<span style="font-size:0.857rem">2</span></h2>
            </div>
            <div v-cloak v-if="task.app.type==2">
            <p class="tips_word tc">前往app store搜索下载与任务图标相同的应用</p>
            <div class="btn flex_all_center" @click="notcopy_word">前往下载</div>
            </div>
            <div v-cloak v-else>
                <p class="tips_word">点击 <span> 去APP store下载</span>，下载图标应用 </p>
                <div class="btn flex_all_center" @click="go_search">去APP store下载</div>
            </div>
        </div>
        <div class="step_item">
            <div class="title_tips">
                <h2>步骤2/<span style="font-size:0.857rem">2</span></h2>
            </div>
            <div v-for="(item,index) in task.app.template" :key="index">
                <div class="flex">
                   <p class="tips_word tc mb3"  v-html="item.value"></p>
                </div>
            </div>
            <div class="btn flex_all_center" :class="[ canopen?'': 'grey' ]" @click="openapp">打开应用</div>
        </div>        
    </div>

    <div  class="btn2 flex_all_center " :class="[ canlingjiang?'active': '' ]" @click="activetask">领取奖励</div>
    <!-- <p class="giveup" @click="canceltask">放弃任务</p> -->

    <!-- 点赞分享弹窗 -->
    <div class="share_pop_wrap" v-if="sharePop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="share_pop flex_column_center">
            <h2 class="money"><span>+</span>{{task.app.price}}<span>元</span></h2>
            <p class="tips_p">分享召集好友点赞，奖励再多加0.5元</p>
            <i class="time_tips">分享后60分钟有效 </i>
            <div class="btn flex_all_center" @click="go_on">继续试玩</div>
            <i class="grey_tips">可在个人中心查看点赞分享</i>
        </div>
        <p class="go_on" @click="go_share">点赞红包</p>
    </div>
    <!-- 底部收徒banner -->
    <div v-if="isShowAppr" class="bot_wrap">
        <h2>收徒任务</h2>
        <h3>一个徒弟最高分成<span>20</span>元，收徒无上限</h3>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import clientApi from '@//api/clientApi.js'
import common from '@//api/common.js'
import consts from '@//api/consts.js'
import fix from '@//api/fix.js'
import copypop from '../../../../components/pop/copy_pop/copy_pop.js'   //复制弹窗 
import netpop from '../../../../components/pop/Internet_pop/netpop.js'  //网络访问弹窗
//计时器
var checkinstalltimer 
var taskDjs;            //任务倒计时
export default {
    name:'APP',
    data(){
        return {
            task:{app:{}},
            canopen:false,
            canlingjiang:false,
            canLeave:false,
            surplusTime:{     //任务剩余时间
                h:0,
                m:0,
                s:0,
                endtime:0
            },
            task_Tips:'',       //任务必须提示
            sharePop:false,
            copyClick:false,    //是否点击了复制按钮
            catcherr:true,
            isShowAppr: true //如果是从主页快速抢任务过来的就要隐藏徒弟任务
        }
    },

    mounted(){
        this.init()
        document.body.scrollTop=0
    },
    beforeDestroy(){        //离开页面清除定时器
        clearInterval(taskDjs);
        clearInterval(checkinstalltimer)
    },
    //离开页面时守卫
    beforeRouteLeave (to, from, next) {
        if(this.canLeave ==false){
            this.$MessageBox.confirm('放弃抢到的任务可能无法再次抢夺此任务','是否放弃任务？',{ confirmButtonText:'不放弃',cancelButtonText:'放弃'})
            .then(res => {
                next(false)
            })
            .catch(res=>{   
                api.untask().then((response)=>{
                    this.taskend()
                    clearInterval(taskDjs);
                    next()
                })
            })
        }else {
            this.taskend()
            clearInterval(taskDjs);
            next()
        }
    },
    beforeRouteEnter(to, from, next){   //这里主要是判断如果是快速抢任务过来的就不要收徒弟的banner  
        next((vm)=>{
            console.log(vm);
            if(from.path == '/'){
                vm.isShowAppr = false;
            }
        });
    },
    methods:{
        init(){
            var taskid = this.$route.query.taskid;
            if(taskid==undefined||taskid==''){
                this.canLeave=true;
                this.$router.go(-1);
                return;
            }
            //检测登录
            this.$loadding.open()
            api.detailData({taskid:taskid})
            .then((response)=>{
                this.$loadding.close()
                if(response.data.status==false){
                    this.$MessageBox.alert(response.data.msg)
                    this.canLeave=true;
                    this.$router.replace('/fastList');
                    return false;
                }
            var resData = response.data.data.data;
            response.data.data = common.decryption(resData);
                this.task=response.data.data;
                this.lefttime=this.task.app.task_endtime;
                this.task_Tips = this.task.task_Tips;
                this.TimeCountdown()        //任务倒计时
                //ios11进首页默认可以打开，在调打开接口的时候去判断是否安装
                //检测是否复制关键词
                api.common_request('/Task/checkCopy?taskid='+this.task.app.id)
                .then( (response)=> {
                    if (response.data.status == 1) {
                        this.canopen=true;
                    }
                })                
                //检测是否安装了苹果助手
                this.checkinstallhelpbound();
                //检查是否打开
                this.checkopen()
            }).catch((err)=>{
                this.$MessageBox.alert('加载失败,请确认网络是否正常')
            })
        },
        //任务倒计时
        TimeCountdown(){
            var taskid = this.$route.query.taskid;
            var DjsCookieId =  'fastDjs'+ taskid                                               //任务ID倒计时cookie KEY值
            var depressionEndTime =  Date.parse(new Date())/1000 + this.task.app.task_endtime; //预计结束时间
            common.setCookie(DjsCookieId,depressionEndTime,35)                                 //设置cookie，过期35分钟
            var TaskEndTime = common.getCookie(DjsCookieId);
            taskDjs = setInterval(() => {
                var surplusTime = TaskEndTime - Date.parse(new Date())/1000;
                if(surplusTime<0){
                    clearInterval(taskDjs);
                    this.docanceltask("任务时间超时,放弃任务");
                }
                var h = '0'+parseInt(surplusTime / 3600);
                var m = parseInt((surplusTime % 3600) / 60);
                var s = parseInt((surplusTime % 3600) % 60);
                m= m<10? '0'+m : m;
                s= s<10? '0'+s : s;
                this.surplusTime.h = h;
                this.surplusTime.m = m;
                this.surplusTime.s = s;
            }, 1000);
        },
        activetask:function (event) {
            if(event.target.className.indexOf("active") > -1){
                if(this.canlingjiang==false){
                    return false;
                }
                this.$loadding.open('领取中')
                clientApi.common_request(this.task.activeAppUrl)
                .then( (response)=> {
                    this.$loadding.close()
                    if (response.status == 1 || response.status == -11 ||response.status ==2) {
                        this.removeopenboundid();
                        var msg = ""
                        if(response.data.status == 2){
                            msg = "你为非首次安装，不会获得奖励";
                            this.$MessageBox.alert(msg,'温馨提示')
                            .then((response)=>{
                            this.canLeave=true;
                            this.$router.go(-1);
                        })
                        }else{
                            this.canLeave=true; //可以离开当前页面
                            this.sharePop=true  //展示分享点赞弹窗
                            //领奖埋点
                            var param = {ti:this.task.app.id,tm:this.task.app.price,}
                            clientApi.receiveAward_record(param)
                        }
                    }else{
                        if(response.data == -100){
                            this.$MessageBox.alert("网络不好，请检查网络");
                            return;
                        }
                        if(response.data == -51){
                            this.$MessageBox.alert("广告标识符修改过，请放弃任务并关闭懒猫重新打开进行任务！");
                            return;
                        }
                        if(response.data == -55){
                            if(response.error.version == 9 || response.error.version == 7){
                                this.$MessageBox.alert("试玩时间未到,请再去试玩");
                                return;
                            }else{
                                this.$MessageBox.alert("试玩时间未到,请再去试玩");
                                setTimeout(function () {
                                    document.location.href = "lazycat://";
                                },100);
                                return;
                            }
                        }
                        //                        if(response.data==''){
                        //                            if(typeof response=='object'){
                        //                                var ss=JSON.stringify(response);
                        //                            }else {
                        //                                var ss=response;
                        //                            }
                        //                            api.common_request('/Share/errorLog?err='+ss);
                        //                            this.$MessageBox.alert("试玩时间未到,请再去试玩");
                        //                            return;
                        //                        }
                        this.catcherr=response;
                        var result = JSON.parse(response.data);
                        if(result.status == 0){
                            if(result.data==-2){
                                this.removeopenboundid();
                                api.common_request('/Task/untask?type=appleid').then( (response)=> {
                                    if(response.data.status == 1) {
                                    this.$MessageBox.alert(result.info);
                                    this.canLeave=true;
                                    setTimeout(()=> {
                                        this.$router.go(-1);
                                },1000);
                                }
                            }).catch((err) => {
                                    console.log(err)
                            });

                            }else {
                                this.$MessageBox.alert(result.info);
                            }

                        }else {
                            //axios.get('/Tasknew/addlog?taskid='+app.taskid+'&info='+response.data.data)
                            //.then(function () {
                            //
                            //   })
                            this.$MessageBox.alert("试玩时间未到,请再去试玩!");
                        }
                    }
                }).catch( (err)=> {
                    this.$MessageBox.alert('网络异常，请稍后重试');
                if(typeof err =="object"){
                    api.common_request('/Share/errorLog?err='+err+JSON.stringify(this.catcherr))
                }
                    }
                );
            }else {
                    //this.$MessageBox.alert('请打开应用，允许数据网络访问并试玩三分钟！');
            }
        },

        //检查安装
        checkinstall:function () {
            clientApi.common_request(consts.v3ispurRedownWithid+'?' + this.task.app.boundid)
            .then( (response) => {
                //检测应用是否曾经下载过，小云标志，ios10及以下有效
                if (response.data != -51 && response.data != 0) {
                    api.appqccreate({boundid:this.task.app.boundid,response:response.data,id:this.task.app.taskid})
                    .then((response)=> {
                        if (response.data.data == 1) {
                            this.docanceltask('您已放弃过该任务或在其他平台完成过该任务！');
                        }
                    }).catch( (err)=> {

                        }
                    );
                }
            }).catch( (err) => {

            });
        },
        //复制关键词
        copy_word(){
            this.tasking()
            this.copyClick=true;    //点击了复制按钮
            clientApi.copykeyword(this.task.app.keyword).then((response)=>{
                if(response.status==1){
                    copypop.show({rank:this.task.app.ranking,name:this.task.app.keyword,icon:this.task.app.icon,isqudao:this.task.isQudao}).then((response)=>{
                        this.canopen=true;
                        var nowDate = new Date();
                        var nowTime = nowDate.getTime();
                        var code = fix.fix(nowTime.toString() + this.task.app.id);
                        var clickDatas = {taskid: this.task.app.id,type:'copy',code:code,'time':nowTime};
                        api.taskProcessLog(clickDatas)
                        api.common_request("/Task/copyClickLog?taskid="+this.task.app.id+'&rank='+this.task.app.ranking)
                    }).catch((err)=>{
                        this.$MessageBox.alert('复制失败，请打开APP store去搜索下载')
                    })
                }
            }).catch((err)=>{
                this.$MessageBox.alert('复制失败，请打开APP store去搜索下载')
            })
        },
        //不用复制关键词
        notcopy_word(){
            this.tasking()
            this.copyClick=true;    //点击了复制按钮
            copypop.show({rank:this.task.app.ranking,name:this.task.app.keyword,icon:this.task.app.icon,isqudao:this.task.isQudao}).then((response)=>{
                this.canopen=true;
            var nowDate = new Date();
            var nowTime = nowDate.getTime();
            var code = fix.fix(nowTime.toString() + this.task.app.id);
            var clickDatas = {taskid: this.task.app.id,type:'copy',code:code,'time':nowTime};
            api.taskProcessLog(clickDatas)
            api.common_request("/Task/copyClickLog?taskid="+this.task.app.id+'&rank='+this.task.app.ranking)
        }).catch((err)=>{
                this.$MessageBox.alert('复制失败，请打开APP store去搜索下载')
        })
        },
        //去搜索
        go_search(){
            this.tasking()
            if(this.task.isIos11){
                this.canopen=true;
            }
            api.common_request("/Task/copyClickLog?taskid="+this.task.app.id);
            if(this.task.app.type==2){
                clientApi.ios11openurl({bundleid:'com.apple.AppStore'}).then((res)=>{

                }).catch((err)=>{
                    window.location.href ='https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?media=software&country=CN&mt=8&term=';
                })
            }else {
                api.taskProcessLog({taskid:this.task.app.id,type:'copy'}).then(function(response){
                });
                window.location.href = this.task.app.appstore_url;
            }
        },
        //打开应用
        openapp:function (event) {
            if(this.canopen==false)  return;   //判断按钮是否高亮可打开
            this.tasking()                  //客户端传递任务进行中标识
            this.tipsHandle()               //处理任务tips
            .then(()=>{    
                if(this.task.osversion>10){         //IOS11及以上检测APP是否安装
                    this.checkIos11taskinstall();
                }else {
                    this.Ios10_CheckInstall()       //IOS10及以下检测是否安装助手并打开
                }
            })
        },
        //IOS10及一下检测是否安装助手并打开
        Ios10_CheckInstall(){
            var data={bundleid:this.task.app.boundid};
            clientApi.checktaskinstall(this.task.installAppUrl)
            .then((response)=> {
                if (response.status == 1) {
                    //1直接打开应用，2推送本地消息
                    clientApi.ios11openurl(data)
                    .then((response)=> {
                        var pushData={title:"温馨提示：您的关键词为'"+this.task.app.keyword+"'的任务正在进行中，打开时请允许App网络访问哟"};
                        clientApi.localpush(pushData);
                        this.clientStartTask();   //开始任务
                        if(this.task.isQudao!='true'){
                            this.appCheckData()       //app数据检测
                        }
                    }).catch( (err)=> {
                        this.$MessageBox.alert('网络错误');
                    });
                }else {
                    this.$MessageBox.alert('APP未安装，快去APP store下载吧');
                }
            }).catch( (err)=>{
                this.$MessageBox.alert('网络错误');
            });            
        },
        //ios11及以上检测是否安装
        checkIos11taskinstall: function () {
            var data={bundleid:encodeURI(this.task.app.boundid)}
            clientApi.ios11openurl(data)
            .then((response)=> {
                if(response.data==1){
                    var pushData={title:"温馨提示：您的关键词为'"+this.task.app.keyword+"'的任务正在进行中，打开时请允许App网络访问哟"};
                    clientApi.localpush(pushData);
                    //开始任务
                    this.clientStartTask();
                    if(this.task.isQudao!='true'){
                        this.appCheckData()       //app数据检测
                    }
                }else {
                    this.$MessageBox.alert('APP未安装，快去APP store下载吧','温馨提示',{confirmButtonText:'确定',})
                    .then((response)=>{
                    }).catch((err)=>{

                    })
                }
            }).catch( (err)=> {
                this.$MessageBox.alert('网络错误');
            });
        },
        //检测所安装APP的各项数据
        appCheckData(){
            var task_id = this.$route.query.taskid;
            var appiosid  =  this.task.app.appstore_id;
            var os = this.task.osversion;
            clientApi.common_request(consts.v4ispurRedownWithid+'?' + this.task.app.boundid).then((res)=>{
                var task_id = this.$route.query.taskid;
                var obj = JSON.stringify(res.data);
                var param ={data:obj,task_id:task_id,appiosid:appiosid,os:os}
                api.appCheck(param).then((res)=>{

                })
                // if(res.data.isZhushou==="1"){
                //     this.$MessageBox.alert('此任务未按要求操作，任务已自动关闭!')
                //     this.docanceltask()
                //    _hmt.push(['_trackEvent', '快速任务详情', '检测到通过助手拖入', '放弃任务回到任务列表']);
                // }
            })
        },
        
        //打开应用时的的tips处理
        tipsHandle(){
            return new Promise((resolve,reject)=>{
                if(this.task_Tips){     //存在任务tips必提示
                    netpop.show(this.task_Tips)
                        .then(()=>{
                            resolve()
                        })
                }else {                 
                    resolve()
                }
            })
        },
        //客户端开始任务
        clientStartTask: function () {
            var starttaskData={
                bundleid:this.task.app.boundid,
                task_id:this.task.app.id,
                idfa:this.task.idfa,
                taskname:"是否打开任务『"+this.task.app.name+ "』"
            }
            clientApi.v2cattrystarttask(starttaskData)
            .then((response)=>{
                if(response.status == "1"){
                    this.checkopen();
                }else{
                    if(response.data == -51){
                        this.$MessageBox.alert('广告标识符修改过，请放弃任务，重新登录');
                    }else if(response.data == -50){
                        this.$MessageBox.alert('数据错误');
                    }else if(response.data == -100){
                        this.$MessageBox.alert('网络超时');
                    }else{
                        this.$MessageBox.alert('数据错误'+response.data);
                    }
                }
            }).catch ((err)=>{
                console.log(err)
            })
        },
        //检测应用是否打开
        checkopen:function () {
            api.common_request(this.task.isOpenUrl)
            .then( (response)=> {
                if (response.data.status != 1) {
                    return false;
                }else {
                    this.checkopentime();      //如果已经打开则判断打开时间
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        //检测打开时间
        checkopentime:function () {
            checkinstalltimer = setInterval(()=>{
                clientApi.common_request(this.task.getOpenAppTimeUrl)
                .then((response) => {
                    if (response.status != 1) {
                        return false;
                    }
                    var time = parseInt(response.data) + 180;
                    var nowDate = new Date();
                    var nowTime = nowDate.getTime() / 1000;
                    var openAppTime = parseInt(time - nowTime);
                    if(openAppTime < 0){
                        clearInterval(checkinstalltimer);
                        this.canlingjiang = true;
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },1500);
        },
        //放弃任务方法
        docanceltask:function(msg){
            this.removeopenboundid();
            api.untask().then( (response)=> {
                if(response.data.status == 1) {
                    this.$MessageBox.alert(msg);
                    this.canLeave=true;
                    setTimeout(()=> {
                        this.$router.go(-1);
                    },1000);
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        //底部放弃按钮事件
        canceltask:function(){
            this.$router.go(-1)
        },
        //移除打开的应用在懒猫中
        removeopenboundid:function () {
            var removetimewithbundleidurl =  consts.clientBaseurl + "/removetimewithbundleid?bundleid=" + encodeURI(this.task.app.boundid);
            clientApi.common_request(removetimewithbundleidurl)
            .then(function (response) {

            }).catch(function (err) {
                console.log(err);
            });
        },        
        //检测是否安装苹果助手
        checkinstallhelpbound: function () {
            if(this.task.isIos11){
                if(this.task.helpBoundid!=undefined){
                    for (var i = 0; i< this.task.helpBoundid.length; i++ ){
                        clientApi.ios11openurl({bundleid:this.task.helpBoundid[i]})
                        .then( (response)=> {
                            if (response.data == 1) {
                                this.docanceltask('系统检测到本机内存在苹果助手，请卸载后使用App Store下载！');
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                }
            }else {
                clientApi.getlocalinstalledboundleid()
                .then( (response)=> {
                    var apps=response.data;
                    if (apps != ''||apps!=undefined) {
                        for (var i=0;i<apps.length;i++){
                            this.task.helpBoundid.forEach( (e)=> {
                                if(e==apps[i].app_identifier) {
                                this.docanceltask('系统检测到本机内存在苹果助手，请卸载后使用App Store下载！');
                                }
                            })

                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            }
        },
        //分享点赞
        go_share(){
            this.$router.replace('/shareList')
        },
        //继续试玩
        go_on(){
            this.$router.replace('/fastList');
        },
        //客户端传递进行中
        tasking(){
            clientApi.getappinfo().then((res)=>{
                var version = res.data.version;
                version = version.replace(/\./g,"");
                if(version>=509){
                    var id = this.task.app.id;
                    clientApi.taskIng(1,id).then((res)=>{

                    })                   
                }
            })
        },
        taskend(){
            clientApi.getappinfo().then((res)=>{
                var version = res.data.version;
                version = version.replace(/\./g,"");
                if(version>=509){
                    var id = this.task.app.id;
                    clientApi.taskIng(0).then((res)=>{

                    })                 
                }
            })            
        }
    },
}
</script>

<style scoped>
.bot_wrap{
    background: url('https://static.cattryapp.com/12static/new/img/fastDetail_bot_banner.png');
    background-size: 100% 100%;
    width: 100%;
    height: 6.8571rem;
    margin-top: 2.2857rem;
    padding: 1.1429rem 1.4286rem;
    box-sizing: border-box;
    color:rgba(255,255,255,1);
}
.bot_wrap h2{
    font-size:1.4286rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    line-height:2rem; 
    margin-bottom: 0.4286rem;
}
.bot_wrap h3{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    line-height:1.2857rem;
}
.bot_wrap h3 span{
    font-size: 1.4286rem;
}
.mt08{
    margin-top: -0.4rem
}
    .shade{
     position: fixed;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     background: rgba(0,0,0,0.85);
     z-index: 200;
}
 .share_pop{
     width: 20rem;
     height: 28.8571rem;
     background: url('https://static.cattryapp.com/12static/new/img/fast_share_pop.png');
     background-size: 100% 100%;
     position: fixed;
     left: 50%;
     transform: translate(-50%);
     top: 5.4rem;
     z-index: 300;
     color:rgba(255,255,255,1);
     padding-top: 11.7143rem;
     box-sizing: border-box;
}
 .share_pop .money{
     font-size:2.5714rem;
     font-family:HelveticaNeue-Medium;
     font-weight:500;
     margin-bottom: 1.5714rem 
}
 .share_pop .money span{
     font-size: 1.7143rem 
}
 .share_pop .tips_p{
     font-family:PingFangSC-Semibold;
     font-weight:600;
     line-height:1.4286rem;
     margin-bottom: 0.8571rem 
}
 .share_pop .time_tips{
     font-size:0.8571rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
}
 .share_pop .btn{
     width:15.7143rem;
     height:3.1429rem;
     background:linear-gradient(100deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
     border-radius:1.7857rem;
     font-size:1.1429rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     margin-top: 3.1429rem;
}
 .share_pop .grey_tips{
     font-size:0.7857rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     margin-top: 1rem;
}
 .go_on{
     font-size:1rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
     z-index: 400;
     position: fixed;
     left: 50%;
     transform: translate(-50%);
     top: 36.2rem;
}
    .all_wrap{
        width: 100%;
        background:rgba(246,246,246,1);
        padding-bottom: 2.85rem;
    }
    .common_head_wrap2{
        width: 100%;
        height: 10.85rem;
        box-sizing: border-box;
        background: url('https://static.cattryapp.com/12static/new/img/heighDetail_head.png');
        background-size: 100% 100%;
        position: relative;
    }
    .word_msg .search_keyword{
        font-family:PingFangSC-Regular;
        color:rgba(102,102,102,1);
        font-size: 1rem;
    }
    .word_msg .keyword_detail{
        font-size:1.285rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#1E1E1E;
        line-height:1.2857rem;
    }
    .waring{
        padding-top: 0.7143rem;
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(30,30,30,1);
        display: flex;
        align-items: center;
    }
    .waring span{
        color: #FF6353;
    }
    .step_wrap{
        width:25.0714rem;
        background:rgba(255,255,255,1);
        border-radius:0.5714rem;
        margin:6.4286rem auto 0;
        position: relative;
        padding: 1.714rem 1.1429rem 0;
        box-sizing: border-box;
    }
    .placeholder{
        position: absolute;
        width: 100%;
        height: 0.1429rem;
        background: white;
        bottom: 0;
        left: 0;
    }
    .banner_wrap{
        width:9rem;
        height:2.2857rem;
        background:linear-gradient(126deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
        border-radius:0rem 1.1429rem 1.1429rem 0rem;
        position: absolute;
        top: -0.8571rem;
        left: -0.8571rem;
        font-size:1.2143rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .step_item{
        padding: 1.4286rem 0;
        box-sizing: border-box;
        border-bottom: 0.0714rem solid rgba(241,241,241,1);
    }
    .title_tips{
        display: flex;
        align-items: center;
        font-size:1.1429rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-bottom: 1.1429rem;
    }
    .red_dian{
        width:0.5714rem;
        height:0.5714rem;
        background:rgba(255,99,83,1);
        border-radius: 50%;
        margin-right: 0.3571rem;
    }
    .tips_word{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(84,84,84,1);
        line-height:1.485rem;
    }
    .tips_word span{
        color: #FF6353;
    }
    .mb3{
        margin-bottom: 0.4rem
    }
    .btn{
        width:15.7143rem;
        height:3.1429rem;
        background:rgba(81,146,245,1);
        border-radius:1.5714rem;
        color: white;
        font-size:1.1429rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        margin: 1.4286rem auto 0;
    }
    .grey{
        background:rgba(204,204,204,0.7);
    }
    .btn2{
        width:22.5rem;
        height:3.1429rem;
        background:rgba(204,204,204,0.7);
        border-radius:1.5714rem;
        margin: 2.2857rem auto 0;
        font-size:1.1429rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .giveup{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(102,102,102,1);
        text-align: center;
        margin: 1.7143rem auto 0;
    }
    .active{
        background: #FF6353;
    }
</style>
