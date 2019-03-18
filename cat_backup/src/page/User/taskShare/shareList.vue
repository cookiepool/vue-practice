<template>
    <div class="share_list">
        <app-header :title="'分享点赞'"></app-header>
        <app-headnav :navItem="['进行中','已完成']" :current_nav="Nav" v-on:navIndex="choseNav"></app-headnav>
        <h2 class="playMethod" @click="showMethod">玩法</h2>
        <!-- 进行中列表 -->
        <div v-if="Nav==0">
            <div v-if="share.length">
                <div class="list_item flex_btn_center" v-for="item in share">
                    <div class="share_app flex_center">
                        <img :src="item.icon" alt="" class="app_icon">
                        <div class="share_des">
                            <p class="share_money">+{{item.task_money}}元</p>
                            <span>召集好友点赞，最多再加0.5元</span>
                        </div>
                    </div>
                    <div class="btn_fxdz flex_all_center" @click="appShare(item.appid)">分享点赞</div>
                </div>
            </div>
            <div v-else>
                <div class="common_bac_color"></div>
                <div class="no_appre flex_column_center top0">
                    <img src="https://static.cattryapp.com/12static/new/img/wutudi.png">
                    <p class="tips1">暂无任务完成可以分享</p>
                    <i>我等的人他在多远的未来</i>
                </div>                
            </div>
        </div>
        <!-- 已完成列表 -->
        <div v-if="Nav==1">
            <div v-if="shared.length">
                <div class="list_item flex_btn_center" v-for="item in shared">
                    <div class="share_app flex_center">
                        <img :src="item.icon" alt="" class="app_icon">
                        <div class="share_des flex_column">
                            <p class="share_money">
                                <img :src="item.number?'https://static.cattryapp.com/12static/new/img/taskshare/thumb_up_active.png':'https://static.cattryapp.com/12static/new/img/taskshare/thumb_up.png'" alt="">
                                <i>集赞{{item.number}}个</i>
                            </p>
                            <span>{{item.desc}}</span>
                        </div>
                    </div>

                    <div class="btn_shared_money">+<span>{{item.money}}元</span></div>
                </div>
            </div>
            <div v-else>
                <div class="common_bac_color"></div>
                <div class="no_appre flex_column_center top0">
                    <img src="https://static.cattryapp.com/12static/new/img/wutudi.png">
                    <p class="tips1">暂无数据</p>
                    <i>我等的人他在多远的未来</i>
                </div>    
            </div>
        </div>

        <div class="shadow" v-if="shadow">
            <div class="share-content">
                <div class="share-title">分享到这里集赞</div>
                <div class="share-ways">
                    <div class="share-wechat flex_column_center" @click="taskShare('wechat')"><img src="https://static.cattryapp.com/12static/new/img/share_wechat.png"><p>朋友圈</p></div>
                    <div class="share-wechat-message flex_column_center" @click="taskShare('wechat_message')"><img src="https://static.cattryapp.com/12static/new/img/share_wechat_message.png"><p>微信</p></div>
                    <div class="share-QQ-message flex_column_center" @click="taskShare('qq_message')"><img src="https://static.cattryapp.com/12static/new/img/share_QQ_message.png"><p>QQ</p></div>
                    <div class="share-QQ flex_column_center" @click="taskShare('qzone')"><img src="https://static.cattryapp.com/12static/new/img/share_QQ.png"><p>QQ空间</p></div>
                    <div class="share-sina flex_column_center" @click="taskShare('sina')"><img src="https://static.cattryapp.com/12static/new/img/share_sina.png"><p>新浪微博</p></div>
                    <i>分享到朋友圈获得更多的赞</i>
                    <!--<div class="share-more"><img src="https://static.cattryapp.com/12static/new/img/share_more.png"><p>其他</p></div>-->
                </div>
            </div>
            <div class="close flex_all_center"><img src="https://static.cattryapp.com/12static/new/img/share_close.png" @click="shadow=false"></div>
        </div>
    </div>

</template>

