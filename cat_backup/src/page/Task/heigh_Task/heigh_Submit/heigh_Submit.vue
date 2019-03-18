<template>
<div class="all_wrap">
    <div class="common_bac_color"></div>
   <app-header :title="'提交审核'"></app-header>
   <!-- 顶部提示 -->
   <div class="head_tips_wrap">
       <div class="bac"></div>
       <div class="head_tips_title flex_center">
           <img src="https://static.cattryapp.com/12static/new/img/heigh_submit_tips.png">
           <i>温馨提示</i>
       </div>
        <div class="tips_item flex">
           <span>•</span> <p>每个任务都需要提交审核后方能获取奖励;</p>
        </div>
         <div class="tips_item flex">
            <span>•</span><p>请确保提交审核的信息与做任务的信息一致，避免不能通过审核;</p>
        </div>
         <div class="tips_item flex">
            <span>•</span><p>您所提交的信息，懒猫试玩官方将予以保密；</p>
        </div> 
        <div class="tips_item flex">
            <span>•</span><p>审核将在7个工作日内完成，请耐心等待。</p>
        </div>               
    </div>
    <!-- 资料审核 -->
    <div class="auditing_wrap">
        <div class="banner_wrap flex_all_center">资料审核</div>
        <h2>按照要求填写信息</h2>
        <div class="input_wrap flex">
            <p>审核资料: </p><input type="number" v-model="phone" placeholder="输入任务注册账号/手机号" />
        </div>
        <div class="input_wrap flex" v-for="(item,index) in description" :key="index" >
            <p>{{item.key}}: </p><input type="text" v-model="field[index]" :placeholder="item.key" />
        </div>
    </div>
    <!-- 上传截图凭证 -->
    <div class="screenshot_wrap">
        <div class="banner_wrap banner_large flex_all_center">上传截图凭证</div>
        <i class="total_tips">请参照示例截取对应页面上传</i>
        <div class="screen_item" v-for="(item,index) in screenshot" :key="index">
            <div class="step_title flex">
                <div class="red_dot"></div>
                <p>截图任务步骤{{item.step}}/{{item.step}}</p>
            </div>
            <h2 class="word_tips">{{item.des}}</h2>
            <div class="screenshot flex" v-for="(image,i) in item.images" :key="i">
                <div class="img_wrap">
                    <img :src="image.url">
                    <div class="imgtips flex_all_center">
                        截图样式
                    </div>
                </div>
                <form action="" enctype="multipart/form-data">
                    <input type="file" class="image_check"  @change="changeImg(index,i)" ref="file" :id="gernerate_file_Id(index,i)" accept="image/* " >
                      <div class="img_wrap">
                          <img :id="gernerate_img_Id(index,i)" src="https://static.cattryapp.com/12static/new/img/heigh_submit_up.png">
                      </div>    
                </form>
            </div>
        </div>
    </div>
    <!-- 底部提交按钮 -->
    <div class="btn flex_all_center" @click="submit">提交审核</div>

    <!-- 提交成功弹窗 -->
    <div v-if="show" @touchmove.prevent>
        <div class="shade"></div>
        <transition name="fade">
            <div class="pop flex_column_center">
                <img class="san" src="https://static.cattryapp.com/12static/new/img/submit_head_cat.png">
                <p class="tips1">审核提交成功</p>
                <p class="tips2">等待审核,审核通过后次日到账</p>
                <div class="start_up flex_all_center" @click="continue_play">继续试玩</div>
                <div class="tips3 flex_all_center" @click="detail">查看审核详情<img src="https://static.cattryapp.com/12static/new/img/submit_go_back.png"></div>
            </div>
        </transition>
    </div>

</div>    
</template>

