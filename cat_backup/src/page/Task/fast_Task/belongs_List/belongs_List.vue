<template>
<div class="all_wrap">
    <div class="common_bac_color"></div>
    <app-header-step :title="'专属任务'" :step="['打开应用','根据页面提示进行操作','领取奖励']"></app-header-step>
    

    <!-- 投放任务 -->
    <div v-cloak class="task_wrap" >
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/common_thorw.png" >
                <p>专属任务</p>
            </div>
<!--             <p class="right_msg">
                总计{{totle}}元
            </p> -->
        </div>
        <!-- 投放列表 -->
        <div class="common_list_wrap">
            <div class="placeholder"></div>
            <div class="common_item flex_btn_center" v-if="belongsData.length > 0" v-for="(item,index) in belongsData"  :key="index" v-show="item.isShow==true">
                <div class="left_msg flex">
                   <img :src="item.icon">
                    <div class="word_msg">
                        <h2>{{item.name}}</h2>
                        <div class='ret_msg'>
                            +{{item.price}}<i>元</i>
                        </div>
                    </div>
                </div>
                <div class="btn flex_all_center"  @click="openapp(item)" v-show="canlingjiang==false">打开应用</div>
                <div class="btn flex_all_center canlingjiang"  @click="activetask(item)" v-show="canlingjiang==true">领取奖励</div>
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
            belongsData:[],
            canlingjiang:false,
            is_ios11:false,
        }
    },

    mounted(){
        this.getbelonglist();
    },
    computed:{

    },
    methods:{
        getbelonglist: function () {
            api.get_belong_data()
                    .then((response)=>{
                console.log(response)
            if (response.data.status == true) {
                this.belongsData=response.data.data.belongs;
                this.is_ios11=response.data.data.is_ios11;
            }
            })
        },
        openapp: function (item) {
            var data={bundleid:encodeURI(item.boundid)}
            if(this.is_ios11==true){
                clientApi.ios11openurl(data).then( (response)=> {
                    if(response.data==1){
                    window.location.href =item.openurl;
                    var checkOpen=setInterval( (res) =>{
                                api.common_request(item.isopen).then((response)=>{
                                if(response.data.status==true){
                        clearInterval(checkOpen);
                        this.canlingjiang=true;
                    }
                            })
                            },1000)

                }else {
                    this.$MessageBox.confirm('您的应用已经删除,请重新下载打开','温馨提示',{
                                confirmButtonText:'去下载',
                                showCancelButton:false,
                                closeOnClickModal:false})
                            .then((response)=>{
                        window.location.href = item.appstore_url;
                }).catch((err)=>{
                        window.location.href = item.appstore_url;
                })
                }
            }).catch((err)=>{
                    this.$MessageBox.alert('网络错误');
                console.log(err);
            })
            }else {
                clientApi.checktaskinstall(item.installAppUrl)
                        .then( (response)=> {
                    if (response.status == 1) {
                    clientApi.ios11openurl(data).then( (response)=> {
                        var checkOpen=setInterval( (res) =>{
                                    api.common_request(item.isopen).then((response)=>{
                                    if(response.data.status==true){
                        clearInterval(checkOpen);
                        this.canlingjiang=true;
                    }
                })
                },1000)

                    })
                }else {
                    this.$MessageBox.confirm('您的应用已经删除,请重新下载打开','温馨提示',{
                                confirmButtonText:'去下载',
                                showCancelButton:false,
                                closeOnClickModal:false})
                            .then((response)=>{
                        window.location.href = item.appstore_url;
                }).catch((err)=>{
                        window.location.href = item.appstore_url;
                })
                }
            }).catch( (err)=>{
                    console.log("checkinstall step two--localcheck");
                console.log(err);
            }
            );
            }
        },
        activetask: function (item) {
            if(this.canlingjiang){console.log(item.activeUrl)
                clientApi.common_request(item.activeUrl)
                        .then( (response) =>{
                            if(response.status == 1){
                    item.isShow=false;
                                this.$MessageBox.alert('完成任务,领奖成功');

                            }else{
                                if(response.data.data == -6){
                                    this.$MessageBox.alert('您没有打开应用，请从打开应用');
                                }else{
                                    this.$MessageBox.alert("网络错误" );
                                }
                            }
                        }).catch(function (err) {

                            console.log(err);
                        }
                );
            }
        },
        // 选择顶部导航
        choseNav:function(e){
            console.log(e)
           // 返回的0 1 2 ...分别为传入的导航索引
        },
    }


}
</script>

<style scoped>

.btn{
    width: 100px;
    height: 30px;
    background: rgba(81,146,245,1);
    border-radius: 22px;
    color: white;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
}
.canlingjiang{
    background: #FF6353;
}
.ret_msg{
    font-size: 1.4285714285714286rem;
    font-family: HelveticaNeue-Medium;
    font-weight: 500;
    color: rgba(255,99,83,1);
}
.ret_msg i{
    font-size: 1rem !important;
    color: red !important;
}
</style>
