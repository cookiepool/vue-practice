<template>
<div class="all_wrap">
 <app-header :title="'我的徒弟'"></app-header>
 <div class='head_nav flex_btn_center'>
     <div class="item flex_all_center" :class="Nav==0?'select':''" @click="gonav1">
         <h2>有效徒弟({{total1}})</h2>
         <div v-if="Nav==0" class="red_line"></div>
     </div>
     <div class="item flex_all_center" :class="Nav==1?'select':''" @click="gonav2">
         <h2>徒弟列表({{total2}})</h2>
         <div v-if="Nav==1" class="red_line"></div>
     </div>     
 </div>
    <div v-if="showStausPop">
        <div class="shade"></div>
        <div class="status_wrap">
            <h2 class="status_title">状态说明</h2>
            <div class="word_wrap">
                <h2 class="valid">有效</h2>
                <p>完成一个任务的徒弟为有效徒弟</p>
            </div>
            <div class="word_wrap">
                <h2>无效</h2>
                <p>未完成一个任务的徒弟为无效徒弟，师父无法获得奖励</p>
            </div>     
            <div class="status_btn flex_all_center" @click="showStausPop=false">我知道了</div>       
        </div>
    </div>
    <!-- 有效徒弟 -->
    <div v-if="Nav==0">
        <div v-if="List.length>0">
            <div class="list_head flex_center">
                <h2 @click="loadmore">徒弟昵称</h2>
                <h2>累计分成<br>(元)</h2>
                <h2>最新分成<br>(元)</h2>
                <h2 class="ml10">时间</h2>
            </div>
            <mt-loadmore :autoFill=false :bottomDistance=10 :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
            <ul class="list_wrap">
                <li class="list_item flex_center" v-for="(item,index) in List" :key="index">
                    <div class="item1 flex_all_center"><p>{{item.name}}</p></div>
                    <div class="item2 red flex_all_center">{{item.total_money}}</div>
                    <div class="item3 bold flex_all_center">{{item.money}}</div>
                    <div class="item4 flex_all_center">{{item.update_time}}</div>
                </li>
            </ul>
            </mt-loadmore>
            <h2 v-if="!nomore&&!loadding" class="loadmore_word">上拉加载更多...</h2>
            <h2 v-if="nomore&&!loadding" class="loadmore_word">没有更多了</h2>
        </div>
        <div v-else class="noList flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/myAppre_noAppre.png">
            <h2>暂无数据</h2>
            <i>去收徒，开起躺着赚钱模式～</i>
            <div class="btn flex_all_center" @click="startGetAppre">收徒赚钱</div>
        </div>
    </div>
    <!-- 所有徒弟 -->
    <div v-else>
        <div v-if="List2.length>0">
            <div class="list_head flex_center">
                <h1 @click="loadmore">徒弟ID</h1>
                <h1>徒弟昵称</h1>
                <h1>收徒时间</h1>
                <div class="flex_center" @click="statusPop">
                    <h1 class="mr0">状态</h1>
                    <img src="https://static.cattryapp.com/12static/new/img/myAppreList_status.png">
                </div>
            </div> 
            <mt-loadmore :autoFill=false :bottomDistance=10 :top-method="loadTop2" :bottom-method="loadBottom2" ref="loadmore2">
            <ul class="list_wrap">
                <li class="list_item flex_center" v-for="(item,index) in List2" :key="index">
                    <div class="item1 mr8 flex_all_center">{{item.id}}</div>
                    <div class="item1 red flex_all_center"><p>{{item.name}}</p></div>
                    <div class="item3 w3 bold flex_all_center">{{item.create_time}}</div>
                    <div class="item4 w4 flex_all_center">
                        <i v-if="item.valid==0">无效</i>
                        <p v-else>有效</p>
                    </div>
                </li>
            </ul>  
            </mt-loadmore>    
            <h2 v-if="!nomore2&&!loadding2" class="loadmore_word">上拉加载更多...</h2>
            <h2 v-if="nomore2&&!loadding2" class="loadmore_word">没有更多了</h2>  
        </div>  
        <div v-else class="noList flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/myAppre_noAppre.png">
            <h2>暂无数据</h2>
            <i>去收徒，开起躺着赚钱模式～</i>
            <div class="btn flex_all_center" @click="startGetAppre">收徒赚钱</div>
        </div>      
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import common from '@//api/common.js'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default {
    name:'APP',
    data(){
        return {
            Nav:0,              //顶部导航
            List:[{}],      
            total1:'', 
            List2:[{}], 
            total2:'',
            page:1,  
            page2:1,                   
            nomore:false,       //全部数据加载完毕
            nomore2:false,
            loadding:false,     //loading加载中
            loadding2:false,
            showStausPop:false, //状态说明弹窗
        }
    },

    mounted(){
        this.init()
    },

    methods:{
        init(){
            this.$loadding.open()
            // 获取有效徒弟列表
            this.validList().then(()=>{
                this.$loadding.close()
            })
            //所有徒弟列表
            this.appreList()
        },
        //有效徒弟Init
        validList(){
            return new Promise((resolve,reject)=>{
                api.getvalidApprentice().then((res)=>{
                    this.$loadding.close()
                    console.log(res);
                    var list = res.data.data.apprentices;
                    list.map((item)=>{
                        item.update_time = common.timestampToTime(item.update_time)
                    })
                    this.List = list
                    this.total1 = res.data.data.total
                    this.page=1
                    this.List.length<10? this.nomore=true : this.nomore=false
                    resolve()
                })
            })
        },
        //所有徒弟Init
        appreList(){
            return new Promise((resolve,reject)=>{
                api.getAppreList().then((res)=>{
                    console.log(res);
                    var list = res.data.data.apprentices;
                    list.map((item)=>{
                        item.create_time = common.timestampToTime(item.create_time)
                    })
                    this.List2 = list
                    this.total2 = res.data.data.total
                    this.page2=1
                    this.List2.length<10? this.nomore2=true : this.nomore2=false
                    resolve()
                })
            })            
        },
        // 切换导航
        gonav1(){
            this.Nav=0
        },
        gonav2(){
            this.Nav=1
        },
        //下拉刷新
        loadTop() {
            this.validList()
            this.$refs.loadmore.onTopLoaded();
        },
        loadTop2() {
            this.appreList()
            this.$refs.loadmore2.onTopLoaded();
        },
        //触底事件
        loadBottom(){
            if(this.nomore) {
                this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
                return
            }
            this.loadmore()
        },
        loadBottom2(){
            if(this.nomore2) {
                this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore2.onBottomLoaded();
                return
            }
            this.loadmore2()
        },        
        //加载更多
        loadmore(){
            this.loadding = true
            var CurList = this.List;
            var param = {page:this.page+1};
            api.getvalidApprentice(param).then((res)=>{
                this.loadding=false
                console.log(res);
               var list = res.data.data.apprentices;
                list.map((item)=>{
                    item.update_time = common.timestampToTime(item.update_time)
                })
               if(list.length==10){
                    this.List=this.List.concat(list)
                    this.page=this.page+1
                    this.allLoaded = true;// 若数据已全部获取完毕
                    this.$refs.loadmore.onBottomLoaded();
               }else if(list.length>0){
                    this.nomore = true
                    this.List=this.List.concat(list)
                    this.page=this.page+1
                    this.allLoaded = true;// 若数据已全部获取完毕
                    this.$refs.loadmore.onBottomLoaded();
               }else{
                   this.nomore = true
                    this.allLoaded = true;// 若数据已全部获取完毕
                    this.$refs.loadmore.onBottomLoaded();
               }
            })
        },
        loadmore2(){
            this.loadding2 = true
            var CurList = this.List;
            var param = {page:this.page2+1};
            api.getAppreList(param).then((res)=>{
                this.loadding2=false
                console.log(res);
               var list = res.data.data.apprentices;
                list.map((item)=>{
                    item.update_time = common.timestampToTime(item.update_time)
                })
               if(list.length==10){
                    this.List2=this.List2.concat(list)
                    this.page2=this.page2+1
                    this.allLoaded = true;// 若数据已全部获取完毕
                    this.$refs.loadmore2.onBottomLoaded();
               }else if(list.length>0){
                    this.nomore2 = true
                    this.List2=this.List2.concat(list)
                    this.page2=this.page2+1
                    this.allLoaded = true;// 若数据已全部获取完毕
                    this.$refs.loadmore2.onBottomLoaded();                   
               }else{
                    this.nomore2 = true
                    this.allLoaded = true;// 若数据已全部获取完毕
                    this.$refs.loadmore2.onBottomLoaded();
               }
            })
        },
        //状态说明弹窗
        statusPop(){
            this.showStausPop = true
        },
        //点击收徒赚钱
        startGetAppre(){
            _hmt.push(['_trackEvent', '我的徒弟', '点击收徒赚钱', '进入收徒首页']);
            this.$router.replace('/appreHome')
        }
    }
}
</script>