<script>
    import api from '@//api/api.js'
    import dialog from '../../../components/dialog/index.js'
    export default {
        name: "shareList",
        data(){
            return {
                Nav: 0,  //顶部导航索引
                shadow:false,
                share:{},
                shared:{},
                appid:0,
                temp:"<div class='rules'>1. 玩法介绍：</h5><p>完成任意一个限时任务后点击【分享点赞】，分享至朋友圈、QQ空间或微博邀请好友点赞，或者点击【稍后再说】，后期可在【用户中心】-【分享点赞】里面参与分享点赞活动。</p ><h5>2. 奖励介绍：</h5><p>分享点赞最多可获得0.5元奖励，每获得一个赞，即可获得现金奖励。每位用户每天只有五次分享点赞的机会。</p ><h5>3.规则介绍</h5><p>用户分享点赞有效时长为一个小时，有效时长过后金奖励将转入您懒猫账户中。</p ><h5>4.法律效力</h5><p>懒猫试玩保留对分享点赞活动规则合法范围内的修改权及最终解释权。</p ></div>"
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                api.common_request('/User/taskshare.html').then((res)=>{
                    if(res.data.status == true){
                        this.share = res.data.data.share;
                        this.shared = res.data.data.shared;
                    }
                });
            },
            // 切换顶部导航
            choseNav(e){
                if(e == 0){
                    this.Nav=0;
                } else {
                    this.Nav=1;
                }
            },
            appShare(appid){
                this.shadow = true;
                this.appid = appid;
            },
            taskShare(type){
                this.shadow = false;
                api.common_request('/User/UpvoteSharData?appid='+this.appid+'&sharetype='+type).then((res)=>{
                    if(res.data.status == true){
                        var json_str = JSON.stringify(res.data.data);
                        document.location.href ='lazycat://sharePraise?'+json_str;
                    }else{
                        this.$MessageBox.alert(res.data.msg);
                    }
                });
            },
            showMethod(){
                 dialog.show("分享点赞玩法",this.temp);
            }
        }
    }
</script>

<style scoped>
.top0{
    top: 15%!important
}
    .playMethod{
        position: fixed;
        right: 0.8rem;
        top: 1.1rem;
        z-index: 200;
        color: white;
        font-size: 1.1rem
    }
    .share_list{background-color: #F6F6F6;height: 100%;width: 100%;}
    .list_item{padding: 14px 16px;box-sizing: border-box;height: 64px;border-bottom: 1px solid #eeeeee;background-color: #fff;}
    .list_item:last-child{border:0;}
    .app_icon{height: 36px;border-radius: 5px;display: block;}
    .share_des{margin-left: 12px;}
    .share_des span{color: #999999;font-size: 13px;}
    .share_money{margin-bottom: 8px;font-size: 16px;color: #333333;font-weight: bolder;}
    .share_money img{width: 16px;}
    .btn_fxdz{width: 78px;height: 30px;background-color: #FF6353;color: #fff;border-radius: 15px;}
    .btn_shared_money{color: #FF6353;font-weight: bolder;}
    .btn_shared_money span{font-size: 20px;}

    .shadow{position: fixed;width: 100%;height: 100%;top:0px;left: 0px;bottom: 0px;background: rgba(0,0,0,0.8);}
    .share-content{width: 300px;height: 300px;margin: 100px auto 0;background-color: #FFFFFF;padding-top: 23px;border-radius: 6px;}
    .share-title{width: 100%;text-align: center;font-size: 15px;}
    .share-ways div{margin: 28px 0 0 28px;float: left;}
    .share-ways div p{float: left;margin-top: 10px;width: 100%;text-align: center;}
    .share-ways i{font-style: normal; width:100%;display: block;float: left;text-align: center; color: red;margin-top: 20px;font-size: 14px;}
    .close{margin: 30px auto 0;}
    .close-img{margin: 0 auto;}
    .no_appre{
        margin-top: 10rem;
    }
    .no_appre img{
        width: 94px;
        margin-bottom: 26px
    }
    .no_appre .tips1{
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
        margin-bottom: 12px;
    }
    .no_appre i{
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);  
    }
</style>