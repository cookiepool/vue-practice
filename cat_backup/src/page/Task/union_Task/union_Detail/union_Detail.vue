<template>
<div class="all_wrap">
    <div class="common_head_wrap2">
        <app-header class="common_head_nav" :title="'任务详情'"></app-header>
        <div class="common_head_time flex_btn_center">
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
            <div class="middle_wrap flex">
<!--                 <p>任务还有</p>
                <div class='common_time_wrap flex_all_center'><i>{{surplus.h}}</i></div>
                <span>:</span>
                <div class='common_time_wrap flex_all_center'><i>{{surplus.m}}</i></div>
                <span>:</span> 
                <div class='common_time_wrap flex_all_center'><i>{{surplus.s}}</i></div>
                <p>结束</p> -->
            </div>
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
        </div>

        <div class="common_app_msg_wrap">
            <div class="common_app_msg flex_btn_center">
                <div class="left_msg flex">
                    <img :src="unionData.icon">
                    <div v-cloak class="word_msg">
                        <h2 class="search_keyword">搜索关键词</h2>
                        <h3 class="keyword_detail">“{{unionData.keywords}}”</h3>
                    </div>
<!--                     <div v-cloak class="word_msg">
                        <h2 class="search_keyword">{{unionData.title}}</h2>
                    </div> -->
                </div>
                <div class="right_msg">
                    +{{unionPrice}}<i>元</i>
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
        <div class="banner_wrap flex_all_center">任务步骤</div>
        <div class="step_item">
            <div class="title_tips">
                <div class="red_dian"></div>
                <h2>步骤1/2</h2>
            </div>
            <div v-cloak v-if="unionData.keywords">
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
            <div v-for="item in task.app.template">
                <div class="flex">
                    <p>{{item.key}}</p><p class="tips_word"  v-html="item.value"></p>
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
import api from '@//api/api.js'
import clientApi from '@//api/clientApi.js'
import common from '@//api/common.js'
import consts from '@//api/consts.js'
import {LazyLoad} from "@//api/LazyLoad.js";
export default {
    name:'APP',
    data(){
        return {
            task:{app:{}},
            adid:0,
            deviceinfo:[],
            unionData:{},
            canopen:false,
            canlingjiang:false,
            timer:0,
            ip:"",
            developfrom:"",
            isSearch:false,
            null_err_user:0,
        }
    },

    mounted(){
        this.run();
    },
    computed:{
        unionPrice:function(){
            var data = "";
            if(this.unionData.price>0){
                data = ((this.unionData.price)/100).toFixed(2);
            }
            return data;
        }
    },
    methods:{
        run:function(){
            this.$loadding.open();

            var adid = this.$route.query.adid;
            if(adid == ''){
                 location.href='/';
            }
            this.adid = adid;
            var par = {adid:adid};
            var _this=this;
            //点击
            api.dainruClick({params:par}).then((response)=>{
                var resole = response.data;
                //console.log(resole);
                if(resole.status){
                    this.developfrom = resole.data.developfrom;
                    this.ip = resole.data.ip;
                    this.null_err_user = resole.data.null_err_user;
                    clientApi.getv2deviceinfo().then((response)=>{
                        if(response.status == 1){
                            _this.deviceinfo=response.data;
                            _this.getData(adid);
                        }
                    })
                    //this.$loadding.close();
                }else{
                    this.$loadding.close();
                    this.$MessageBox.alert(resole.msg);
                }
            })
            .catch( (err)=> {
                console.log(err);
            });
        },
        //获取数据
        getData:function(adid){
            var s = ''
            clientApi.getdianrulisturl().then((response)=>{
                if(response.status == 1){
                    var talble=response.data.table;
                    var osv = this.deviceinfo.osv.split(".");
                    osv = osv[0];
                    //console.log(osv);return;
                    //osv = 10;
                    if(talble.length > 0){
                        var y_flag = 0;
                        var datalen = talble.length;
                        for (var i = 0; i < datalen; i++) {
                            if(talble[i].adid == adid){
                                y_flag=1;
                                this.unionData = talble[i];
                                console.log(this.unionData);
                                var _this = this;
                                var timer = setInterval(function () {
                                    clientApi.getv2drinstallapp(_this.unionData.bundleid).then((response)=>{
                                        console.log(_this.isSearch);
                                        if(response.status == 1 && _this.isSearch == true){
                                            _this.canopen=true;
                                            clearInterval(timer);
                                        }
                                        
                                    })
                                }, 1000);

                                var timer2 = setInterval(function () {
                                    clientApi.v2dropentimeEnd(_this.unionData.bundleid).then((response)=>{
                                        if(response.status == 1){
                                            var nowDate = new Date();
                                            var nowTime = nowDate.getTime() / 1000;
                                            var openAppTime = parseInt(nowTime - response.data);
                                            console.log(openAppTime);

                                            if (openAppTime > 180) {
                                                clearInterval(timer2);
                                                _this.canlingjiang = true;
                                            }
                                        }

                                        
                                    })
                                }, 1000);
                                break;
                            }
                        }
                        if(y_flag == 0){
                            location.href='/';
                        }
                        console.log(this.unionData);
                    }

                }
                this.$loadding.close();
            }).catch((err)=>{
                console.log(err)
            })
        },
        go_search:function(){
            clientApi.ios11openurl({bundleid:'com.apple.AppStore'}).then((res)=>{

            }).catch((err)=>{
                window.location.href ='https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?media=software&country=CN&mt=8&term=';
            })
        },
        //ios11检测是否安装
        checkIos11taskinstall: function () {
            var _this = this;
            var data={bundleid:encodeURI(this.unionData.bundleid)}
            clientApi.ios11openurl(data)
            .then((response)=> {
                if(response.data==1){
                    //点击
                    this.dainruClickData();   
                }else {
                    this.$MessageBox.confirm('APP未安装，快去APP store下载吧','温馨提示',{
                        confirmButtonText:'去下载',
                        showCancelButton:false,
                        closeOnClickModal:false})
                    .then((response)=>{
                        clientApi.ios11openurl({bundleid:'com.apple.AppStore'}).then((res)=>{
                        })
                    })
                }
            }).catch((err)=>{
                this.$MessageBox.alert('网络错误');
            console.log(err);
            })
        },
        //ios10检测是否按照
        checkinstalltwo:function(){
        //  var isInstallTimer = setInterval( () =>{
                clientApi.installapp(encodeURI(this.unionData.bundleid))
                        .then( (response)=> {
                            if (response.status == 1) {
//                                this.checkinstall();
                                this.canopen = true;
        //    clearInterval(isInstallTimer);
                                this.checkopen();
                            }
                        }).catch( (err)=>{
                            console.log("checkinstall step two--localcheck");
                            console.log(err);
                        }
                );
         //    },1000);
        },
        //点击记录
        dainruClickData:function(){

            var _this = this;
            var par={
                adid:_this.unionData.adid,
                appstoreid:_this.unionData.appstoreid,
                step:"dianji",
            };
            api.dainrucheckNeedClick({params:par}).then((response)=>{
                var resole = response.data;
                console.log(response.data.data.st);
                if(resole.status){
                    //可以上报
                    if(response.data.data.st == 10){
                        clientApi.getdianruclick({adid:_this.adid,ip:_this.ip}).then(function(response){
                            console.log(response);
                            if(response.status == 1){
                                var clickres=encodeURI(JSON.stringify(response.data));
                                    var log={
                                        res:clickres,
                                        adid:_this.unionData.adid,
                                        bundleid:_this.unionData.bundleid,
                                        name:_this.unionData.title,
                                        appstoreid:_this.unionData.appstoreid,
                                        step:"dianji"
                                    }
                                    //console.log(log);
                                    api.adddianruclicklog({params:log}).then((response)=>{

                                    });
                            }

                        })
                    //已经上报    
                    }else if(response.data.data.st == 20){

                    }
                }
            })
        },
        copy_word:function(){
            var _this = this;
            //复制关键词
            clientApi.copykeyword(this.unionData.keywords)
            .then((response)=>{
                //console.log(response);
                if(response.status==1){
                    var par={
                        adid:_this.unionData.adid,
                        appstoreid:_this.unionData.appstoreid,
                        step:"dianji",
                    };
                    api.dainrucheckNeedClick({params:par})
                    .then((response)=>{
                        var resole = response.data;
                        if(resole.status){
                            this.isSearch = true;
                            //可以上报
                            if(resole.data.st == 10){
                                //点击
                                clientApi.getdianruclick({adid:_this.adid,ip:_this.ip}).then(function(response){
                                    if(response.status){
                                    var clickres=encodeURI(JSON.stringify(response.data));
                                        var log={
                                            res:clickres,
                                            adid:_this.unionData.adid,
                                            bundleid:_this.unionData.bundleid,
                                            name:_this.unionData.title,
                                            appstoreid:_this.unionData.appstoreid,
                                            step:"dianji"
                                        }
                                        //console.log(log);
                                        //写入日志判断
                                        api.adddianruclicklog({params:log}).then((responsel)=>{
                                            console.log(responsel);

                                        });
                                        if(response.data.success == "true"){
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
                                        }else{
                                            this.$MessageBox.alert(response.data.message);
                                        }
                                    }else{
                                        this.$MessageBox.alert(response.error);
                                    }
                                });
                            }else if(resole.data.st == 20){
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
                            //已经上报
                            }
                        }
                    })
                }
            })                    
        },
        openapp:function(){
            if(this.canopen){
                if(this.null_err_user != 1 ){
                    document.location.href = "lazycat://dr_fast_api_open?" + this.unionData.bundleid;
                }else{
                    var p ={
                        bundleid:this.unionData.bundleid,
                        title:this.unionData.title,
                    };
                    clientApi.v2drnulltaskre(p)
                    .then( (response)=> {
                        if (response.status == 1) {
                            this.$MessageBox.alert('请手动打开正在运行的懒猫助手,根据提示进行下一步');
                        }else{
                            this.$MessageBox.alert('数据错误,联系管理员');
                        }
                    })
                }                
            }
        },
        //领奖
        activetask:function(){
            if(this.canlingjiang){
            var _this = this;
            var shangb = {
                adid:_this.unionData.adid,
                appstoreid:_this.unionData.appstoreid,
                step:"dianji",
            };
            //api服务器上报
            api.dianrucanActive({params:shangb}).then((response)=>{
                var resole = response.data;
                if(resole.status){
                    var lastshang = {
                        adid:_this.unionData.adid,
                        ip:_this.ip,
                        bundleid:_this.unionData.bundleid,
                        needtime:_this.unionData.runtime,
                        taskname:"是否继续完成任务'"+_this.unionData.title+"'",

                    };
                    //api上报
                    clientApi.v2drapicallback(lastshang).then((response)=>{

                //console.log(response);return;
                        if(response.status == 1){
                            var clickress=encodeURI(JSON.stringify(response.data));
                            var log={
                                    res:clickress,
                                    adid:_this.unionData.adid,
                                    bundleid:_this.unionData.bundleid,
                                    name:_this.unionData.title,
                                    appstoreid:_this.unionData.appstoreid,
                                    step:"lingjiang"
                                }
                                //console.log(log);
                                //api上报
                                api.adddianruclicklog({params:log}).then((responsess)=>{

                                });
                                if (response.data.success == "true") {
                                        _this.$MessageBox.alert('已提交审核,请等待审核通过').then(()=>{
                                            location.href='/';
                                        });
                                }else{
                                    if (response.data.message.indexOf("callback") > 0) {
                                        _this.$MessageBox.alert('审核已经通过,请查收').then(()=>{
                                            location.href='/';
                                        });
                                    } else {
                                        _this.$MessageBox.alert(response.data.message).then(()=>{
                                            location.href='/';
                                        });
                                    }

                                }
                        }else{
                            if(response.data == -100){
                                _this.$MessageBox.alert('网络不好,请检查网络');
                            }
                            if (response.data == -55) {
                                if (response.error.version == 9 || response.error.version == 7) {
                                    _this.$MessageBox.alert('试玩时间未到,请再去试玩');
                                } else {

                                        _this.$MessageBox.alert("试玩时间未到,请打开懒猫助手.").then(()=>{
                                            if(_this.null_err_user != 1 ){
                                                document.location.href = "lazycat://"
                                            }
                                        });
                                }
                            }
                        }


                    })
                }else{
                    this.$MessageBox.alert(resole.msg);
                }
            })
            }
        }
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
