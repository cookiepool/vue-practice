<template>
<div class="all_wrap">
    <div class="common_bac_color"></div>
    <app-header-step :title="'游戏任务'" :step="['下载安装','按要求完成试玩','领取奖励']"></app-header-step>
    <!-- 账户安全提示 -->
    <safeTips v-if="!save_info"></safeTips>
    <!-- 投放任务 -->
    <div v-cloak class="task_wrap mt10" >
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/common_thorw.png" >
                <p>投放任务</p>
            </div>
            <p class="right_msg">
                总计{{totle}}元
            </p>
        </div>
        <!-- 投放列表 -->
        <div class="common_list_wrap">
            <div class="placeholder"></div>

            <div class="common_item flex_btn_center" v-if="nowtaskData.length > 0" v-for="(item,index) in nowtaskData" @click="go_task(item,1)" :key="index">
                <div class="left_msg flex">
                   <img :src="item.icon">
                    <div class="word_msg limite">
                        <h2>{{item.name}}</h2>
                        <div class='bot_msg flex'>
                            <p class="price">免费</p>
                            <p class="surplus">注册</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price" v-if="item.price_tuser > 0">
                        +{{item.price_tuser}}<i>元</i>
                    </div>
                </div>
            </div>

<!--             <div class="common_item flex_btn_center" v-if="youleurl.length > 0"  @click="go_task({},3)">
                <div class="left_msg flex">
                   <img src="https://static.cattryapp.com/12static/new/img/yp_youle.jpg">
                    <div class="word_msg limite">
                        <h2>玩有乐游戏 赚钱</h2>
                        <div class='bot_msg flex'>
                            <p class="price">免费</p>
                            <p class="surplus">注册</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price">
                        +20356.50<i>元</i>
                    </div>
                </div>
            </div> -->

            <div class="common_item flex_btn_center" v-if="h5taskData.length > 0" v-for="(item,index) in h5taskData" @click="go_task(item,2)" :key="index">
                <div class="left_msg flex">
                   <img :src="item.imgurl">
                    <div class="word_msg limite">
                        <h2>{{item.adname}}</h2>
                        <!-- <i>注册、下载、截图</i> -->
                        <div class='bot_msg flex'>
                            <p class="price">免费</p>
                            <p class="surplus">注册</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price">
                        +{{item.showmoney}}<i>元</i>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import api from '@//api/api.js'
import clientApi from '../../../../api/clientApi.js'
import {LazyLoad} from "@//api/LazyLoad.js";
import safeTips from '@//components/safety_tips/safety_tips.vue'
export default {
    name:'APP',
    data(){
        return {
            h5task:[],
            nowtask:[],
            juxiangData:[],
            getTaoJinListData:[],
            totle:0,
            //youleData:[{"yp_type" :"youle","price_tuser":"20356.51","listordertype":"98","icon":"https://static.cattryapp.com/12static/new/img/yp_youle.jpg","name":"玩有乐游戏 赚钱"}],
            youleData:[],
            youleurl:"",
            user:{},
            save_info:1,    //是否完善账户信息
            taoJinToken:""
        }
    },

    mounted(){
        this.$loadding.open()
        this.init();
        //聚享玩
        this.juxiang();
        this.getTaoJinList();
    },
    components:{
        safeTips:safeTips
    },
    computed:{
        nowtaskData:function(){
            var data=[];
            //data = this.nowtask;
            // var additem = {};
            // additem.yp_type = "youle";
            // additem.price_tuser = "20356.51";
            // additem.listordertype=98;
            // additem.icon="https://static.cattryapp.com/12static/new/img/yp_youle.jpg";
            // additem.name="玩有乐游戏 赚钱";
            // data.push(additem);
            if(this.youleData.length>0){
                for(var j = this.youleData.length -1; j >= 0; j --){
                    data.push(this.youleData[j]);
                }
            }

            if(this.nowtask.length>0){
                for(var j = this.nowtask.length -1; j >= 0; j --){
                    data.push(this.nowtask[j]);
                }
            }
            if(this.juxiangData.length>0){
                for(var j = this.juxiangData.length -1; j >= 0; j --){
                    data.push(this.juxiangData[j]);
                }
            }
            if(this.getTaoJinListData.length>0){
                for(var j = this.getTaoJinListData.length -1; j >= 0; j --){
                    data.push(this.getTaoJinListData[j]);
                }
            }

            data.sort(function (a,b) {
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

            return data;
        },
        h5taskData:function(){
            var data={};
            data = this.h5task;
            return data;
        }
    },
    methods:{
        init(){
            api.gameTasklist().then((response)=>{
                console.log(response)
                this.$loadding.close()
                var resole = response.data;
                if(resole.status){
                    this.h5task=resole.data.h5task;
                    this.nowtask=resole.data.nowtask;
                    this.totle=resole.data.totle;
                    this.youleurl = resole.data.youle;
                    this.user = resole.data.userInfo;
                    console.log(this.save_info);
                    this.save_info =resole.data.save_info;
                    console.log(resole);
                    console.log(this.save_info);
                }else{
                    this.$MessageBox.alert(resole.msg);
                }
            })
            .catch( (err)=> {
                console.log(err);
            });
        },
        getTaoJinList:function(){
            api.getTaoJinList().then((response)=>{
                var resole = response.data;
                if(resole.status){
                    var data = resole.data;
                    for(var i = 0; i < data.length; i++) {
                        var additem = {};
                        additem.ad_id = data[i].IDTask;
                        additem.name = data[i].AppName + "IOS" + data[i].Label[0];
                        additem.icon = data[i].Logo;
                        additem.yp_type = "taojin";
                        additem.price_tuser = data[i].MtTaskFeeSum+"0";
                        additem.listordertype=97;
                        this.getTaoJinListData.push(additem);
                    }
                    console.log(this.getTaoJinListData);
                }
            })
        },
        juxiang:function(){
            api.juxiangApi().then((response)=>{
                var resole = response.data;
                if(resole.status){
                    var data = resole.data;
                    for(var i = 0; i < data.length; i++) {
                        var additem = {};
                        additem.ad_id = data[i].ad_id;
                        additem.name = data[i].title;
                        additem.icon = data[i].image;
                        additem.yp_type = data[i].yp_type;
                        additem.price_tuser = data[i].max_prize+".00";
                        additem.listordertype=97;
                        this.juxiangData.push(additem);
                    }
                }
            })
        },
        go_task:function(data,type){
            switch(data.yp_type){
                case 'zijia':
                    switch(type){
                        case 1:
                            //跳转详情
                            this.$router.push({path:'./gameDetail',query:{gameId:data.id}})
                            break;
                        case 2:
                            //跳转h5
                            location.href=data.adlink;
                            break;
                    }
                    break;
                case 'taojin':
                        //跳转详情
                        this.$router.push({path:'./gameDetail?idTask=',query:{idTask:data.ad_id}})
                        break;
                case 'youle':
                    location.href=this.youleurl;
                    break;
                case 'juxiang':
                    api.juxiangApiZhuce().then((response)=>{
                        var resole = response.data;
                        if(resole.status){
                            location.href="http://task.juxiangwan.com/games/details/"+data.ad_id+"?utoken="+resole.data.utoken+"&mid=240&from=h5ios";
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
    height: 100%;
    width: 100%;
    padding-bottom: 60px;
}
.limite{
    width: 160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.mt10{
    margin-top: 0.714rem
}
</style>