<script>
import api from '@//api/api.js'
export default {
    name:'APP',
    data(){
        return {
            img: [],            //用户上传的base64图片
            field: [],          //审核表单自定义字段的值
            phone: "",           //必填资料

            screenshot: [],     //截图列表
            description: [],     //审核字段

            key: [],            //字段的key
            show: false,        //提交成功显示
            check_tuser: null,
            detail_id:0
        }
    },

    mounted(){
        this.init();
    },
    computed:{
        // btnCanClick(){
        //     var res =false
        //     var des_length = this.description.length;
        //     var field = this.field;
        //     var img_length = this.screenshot.length;
        //     var myimg = this.img;
        //     console.log(myimg)
        //     var input1 = function(){
        //         if(field.length==des_length){
        //             for(let i=0;i<field.length;i++){
        //                 if(field[i]==''){
        //                     return false
        //                 }
        //                     return true
                          
        //             }
        //         }else{
        //             return false
        //         }
        //     }
        //     return input1()
        // }
    },
    methods:{
        init(){
            var id = this.$route.query.taskid;
            api.heignTaskSubmit({taskid: id}).then(res => {
                if(res.data.status == true){
                    this.screenshot = res.data.data.screenshot;
                    this.description = res.data.data.detail.description;
                    this.detail_id = res.data.data.detail.detail_id;
                    this.check_tuser = res.data.data.task.check_tuser;
                    this.key =  this.description.map(function(item){
                        return item.key;
                    })
                } else if(res.data.code == 2002){
                    this.$router.push({path: '/heighList'});
                }
            })
        },
        submit(){
            // this.$pop_submit.show({});
            if(this.check_tuser == 1){
                var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
                if(!(/^1[3|4|5|6|8|7|9][0-9]\d{4,8}$/.test(this.phone))){
                    //alert();
                    this.$MessageBox.alert("不是完整的11位手机号或者正确的手机号前七位");
                    return false;
                }
            }
            if(this.key.length != this.field.length){
                this.$MessageBox.alert("审核内容不完整");
                return false;
            }
            var des = {};
            des.key = this.key;
            des.value = this.field;
            //var images = [];
            // for(var i = 0; i < this.img.length;i++) {
            //     for(var j = 0; j < this.img[i].length; j++ ){
            //          images.push(this.img[i][j]);
            //     }
            // }
            var params = {
                description: des,
                phone: this.phone,
                img: this.img
            };
            this.$loadding.open("提交中..");
            api.heignTaskSubmitData(params).then(res => {
                console.log(res)
                if(res.data.status == true){
                    this.$loadding.close();
                    // this.$router.push({path: '/heighList'});
                    this.show = true;
                } else if(res.data.code == 1000){
                    this.$loadding.close();
                    this.$MessageBox.alert(res.data.msg);
                }
            })
        },
        
        //截图处理
        changeImg(index,i){
            //this.$loadding.open('正在上传图片')
            var img = document.getElementById(this.gernerate_file_Id(index,i));
            var fr = new FileReader();
            if(img.files[0] instanceof Blob){
                fr.readAsDataURL(img.files[0]);
                var _this = this;
                fr.onload = function () {
                    //var ia = [];
                    //ia[i] = this.result;
                    _this.img.push(this.result);
                    console.log(_this.img);
                    document.getElementById(_this.gernerate_img_Id(index,i)).setAttribute("src", this.result);   //显示图片
                }
            }
        },
        //image动态id
        gernerate_img_Id(index,i){
            return "image_"+index+"_"+i;
        },
        //file动态id
        gernerate_file_Id(index,i){
            return "file_"+index+"_"+i;
        },
        //继续试玩
        continue_play(){
            this.show = false;
            this.$router.push({path: '/heighList'});
        },
        detail(){
            this.show = false;
            this.$router.push({path: '/heighEdit',query:{detail_id:this.detail_id}});
        }

    },
    beforeRouteLeave(to,from,next){
        var id = this.$route.query.taskid;
        if(to.fullPath == "/heighDetail?id="+id || to.path == "/heighList" ||to.fullPath=="/heighEdit?detail_id="+this.detail_id){
            next();
            return;
        } else {
            next(false);
            this.$router.replace("/heighDetail?id="+id);
            return ;
        }
    }

}
</script>

