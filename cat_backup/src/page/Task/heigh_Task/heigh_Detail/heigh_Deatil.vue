<template>
<div class='all_wrap'>
    <div class="common_bac_color"></div>
    <div class="head_wrap">
        <app-header  :title="'任务详情'"></app-header>
        <div class="head_time flex_btn_center">
            <img class="decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
            <div class="middle_wrap flex">
                <p>任务还有</p>
                <div class='time_wrap flex_all_center'><i>{{surplus.h}}</i></div>
                <span>:</span>
                <div class='time_wrap flex_all_center'><i>{{surplus.m}}</i></div>
                <span>:</span> 
                <div class='time_wrap flex_all_center'><i>{{surplus.s}}</i></div>               
                <p>结束</p>
            </div>
            <img class="decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
        </div>
        <div class="app_msg flex_btn_center">
            <div class="left_msg flex">
                <img v-bind:src="task.icon">
                <div class="word_msg">
                    <h2>{{task.name}}</h2>
                    <div class='flex'>
                    <p class="price">免费</p>
                    <p class="surplus">剩1420份</p>
                    </div>
                </div>
            </div>
            <div class="right_msg">
                +{{task.money}}<i>元</i>
            </div>
        </div>
    </div>
    <!-- 任务步骤 -->
    <div class="title_desc_box flex_btn_center">
        <div class="tips_banner flex_all_center">任务步骤</div>
        <i class="total_tips">开始任务前，请先阅读步骤</i>
    </div>
    <div class="task_step_wrap">
        <swiper class="step_single_page" :options="swiperOption">
            <swiper-slide v-for="(item,index) in steps" :key="index">
                <div class="step_content_box" @touchstart="getTouchStart($event)" @touchmove="getTouchMove($event, index)">
                    <div class="step_page_count">{{index+1}}/{{steps.length}}</div>
                    <div class="step_page_img_box">
                        <img class="step_page_img" v-for="(item,index2) in item.url" :key="index2" :src="item.url" @click="showlargeImg({index,index2})">
                    </div>
                    <p class="step_page_desc">{{item.des}}</p>
                </div>
            </swiper-slide>
        </swiper >
        <!--分页器-->
        <div class="swiper-pagination-box" v-if="steps.length != 1">
            <span v-for="(item, index) in steps.length" :key="index" :class="{'pagination-bullet': true, 'active': index == nowPagiIndex}"></span>
        </div>
    </div>
    <!-- 底部导航按钮 -->
    <div class="btn flex_all_center" @click="imsure">开始任务</div>

    <!--提交审核-->
    <div class="audit_step_wrap">
        <div class="tips_banner audit_title flex_all_center">审核资料</div>
        <p class="audit_info_desc">*请确保填写信息与注册信息一致</p>
        <div class="audit_input_wrap flex">
            <p>手机号码</p><input type="number" v-model="phone" placeholder="输入任务注册手机号" />
        </div>
        <div class="audit_input_wrap flex" v-for="(item,index) in description" :key="index">
            <p>{{ item.key }}</p><input type="text" v-model="field[index]" :placeholder="item.key"/>
        </div>
        <p class="audit_screenshot_title">上传任务截图</p>
        <div class="audit_screenshot_outer" v-for="(item,index) in screenshot" :key="index">
            <div class="audit_screenshot_box" v-for="(image,i) in item.images" :key="i">
                <div class="screenshot_wrap">
                    <img class="img_example" :src="image.url">
                    <img class="img_tag_tip" src="https://static.cattryapp.com/12static/new/img/screenshot_example.png">
                </div>
                <form class="img_upload_form" action="" enctype="multipart/form-data">
                    <input class="img_upload_box" type="file" @change="changeImg(index,i)" ref="file" :id="gernerate_file_Id(index,i)" accept="image/*">
                    <div :class="{'tip_img_example': true, active: !isAddImg[i]}">
                        <div v-if="!isAddImg[i]" class="tip_inner_box">
                            <img class="tip_img_btn" src="https://static.cattryapp.com/12static/new/img/screenshot_upload_btn.png">
                            <p class="tip_desc_text">点击上传您的截图</p>
                        </div>
                        <img v-show="isAddImg[i]" class="you_upload_img"  :id="gernerate_img_Id(index,i)" src="">
                        <img v-show="isAddImg[i]" class="your_upload_tip" src="https://static.cattryapp.com/12static/new/img/your_upload_tip.png">
                        <img v-show="isAddImg[i]" @click="deleteUploadTemp(index, i)" class="delete_your_upload" src="https://static.cattryapp.com/12static/new/img/tip_delete_btn.png">
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="btn flex_all_center mt11 red_bac" :class="sure?'':'grey'" @click="submit">提交审核</div>
    <p class="award_tip_text">提交审核后到账需1个工作日</p>

    <!--展示大图-->
    <div class="shade" v-if="showlargeimg" @touchmove.prevent></div>
    <div class="swipe_wrapper" v-if="showlargeimg" @touchmove.prevent>
        <!-- <img class='cancel' src="https://static.cattryapp.com/12static/new/img/Detail_cancel.png" @click="closeSwipe"> -->
         <!-- <p class="index_tips">{{current_showImg_index+1}}/{{imgarr.length}}</p> -->
        <!-- <mt-swipe class="swipe" @change="handleChange" :showIndicators="false" :defaultIndex="current_showImg_index" :auto="0" :prevent="true" :stopPropagation="true">
            <mt-swipe-item class="swipe_item" v-for="(item,index) in imgarr" :key="index">
                <img :src="item" >
            </mt-swipe-item>
        </mt-swipe> -->
        <swipe class="myswipe" @change="handleChange" :index="current_showImg_index">
            <slider class="swipe" v-for="(item,index) in imgarr" :key="index" @click="touchClose">
                <img :src="item">
            </slider>
        </swipe>
        <div class="desc_box">
            <p class="count-num">{{ current_showImg_index+1 }}/{{ descontent.length }}</p>
            <div class="content-detail">{{ descontent[current_showImg_index] }}</div>
        </div>
    </div>

    <!--提交审核后的弹窗页面-->
    <div v-if="show" @touchmove.prevent>
        <div class="shade_submit"></div>
        <transition name="fade">
            <div class="pop flex_column_center">
                <img class="san" src="https://static.cattryapp.com/12static/new/img/submit_head_cat.png">
                <p class="tips1">审核提交成功</p>
                <p class="tips2">等待审核,审核通过后次日到账</p>
                <div class="start_up flex_all_center" @click="continue_play">继续试玩</div>
                <div class="tips3 flex_all_center">查看审核详情<img src="https://static.cattryapp.com/12static/new/img/submit_go_back.png"></div>
            </div>
        </transition>
    </div>

    <!--首次进入的蒙板提示-->
    <div class="mask_tip_outer" v-if="isShowFirstTip">
        <div class="mask_tip_inner">
            <p class="mask_tip_desc_one">多个步骤时</p>
            <p class="mask_tip_desc_two">「 <span>滑动 </span>」查看下一步</p>
            <div class="img_gesture_box">
                <img class="img_gesture" src="https://static.cattryapp.com/12static/new/img/slide_gesture.png">
            </div>
            <div class="know_box">
                <span class="konw_btn" @click="closeMask">我知道了</span>
            </div>
        </div>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
