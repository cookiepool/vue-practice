<template>
<div class="all_wrap">
<div class="common_bac_color"></div>
    <div class="head_wrap">
        <!-- <i class='common_methods'>攻略</i> -->
        <app-header :title="'游戏任务详情'"></app-header>
        <div class="head_taskTime_wrap flex_all_center">
            <img src="https://static.cattryapp.com/12static/new/img/game_detail_time.png">
            <p> 任务时间 : {{gameData.task_time}} </p>
        </div>
        <!-- 任务信息 -->
        <div class="common_app_msg_wrap">
            <i class="size">{{gameData.size}}</i>
            <div class="common_app_msg flex_btn_center">
                <div class="left_msg flex">
                    <img :src="gameData.icon">
                    <div class="word_msg">
                        <h2>{{gameData.name}}</h2>
                        <i>无病毒 无广告</i>
                        <div class='flex'>
                            <p class="price">免费</p>
                            <!-- <p class="surplus">剩1420份</p> -->
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    +{{gameData.price_tuser}}<i>元</i>
                </div>
            </div>
            <div class="waring">
                <img src="https://static.cattryapp.com/12static/new/img/game_detail_range.png">
                <i>老用户可参加</i>{{getHeight}}
            </div>
        </div>
    </div>

    <!-- 帐号信息 -->
    <div class="account_msg">
        <div class="banner_wrap flex_all_center">帐号信息</div>

        <p v-if="!rejister">注册APP后，回来<span @click="reload">点此刷新</span>确认账号，账号显示后才能获得奖励</p>

        <div v-else class="showaccountmsg">
            <div class="flex_btn_center">
                <p v-if="uid > 0">游戏账号：<i>{{uid}}</i></p>
                <p v-if="money > 0">累计领奖：<i>{{money}}</i></p>
                <p class='mr20' v-if="playnum > 0">累计局数：<i>{{playnum}}</i></p>
            </div>
            <p v-if="wingold > 0">累计金币：<i>{{wingold}}</i></p>
            <p v-if="payamount > 0">累计充值：<i>{{payamount}}</i></p>
            <div v-if="isTaojin == 1" class="flex_btn_center">
                <ol>
                    <li v-for="todo in accountInfo">
                    <p>{{ todo.Key }} ：<i>{{ todo.Val }}</i></p>
                    </li>
                </ol>
            </div>
        </div>
        <div class="refresh_wrap flex_btn_center">
            <div class="refresh_placeholder"></div>
            <p class="refresh" v-if="rejister" @click="shuaxing">点击刷新</p>
        </div>
    </div>
    <!-- 任务流程 -->
    <div class="task_flow">
        <div class="banner_wrap flex_all_center">任务流程</div>
        <div class="task_step_wrap">
            <!-- 任务流程步骤循环 -->
            <div class="flow_item flex" v-for="(item,index) in guidsData" :key="index">
                <div class="left_reddot">
                    <div class="reddot"></div>
                    <div v-if="index+1!=guidsData.length" class="greyline"></div>
                </div>
                
                <p v-if="isTaojin != 1" v-html="item.value"></p>
                <p v-if="isTaojin == 1" v-html="item"></p>
            </div>

            
        </div> 
        <!-- 更多注意事项 -->
        <div class="more_msg flex_btn_center">
            <div class="line"></div>
            <div class="mid_msg flex_all_center" @click="showmoreDetail">
                <i v-if="!showmore">更多注意事项</i>
                <i v-else>收起</i>
                <img :class="showmore?'rotate180':''" src="https://static.cattryapp.com/12static/new/img/game_bottomarrow.png">
            </div>
            <div class="line"></div>
        </div>
        <div v-show="showmore" class="more_msg_detail" :class="showmore?'moreheight':''">
           <p v-if="isTaojin != 1" v-for="(item,index) in processData" :key="index"  v-html="item.key+' . '+item.value"></p>
           <p v-if="isTaojin == 1" v-for="(item,index) in processData" :key="index"  v-html="item"></p>
        </div>
    </div>
    <!-- 任务奖励 -->
    <div class="reward_wrap">
        <div class='reward_placeholder'></div>
        <div class="banner_wrap flex_all_center">任务奖励</div>
        <!-- reward_item为v-for项，'btn_had_receive'为按钮已领取样式，'btn_heigh'为按钮当前高亮样式
        'heighlighted'为文字高亮样式 -->
        <div v-if="awardData" class="reward_tabs_container">
            <div :style="{ width: btnWidth + '%'}" :class="{reward_title_btn: true, active: index == nowIndex}" v-for="(item, index) of awardData" :key="index" @click.stop="switchTab(index)">{{ item.Title }}</div>
        </div>
        <div class="reward_title_info" v-if="awardData&&awardData[nowIndex]">{{ awardData[nowIndex].Desc }}</div>
        <div class="reward_item" v-for="(item,index) in singleTabData.List" :key="index">
            <div class="flex detail_msg">
                <div class="left_msg flex" :class="item.gstatus?'heighlighted':''">
                    <h2>{{index}}.</h2>
                    <p>{{item.TaskContent}}</p>
                </div>
                <div class="reward_btn flex_all_center" :class="item.gstatus?'btn_heigh':''">+{{item.TaskGold}}<span>{{ item.Unit }}</span></div>
            </div>
            <p v-if="item.gstatus"  class="receive_reward">已领取奖励</p>
            <p v-if="item.State == 2"  class="receive_reward">任务已完成</p>
        </div>         
    </div>

    <div class="placeholder" ref="placeholder"></div>
    <!-- 底部单按钮 -->
    <div v-if="oneBtn">
        <div v-show="!btnStatus" class="bot_btn_wrap flex_all_center"> 
            <div class="btn flex_all_center" @click="startGame()">开始试玩</div>
        </div>
        <div class="btn flex_all_center" @click="startGame()">开始试玩</div>
    </div>
    <!-- 底部双按钮 -->
    <div v-else>
        <div v-show="!btnStatus" class="bot_btn_wrap pd20 flex_btn_center"> 
            <div class="btn2 flex_all_center">去下载</div>
            <div class="btn2 red flex_all_center">领取奖励</div>
        </div>
        <div class="pd20 flex_btn_center"> 
            <div class="btn2 flex_all_center">去下载</div>
            <div class="btn2 red flex_all_center">领取奖励</div>
        </div>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
