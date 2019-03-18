<template>
<div class="all_wrap">
    <div class="common_head_wrap2">
        <app-header class="common_head_nav" :title="'任务详情'"></app-header>
        <div class="common_head_time flex_btn_center">
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
            <div class="middle_wrap flex">
                <p>任务还有</p>
                <div class='common_time_wrap flex_all_center'><i>{{surplus.h}}</i></div>
                <span>:</span>
                <div class='common_time_wrap flex_all_center'><i>{{surplus.m}}</i></div>
                <span>:</span> 
                <div class='common_time_wrap flex_all_center'><i>{{surplus.s}}</i></div>
                <p>结束</p>
            </div>
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
        </div>

        <div class="common_app_msg_wrap">
            <div class="common_app_msg flex_btn_center">
                <div class="left_msg flex">
                    <img :src="unionData.icon_path">
                    <div v-cloak class="word_msg">
                        <h2 class="search_keyword">搜索关键词</h2>
                        <h3 class="keyword_detail">“{{unionData.search_key}}”</h3>
                    </div>
                </div>
                <div class="right_msg">
                    +{{unionData.points}}<i>元</i>
                </div>
            </div>
            <div v-cloak class="waring flex_all_center" v-if="task.app.type==2">
                <i>App store 搜索排名第<span>{{task.app.ranking}}</span>位</i>
            </div>
        </div>
    </div>
    <!-- 任务步骤 -->
    <div class="step_wrap">
        <div class="placeholder"></div>
        <div class="banner_wrap flex_all_center" @click = test>任务步骤</div>
        <div class="step_item">
            <div class="title_tips">
                <div class="red_dian"></div>
                <h2>步骤1/2</h2>
            </div>
            <div v-cloak v-if="unionData.search_key">
            <p class="tips_word">点击 <span>复制关键词</span> 按钮</p>
            <p class="tips_word">试玩3分钟</p>
            <p class="tips_word">前往APP store粘贴搜索，下载图标应用</p>
            <div class="btn flex_all_center" @click="copy_word">复制关键词</div>
            </div>
            <div v-cloak v-else>
                <p class="tips_word">点击 <span> 去APP store下载</span>，下载图标应用 </p>
                <div class="btn flex_all_center" @click="go_search">去APP store下载</div>
            </div>
        </div>
        <div class="step_item">
            <div class="title_tips">
                <div class="red_dian"></div>
                <h2>步骤2/2</h2>
            </div>
            <div v-if="template" v-for="item in template">
                <div class="flex">
                    <p>{{item.key}}</p><p class="tips_word"  v-html="item.value"></p>
                </div>
            </div>
            <div v-else>
                <div class="flex">
                    <p class="tips_word" >安装后返回本页面打开应用.</p>
                </div>
            </div>
            <div class="btn flex_all_center" :class="[ canopen?'': 'grey' ]" @click="openapp">打开应用</div>
        </div>        
    </div>

    <div class="btn2 flex_all_center " :class="[canlingjiang?'active': '' ]" @click="activetask">领取奖励</div>
<!--     <p class="giveup" @click="canceltask">放弃任务</p> -->

</div>    
</template>