import {Swipe,SwipeItem} from 'mint-ui';
import {swipe,slider} from '../../../../components/swipe/index.js'
Vue.component(Swipe, Swipe);
Vue.component(SwipeItem, SwipeItem);

//引入swiper
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

export default {
    name:'APP',
    data(){
        return {
            steps:[],                   //步骤信息
            showlargeimg:false,          //展示步骤大图
            imgarr:[],                  //步骤图数组
            descontent: [],
            current_showImg_index:0,    //当前swipe大图索引
            sure:false,                 //是否已明白
            task: {                     //任务基本信息
                name: "--",
                money: "0.00",
                icon: ""
            },
            surplus: {         //任务剩余时间
                h: 0,       //时
                m: 0,       //分
                s: 0,       //秒
                all: 0         //剩余秒数
            },
            tools: {
                timer: null      //定时器
            },
            swiperOption: {  //swiper的配置项
                direction: "horizontal",
                autoplay: false,
                loop: true,
            },
            nowPagiIndex: 0, //当前步骤滑动页面所有值
            touchStart: {
                startX: 0,
                startY: 0
            },
            touchMove: {
                endX: 0,
                endY: 0
            },
            img: [],   //用户上传的base64图片
            isAddImg: [], //用户是否添加了截图
            field: [],          //审核表单自定义字段的值
            phone: "",           //必填资料

            screenshot: [],     //截图列表
            description: [],     //审核字段

            key: [],            //字段的key
            show: false,        //提交成功显示
            check_tuser: null,
            isShowFirstTip: true   //页面第一次进入是否显示蒙板侧滑提示
        }
    },
    components:{
        swipe,
        slider,
    },
    mounted(){
        this.init()
    },
    updated(){
        if(this.surplus.all < 0){  //时间到
            clearInterval(this.tools.timer);
            api.heightTaskAbandon({}).then(res => {
                var _this = this;
                this.$MessageBox.alert("任务时间到").then(res => {
                    _this.$router.push({path: '/heighList'});
                });
            })
        }
    },

    methods:{
        Change(e){
            // console.log(e)
        },
        touchClose(){
            this.showlargeimg = false;
        },
        init(){
            var id = this.$route.query.id;
            //获取数据
            this.$loadding.open("加载中..");
            api.heighDetail({taskid:id}).then(res=>{
                console.log(res);
                if(res.data.status == true){
                    this.steps = res.data.data.steps;
                    var imgarr = []; //存储所有的图片信息
                    var des = []; //存储所有的任务描述信息
                    for(let i = 0;i < this.steps.length; i++){
                        for(let j=0; j<this.steps[i].url.length;j++){
                            imgarr.push(this.steps[i].url[j].url)
                            des.push(this.steps[i].des);
                        }
                    }
                    this.imgarr = imgarr;
                    this.descontent = des;
                    this.task = res.data.data.volumetask;      //任务基本信息
                    this.surplus.all  = res.data.data.runtime.cycle_time;    //剩余时间
                    this.sure = Boolean(res.data.data.runtime.click_btn);    //是否明白了
                    this.$loadding.close();
                    
                } else {
                    this.$loadding.close();
                }
            });

            api.heignTaskSubmit({taskid: id}).then(res => {
                console.log(res);
                if(res.data.status == true){
                    this.screenshot = res.data.data.screenshot;
                    this.description = res.data.data.detail.description;
                    this.check_tuser = res.data.data.task.check_tuser;
                    if(this.description){
                        this.key =  this.description.map(function(item){
                            return item.key;
                        }) 
                    }
                    
                } else if(res.data.code == 2002){
                    this.$router.push({path: '/heighList'});
                }
            })

            //倒计时
            var _this = this;
            this.tools.timer = setInterval(function(){
                _this.surplus.h = parseInt(_this.surplus.all / 3600)+'0';
                _this.surplus.m = parseInt((_this.surplus.all % 3600) / 60);
                _this.surplus.s = parseInt((_this.surplus.all % 3600) % 60);
                --_this.surplus.all;
            },1000);

        },
        showlargeImg(e){
           var index1 = e.index+1;
           var index2 = e.index2+1;
           var len = 0;
           if(index1>1){
               for(let i = 0;i<index1-1;i++){
                   len += this.steps[i].url.length 
               }
               len+=index2
           }else{
               len=index2
           }
           this.current_showImg_index = len-1;
           this.showlargeimg = true
        },
        //切换轮播图
        handleChange(index){
            console.log(index)
            this.current_showImg_index = index-1
        },
        //关闭轮播图
        closeSwipe(){
            this.showlargeimg = false
        },
        //我已明白，开始任务
        imsure(){
            if(true != this.sure){
                //点击明白  从此明白了
                var id = this.$route.query.id;
                var _this = this;
                api.heightTaskClick({taskid: id}).then(res => {
                    if(true == res.data.status){
                        _this.sure = true;
                    }
                })
            }
            window.open(this.task.url); 
        },
        go_submit(){
            if(true != this.sure)
                return false;

            var id = this.$route.query.id;
            this.$router.push({path: '/heighSubmit',query:{taskid:id}});
        },
        abandon(){
            this.$router.push({path: '/heighList'});
            // var _this = this;
            // this.$MessageBox.confirm("确定要放弃任务").then(act => {
            //     if(act == "confirm"){
            //         api.heightTaskAbandon({taskid: this.$route.query.taskid}).then(res => {
            //             if(res.data.status == true){
            //                 _this.$router.push({path: '/heighList'});
            //             } else if(res.data.code == 1000){
            //                 _this.$MessageBox.alert(res.data.msg);
            //             }
            //         })
            //     }
            // })
        },
        //
        getTouchStart(event){
            //获取接触屏幕时的X和Y
            this.touchStart.startX = event.changedTouches[0].pageX;
            this.touchStart.startY = event.changedTouches[0].pageY;
        },
        getTouchMove(event, index){
            //获取移动时的X和Y
            this.touchMove.endX = event.changedTouches[0].pageX;
            this.touchMove.endY = event.changedTouches[0].pageY;
            var distanceX = this.touchMove.endX-this.touchStart.startX;
            var distanceY = this.touchMove.endY-this.touchStart.startY;
            //判断是向右边滑动
            if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
                this.nowPagiIndex = index - 1;
                if(this.nowPagiIndex == -1){
                    this.nowPagiIndex = index;
                }
            }
            //判断是向左边滑动
            else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
                this.nowPagiIndex = index + 1;
                if(this.nowPagiIndex == this.steps.length){
                    this.nowPagiIndex = index;
                }  
            }
        },
        changeImg(index, i){
            var img = document.getElementById(this.gernerate_file_Id(index,i));
            this.isAddImg[i] = true;
            var fr = new FileReader();
            if(img.files[0] instanceof Blob){
                fr.readAsDataURL(img.files[0]);
                var _this = this;
                fr.onload = function () {
                    //var ia = [];
                    //ia[i] = this.result;
                    _this.img[i] = this.result;
                    console.log(_this.img);
                    document.getElementById(_this.gernerate_img_Id(index,i)).setAttribute("src", this.result);   //显示图片
                }
            }
            console.log(this.isAddImg);
            console.log(this.img);
        },
        //image动态id
        gernerate_img_Id(index,i){
            return "image_"+index+"_"+i;
        },
        //file动态id
        gernerate_file_Id(index,i){
            return "file_"+index+"_"+i;
        },
        //添加图片后需要清除
        deleteUploadTemp(index, i){
            console.log('start')
            this.img[i] = '';
            this.isAddImg[i] = false;
            console.log(document.getElementById("file_"+index+"_"+i).value);
            document.getElementById("file_"+index+"_"+i).value = '';
            console.log(document.getElementById("file_"+index+"_"+i).value);
            console.log(this.isAddImg);
            console.log(this.img);
        },
        //提交结果
        submit(){
            if(true != this.sure)
                return false;
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
        //继续试玩
        continue_play(){
            this.show = false;
            this.$router.push({path: '/heighList'});
        },
        //关闭蒙板提示窗口
        closeMask(){
            this.isShowFirstTip = false;
        }

    },
    beforeRouteLeave(to,from,next){
        var _this = this;
        if(to.path == "/heighSubmit"){
            next();
            return;
        }
        if(to.path == "/heighList" && this.surplus.all <=0){
            next();
            return;
        }
        this.$MessageBox.confirm('再坚持一下就获得现金奖励','是否放弃任务？',{ confirmButtonText:'不放弃',cancelButtonText:'放弃'})
        .then(action => {
            next(false)
        }).catch(action => {
            api.heightTaskAbandon({}).then(res => {
                if(res.data.status == true){
                    next();
                } else {
                    _this.$MessageBox.alert("放弃任务失败");
                }
            })      
        })
    }
}
</script>