export default {
    name:'APP',
    data(){
        return {
            rejister:false,     //是否注册了
            showmore:false,     //是否展示更多注意事项
            guidsData:[],
            isTaojin : false,
            uid:0,//游戏账号
            gameData:[],
            processData:[],
            desData:[],
            gtype:'',
            statusFlag:0,
            getRewardData:[],    //领奖返回数据
            accountInfo:[],
            money:0,    //累计收益
            playnum:0,   //累计局数
            wingold:0,    //累计金币
            payamount:0,   //累计充值
            btnStatus:false,     //底部按钮状态
            oneBtn:true,     //底部按钮数量  true-单按钮 ， false-双按钮
            awardData: [], //奖励数据
            btnWidth: 0, //切换按钮的宽度
            singleTabData: {}, //当前按钮标题数据
            nowIndex: 0 //当前点击的索引值
        }
    },
    mounted(){
        this.init().then(()=>{
            this.$nextTick().then(()=>{
                    var height = document.body.scrollHeight;
                    this.theHeight = height
            })
        })
        window.addEventListener('scroll', this.handleScroll);
    },

    computed:{
        desDataList:function(){
            var data = [];
            data = this.desData;
            for (var i = 0; i < data.length; i++) {
                data[i]['gstatus']=0;
            }
            if(this.getRewardData.length>0){
                var rdata = this.getRewardData;
                if (this.isTaojin == 1) {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < rdata.length; j++) {
                            if(data[i]['id'] == rdata[j]['des_id']){
                                data[i]['gstatus']=1;
                                continue;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < rdata.length; j++) {
                            if(data[i]['id'] == rdata[j]['des_id']){
                                data[i]['gstatus']=1;
                                continue;
                            }
                        }
                    }
                }
            }
            return data;
        },   
    },


    methods:{
        init:function(){

            if (this.$route.query.idTask > 0 ) {
                return new Promise((resolve,reject)=>{
                    this.$loadding.open()
                        var gameId = this.$route.query.idTask;
                        api.getTaoJinDetail(gameId).then((response)=>{
                            this.$loadding.close()
                            var resole = response.data;
                            if(resole.CanPlay == 1){
                                this.isTaojin = 1;
                                this.guidsData=resole.Raiders;
                                if (resole.AccountInfo.length > 0) {
                                    this.rejister = true;
                                    this.accountInfo = resole.AccountInfo;
                                }
                                this.gameData.task_time = "剩余" + resole.Days + "天";
                                this.gameData.icon =resole.Logo;
                                this.gameData.name =resole.AppName;
                                this.gameData.price_tuser =resole.GoldSum;
                                this.gameData.down_url =resole.UrlDownload;
                                this.gameData.id =resole.IDTask;

                                this.processData = resole.Content;
                                this.desData=resole.SubTaskList;
                                this.awardData = resole.SubTaskList;
                                this.btnWidth = 100 / (this.awardData.length);
                                this.singleTabData = this.awardData[0];
                                console.log(this.awardData)
                                console.log(this.singleTabData)
                                this.gtype="taojin";
                                // this.statusFlag=resole.statusFlag;
                                resolve()                 
                            }
                            
                        })
                })
                .catch( (err)=> {
                    console.log(err);
                    //this.loadprogress.cattry = true;

                });

                
            } else {
                return new Promise((resolve,reject)=>{
                    this.$loadding.open()
                        var gameId = this.$route.query.gameId;
                        var par = {taskid:gameId}
                        api.gameDetail({params:par}).then((response)=>{
                            this.$loadding.close()
                            var resole = response.data;
                            console.log(resole.data);
                            if(resole.status){
                                this.guidsData=resole.data.guids;
                                this.gameData=resole.data.gametask;
                                this.processData = resole.data.process;
                                this.desData=resole.data.des;
                                this.gtype=resole.data.urlType;
                                this.statusFlag=resole.data.statusFlag;
                                if(resole.data.statusFlag == 1){
                                    this.getReward(gameId);
                                }  
                                resolve()                 
                            }
                            
                        })
                })
                .catch( (err)=> {
                    console.log(err);
                    //this.loadprogress.cattry = true;
                });
            }
            
        },
        shuaxing:function(){
            location.reload();
        },
        handleScroll (){
            this.$nextTick(()=>{
                var seeHeight = document.body.clientHeight || document.documentElement.clientHeight;
                var height = document.body.scrollHeight;
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop+seeHeight>height-175){
                    this.btnStatus=true
                }else{
                    this.btnStatus=false
                }
            })
        },

        //刷新页面
        reload(){
            this.init()
        },
        //显示更多注意事项
        showmoreDetail:function(){
            this.showmore=!this.showmore;
            console.log(this.showmore)
        },
        //领奖
        getReward:function(gameId){
            var type = this.gtype;
            switch(type){
                case 'guaishou':
                    
                    var par = {taskid:gameId}
                    api.getRewardguaishou(par).then((response)=>{
                        var resole = response.data;
                        //console.log(resole.data);
                        if(resole.status){
                            this.rejister = true;
                            this.getRewardData = resole.data.info;
                            this.money = resole.data.money;
                            this.uid = resole.data.uid;
                            this.playnum = resole.data.playnum;
                            this.wingold = resole.data.wingold;
                            this.payamount = resole.data.payamount;
                        }
                         console.log(document.body.scrollHeight)        
                    })
                    break;
                case 'puyu':
                    console.log('puyu');
                    var par = {taskid:gameId}
                    api.getRewardpuyu({params:par}).then((response)=>{
                        var resole = response.data;
                        //console.log(resole.data);
                        if(resole.status){
                            this.rejister = true;
                            this.getRewardData = resole.data.info;
                            this.money = resole.data.money;
                            this.uid = resole.data.uid;
                            this.playnum = resole.data.playnum;
                            this.wingold = resole.data.wingold;
                            this.payamount = resole.data.payamount;
                        }
                         console.log(document.body.scrollHeight)        
                    })
                    break;
                case 'aiwan':
                    console.log('aiwan');
                    var par = {taskid:gameId}
                    api.getRewardaiwan({params:par}).then((response)=>{
                        var resole = response.data;
                        //console.log(resole.data);
                        if(resole.status){
                            this.rejister = true;
                            this.getRewardData = resole.data.info;
                            this.money = resole.data.money;
                            this.uid = resole.data.uid;
                            this.playnum = resole.data.playnum;
                            this.wingold = resole.data.wingold;
                            this.payamount = resole.data.payamount;
                        }
                    })
                    break;
                case 'huopin':
                    console.log('huopin');
                    var par = {taskid:gameId}
                    api.getRewardhpmajiang({params:par}).then((response)=>{
                        var resole = response.data;
                        //console.log(resole.data);
                        if(resole.status){
                            this.rejister = true;
                            this.uid =  resole.data.uid;
                            this.getRewardData = resole.data.info;
                            this.money = resole.data.money;
                            this.playnum = resole.data.playnum;
                            this.wingold = resole.data.wingold;
                            this.payamount = resole.data.payamount;
                        }
                    })
                    break;
                case 'default':
                    console.log('default');
                    var par = {taskid:gameId}
                    api.getReward({params:par}).then((response)=>{
                        var resole = response.data;
                        console.log(resole.data);
                        if(resole.status){
                            this.rejister = true;
                            this.getRewardData = resole.data.info;
                            this.money = resole.data.money;
                            this.playnum = resole.data.playnum;
                            this.wingold = resole.data.wingold;
                            this.payamount = resole.data.payamount;
                        }
                    })
                    break;
                case 'redbaoshi':
                    console.log('default');
                    var par = {taskid:gameId}
                    api.getRewardredbaoshi({params:par}).then((response)=>{
                        var resole = response.data;
                        console.log(resole.data);
                        if(resole.status){
                            this.rejister = true;
                            this.uid =  resole.data.uid;
                            this.getRewardData = resole.data.info;
                            this.money = resole.data.money;
                            this.playnum = resole.data.playnum;
                            this.wingold = resole.data.wingold;
                            this.payamount = resole.data.payamount;
                        }
                    })
                    break;

            }
        },
        //
        startGame:function(){
            var type = this.gtype;
            var gameData = this.gameData
            switch(type){
                case 'taojin':
                    location.href = gameData.down_url;
                    break;
                case 'puyu':
                    console.log(gameData.down_url);
                    location.href = gameData.down_url;
                    break;
                case 'huopin':
                    location.href = gameData.down_url;
                    break;
                case 'aiwan':
                    location.href = gameData.down_url;
                    break;
                case 'guaishou':
                    location.href = gameData.down_url;
                    break;
                case 'redbaoshi':
                    location.href = gameData.down_url;
                    break;
                case 'default':
                    var par = {taskid:gameData.id}
                    api.gameClick({params:par}).then((response)=>{
                        var resole = response.data;
                        location.href =gameData.down_url;
                        if(resole.status){
                            //location.href =gameData.down_url;
                        }else{
                            this.$MessageBox.alert(resole.msg);
                        }

                    })
                    .catch( (err)=> {
                        console.log(err);
                        //this.loadprogress.cattry = true;

                    });
                    break;

            }
        },
        switchTab: function(index) {
            this.singleTabData = this.awardData[index];
            this.nowIndex = index;
        }

    }


}
</script>