<style scoped>
.head_nav{
    width: 100%;
    height: 44px;
    background: white;
}
.head_nav .item{
    width: 50%;
    height: 100%;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: relative;
}
.red_line{
    width:24px;
    height:3px;
    background:rgba(255,99,83,1);
    border-radius:2px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%)
}
.select{
    font-weight:500!important;
    color:rgba(51,51,51,1)!important;  
}
.noList{
    padding: 100px 0 0;
    box-sizing: border-box;
}
.noList img{
    width: 100px;
}
.noList h2{
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    margin: 20px 0 12px
}
.noList i{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.noList .btn{
    width:220px;
    height:44px;
    border-radius:22px;
    border:1px solid rgba(255,99,83,1); 
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1); 
    margin: 28px 0 0
}
.status_btn{
    width:10rem;
    height:2.8571rem;
    border-radius:1.5714rem;
    border:0.0714rem solid rgba(255,99,83,1);
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
    margin: 2.1429rem auto 0
}
.status_wrap{
    width:20rem;
    height:22.7857rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    padding: 2rem 1.4286rem;
    box-sizing: border-box;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 300;
}
.status_title{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:1.7857rem;
    text-align: center;
    margin-bottom: 1.7857rem;
}
.word_wrap{
    margin-top: 1.5714rem;
}
.word_wrap p{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:1.4286rem;
}
.word_wrap h2{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    margin-bottom: 0.7143rem;
}
.valid{
    color: #FF6353!important
}
.item4 i{
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
}
.item4 p{
    font-size:1rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
}
.mint-loadmore-top {
    margin-top: -0.7143rem;
}
.mint-loadmore-bottom {
    margin-bottom: -2.1429rem;
}
.all_wrap{
    min-height: 100%;
    background:rgba(246,246,246,1);
}
.list_head{
    margin-top: 0.8571rem;
    width: 100%;
    height:3.2143rem;
    background:rgba(255,252,238,1);
    padding: 0 0.7143rem 0 1.4286rem;
    box-sizing: border-box;
}
.list_head h2{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(209,75,75,1);
    margin-right: 2.1429rem;
    text-align: center;
    line-height: 1.1429rem;
}
.list_head h1{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(209,75,75,1);
    margin-right: 3.7143rem;   
}
.list_head img{
    width: 0.8571rem;
    margin-left: 0.2857rem
}
.mr0{
    margin-right: 0!important
}
.ml10{
    margin-left: 2rem;
}
.list_wrap{
    width: 100%;
    background: white
}
.list_wrap li{
    width: 100%;
    height: 3.4286rem;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-left: 0.7143rem;
    box-sizing: border-box;
}
.item1{
    flex:1;
    min-width:0!important;
    width: 5.6429rem;
}
.item1 p{
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
.item2{
    height: 100%;
    width: 5.7143rem
}
.item3{
    width: 5rem
}
.item4{
    width: 9.4286rem;
    height: 100%;
    font-size: 0.9286rem;
    color:rgba(102,102,102,1);
}
.red{
  color:rgba(255,99,83,1);  
}
.bold{
    font-weight: 500
}
.loadmore_word{
    text-align: center;
    margin-top: 1.4286rem;
    padding-bottom: 2.8571rem;
}
.mr8{
    margin-right: 1.7143rem
}
.w4{
    width: 5.7143rem
}
.w3{
    width: 8.7143rem;
}
</style>