<style scoped>
 * { touch-action: pan-y; } 
 .myswipe{
     width: 100%;
     height: 100%;
 }
.shade{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 800;
}
.cancel{
    width: 36px;
    position: absolute;
    left: 0;
    top: -44px;
}
.swipe{
    position: relative;
    touch-action: none;
}
.index_tips{
    position: absolute;
    top: -38px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    color: white;
}
.swipe_wrapper{
    width: 338px;
    height: 500px;
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}
.swipe_item{
    width: 100%;
    height: 100%;
    position: relative;
}
.swipe_item img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.all_wrap{
     height: 100%;
     width: 100%;
     background:rgba(246,246,246,1);
}

 .head_wrap{
     width: 100%;
     height: 10.857142857142858rem;
     padding: 0 3.4285714285714284rem;
     box-sizing: border-box;
     background: url('https://static.cattryapp.com/12static/new/img/heighDetail_head.png');
     background-size: 100% 100%;
     position: relative;
}
 .head_time{
     width: 19.642857142857142rem;
     color: white;
     font-size:0.9285714285714286rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     position: absolute;
     top: 3.857142857142857rem;
}
 .head_time .middle_wrap{
     align-items: center;
}
 .decorate{
     width:2.2857142857142856rem;
}
 .time_wrap{
     width:1.8571428571428572rem;
     height:1.5714285714285714rem;
     background:rgba(255,255,255,1);
     border-radius:0.14285714285714285rem;
     margin: 0 0.2857142857142857rem;
}
 .time_wrap i{
     font-size:1.1428571428571428rem;
     font-family:HelveticaNeue-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
}
 .app_msg{
     width:25.071428571428573rem;
     height:5.428571428571429rem;
     background:rgba(255,255,255,1);
     box-shadow:0rem 0.14285714285714285rem 0.5714285714285714rem 0rem rgba(0,0,0,0.1);
     border-radius:0.5714285714285714rem;
     padding: 0 1.1428571428571428rem;
     box-sizing: border-box;
     position: absolute;
     bottom: -1.6571428571428572rem;
     left: 50%;
     transform: translateX(-50%);
     z-index: 100;
}
 .app_msg .left_msg{
     align-items: center;
}
 .app_msg .left_msg img{
     width: 4rem;
     height: 4rem;
     border-radius:0.5714285714285714rem;
     margin-right: 0.8571428571428571rem;
}
 .app_msg .left_msg h2{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(30,30,30,1);
     line-height:1.1428571428571428rem;
     margin-bottom: 0.7142857142857143rem;
}
 .app_msg .left_msg .price{
     font-size:0.7857142857142857rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,150,0,1);
     padding: 0.14285714285714285rem 0.2857142857142857rem;
     background:rgba(255,150,0,0.2);
     border-radius:0.14285714285714285rem;
     margin-right: 0.42857142857142855rem;
}
 .app_msg .left_msg .surplus{
     font-size:0.7857142857142857rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,99,83,1);
     padding: 0.14285714285714285rem 0.4286rem;
     background:rgba(255,99,83,0.2);
     border-radius:0.14285714285714285rem;
}
 .app_msg .right_msg{
     font-size:1.4285714285714286rem;
     font-family:HelveticaNeue-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
}
 .app_msg .right_msg i{
     font-size: 1rem;
}
.title_desc_box{
    margin-top: 3.2rem;
    position: relative;
}
.task_step_wrap{
    position: relative;
    width:25.071428571428573rem;
    min-height: 20.714rem;
    margin: .714rem auto 0;
    background:rgba(255,255,255,1);
    border-radius:0.5714285714285714rem;
    padding: 1rem 1.429rem;
    box-sizing: border-box;
}
.step_single_page{
    min-height: 18.714rem;
    position: relative;
}
.step_content_box{
    height: 100%;
}
.step_page_img_box{
    display: flex;
    justify-content: space-around;
    /* flex-wrap: wrap; */
    min-height: 12.857rem;
    box-sizing: border-box;
    padding-left: 1.6rem;
}
.step_page_img{
    max-height: 12.857rem;
}
.step_page_count{
    position: absolute;
    left: 0;
    top: 0;
}
.step_page_desc{
    color: #666;
    margin-top: .857rem;
    line-height: 1.714rem;
}
.swiper-pagination-box{
    position: absolute;
    z-index: 100;
    bottom: -2rem;
    left: 0;
    width: 100%;
    text-align: center;
    padding: .571rem 0;
}
.pagination-bullet{
    width: .357rem;
    height: .357rem;
    background:rgba(0,0,0,0.1);
    display: inline-block;
    border-radius: 50%;
    margin-right: .357rem;
}
.pagination-bullet.active{
    width:.857rem;
    height:.357rem;
    background:rgba(255,99,83,1);
    border-radius: 0.3571rem;
}
.tips_banner{
    width:9rem;
    height:2.2857142857142856rem;
    background:linear-gradient(126deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:0rem 1.1428571428571428rem 1.1428571428571428rem 0rem;
    position: relative;
    left: -1.4285714285714286rem;
    color: white;
    font-size:1.2142857142857142rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
}
 .total_tips{
     /* position: absolute;
     right: 1.1428571428571428rem;
     top: 0; */
     position: relative;
     right: .857rem;
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(148,148,148,1);
}
/*改版后添加样式*/
.tips_container{
    width: 100%;
    height: 50px;
    background-color: #fff;
}
 .step_item{
     padding: 1.1685714285714286rem 0rem;
     box-sizing: border-box;
     border-bottom: 0.07142857142857142rem solid rgba(241,241,241,1);
}
 .red_code{
     width:0.5714285714285714rem;
     height:0.5714285714285714rem;
     background:rgba(255,99,83,1);
     border-radius: 50%;
     margin-right: 0.35714285714285715rem;
}
 .step_tips_left{
     align-items: center;
}
 .step_tips p{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(51,51,51,1);
}
 .step_tips i{
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(148,148,148,1);
}
 .accept_img{
     margin-top: 1.2857142857142858rem;
     width: 4.785714285714286rem;
     height: 8.571428571428571rem;
     margin-right: 0.5714285714285714rem ;
    border: 1px solid #E7E7E7
}
 .step_word_tips{
     font-size:1rem;
     font-family:PingFangSC-Regular;
     color:rgba(102,102,102,1);
     margin-top: 1.1428571428571428rem;
     line-height: 20px;
}
 .btn{
     width:22.5rem;
     height:3.142857142857143rem;
     background:#5192F5;
     border-radius:1.5714285714285714rem;
     margin: 2.2857142857142856rem auto 0;
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
}
 .grey{
     background:rgba(204,204,204,1)!important;
}
 .giveup{
     font-size:1rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(102,102,102,1);
     line-height:1rem;
     text-align: center;
     margin: 24px 0 0;
     padding-bottom: 2.7142857142857144rem;
}
.mt11{
    margin-top: 1.2rem
}
.red_word{
    color: #FF6353
}
.red_bac{
    background: #FF6353
}
.all_wrap{
    padding-bottom: 40px;
}
/*任务步骤*/
.audit_step_wrap{
    position: relative;
    width: 25.071428571428573rem;
    margin: 2.571rem auto 1.714rem;
    background-color: #fff;
    border-radius: .571rem;
    padding: 2.857rem 1.429rem 1.429rem;
    box-sizing: border-box;
}
.audit_title{
    position: absolute;
    top: -.5714rem;
    left: -.857rem;
}
.audit_info_desc{
    font-size: 0.8571rem;
    color: #FF6353;
    margin-bottom: .857rem;
}
.audit_input_wrap{
    width:22.2143rem;
    height:3.1429rem;
    background:rgba(246,246,246,1);
    border-radius:0.14285714285714285rem;
    align-items: center;
    box-sizing: border-box;
    padding-left: 1.143rem;
    margin-top: 0.7142857142857143rem;
    font-size:1.1428571428571428rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
}
.audit_input_wrap input{
    border: none;
    margin-left: .7142857142857143rem;
    width: 14.285714285714286rem;
    background: #f5f5f5;
    outline: none;
    font-size: 1rem;
}
.audit_input_wrap input::-webkit-input-placeholder{
    color: #ccc;
}
.audit_screenshot_title{
    font-size: 1.143rem;
    color: #333;
    margin: 1.714rem 0 .857rem 0; 
}

.audit_screenshot_box{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.143rem;
}
.screenshot_wrap{
    position: relative;
    width: 10.357rem;
    height: 17.143rem;
    border-radius: .286rem;
}
.screenshot_wrap .img_example{
    width: 100%;
    height: 100%;
    border-radius: .286rem;
}
.screenshot_wrap .img_tag_tip{
    position: absolute;
    top: 0;
    left: 0;
    width: 4.857rem;
    height: 1.429rem;
}
.img_upload_form{
    position: relative;
}
.img_upload_box{
    position: absolute;
    left: 0;
    right: 0;
    width: 10.357rem;
    z-index: 100;
    height: 17.143rem;
    white-space: normal;
    outline: none;
    border: 0;
    background: #fff;
    font-family: PingFangSC-Regular;
    color: #999;
    line-height: 1rem;
    font-size: 1.1428571428571428rem;
    border-radius:0.2857rem;
    opacity: 0;
}
.tip_img_example{
    position: relative;
    width: 10.357rem;
    height: 17.143rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .286rem;
    box-sizing: border-box;
}
.tip_img_example.active{
    border: .143rem dashed #5192F5;
}
.tip_img_btn{
    width: 3.071rem;
    height: 3.071rem;
}
.tip_inner_box{
    text-align: center;
}
.tip_desc_text{
    width: 4.143rem;
    height: 2.286rem;
    font-size: .786rem;
    color: #5192F5;
    line-height: 1.143rem;
}
.you_upload_img{
    width: 10.357rem;
    height: 17.143rem;
}
.your_upload_tip{
    position: absolute;
    left: 0;
    top: 0;
    width: 5rem;
    height: 1.429rem;
}
.delete_your_upload{
    position: absolute;
    right: 0;
    top: 0;
    width: 1.429rem;
    height: 1.429rem;
    z-index: 100;
}
.award_tip_text{
    color: #999;
    font-size: 100%;
    text-align: center;
    margin: .571rem 0 3.429rem;
}

/* 弹窗样式 */
.shade_submit{
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
.tips2{
    height:1rem;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1rem;
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
/*蒙板提示*/
.mask_tip_outer{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background:rgba(0,0,0,0.72);
    z-index: 800;
}
.mask_tip_inner{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 21.429rem;
}
.mask_tip_desc_one{
    text-align: right;
    box-sizing: border-box;
    padding-right: 8.143rem;
    color: #fff;
    font-size: 1.143rem;
    margin-bottom: .571rem;
}
.mask_tip_desc_two{
    text-align: right;
    box-sizing: border-box;
    padding-right: 3.357rem;
    color: #fff;
    font-size: 1.143rem;
}
.mask_tip_desc_two span{
    color: #5192F5;
}
.img_gesture_box{
    text-align: right;
    box-sizing: border-box;
    padding-right: 2.143rem;
    margin-top: 2.286rem;
    min-height: 8.643rem;
}
.know_box{
    color: #fff;
    text-align: center;
    margin-top: 1.429rem;
}
.konw_btn{
    font-size: 1rem;
    border: 1px solid rgba(255,255,255,1);
    padding: .571rem 1.429rem;
    border-radius: .286rem;
}
/*查看大图部分添加文字描述*/
.desc_box{
    width: 110%;
    height: 11.429rem;
    position: absolute;
    left: -5%;
    bottom: -20%;
    color: #fff;
    background:rgba(0,0,0,0.4);
    box-sizing: border-box;
    padding: .714rem 1.143rem;
}
.desc_box .count-num{
    font-size: .857rem;
    font-weight: 600;
    margin-bottom: .571rem;
}
.desc_box .content-detail{
    font-size: 1rem;
    line-height: 1.714rem;
}
</style>