<style scoped>
    form{
        position: relative;
    }
    .image_check {
        width:7.85rem;
        white-space:normal;
        outline: none;
        border:0;
        background: rgba(241,248,251,1);
        font-family:PingFangSC-Regular;
        color:#999999;
        line-height:1rem;
        z-index: 100;
        font-size: 1.1428571428571428rem;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
    }
    .all_wrap{
        width: 100%;
        height: 100%;
        background:rgba(246,246,246,1);
        padding-bottom: 2.142857142857143rem;
    }
    .head_tips_wrap{
        width:100%;
        height:13.5rem;
        padding: 1.1428571428571428rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .head_tips_wrap .bac{
        width: 100%;
        height: 100%;
        background:rgba(255,204,199,1);
        opacity:0.5044;
        position: absolute;
        top: 0;
        left: 0;
    }
    .head_tips_title{
        opacity:1;
        font-size:1.1428571428571428rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(209,75,75,1);
        margin-bottom: 1rem;
        z-index: 10;
    }
    .head_tips_title img{
        width: 1.4285714285714286rem;
        margin-right: 0.42857142857142855rem;
    }
    .tips_item{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(209,75,75,1);
        line-height:1.7142857142857142rem;
        z-index: 10;
    }
    .tips_item span{
        margin: 0 0.8571428571428571rem 0 0rem;
        color: #D14B4B;
    }
    .auditing_wrap{
        width:25.071428571428573rem;
        background:rgba(255,255,255,1);
        border-radius:0.5714285714285714rem;
        margin: 2.2857142857142856rem auto 0;
        position: relative;
        padding: 2.742rem 1.1428571428571428rem 1.7142857142857142rem;
        box-sizing: border-box;
    }
    .banner_wrap{
        width:9rem;
        height:2.2857142857142856rem;
        background:linear-gradient(126deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
        border-radius:0rem 1.1428571428571428rem 1.1428571428571428rem 0rem;
        position: absolute;
        top: -0.8571428571428571rem;
        left: -0.8571428571428571rem;
        font-size:1.2142857142857142rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .banner_large{
        width:11.5rem;
        height:2.2857142857142856rem;
    }
    .auditing_wrap h2{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(102,102,102,1);
        line-height:1.4285714285714286rem;
    }
    .input_wrap{
        width:22.785714285714285rem;
        height:3.142857142857143rem;
        background:rgba(246,246,246,1);
        border-radius:0.14285714285714285rem;
        align-items: center;
        padding-left: 1.1428571428571428rem;
        box-sizing: border-box;
        margin-top: 0.7142857142857143rem;
        font-size:1.1428571428571428rem;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
    }
    .input_wrap input{
        border: none;
        margin-left: 0.7142857142857143rem;
        width: 14.285714285714286rem;
        background:rgba(246,246,246,1);
        outline: none;
    }
    input::-webkit-input-placeholder{
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(204,204,204,1);
        line-height: 1.2142857142857142rem;
    }
    .screenshot_wrap{
        position: relative;
        width:25.071428571428573rem;
        background:rgba(255,255,255,1);
        border-radius:0.5714285714285714rem;
        margin: 2.2857142857142856rem auto 0;
        padding: 1.7142857142857142rem 1.1428571428571428rem;
        box-sizing: border-box;
    }
    .screen_item{
        margin-top: 1.4285714285714286rem;
        padding-bottom: 1.1428571428571428rem;
        box-sizing: border-box;
    }
    .total_tips{
        position: absolute;
        top: 1.4285714285714286rem;
        right: 1.1428571428571428rem;
        font-size:0.8571428571428571rem;
        font-family:PingFangSC-Regular;
        color:rgba(153,153,153,1);
    }
    .step_title{
        align-items: center;
        font-size:1.1428571428571428rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .red_dot{
        width:0.5714285714285714rem;
        height:0.5714285714285714rem;
        background:rgba(255,99,83,1);
        border-radius: 50%;
        margin-right: 0.35714285714285715rem;
    }
    .word_tips{
        line-height: 1.4285714285714286rem;
        font-size:1rem;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        margin-top: 1.2857142857142858rem;
    }
    .screenshot .img_wrap{
        width:7.285714285714286rem;
        height:12.857142857142858rem;
        border-radius:0.2857142857142857rem;
        margin-top: 1.1428571428571428rem;
        margin-right: 1.1428571428571428rem;
        position: relative;
    }
    .screenshot .img_wrap img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }

    .btn{
        width:22.5rem;
        height:3.142857142857143rem;
        background: #5192F5;
        border-radius:1.5714285714285714rem;
        color: white;
        font-size:1.1428571428571428rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        margin: 2.2857142857142856rem auto;
    }
    /* 弹窗样式 */
    .shade{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 200;
    }
    .pop{
        width:20rem;
        height:19.071428571428573rem;
        background:rgba(255,255,255,1);
        border-radius:0.7142857142857143rem;
        position: fixed;
        top: 24%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
    }
    .cencel{
        position: absolute;
        width: 1.1rem;
        height: 1.1rem;
        right: 0.8rem;
        top: 0.7rem;
    }
    .san{
        width: 11.071428571428571rem;
        height: 7.357142857142857rem;
        margin-top: -2.5rem;
    }
    .tips1{
        font-size:1.15rem;
        font-family:PingFangSC-Medium;
        font-weight:600;
        color:rgba(51,51,51,1);
        margin-top: 1.7rem;
    }
    .start_up{
        margin-top: 1.85rem;
        width:15.71rem;
        height:3.14rem;
        background:linear-gradient(100deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
        border-radius:1.785rem;
        font-size:1.142rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .tips2{
        height:1rem;
        font-size:1rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:1rem;
        margin-top: 1.7rem;
    }
    .tips2 span{
        color: #333333;
        font-size: 1rem;
        font-weight: 600
    }
    .tips3{
        height:0.9285714285714286rem;
        font-size:0.9285714285714286rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(81,146,245,1);
        line-height:0.9285714285714286rem;
        margin-top: 1.47rem;
        /* display: flex;
         */
    }
    .tips3 img{
        width: 0.35714285714285715rem;
        height: 0.6428571428571429rem;
        margin-left:0.5714285714285714rem;
    }
    .app_msg{
        font-size:0.8571428571428571rem;
        font-family:PingFangSC-Regular;
        color:rgba(84,84,84,1);
        line-height:1.2142857142857142rem;
        margin-top: 2rem;
    }
    .app_msg img{
        width: 2.5714285714285716rem;
        height: 2.5714285714285716rem;
        margin-right: 0.5714285714285714rem;
    }
    .app_msg span{
        font-weight: 600;
        color: #FF6353;
        margin: 0 0.14285714285714285rem;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to
        /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

</style>