<style scoped>
.reward_tabs_container{
    display: flex;
    justify-content: space-between;
    align-item: center;
}
.reward_title_btn{
    display: flex;
    justify-content: center;
    align-item: center;
    padding: .4rem 0 .8rem 0;
}
.reward_title_btn.active{
    border-bottom: 1px solid #ff3d3d;
    color: #ff3d3d;
}
.reward_title_info{
    color: #ff3d3d;
    text-align: center;
    padding: 1.4rem 0 .8rem 0;
}
.refresh_placeholder{
    width: 0.1429rem;
}
.all_wrap{
    padding-bottom: 3.7143rem;
}
.mr20{
    margin-right: 2.4rem;
}
.head_wrap{
    width:26.79rem;
    height:10.82rem;
    background: url('https://static.cattryapp.com/12static/new/img/user_head_bac.png');
    background-size: 100% 100%;
    position: relative;
}
.head_taskTime_wrap{
    width:22.76rem;
    height:2.14rem;
    background:rgba(255,99,83,1);
    border-radius:1.07rem;
    margin: 1rem auto;
    font-size:0.86rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    line-height:0.86rem;
}
.head_taskTime_wrap img{
    width: 1.1429rem;
    margin-right: 0.4286rem;
    margin-left: -0.4286rem;
}
.common_app_msg_wrap{
    bottom: -5.3rem
}
.common_app_msg_wrap .size{
    position: absolute;
    right: 1.1429rem;
    top: 1.1429rem;
    font-size:0.7857rem;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
}
.common_app_msg_wrap .right_msg{
    margin-top: 0.7rem
}
.waring{
    display: flex;
    align-items: center;
    padding-top: 0.8571rem;
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
}
.waring img{
    width: 1.0714rem;
    margin-right: 0.5714rem;
}
.word_msg h2{
    margin-top: 0.6rem;
    margin-bottom: 0.57rem;
}
.word_msg i{
    display: inline-block;
    font-size:0.7143rem;
    font-family:PingFangSC-Regular;
    color:rgba(81,146,245,1);
    line-height:1rem;
    margin-bottom: 0.4286rem;
}
.account_msg{
    margin: 7.857rem auto 0;
    width:25.0714rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    padding: 3.1429rem 1.1429rem 1.7143rem;
    box-sizing: border-box;
    position: relative;
    color:rgba(51,51,51,1);
    line-height:1.4286rem;
}
.account_msg span{
    color: #5192F5;
    text-decoration:underline
}
.refresh{
    font-size:1rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(81,146,245,1);
}
.banner_wrap{
    width:9rem;
    height:2.2857rem;
    background:linear-gradient(126deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:0rem 1.1429rem 1.1429rem 0rem;
    position: absolute;
    top: -0.7143rem;
    left: -0.8571rem;
    font-size:1.2143rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.showaccountmsg{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:0.9286rem;
}
.showaccountmsg p{
    margin-bottom: 0.9286rem;
}
.showaccountmsg i{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1rem;
}
.task_flow{
    margin: 1.5714rem auto 0;
    width:25.0714rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    padding: 3.1429rem 1.1429rem 1.7143rem;
    box-sizing: border-box;
    position: relative;
}
.task_step_wrap{
    position: relative;
}
.left_reddot{
    margin-right: 0.7143rem;
    position: relative;
    margin-top: 0.2857rem;
}
.flow_item p{
    padding-bottom: 0.8571rem;
    line-height: 1.4286rem
}
.reddot{
    width:0.5714rem;
    height:0.5714rem;
    background:rgba(255,99,83,1);
    border-radius: 50%;
    margin-top: 2.8px;
}
.greyline{
    position: absolute;
    top: 0.7857rem;
    left: 46%;
    width: 0.0714rem;
    height: 90%;
    background:rgba(220,220,220,1);
}
.greyline :last-child{
    display: none
}
.more_msg{
    font-size:0.8571rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#5192F5;
    line-height:1.2143rem;
}
.more_msg .line{
    width:7.5714rem;
    height:0.0714rem;
    background:rgba(241,241,241,1);
}
.more_msg img{
    width: 0.8571rem;
    margin-left: 0.4286rem;
}
.rotate180{
    transform: rotate(180deg)
}
.more_msg_detail{
    margin-top: 1.1429rem;
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:1.4286rem;   
}
.more_msg_detail p{
    margin-bottom: 0.8571rem;
}
.reward_wrap{
    position: relative;
    width:25.0714rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    margin: 2.2857rem auto 1.2857rem;
    padding: 3.1429rem 1.1429rem 1.4286rem;
    box-sizing: border-box;
}
.reward_placeholder{
    position: absolute;
    width: 100%;
    height: 0.1429rem;
    bottom: 1.4286rem;
    left: 0;
    background: white;
}
.reward_item{
    width: 100%;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:1.4286rem;
    box-sizing: border-box;
    border-bottom: 0.0714rem solid rgba(241,241,241,1);
}
.reward_item p{
    width: 16.4286rem;
}
.reward_item h2{
    margin-right: 0.2857rem;
}
.reward_btn{
    width:4.2857rem;
    height:1.7857rem;
    background:rgba(204,204,204,1);
    border-radius:1.0714rem;
    color: white;
    font-size:0.8571rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:1.2143rem;
}
.reward_btn span{
    font-size: 0.7857rem;
}
.reward_item .detail_msg{
    padding: 0.8571rem 0rem 1rem;
    width: 100%;
    justify-content: space-between;
}
.receive_reward{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,99,83,1);
    line-height:1.4286rem;
    margin-left: 1.0714rem;
    margin-bottom: 0.5714rem;
}
.heighlighted{
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.btn_had_receive{
    background:rgba(255,99,83,0.3);
    color:rgba(255,255,255,0.7);
}
.btn_heigh{
    background:rgba(255,99,83,1);
    color:rgba(255,255,255,1);
}
.bot_btn_wrap{
    position: fixed;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width:100%;
    height:4.2857rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem 0.1429rem 0.5714rem 0rem rgba(0,0,0,0.1);
}
.btn{
    width:22.5rem;
    height:3.1429rem;
    background:#5192F5;
    border-radius:1.5714rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin: 0 auto 0
}
.btn2{
    width:11.4286rem;
    height:3.1429rem;
    background:rgba(77,123,255,1);
    border-radius:1.5714rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.pd20{
    padding: 0 1.4286rem;
    box-sizing: border-box;
}
.btnchange{
    color: red
}
.red{
    background:rgba(255,99,83,1);
}
</style>
