<template>
<div class="all_wrap">
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
            <span>•</span><p>审核将在两个工作日内完成，请耐心等待。</p>
        </div>               
    </div>
    <!-- 资料审核 -->
    <div class="auditing_wrap">
        <div class="banner_wrap flex_all_center">资料审核</div>
        <h2>按照要求填写信息</h2>
        <div class="input_wrap flex">
            <p>资料审核</p><input v-model="phone" v-bind:disabled="disabled" placeholder="输入任务注册账号/手机号" />
        </div>
        <div class="input_wrap flex" v-for="(item,index) in des" :key="index"  >
            <p>{{item.key}}</p><input type="text" v-model="fields[index]" v-bind:disabled="disabled" :placeholder="item.key" />
        </div>        
    </div>
    <!-- 上传截图凭证 -->
    <div class="screenshot_wrap">
        <div class="banner_wrap banner_large flex_all_center">上传截图凭证</div>
        <i class="total_tips">请参照示例截取对应页面上传</i>
        <div class="screen_item" v-for="(item,index) in images" :key="index">
            <div class="step_title flex">
                <div class="red_dot"></div>
                <p>截图任务{{item.step}}/{{item.step}}</p>
            </div>
            <h2 class="word_tips">{{item.des}}</h2>
            <div class="screenshot flex" v-for="(url,i) in item.images" :key="i">
                <div class="img_wrap">
                    <img :src="url.url">
                    <div class="imgtips flex_all_center">
                        截图样式
                    </div>
                </div>
                <form action="" enctype="multipart/form-data">
                    <input type="file" class="image_check"  @change="changeImg(index,i)" ref="file" :disabled="disabled" :id="gernerate_file_Id(index,i)" accept="image/* " >
                    <img :id="gernerate_img_Id(index,i)" :src="url.up">
                 
                </form>
            </div>
        </div>     
    </div>
    <!-- 底部提交按钮 -->
    <div class="btn flex_all_center" :class="changeClick?'red':''" @click="submit">
        <p v-if="!changeClick">修改审核内容</p>
        <p v-else>保存修改内容</p>
    </div>

</div>    
</template>

<script>
import api from '@//api/api.js'
export default {
    name:'APP',
    data(){
        return {
            changeClick:false,  //是否确认重新编辑
            disabled: true,     //是否不可编辑
            fields: [],    //审核字段的值
            phone: "",          //用户提交过的phone
            des: [],            //用户提交过的审核资料
            images: [],         //用户提交过的图片
            img: [],            //用户重新提交的图片
            key: [],             //字段的键
            submit_img: []       //用户提交的截图
            
        }
    },

    mounted(){
        this.init();
    },

    methods:{
        init(){
            var detail_id = this.$route.query.detail_id;
            api.heignTaskEditDetail({detail_id: detail_id}).then(res => {
                if(res.data.status == true){
                    this.images = res.data.data.images;
                    this.des = res.data.data.description;
                    this.fields = res.data.data.fields;
                    this.phone = res.data.data.phone;
                    this.submit_img = res.data.data.submit_images;
                    this.key =  this.des.map(function(item){
                        return item.key;
                    })
                } else if(res.data.code == 2002){
                    this.$router.push({path: '/heighList'});
                }
            })
        },
        submit(){
            if(false == this.changeClick){
                var _this = this;
                this.$MessageBox.confirm("修改会覆盖之前提交的内容,确定修改?").then(action => {
                    _this.changeClick = true;
                    _this.disabled = false;
                }).catch(action =>{
                    
                })
            } else {
                if(this.key.length != this.fields.length){
                    this.$MessageBox.alert("审核内容不完整");
                    return false;
                }
                //审核资料
                var des = {};
                des.key = this.key;
                des.value = this.fields;
                //截图
                var offset = 0;
                for(var i = 0; i < this.img.length;i++) {
                    for(var j = 0; j < this.img[i].length; j++ ){
                        //console.log(this.img[i][j]);
                        if(typeof this.img[i][j] != "undefined"){
                            this.submit_img[offset] = this.img[i][j];
                        }
                        offset++;
                    }
                }
                var params = {
                    description: des,
                    phone: this.phone,
                    img: this.submit_img,
                    detail_id: this.$route.query.detail_id
                };
                this.$loadding.open("提交中..");
                api.heignTaskSubmitEdit(params).then(res => {
                    if(res.data.status == true){
                        this.$loadding.close();
                        this.$MessageBox.alert("审核内容已修改成功");
                        this.$router.push({path: '/heighList'});
                    } else if(res.data.code == 1000){
                        this.$loadding.close();
                        this.$MessageBox.alert(res.data.msg);
                    } else {
                        this.$loadding.close();
                        //this.$MessageBox.alert(res.data.msg);
                        //this.$router.push({path: '/heighList'});
                    }
                })
            }
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
                    var ia = [];
                    ia[i] = this.result;
                    _this.img[index] = ia;
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
    },
    beforeRouteLeave(to,from,next){
        if(to.path == "/" || to.path == "/heighList"){
            next();
            return;
        } else {
            next(false);
            this.$router.replace("/heighList");
            return ;
        }
    }


}
</script>

<style scoped>
    form{
        position: relative;
    }
    .img_wrap{
        width:7.285714285714286rem;
        height:12.857142857142858rem;
        border-radius:0.2857142857142857rem;
        margin-top: 1.1428571428571428rem;
        margin-right: 1.1428571428571428rem;
        position: relative;
    }
    .img_wrap img{
        width: 100%!important;
        height: 100%!important;
        margin-top: 0px!important;
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
    background:rgba(246,246,246,1);
    padding-bottom: 4.285714285714286rem;
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
    background:rgba(255,230,227,1);
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
    height:14.142857142857142rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714285714285714rem;
    margin: 2.2857142857142856rem auto 0;
    position: relative;
    padding: 3.14285rem 1.1428571428571428rem 1.7142857142857142rem;
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
    font-size: 1rem;
    border: none;
    margin-left: 0.7142857142857143rem;
    background:rgba(246,246,246,1);
    outline: none;
    color: #999999;
    opacity: 0.5;
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
    padding: 2rem 1.1428571428571428rem;
    box-sizing: border-box;
}
.screen_item{
    margin-top: 1.4285714285714286rem;
    padding-bottom: 1.1428571428571428rem;
    box-sizing: border-box;
    border-bottom: 0.07142857142857142rem solid rgba(241,241,241,1);
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
    line-height: 1.5rem;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    margin-top: 1.2857142857142858rem;
}
.screenshot img{
    width:7.285714285714286rem;
    height:12.857142857142858rem;
    border-radius:0.2857142857142857rem;
    margin-top: 1.1428571428571428rem;
    margin-right: 1.1428571428571428rem;
    border: 1px solid #E7E7E7;
}
.btn{
    width:22.5rem;
    height:3.142857142857143rem;
    background:rgba(81,146,245,1);
    border-radius:1.5714285714285714rem;
    color: white;
    font-size:1.1428571428571428rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    margin: 2.2857142857142856rem auto 0;
}
.red{
    background:rgba(255,99,83,1);
}

</style>
