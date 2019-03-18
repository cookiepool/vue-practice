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
                    <img :src="taskInfo.icon">
                    <div v-cloak class="word_msg">
                        <h2 class="search_keyword">搜索关键词</h2>
                        <h3 class="keyword_detail" v-if="keyword.keyword">“{{keyword.keyword}}”</h3>
                        <h3 class="keyword_detail" v-else>“{{taskInfo.adname}}”</h3>
                    </div>
<!--                     <div v-cloak class="word_msg">
                        <h2 class="search_keyword">{{unionData.title}}</h2>
                    </div> -->
                </div>
                <div class="right_msg">
                    +{{taskInfo.price_tuser}}<i>元</i>
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
            <div v-cloak v-if="keyword.keyword">
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
                    <p class="tips_word"  v-html="item.value"></p>
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
import api from '@//api/api.js'
import clientApi from '@//api/clientApi.js'
import common from '@//api/common.js'
import consts from '@//api/consts.js'
export default {
    name:'APP',
    data(){
        return {
            task:{app:{}},
            null_err_user:0,
            adid:0,
            is_ios11:false,
            unionData:{},
            detailInfo:{},
            keyword:{},
            taskInfo:{},
            installAppUrl:"",
            tags:{},
            template:{},
            canopen:false,
            falg:0,
            canlingjiang:false,
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
            var adid = this.$route.query.taskid;
            if(adid == ''){
                 location.href='/';
            }
            this.adid=adid;
            this.getData(adid);
        },

        //获取数据
        getData:function(adid){
            api.callbackdetail({taskid:adid}).then((response)=>{
                var resole = response.data;
                if(resole.status){
                    this.detailInfo = resole.data;
                    this.keyword = resole.data.keyword;
                    this.taskInfo = resole.data.task;
                    this.tags = resole.data.tags;
                    this.template = resole.data.template;
                    //ios11 true ios10 false
                    this.is_ios11 = resole.data.is_ios11;
                    this.installAppUrl = resole.data.installAppUrl;
                    //alert(resole.data.is_ios11);
                    if(resole.data.isOpen == true){
                        this.canopen = true;
                    }else{
                        //alert(this.is_ios11);
                        if(this.is_ios11 == 'false'){
                                this.checkinstalltwo();
                        }
                    }
                    console.log(resole.data);
                }else{
                    location.href='/';
                }
                this.$loadding.close();
            })
        },
        checkinstalltwo:function(){
         var isInstallTimer = setInterval( () =>{
                clientApi.checktaskinstall(this.installAppUrl)
                        .then( (response)=> {
                            if (response.status == 1) {
//                                this.checkinstall();
                                this.canopen = true;
           clearInterval(isInstallTimer);
                                //this.checkopen();
                            }
                        }).catch( (err)=>{
                            console.log("checkinstall step two--localcheck");
                            console.log(err);
                        }
                );
            },1000);
        },
        copy_word:function(){
            var _this = this;
            //复制关键词
            clientApi.copykeyword(this.keyword.keyword)
                    .then((response)=>{
                        console.log(response);
                        if(response.status==1){
                                    if(this.is_ios11){
                                        _this.canopen=true;
                                    }
                                    
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

                            }
                        })
                    
        },
        go_search:function(){
                clientApi.ios11openurl({bundleid:'com.apple.AppStore'}).then((res)=>{
                        this.canopen=true;
                }).catch((err)=>{
                    window.location.href ='https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?media=software&country=CN&mt=8&term=';
                })
        },
        openapp:function(){
            if(this.canopen){
                    var _this = this;
                    //打开
                    clientApi.ios11openurl({bundleid:this.taskInfo.boundid}).then((response)=>{

                        if(_this.is_ios11 == 'true'){
                            console.log(response.data);
                            if(response.data == true) {
                                    var postparm = {
                                        taskid:_this.taskInfo.id,
                                    }
                                    //点击
                                    api.callbackopen(postparm).then((response)=>{
                                        var resole = response.data;
                                        if(resole.status){
                                            var _this = this;
                                            var ytimer = setInterval(function () {

                                                api.checkCanSub({taskid:_this.taskInfo.id}).then((response)=>{
                                                    console.log(response);
                                                        var resole = response.data;
                                                        if(resole.status){
                                                            if(resole.data.time>180){
                                                                  clearInterval(ytimer);
                                                                  _this.canlingjiang = true;  
                                                            }
                                                        }
                                                })

                                                // if(miao<=1){
                                                //     _this.canlingjiang = true;
                                                //     clearInterval(ytimer);
                                                // }
                                            }, 1000);
                                        }
                                    });
                            }else{
                                this.$MessageBox.alert("APP未安装，请先安装APP!");
                            }
                        }else{
                            var postparm = {
                                taskid:_this.taskInfo.id,
                            }
                            //点击
                            api.callbackopen(postparm).then((response)=>{
                                var resole = response.data;
                                if(resole.status){
                                    var _this = this;
                                    var ytimer = setInterval(function () {

                                        api.checkCanSub({taskid:_this.taskInfo.id}).then((response)=>{
                                            console.log(response);
                                                var resole = response.data;
                                                if(resole.status){
                                                    if(resole.data.time>180){
                                                            clearInterval(ytimer);
                                                            _this.canlingjiang = true;  
                                                    }
                                                }
                                        })
                                    }, 1000);
                                }
                            });
                        }
                    })
                
                return;

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
                 var postparm = {taskid:this.taskInfo.id}
                api.callbackActive(postparm).then((response)=>{
                    var resole = response.data;
                        if(resole.status){
                            this.$MessageBox.alert('已提交审核,请等待审核通过').then(()=>{
                                            location.href='/';
                                        });
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
