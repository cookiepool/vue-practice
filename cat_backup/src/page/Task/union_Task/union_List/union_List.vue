<template>
<div class="all_wrap">
    <div class="common_bac_color"></div>
    <app-header-step :title="'联盟任务'" :step="['下载安装','按要求完成试玩','领取奖励']"></app-header-step>
    <div class="union_head_tips">
        <p>收益自动到账，可能会存在延迟情况，请耐心等待。少数任务可能无法获得收益，可能的原因有：</p>
       <div class="tips_step flex_center">
           <div class="tipsIndex flex_all_center">1</div>
           <h2>非首次安装</h2>
       </div>
        <div class="tips_step flex_center">
           <div class="tipsIndex flex_all_center">2</div>
           <h2>未按任务要求完成所有步骤</h2>
       </div>
    </div>    

    <!-- 投放任务 -->
    <div v-cloak class="task_wrap" >
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/common_thorw.png" >
                <p>投放任务</p>
            </div>
        </div>
        <!-- 投放列表 -->
        <div class="common_list_wrap">
            <div class="placeholder"></div>
            <div class="common_item flex_btn_center" v-if="tasList.length > 0" v-for="(item,index) in tasList" @click="go_task(item,index)" :key="index">
                <div class="left_msg flex">
                   <img :src="item.ico">
                    <div class="word_msg">
                        <h2>{{item.taskname}}</h2>
                        <div class='bot_msg flex'>
                            <p class="price" v-for="(items,indexs) in item.tags" :class="items.classname">{{items.tagname}}</p>
                            <p class="surplus">搜索</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price">
                        +{{item.tuser_price}}<i>元</i>
                    </div>
                </div>
            </div>
            <div v-if="tasList.length==0" class="no_appre flex_column_center">
                <img src="https://static.cattryapp.com/12static/new/img/notask.png">
                <p class="tips1">暂无联盟任务</p>
                <i>下午三点后任务多多,请准时到场</i>
            </div>  
        </div>    
    </div>        
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
            wanpuData:[],
            fastyuanyuandata:[],
            fastdianrudata:[],
            callback:[],
            h5task:{},
            nowtask:{},
            loadprogress:{wanpu:undefined,dianru:undefined,youmi:undefined,doujin:undefined,qumi:undefined,qumisjy:undefined,cattry:undefined,gametask:undefined},
            totle:0,
            deviceinfo:null,
            user:{},
        }
    },

    mounted(){
        //默认回调
        this.getcallbacklist();
        //万普ok
        this.getwanpufastlist();
        //点入sdk,ok
        this.getdianrufastlist();
        //点入sdk,ok
        this.getdianruApilist();
        //伙伴云ok
        this.gethuobanlist();
        //圆圆圆
        this.getyuanyuanlist();
        clientApi.getv2deviceinfo().then((res)=>{
            if(res.status==1){
                this.deviceinfo = res.data
            }
        })
    },
    computed:{
        tasList:function(){
            var returndata = [];
            if(this.wanpuData.length>0){
                for(var j = this.wanpuData.length -1; j >= 0; j --){
                    returndata.push(this.wanpuData[j]);
                }
            }
            if(this.fastdianrudata.length>0){
                for(var j = this.fastdianrudata.length -1; j >= 0; j --){
                    returndata.push(this.fastdianrudata[j]);
                }
            }
            if(this.fastyuanyuandata.length>0){
                for(var j = this.fastyuanyuandata.length -1; j >= 0; j --){
                    returndata.push(this.fastyuanyuandata[j]);
                }
            }
            if(this.callback.length>0){
                for(var j = this.callback.length -1; j >= 0; j --){
                    returndata.push(this.callback[j]);
                }
            }        
            returndata.sort(function (a,b) {
                if(a.listordertype == b.listordertype) {
                    if (a.type == "fasktask" && b.type == "fasktask") {
                        if (a.tasking == b.tasking) {
                            return parseInt(b.remain_number) - parseInt(a.remain_number);
                        } else {
                            return b.tasking - a.tasking;
                        }
                    } else {
                        return b.listordertype - a.listordertype;
                    }
                }else{
                    //处理快速任务排序
                    if(a.type == "fasktask" && b.type != "fasktask"){
                        if(parseInt(a.remain_number) == 0 ){
                            return 1;
                        }else{
                            return -1;
                        }
                    }
                    if(a.type != "fasktask" && b.type == "fasktask"){
                        if(parseInt(b.remain_number) == 0 ){
                            return -1;
                        }else{
                            return 1;
                        }
                    }
                    return b.listordertype - a.listordertype;
                }
            });
            if(returndata.length==0){
                this.$loadding.open('加载中..')
            }else{
                this.$loadding.close()
            }
            return returndata;
        }
    },
    methods:{
        getdianruApilist:function(){
            api.getdianruApilist().then((response)=>{
                var resole  = response.data;
                if(resole.status){
                    var data = resole.data;
                    for(var i = 0; i < data.length; i++) {
                        var additem = {};
                        //console.log(response.data[i].title);
                        additem.taskid = data[i].adid;

                        additem.taskname = "搜索'"+data[i].keywords+"'";
                        //additem.tuser_price = (data[i].points/100).toFixed(2);
                        additem.tuser_price = data[i].price;
                        additem.tags = [];
                        additem.tags.push({tagname:"免费",classname:"tag-yellow"});
                        //防止推荐位剩余为0的时候不显示该任务
                        additem.remain_number = 1;
                        additem.ico = data[i].icon;
                        additem.boundid = data[i].bundleid;
                        additem.gourl = "";
                        additem.type = "dianruApi";
                        additem.listordertype = 99;
                        this.callback.push(additem);
                    }
                }
            })
        },
        //获取默认回调任务
        getcallbacklist:function(){
            api.callbacklist().then((response)=>{
                var resole  = response.data;
                if(resole.status){
                    var data = resole.data;
                    console.log(data);
                    this.user = data.userInfo;
                    for(var i = 0; i < data.list.length; i++) {
                        var additem = {};
                        additem.taskid = data.list[i].id;
                        additem.taskname = data.list[i].adname;
                        additem.tuser_price = data.list[i].price_tuser;
                        additem.tags = [];
                        additem.tags.push({tagname:"免费",classname:"tag-yellow"});
                        //防止推荐位剩余为0的时候不显示该任务
                        additem.remain_number = 1;
                        additem.ico = data.list[i].appios.icon;
                        additem.boundid = data.list[i].appios.boundid;
                        additem.gourl = "";
                        additem.type = "callback";
                        additem.listordertype = 100;
                        this.callback.push(additem);
                    }
                }
            })
        },
        //万普任务
        getwanpufastlist:function(){
            this.loadprogress.wanpu = false;
            clientApi.getv2deviceinfo().then((response)=>{
                clientApi.getwanpufastlisturl()
                .then((response)=>{
                    this.loadprogress.wanpu = true;
                    if(response.status == 1 && response.data.length > 0){
                        var len = response.data.length;
                        for(var i = 0; i < len; i++) {
                            var additem = {};
                            additem.taskid = response.data[i].ad_id;
                            additem.taskname = response.data[i].title;
                            additem.tuser_price = (response.data[i].points/100).toFixed(2);
                            additem.tags = [];
                            additem.tags.push({tagname:"免费",classname:"tag-yellow"});
                            //防止推荐位剩余为0的时候不显示该任务
                            additem.remain_number = 1;
                            additem.ico = response.data[i].icon;
                            additem.boundid = response.data[i].identifier;
                            additem.gourl = consts.wanpuredirecturl + response.data[i].click_url;
                            additem.type = "wanpufask";
                            additem.listordertype = 95;
                            this.wanpuData.push(additem);
                        }
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            })
        },
        //获取点入快速任务
        getdianrufastlist:function(){
            this.loadprogress.dianru = false;
            clientApi.getv2deviceinfo().then((response)=>{
                    var phone = response.data.dd;
                    phone=phone.replace("iPhone","");
                    phone=phone.split(",");
                    phone=phone[0];
                    clientApi.getdianrulisturl().then((response)=>{
                        this.loadprogress.dianru = true;
                        //console.log(response);
                        if(response.status == 1 && response.data.table.length > 0){
                            var datalen = response.data.table.length;
                            for (var i = 0; i < datalen; i++) {
                                if(response.data.table[i].adid == 19014){
                                    if(phone<8){
                                        continue;
                                    }
                                }
                                var additem = {};
                                additem.taskid = response.data.table[i].adid;
                                //additem.taskname = response.data.table[i].title.replace(/[&\|\\\*^%$#@amp;\-]/g,"");
                                if(response.data.table[i].keywords !=''){
                                    additem.taskname = "搜索'"+response.data.table[i].keywords+"'";
                                }else{
                                    additem.taskname = response.data.table[i].title.replace(/[&\|\\\*^%$#@amp;\-]/g,"");
                                }
                                additem.tuser_price = (response.data.table[i].price/100).toFixed(2);
                                additem.tags = [];
                                additem.tags.push({tagname:"免费",classname:"price"});
                                additem.tags.push({tagname:"剩余" + response.data.table[i].remain + "份"});
                                additem.remain_number = response.data.table[i].remain;
                                additem.ico = response.data.table[i].icon;
                                additem.boundid = response.data.table[i].bundleid;
                                additem.gourl = "/Uniontask/fastdianruapidetail.html?adid=" + additem.taskid ;
                                additem.type = "dianrufask";
                                additem.listordertype = 96;
                                additem.isShow = true;
                                this.fastdianrudata.push(additem);
                            }
                        }
                    }).catch((err)=>{
                        this.loadprogress.dianru = true;
                    console.log(err)
                    })

            })
        },
        //伙伴云
        gethuobanlist:function(){
            clientApi.getappinfo().then((response)=>{
                if(response.status == 1){
                var result = response.data.version.localeCompare("3.1.0");
                if(result != -1){
                    clientApi.getv2deviceinfo().then((response)=>{
                        var postdatas = {
                            dd:response.data.dd,
                            user:response.data.user,
                            //user:11220,
                            jb:response.data.jb,
                            osv:response.data.osv,
                            //osv:"9.0.2",
                            ifa:response.data.ifa,
                            //ifa:"D225A726-912F-4811-91DA-11826A7573C5",
                            ifa_track:response.data.ifa_track,
                            openudid:response.data.openudid,
                            dv:response.data.dv
                        };
                    api.gethuobanserverreturnlist({params:postdatas}).then((response)=>{
                         //console.log(response.data)
                        if(response.data.status == 1 && response.data.data.length > 0){
                        var datalen = response.data.data.length;
                        for (var i = 0; i < datalen; i++) {
                            var additem = {};
                            additem.taskid = response.data.data[i].ad_id;
                            additem.taskname = response.data.data[i].ad_subject.substr(0, 1)+"***";
                            additem.tuser_price = response.data.data[i].points;
                            additem.tags = [];
                            additem.tags.push({tagname:"免费",classname:"tag-yellow"});
                            additem.tags.push({tagname:"剩余" + response.data.data[i].remain + "份"});
                            additem.remain_number = response.data.data[i].remain;
                            additem.ico = response.data.data[i].icon_path;
                            additem.boundid = response.data.data[i].package_name;
                            additem.adname = response.data.data[i].search_key;
                            additem.type = "huobanfask";
                            additem.listordertype = 97;
                            this.fastyuanyuandata.push(additem);
                        }
                    }else {
                    }
                    }).catch((err)=>{
                        console.log(err)
                })
                    }).catch((err)=>{
                        console.log(err)
                })
                }
            }
            }).catch((err)=>{
                console.log(err)
            })
        },
        //圆圆圆
        getyuanyuanlist:function(){
            clientApi.getv2deviceinfo().then( (response)=> {
                var postdatas = {
                    dd:response.data.dd,
                    user:response.data.user,
                    jb:response.data.jb,
                    osv:response.data.osv,
                    ifa:response.data.ifa,
                    ifa_track:response.data.ifa_track,
                    openudid:response.data.openudid,
                    dv:response.data.dv
                };
                api.getyuanyuanlist({params:postdatas}).then( (response)=> {
                    if(response.data.status == 1 && response.data.data.length > 0){
                        var datalen = response.data.data.length;
                        for (var i = 0; i < datalen; i++) {
                            var additem = {};
                            additem.taskid = response.data.data[i].ad_id;
                            additem.taskname = "搜索'"+response.data.data[i].ad_subject+"'";
                            additem.tuser_price = response.data.data[i].points;
                            additem.tags = [];
                            additem.tags.push({tagname:"免费",classname:"price"});
                            additem.tags.push({tagname:"剩余" + response.data.data[i].remain + "份"});
                            additem.isShow = true;
                            additem.remain_number = response.data.data[i].remain;
                            additem.ico = response.data.data[i].icon_path;
                            additem.boundid = response.data.data[i].package_name;
                            additem.adname = response.data.data[i].search_key;
                            additem.taskType = response.data.data[i].taskType;
                            additem.radSystem = response.data.data[i].radSystem;
                            additem.gourl = "" ;
                            additem.type = "yuanyuan";
                            additem.listordertype = 98;
                            this.fastyuanyuandata.push(additem);
                        }
                        console.log(this.fasthuobandata);
                    }
                }).catch(function (err) {
                    console.log(err)
                });
            }).catch(function (err) {
                console.log(err)
            });
        },
        go_task:function(data){
            if(!this.user.bindPhone||!this.user.bindWx){
                this.$MessageBox.confirm('需完善个人资料后方可抢夺联盟任务').then(()=>{
                    this.$router.push(`/userinfo?heighLight=${true}`)
                }).catch(()=>{})
                return
            }
            switch(data.type){
                case 'wanpufask':
                    console.log(data.gourl);
                    //跳转详情
                    location.href = data.gourl;
                    break;
                case "dianrufask":
                    //跳转h5
                    this.$router.push({path:'./unionDetail',query:{adid:data.taskid}})
                    break;
                case "yuanyuan":
                    this.go_taskDetail(data)
                    break;
                case "huobanfask":
                    this.go_taskDetail(data)
                    break;
                case "dianruApi":
                    this.$router.push({path:'./dianruApiDetail',query:{adid:data.taskid}})
                    break;
                case "callback":
                    api.callbackcomplete({taskid:data.taskid}).then((response)=>{
                        var resole = response.data;
                        console.log(resole);
                        if(resole.status){
                            this.$router.push({path:'./unionCallbackDetail',query:{taskid:data.taskid}})
                        }else{
                            this.$MessageBox.alert(resole.msg);
                        }
                    });       
            }
        },
        go_taskDetail(item){
            this.$loadding.open('抢夺任务中')
            if(item.type=='yuanyuan'){
                var param = {
                    ad_id:item.taskid,
                    taskType:item.taskType,
                    adname:item.adname,
                    dd:this.deviceinfo.dd,
                    osv: this.deviceinfo.osv,
                    radSystem:item.radSystem
                }
                api.yuanyuanclick(param).then((res)=>{
                    this.$loadding.close()
                    console.log(res);
                    if(res.data.status){
                        var StartClickTime =  Date.parse(new Date())/1000+1800;      //进入任务详情开始时间
                        var DjsCookieId =  'yuanyuanDjs'+item.taskid            //任务ID倒计时cookie KEY值
                        common.setCookie(DjsCookieId,StartClickTime,30)           //设置cookie，过期30分钟
                        this.$router.push({path:'./newUnionDetail',query:{adid:item.taskid,type:'yuanyuan'}})
                    }else{
                        this.$MessageBox.alert(res.data.msg)
                    }
                }).catch((err)=>{

                })
            }else if(item.type == 'huobanfask'){
                var param = {
                    osv:this.deviceinfo.osv,
                    ifa:this.deviceinfo.ifa,
                    ad_id:item.taskid,
                    adname:item.adname
                }
                api.huobanclick(param).then((res)=>{
                     this.$loadding.close()
                    console.log(res);
                    var resole = res.data;
                    if(resole.status){
                        var StartClickTime =  Date.parse(new Date())/1000+1200;      //进入任务详情开始时间
                        var DjsCookieId =  'huobanDjs'+item.taskid              //任务ID倒计时cookie KEY值
                        common.setCookie(DjsCookieId,StartClickTime,30)           //设置cookie，过期30分钟
                        this.$router.push({path:'./newUnionDetail',query:{adid:item.taskid,type:'huoban'}})
                    }
                })
            }
        },     
    }
}
</script>
<style scoped>
.all_wrap{
    width: 100%;
    height: 100%;
    padding-bottom: 4.2857rem;
}
.union_head_tips{
    width: 100%;
    height:9.2857rem;
    padding: 0.5714rem 1.1429rem;
    box-sizing: border-box;
    background:rgba(255,252,238,1);
    margin-bottom: 0.8571rem;
}
.union_head_tips p{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.8571rem;
}
.union_head_tips h2{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(209,75,75,1);
    line-height: 1.4286rem;
}
.tipsIndex{
    width: 1rem;
    height: 1rem;
    border: 0.0714rem solid #D14B4B;
    border-radius: 50%;
    font-size: 0.8571rem;
    color: #D14B4B;
    margin-right: 0.4286rem;
}
.tips_step{
    margin: 0.5714rem 0 0
}
</style>