<script>
var openTimer;  //打开定时器
var DjsTimer;   //任务总倒计时定时器
import api from '@//api/api.js'
import clientApi from '@//api/clientApi.js'
import common from '@//api/common.js'
import consts from '@//api/consts.js'
export default {
    name:'APP',
    data(){
        return {
            task:{app:{}},
            unionData:{},
            adid:0,
            deviceinfo:[],
            canopen:false,
            canlingjiang:false,
            surplus: {              //任务剩余时间
                h: '00',               //时
                m: '0',               //分
                s: '0',               //秒
            },
        }
    },

    mounted(){
        this.run();
    },
    beforeDestroy(){
        clearInterval(openTimer);
        clearInterval(DjsTimer)
    },
    computed:{

    },
    methods:{
        run:function(){
            var adid = this.$route.query.adid;
            if(adid == ''){
                 location.href='/';
            }
            this.adid=adid;
            this.taskType = this.$route.query.type;
            this.getData();
        },
        //获取数据
        getData:function(adid){
            this.TimeCountdown()
            clientApi.getv2deviceinfo().then((response)=>{
                if(response.status == 1){
                    this.deviceinfo=response.data;
                    console.log(this.deviceinfo);
                    if(this.taskType=='yuanyuan'){
                        this.yuanyuanDetail()
                    }else if(this.taskType=='huoban'){
                        this.huobanDetail()
                    }                    
                }else{
                    location.href='/';
                }
            })
        },
        //圆圆任务详情
        yuanyuanDetail(){
            api.getyuanyuanlist().then((response)=>{
            var data = response.data;
                if(data.status){
                    var unionList=data.data;
                    var adid = this.$route.query.adid;
                    if(unionList.length > 0){
                        var y_flag = 0;
                        unionList.map((item)=>{
                            if(item.ad_id == adid){
                                y_flag=1;
                                this.unionData =item;
                                this.checkOpenTime();       //检查应用打开时间
                                var copyRecord = common.getCookie('copyClick'+this.unionData.ad_id);
                                if(copyRecord) this.canopen = true
                            }
                        })
                        if(y_flag == 0){
                            location.href='/';
                        }
                        console.log(this.unionData);
                    }
                }
            })  
        },
        //伙伴任务详情
        huobanDetail(){
            console.log('huoban');
            var device = this.deviceinfo;
            var param = {
                ifa:device.ifa,
                dd: device.dd,
                dv: device.dv,
                osv:device.osv,
                user:device.user
            }
            api.gethuobanserverreturnlist({params:param}).then((res)=>{
                var data = res.data;
                if(data.status){
                    var unionList=data.data;
                    var adid = this.$route.query.adid;
                    if(unionList.length > 0){
                        var y_flag = 0;
                        unionList.map((item)=>{
                            if(item.ad_id == adid){
                                y_flag=1;
                                this.unionData =item;
                                this.checkOpenTime();       //检查应用打开时间
                                var copyRecord = common.getCookie('copyClick'+this.unionData.ad_id);
                                if(copyRecord) this.canopen = true
                            }
                        })
                        if(y_flag == 0){
                            location.href='/';
                        }
                        console.log(this.unionData);
                    }
                }
            })
        },
        //任务倒计时
        TimeCountdown(){
            var taskType = this.taskType;
            var taskId = this.adid;
            var current_DjsId = taskType+'Djs'+taskId           //当前任务类型和相应ID的cookie KEY
            var DjsCookie = common.getCookie(current_DjsId);      //获取 KEY 的值
            if(DjsCookie){
                DjsTimer = setInterval(()=>{
                    var nowTime = Date.parse(new Date())/1000;
                    var time = DjsCookie-nowTime
                    var m = parseInt((time % 3600) / 60)<10? '0'+parseInt((time % 3600) / 60):parseInt((time % 3600) / 60);
                    var s = parseInt((time % 3600) % 60)<10? '0'+parseInt((time % 3600) % 60):parseInt((time % 3600) % 60);
                    this.surplus.m = m;
                    this.surplus.s = s
                    console.log(s);
                    if(time<0){
                        clearInterval(DjsTimer)
                        this.$MessageBox.alert('任务超时，请在30分钟内完成').then(()=>{
                            this.$router.replace('/unionList')
                        })
                    }
                },1000)
            }else{
                console.log('no-cookie');
            }
        },
        //通过cookie检查应用打开时间
        checkOpenTime(){
            var taskType = this.taskType;
            var openCookieId = taskType+this.unionData.ad_id
            var openStartTime = common.getCookie(openCookieId)
            if(openStartTime){     //存在此应用打开cookie记录
                openTimer = setInterval(()=>{
                    var openStartTime = common.getCookie(openCookieId)
                    if(!openStartTime) {
                        clearInterval(openTimer)
                        return
                    }
                    var nowTime = Date.parse(new Date())/1000;
                    console.log(nowTime-openStartTime);
                    if(nowTime-openStartTime>180){
                        this.canlingjiang = true
                        clearInterval(openTimer)
                    }
                },1000)
            }
        },
        //复制关键词
        copy_word:function(){
            var _this = this;
            clientApi.copykeyword(this.unionData.search_key)
            .then((response)=>{
                console.log(response);
                if(response.status==1){
                    _this.canopen=true;
                    _this.$MessageBox.confirm('复制成功，快去下载吧','温馨提示',{
                                confirmButtonText:'去下载',
                                showCancelButton:true,
                                closeOnClickModal:false})
                    .then((response)=>{
                        //打开appstro搜索下载
                        clientApi.ios11openurl({bundleid:"com.apple.AppStore"}).then((res)=>{
                        }).catch((err)=>{
                            window.location.href ='https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?media=software&country=CN&mt=8&term=';
                        })
                    }).catch((err)=>{
                        
                    })
                    this.copyClickCookie()      //记录复制按钮点击
                }
            })   
        },
        go_search:function(){
            this.canopen = true
            this.copyClickCookie()      //记录复制按钮点击
            clientApi.ios11openurl({bundleid:'com.apple.AppStore'}).then((res)=>{

            }).catch((err)=>{
                window.location.href ='https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?media=software&country=CN&mt=8&term=';
            })
        },
        //存储当前任务的复制Click事件
        copyClickCookie(){
            var ClickId = 'copyClick'+this.unionData.ad_id    
            common.setCookie(ClickId,true,30) 
        },
        //打开应用
        openapp:function(){
            if(this.canopen){
                var taskType = this.taskType;
                var unionData = this.unionData;
                //打开
                clientApi.ios11openurl({bundleid:this.unionData.package_name})
                .then((response)=>{
                    if(response.data == true) {
                        var openCookieId =  taskType+unionData.ad_id          //任务ID
                        var openStartTime = common.getCookie(openCookieId)       //打开应用的cookie记录
                        if(openStartTime) return                               //存在就不再重复保存
                        var openStartTime =  Date.parse(new Date())/1000;      //打开时间记录
                        common.setCookie(openCookieId,openStartTime,30)          //打开APP时间，过期30分钟
                        this.checkOpenTime()                                   //检查打开时间
                    }else{
                        this.$MessageBox.alert("APP未安装，请先安装APP!");
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
        //领奖
        activetask:function(){
            if(!this.canlingjiang) return
            if(this.taskType == 'yuanyuan'){
                this.yuanyuanActive()       //圆圆任务领奖
            }else if(this.taskType == 'huoban'){
                this.huobanActive()         //伙伴任务领奖
            }
        },
        //圆圆领奖
        yuanyuanActive(){
            if(this.unionData.taskType == 2 || this.unionData.taskType == 3){
                this.$MessageBox.alert('提交成功,此任务奖励延时到账，预计2小时内到账').then(()=>{
                    this.$router.replace('/unionList')
                });
                return
            }
            var postparm = {
                dd:this.deviceinfo.dd,
                ad_id:this.unionData.ad_id,
                osv:this.deviceinfo.osv,
                adname:this.unionData.search_key
            }
            this.$loadding.open('领取中')
            api.yuanyuanactive(postparm).then((res)=>{
                this.$loadding.close()
                var resole = res.data;
                console.log(resole);
                if(resole.status){
                    this.$MessageBox.alert('领取成功').then(()=>{
                        this.$router.replace('/unionList')
                    });
                }else{
                    this.$MessageBox.alert(resole.msg).then(()=>{
                        this.$router.replace('/unionList')
                    })
                }
            })
        },
        //伙伴领奖
        huobanActive(){
            var param = {
                ifa:this.deviceinfo.ifa,
                osv:this.deviceinfo.osv,
                ad_id:this.unionData.ad_id,
            }
            this.$loadding.open('领取中')
            api.huobanactive(param).then((response)=>{
                this.$loadding.close()
                var resole = response.data;
                if(resole.status){
                    this.$MessageBox.alert('领取成功').then(()=>{
                       this.$router.replace('/unionList')
                    });
                }else{
                    this.$MessageBox.alert(resole.msg).then(()=>{
                        this.$router.replace('/unionList')
                    })
                }
            })
        },

    }
}
</script>

<style scoped>
.all_wrap{
    background:rgba(246,246,246,1);
    padding-bottom: 32px;
}
.common_head_wrap2{
    width: 100%;
    height: 10.857142857142858rem;
    box-sizing: border-box;
    background: url('https://static.cattryapp.com/12static/new/img/heighDetail_head.png');
    background-size: 100% 100%;
    position: relative;
}
.word_msg .search_keyword{
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    font-size: 14px;
}
.word_msg .keyword_detail{
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#1E1E1E;
    line-height:18px;
}
.waring{
    padding-top: 10px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(30,30,30,1);
    display: flex;
    align-items: center;
}
.waring span{
    color: #FF6353
}

.step_wrap{
    width:351px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    margin:90px auto 0;
    position: relative;
    padding: 48px 16px 0;
    box-sizing: border-box;
}
.placeholder{
    position: absolute;
    width: 100%;
    height: 2px;
    background: white;
    bottom: 0;
    left: 0;
}
.banner_wrap{
    width:126px;
    height:32px;
    background:linear-gradient(126deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:0px 16px 16px 0px;
    position: absolute;
    top: -12px;
    left: -12px;
    font-size:17px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.step_item{
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(241,241,241,1);
}
.title_tips{
    display: flex;
    align-items: center;
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 16px;
}
.red_dian{
    width:8px;
    height:8px;
    background:rgba(255,99,83,1);
    border-radius: 50%;
    margin-right: 5px;
}
.tips_word{
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(84,84,84,1);
    line-height:20px;
}
.tips_word span{
    color: #FF6353;
}
.btn{
   width:220px;
    height:44px;
    background:rgba(81,146,245,1);
    border-radius:22px; 
    color: white;
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    margin: 20px auto 0;
}
.grey{
    background:rgba(204,204,204,0.7);
}
.btn2{
  width:315px;
    height:44px;
    background:rgba(204,204,204,0.7);
    border-radius:22px;  
    margin: 32px auto 0;
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.giveup{
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1); 
    text-align: center;
    margin: 24px auto 0;
}
.active{
    background: #FF6353;
}
</style>
