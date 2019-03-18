<template>
<div class="all_wrap">
    <div class="common_bac_color"></div>
    <div v-show="showAll" class="shade" @click="cancelNav"></div>
    <div class="head_wrap">
        <app-header :title="'我的账单'"></app-header>
        <app-headnav :navItem="['收支明细','提现历史']" :current_nav="headNav" v-on:navIndex="choseNav"></app-headnav>
    </div>
    <!-- 收入明细wrpa -->
    <div v-if="headNav==0" class="income_wrap">
        <div class="head_filter_wrap">
            <div class="head_filter flex_btn_center">
                <div class="left_msg flex_center">
                    <img class="icon" src="https://static.cattryapp.com/12static/new/img/my_bill_select.png">
                    <div class="flex_center" @click="spreadNav">
                        <h2 class="cur_nav">{{curNav}}</h2>
                        <img class="arrow" :class="showAll?'rotate':''" src="https://static.cattryapp.com/12static/new/img/my_bill_arrow_bot.png">
                    </div>
                </div>
                <i @click="test">显示近30天收入</i>
            </div>     
            <!-- 展开全部导航 -->
            <div class="more_nav" v-show="showAll">
                <div class="btn flex_all_center"  @click="selectNav()" :class="curNav=='全部'?'select':''"><i>全部</i></div>
                <div class="income_nav">
                    <h2>任务收入</h2>
                    <div class="nav_wrap flex">
                        <div class="btn item flex_all_center" :class="[index==3?'nomargin':'',curNav==item?'select':'']"
                            v-for="(item,index) in taskNav" @click="selectNav(item)" :key="index">
                            <p>{{item.name}}</p>
                         </div>
                    </div>
                </div>
                <div class="income_nav">
                    <h2>其它收入</h2>
                    <div class="nav_wrap flex">
                        <div class="btn item flex_all_center" :class="[index==3?'nomargin':'',curNav==item?'select':'']" 
                            v-for="(item,index) in otherNav" @click="selectNav(item)" :key="index">
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </div>            
            </div>
        </div> 
        <!-- 列表 -->
        <div class="all_list_wrap">
            <mt-loadmore :autoFill=false :bottomDistance=30 :bottom-method="loadBottom" ref="loadmore">
                <div v-for="(item,index) in arr" :key="index" class="daily_list_item">
                    <div class="date_msg flex_btn_center">
                        <h2>{{item.date}}</h2>
                        <i>收入￥{{item.money}}</i>
                    </div>
                    <div class="list_wrap">
                        <div v-for="(item2,index) in item.data" :key="index" class="item flex_btn_center">
                            <div class="left_msg flex_column">
                                <h2>{{item2.description}}
                                    <p v-if="item2.type==0" class="who_tips">徒弟</p>
                                    <p v-else-if="item2.type==2" class="who_tips">徒孙</p>
                                </h2>
                                <span v-if="item2.type==1" class='type'>主要任务</span>
                                <span v-else-if="item2.type==0||item2.type==2" class='type'>师徒任务</span>
                                <span v-else-if="item2.type==3" class='type'>新手任务</span>
                                <span v-else-if="item2.type==4" class='type'>填入邀请码</span>
                                <span v-else-if="item2.type==6" class='type'>系统任务</span> 
                                <span v-else-if="item2.type==7" class='type'>打款失败返回余额</span>                        
                                <span v-else-if="item2.type==8" class='type'>联盟任务</span>
                                <span v-else-if="item2.type==9" class='type'>游戏任务</span>
                                <span v-else-if="item2.type==98" class='type'>快速任务分享</span>
                                <span v-else-if="item2.type==99" class='type'>天天开奖中奖</span>
                                <i>{{item2.time}}</i>
                            </div>
                            <div class="right_msg" v-if="item2.money > 0">
                                +{{item2.money}}<span>元</span>
                            </div>

                            <div class="right_msg zbright_msg" v-else>
                                {{item2.money}}<span>元</span>
                            </div>
                        </div>
                        <div v-if="item.hasmore&&item.data.length>=5" class="check_more" @click="oneDayMore(item,index)">查看当日更多</div>
                    </div>
                </div>
                <h1 v-if="hasmore" class="tc">上拉加载更多</h1>
                <h1 v-else class="tc">没有更多了</h1>
            </mt-loadmore>
    
        </div>
    </div>
    <!-- 提现历史wrap -->
        <div v-else class="income_history_wrap" >
            <div v-if="cashList.length>0">
                <div class="withdraw_item flex_btn_center" v-for="(item,index) in cashList" :key="index">
                    <div class="left_msg flex_center">
                        <img src="https://static.cattryapp.com/12static/new/img/my_bill_wechat.png">
                        <div class="flex_column">
                            <h2>{{item.description}}</h2>
                            <i>{{item.time}}</i>
                        </div>
                    </div>
                    <div class="right_msg">
                        <div v-if="item.cashing===1" class="flex_center" >
                            <p class="cashing">提现中</p>
                            <!-- <img src="https://static.cattryapp.com/12static/new/img/my_bill_rightArr.png"> -->
                        </div>
                        <div v-else-if="item.money<0" class="success flex_column">
                            <h3 class="blue_word">提现成功</h3>
                            <h4>{{item.money}}元</h4>
                        </div>
                        <div v-else>
                            <h3 class="red_word">提现失败</h3>
                            <h4>+{{item.money}}元</h4>                            
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="no_appre flex_column_center">
                <img src="https://static.cattryapp.com/12static/new/img/notask.png">
                <p class="tips1">暂无提现记录</p>
            </div> 
        </div>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default {
    name:'APP',
    data(){
        return {
            headNav:0,  //0-收入明细，1-提现历史
            all:'全部',
            taskNav:[{type:1,name:'主要任务'},{type:8,name:'联盟任务'},{type:3,name:'新手任务'},
                     {type:9,name:'游戏任务'}],
            otherNav:[{type:0,name:'师徒邀请'},{type:6,name:'系统任务'},{type:4,name:'填入邀请码'}],
            showAll:false,   //显示全部收入导航
            curNav:'全部',   //当前展示列表分类（默认全部）

            arr:[],         //列表数据
            hasmore:true,    //是否还有更多天数的数据
            cashList:[],       //提现记录
        }
    },

    mounted(){
        this.init()
    },
    
    methods:{
        init(){
            console.log(this.$route.query.history);
            if(this.$route.query.history) this.headNav=1;
            this.getBill();
            var param = {page:1}
            api.getCashList(param).then((res)=>{
                console.log(res)
                if(res.data.status==true){
                    this.cashList=res.data.data;
                }
            })
        },
        //获取账单处理
        getBill(param){
            api.getBillList(param).then((res)=>{
                console.log(res)
                if(res.data.status==true){
                    var arr = res.data.data;
                    this.dataHandle(arr)    //处理description
                    this.arr = arr;
                }
            })    
        },
        //数据处理
        dataHandle(arr,add){
            if(add){
                for(var i=0;i<arr.length;i++){
                    var item = arr[i];
                    item.time = this.timestamp(item.time);
                    if(item.type==0||item.type==2){
                        var cutIndex = item.description.indexOf("激活")
                        var newDes = item.description.slice(2,cutIndex)
                        item.description = newDes
                    }
                }
                return arr
            }
            for(var i=0;i<arr.length;i++){
                arr[i].hasmore=true
                for(var j=0;j<arr[i].data.length;j++){
                    var item = arr[i].data[j]
                    item.time = this.timestamp(item.time)
                    if(item.type==0||item.type==2){
                        var cutIndex = item.description.indexOf("激活")
                        var newDes = item.description.slice(2,cutIndex)
                        item.description = newDes
                    }
                }
            }
            return arr
        },
        //当天查看更多
        oneDayMore(item,index){
            var type;
            var date = item.date;
            var page=item.page?item.page+1:2;
            item.page=page
            var param={date:date,page:page};
            api.daymoreMsg(param).then((res)=>{
                var arr = res.data.data;
                if(arr.length<5){
                   item.hasmore=false
                }
                this.dataHandle(arr,'add')      //处理description 需传'add'字符串
                var oldarr=this.arr[index].data;
                var newarr = oldarr.concat(arr)
                this.arr[index].data = newarr
            })
        },

        //上拉加载更多
        loadBottom(){
            if(this.hasmore==false){
                return
            }
            var index = this.arr.length-1;
            var date = this.arr[index].date;
            var param = {date:date}
            api.getBillList(param).then((res)=>{        
               if(res.data.status==true){
                  var arr = res.data.data;
                  if(arr.length==0){        //没有更多数据
                      this.hasmore=false
                      return
                  }
                  this.dataHandle(arr)      //处理description
                  var newArr = this.arr.concat(arr) //加长列表数组
                  this.arr = newArr        
               }
            })
            this.$refs.loadmore.onBottomLoaded();
          
        },
        //顶部导航
        choseNav(e){
            this.headNav=e
        },
        //展开全部导航
        spreadNav(){
            this.showAll=!this.showAll
        },
        cancelNav(){
            this.showAll=false
        },
        //选择账单类别导航
        selectNav(item){
            if(!item){
                this.curNav='全部';
                this.showAll=false;
                this.getBill()
                return
            }
            this.curNav=item.name
            this.showAll=false
            //获取指定类型列表
            var param = {type:item.type};
            this.getBill(param)
        },
               //时间戳转换
        timestamp(str){
            var Y,M,D,h,m;
            var date = new Date(str*1000);
            Y = date.getFullYear() + '-';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            D = date.getDate() + ' ';
            h = date.getHours() + ':';
            m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
            return M+D+h+m
        },
    }


}
</script>

<style scoped>
h3{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500; 
    margin-bottom: 0.4286rem
}
h4{
    font-size:1.1429rem;
    font-family:HelveticaNeue-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.blue_word{
    color:rgba(81,146,245,1);
}
.red_word{
    color: #FF6353;
}
.cashing{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,163,64,1);
    padding-right: .8rem
}
.all_wrap{
     width: 100%;
}
 .head_wrap{
     position: relative;
     z-index: 200;
}
 .shade{
     width: 100%;
     height: 100%;
     position: fixed;
     top: 0;
     left: 0;
     z-index: 100;
     background: rgba(0, 0, 0, 0.6) 
}
 .head_filter_wrap{
     position: relative;
     z-index: 200;
}
 .more_nav{
     position: absolute;
     width: 100%;
     background:rgba(255,255,255,1);
     left: 0;
     padding: 1.1428571428571428rem 1.1428571428571428rem 2.2857142857142856rem;
     box-sizing: border-box;
}
 .btn{
     width:5.142857142857143rem;
     height:1.8571428571428572rem;
     background:rgba(243,245,249,1);
     border-radius:0.14285714285714285rem;
     font-size:1rem;
     font-family:PingFangSC-Regular;
     color:rgba(102,102,102,1);
}
 .select{
     background:rgba(81,146,245,1);
     font-weight:500;
     color:rgba(255,255,255,1);
}
 .income_nav{
     margin-top: 1.4285714285714286rem;
}
 .income_nav h2{
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(153,153,153,1);
}
 .nav_wrap{
     flex-wrap: wrap 
}
 .nav_wrap .item{
     margin: 1.1428571428571428rem 1.1428571428571428rem 0 0 
}
 .nomargin{
     margin-right: 0!important;
}
 .head_filter{
     width: 100%;
     height: 2.857142857142857rem;
     padding: 0 1.1428571428571428rem;
     box-sizing: border-box;
     background: rgba(255, 255, 255, 1);
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(153,153,153,1);
     border-bottom: 1px solid rgba(241,241,241,1) 
}
 .left_msg .cur_nav{
     margin: 0 0.5714285714285714rem;
     font-size:1rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(51,51,51,1);
}
 .left_msg .icon{
     width: 1.1428571428571428rem;
}
 .left_msg .arrow{
     width: 0.8571428571428571rem 
}
 .rotate{
     transform: rotate(180deg) 
}
 .all_list_wrap{
     padding-bottom:2.142857142857143rem;
}
 .all_list_wrap h1{
     margin-top: 3.5714285714285716rem;
     color: gray;
}
 .daily_list_item{
     z-index: -100;
}
 .date_msg{
     width: 100%;
     height: 3.142857142857143rem;
     padding: 0 1.1428571428571428rem;
     box-sizing: border-box;
     font-size:0.9285714285714286rem;
     font-family:PingFangSC-Regular;
     color:rgba(102,102,102,1);
}
 .date_msg h2{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(51,51,51,1);
}
 .list_wrap{
     padding: 0 1.1428571428571428rem 0.5714285714285714rem;
     box-sizing: border-box;
     background: white;
}
 .list_wrap .item{
     padding: 0.5714285714285714rem 0;
     box-sizing: border-box;
     border-bottom: 1px solid rgba(241,241,241,1);
}
 .list_wrap .left_msg h2{
     font-family:PingFangSC-Regular;
     color:rgba(51,51,51,1);
     position: relative;
     font-size: 1rem;
     align-self: baseline;
     width: 17.857142857142858rem;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
}
 .who_tips{
     position: absolute;
     right: -3.5714285714285716rem;
     top: 0rem;
     padding: 0.14285714285714285rem 0.5rem;
     font-size:0.7142857142857143rem;
     font-family:PingFangSC-Regular;
     color:#999999;
     border-radius:0.5714285714285714rem;
     border:1px solid rgba(153,153,153,1);
}
 .red{
     color:rgba(255,99,83,1);
     border:1px solid rgba(255,99,83,1);
}
 .list_wrap .item .type{
     padding: 0.14285714285714285rem 0.42857142857142855rem;
     font-size:0.7857142857142857rem;
     font-family:PingFangSC-Regular;
     color:rgba(81,146,245,1);
     border-radius:0.14285714285714285rem;
     border:1px solid rgba(81,146,245,1);
     align-self: baseline;
     margin: 0.42857142857142855rem 0 0.5rem;
}
 .list_wrap .left_msg i{
     font-size:0.9285714285714286rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
}
 .list_wrap .right_msg{
     font-size:1.4285714285714286rem;
     font-family:HelveticaNeue-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
}
 .list_wrap .zbright_msg{
     color:green;
 }
 .right_msg span{
     font-size: 1rem 
}
 .check_more{
     font-size:0.9285714285714286rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
     text-align: center;
     margin-top: 0.7142857142857143rem;
}
 .income_history_wrap{
     padding: 0 1.1428571428571428rem;
     box-sizing: border-box;
     background: white;
     margin-top: .1rem
}
 .withdraw_item{
     /* padding: 0.7142857142857143rem 0; */
     height: 5.1429rem;
     box-sizing: border-box;
     border-bottom: 1px solid rgba(241,241,241,1) 
}
 .withdraw_item .left_msg img{
     width: 2.2857142857142856rem;
     height: 2.2857142857142856rem;
     border-radius: 50%;
     margin-right: 0.8571428571428571rem;
}
 .withdraw_item .left_msg h2{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Regular;
     color:rgba(51,51,51,1);
     line-height:1.1428571428571428rem;
}
 .withdraw_item .left_msg i{
     font-size:0.9285714285714286rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     margin-top: 0.5714285714285714rem 
}
 .withdraw_item .right_msg{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(102,102,102,1);
}
 .withdraw_item .right_msg img{
     width: 0.5714285714285714rem;
     margin-left: 0.7142857142857143rem 
}
 .withdraw_item .right_msg .price{
     font-size:1.4285714285714286rem;
     font-family:HelveticaNeue-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
}
 .withdraw_item .right_msg .price span{
     font-size: 1rem 
}
 
</style>
