<template>
<div class="all_wrap">
    <!-- 顶部详情 -->
   <div class="common_head_wrap2">
        <app-header class="common_head_nav" :title="'评论任务详情'"></app-header>
        <div class="common_head_time flex_btn_center">
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
            <div class="middle_wrap flex">
                <p>任务还有</p>
                <div class='common_time_wrap flex_all_center'><i>{{surplus.h}}</i></div>
                <span>:</span>
                <div class='common_time_wrap flex_all_center'><i>{{surplus.m}}</i></div>
                <span>:</span> 
                <div class='common_time_wrap flex_all_center'><i>{{surplus.s}}</i></div>               
                <p>结束</p>
            </div>
            <img class="common_decorate" src="https://static.cattryapp.com/12static/new/img/heighDetail_dian.png">
        </div>

        <div class="common_app_msg_wrap">
            <div class="common_app_msg flex_btn_center">
                <div class="left_msg flex">
                    <img :src="data.icon">
                    <div class="word_msg">
                        <h2>{{data.name}}</h2>
                        <div class='flex'>
                        <p class="price">免费</p>
                        <p class="surplus">剩1420份</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    +{{data.money}}<i>元</i>
                </div>
            </div>
            <div class="waring">
                <img src="https://static.cattryapp.com/12static/new/img/comment_waring.png">
                <i>提交审核内容必须与APP Stroe评论一致</i>
            </div>
        </div>
    </div>
    <!-- 任务步骤 -->
    <div class="step_wrap">
        <div class="banner_wrap flex_all_center">任务步骤</div>
        <div class="step flex">
            <div class="red_dot_wrap">
                <div class="red_dot"></div><div class="grey_line"></div>
                <div class="red_dot"></div><div class="grey_line"></div>
                <div class="red_dot"></div><div class="grey_line"></div><div class="red_dot"></div>
            </div>
            <div class="step_word">
                <p>下载应用</p>
                <p>复制评论内容，打开APP Store粘贴</p>
                <p>按示例样式截图后提交评论</p>
                <p>上传截图凭证，提交审核</p>
            </div>
        </div>
            <div class="btn flex_all_center" @click="download">下载应用</div>
    </div>
    <div class="comment_content">
        <div class="banner_wrap flex_all_center">任务步骤</div>
        <h2 class="comment_tips">参照下方示例进行<span>评论并截图</span></h2>
        <div class="warning_word">若评论内容不符合下方给出的标题和内容 (擅自增添或删减关键字)，审核必不通过。并减少您评论任务的推送，甚至关闭！</div>
        <img src="https://static.cattryapp.com/12static/new/img/comment_referto1.png">
        <img src="https://static.cattryapp.com/12static/new/img/comment_referto2.png">
        <div class="comment_item">
            <div class="key_word_wrap flex">
                <h2>标题必含关键字：</h2>
                <p class="accept_word" @click="add_title_keyword"  v-for="(item,index) in data.keywords" :key="index">{{item}}</p>
            </div>           
            <div class="item_content flex_center">
                <textarea :rows="titleRow" type="text" v-model="title" placeholder="标题不少于6字" :disabled="disabled">
                </textarea>
                <div class="right_copy_wrap flex_all_center" @click="copy_title">
                    复制
                </div>
            </div>
        </div>
        <div class="comment_item">
            <div class="key_word_wrap flex" >
                <h2>内容必含关键字：</h2>
                <p class="accept_word" @click="add_content_keyword"  v-for="(item,index) in data.keywords_content" :key="index">{{item}}</p>
            </div>
            <div class="item_content flex">
                 <textarea :rows=contentRow type="text" v-model="content" placeholder="内容不少于16字" :disabled="disabled">
                 </textarea>
                 <!-- <textarea v-model="data.content"></textarea> -->
                <div class="right_copy_wrap flex_all_center" @click="copy_content">
                    复制
                </div>
            </div>
        </div> 
        <div class="btn flex_all_center" @click="download">打开App store</div>  
    </div>
    <!-- 上传截图 -->
    <div class="up_screen">
        <div class="banner_wrap flex_all_center">上传截图</div>
        <h2>上传截图凭证<span>（评论、应用二合一图，如样式图）</span></h2>
        <div class="pic_wrap">
            <div class="pic"><img src="https://static.cattryapp.com/12static/new/img/comment_example.png" ></div>
            <div class="pic">
                <form action="" enctype="multipart/form-data">
                    <input type="file"  @change="changeImg($event)" ref="file" id="file" accept="image/* " >
                    <img id="img_content" src="https://static.cattryapp.com/12static/new/img/commen_addimg.png" >
                </form>
            </div>
        </div>
    </div>

    <div class="btn2 flex_all_center active_red" @click="submit">提交审核</div>
    <h2 class="giveup tc" @click="abandon">放弃任务</h2>
    <!-- 警告弹窗 -->
    <div v-if="showWarning" @touchmove.prevent>
        <div class="shade"></div>
        <div class="warning_pop flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/common_warning_icon.png">
            <h1>提示</h1>
            <h2>填写评论时请按照要求填写</h2>
            <h3 class="tc">如果随意填写发挥，<span class="red">不符合模版要求 ，审核必不通过</span>。并减少您评论任务的推送，甚至关闭！</h3>
            <div :class="djs<0?'canclick':''" class="warning_btn flex_all_center" @click="cancelwarning">我知道了<span v-if="djs>=0">({{djs}})</span></div>
        </div>        
    </div>

</div>    
</template>
<script>
var warningDjs;
    import api from '@//api/api.js'
    import client from '@//api/clientApi.js'
    export default {
        name:'APP',
        data(){
            return {
                title:'',           //标题
                content:'',         //内容
                cantChange:false,   //后端判断是否可以自定义标题和内容
                base: [],           //应用基本信息
                surplus: {         //任务剩余时间
                    h: 0,       //时
                    m: 0,       //分
                    s: 0,       //秒
                    all: 0         //剩余秒数
                },
                tools: {
                    timer: null      //定时器
                },
                task: [],
                detailId: 0,
                img: "",
                data: [],
                disabled: false,
                is_submit: false,    //是否提交
                num:'2',
                showWarning:false,       //警告弹窗
                djs:'3',            //警告弹窗倒计时

            }
        },

        mounted(){
            this.popdjs()
            this.init();
        },
        updated() {
            if(this.surplus.all < 0){  //时间到
                clearInterval(this.tools.timer);
                api.commentAbandon({taskid: this.$route.query.taskid}).then(res => {
                    var _this = this;
                    this.$MessageBox.alert("任务时间到").then(res => {
                        _this.$router.push({path: '/commentList'});
                    });
                })
            }
        },
        computed:{
            //标题行数
            titleRow(){
                var title = this.title;
                if(title === null){
                    title = ""
                }
                if(title.length>30){
                    return '3'
                }else if(title.length>15){
                    return '2'
                }else{
                    return '1'
                }
            },
            //内容行数
            contentRow(){
                var content = this.content;
                if(content.length>30){
                    return '3'
                }else if(content.length>15){
                    return '2'
                }else{
                    return '1'
                }
            }
        },
        methods:{
            init(){
                var id = this.$route.query.taskid;
                if(typeof id == "undefined")
                    this.$router.push({path: '/commentList'});

                api.commentDetail({taskid: id}).then(res => {
                    console.log(res)
                    if(res.data.status == true){
                        this.data = res.data.data;
                        this.content = res.data.data.content;
                        this.title = res.data.data.title;
                        if(res.data.data.templet_id == 1){
                            this.disabled = true;
                        }
                        this.surplus.all  = res.data.data.remain_time;    //剩余时间
                    } else if(res.data.code == 1000){
                        this.$MessageBox.alert(res.data.msg);
                    }
                })

                //倒计时
                var _this = this;
                this.tools.timer = setInterval(function(){
                    _this.surplus.h = parseInt(_this.surplus.all / 3600);
                    _this.surplus.m = parseInt((_this.surplus.all % 3600) / 60);
                    _this.surplus.s = parseInt((_this.surplus.all % 3600) % 60);
                    --_this.surplus.all;
                },1000);
            },

            //添加标题关键字
            add_title_keyword(e){
                this.title += e.target.textContent;
            },
            //添加内容关键字
            add_content_keyword(e){
                this.content += e.target.textContent
            },
            copy_title(){
                // alert(this.content)
                client.copykeyword(this.title);
            },
            copy_content(){
                client.copykeyword(this.content);
            },

            //截图处理
            changeImg(e){
                //this.$loadding.open('正在上传图片')
                var img = document.getElementById("file");
                var objecturl = URL.createObjectURL(img.files[0]);
                var fr = new FileReader();
                fr.readAsDataURL(img.files[0]);
                var _this = this;
                fr.onload = function () {
                    _this.img = this.result;
                    document.getElementById("img_content").setAttribute('src', this.result);   //显示图片
                }
            },
            submit(){
                var params = {
                    content: this.content,
                    title: this.title,
                    detailId: this.data.id,
                    img: this.img
                };
                this.$loadding.open("提交中..");
                api.commentSubmit(params).then(res => {
                    if(res.data.status == true){
                        this.$loadding.close();
                        this.$MessageBox.alert(res.data.msg);
                        this.is_submit = true;
                        this.$router.push({path: '/commentList'});
                    } else if(res.data.code == 1000){
                        this.$loadding.close();
                        this.$MessageBox.alert(res.data.msg);
                    }
                })
            },
            download(){
                window.location.href = this.data.appstore_url;
            },
            abandon(){
                this.$router.push({path: '/commentList'});
            },
            // 警告弹窗倒计时
            popdjs(){
                this.showWarning = true,
                warningDjs = setInterval(() => {
                    var djs = this.djs;
                    djs--;
                    this.djs=djs;
                    if(this.djs<0){
                        clearInterval(warningDjs)
                    }
                }, 1100);
            },
            cancelwarning(){
                if(this.djs>=0) return
                this.showWarning=false
            }        
        },
        beforeRouteLeave(to,from,next){
            if(this.surplus.all <=0 || this.is_submit == true){
                clearInterval(warningDjs)
                next();
                return;
            }
            this.$MessageBox.confirm("再坚持一下,就能获取现金奖励?","是否放弃任务",{confirmButtonText: "不放弃",cancelButtonText: "放弃"}).then(action => {
            
            }).catch(action => {
                api.commentAbandon({}).then(res => {
                    if(res.data.status == true){
                        clearInterval(warningDjs)
                        next();
                    } else {
                        _this.$MessageBox.alert("网络错误,请稍后再试");
                    }
                })
            })
        },

    }
</script>

<style scoped>
.warning_word{
    width:23.0714rem;
    background:rgba(255,243,242,1);
    margin-top: 0.7143rem;
    padding: 0.4286rem 0.7143rem;
    box-sizing: border-box;
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,99,83,1);
    line-height:1.4286rem;
}
.canclick{
    opacity: 1!important;
}
.warning_btn{
    width:15.7143rem;
    height:3.1429rem;
    background:rgba(255,99,83,1);
    border-radius:1.5714rem;
    opacity:0.6;
    margin-top: 2rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.warning_pop{
    width:20rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem; 
    z-index: 800;
    position: fixed;
    top: 25%;
    left: 50%;
    transform:translateX(-50%);
    padding: 0 1.7143rem 1.5714rem;
    box-sizing: border-box;
}
.warning_pop h1{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:1.7857rem;
    margin-top: -0.8571rem;
}
.warning_pop h2{
    margin-top: 1.1429rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
}
.warning_pop h3{
    font-family:PingFangSC-Regular;
    color:rgba(0,0,0,1);
    line-height:1.7143rem;
    margin-top: 1.1429rem;
    text-indent: 1em;
}
.warning_pop img{
    width: 8.1429rem;
    margin-top: -4.2857rem;
}
textarea{
    border:none;
    outline: none;
    width: 17.85rem;
    white-space:normal;
    background: rgba(241,248,251,1);
    font-size: 1.0714285714285714rem;
}
textarea::-webkit-input-placeholder{
    line-height: 1.5714285714285714rem;
    color:rgba(204,204,204,0.8);
}
input{
    width: 17.85rem;
    white-space:normal;
    outline: none;
    border:0;
    background: rgba(241,248,251,1);
    font-family:PingFangSC-Regular;
    line-height:1rem;
    z-index: 100;
    font-size: 1.0714285714285714rem;
}
input::-webkit-input-placeholder{
    line-height: 1.5714285714285714rem;
    color:rgba(204,204,204,0.8);
}
.all_wrap{
    width: 100%;
    background:rgba(246,246,246,1);
    padding-bottom: 3.5714285714285716rem;
}
.common_app_msg_wrap{
    margin-top:1.4285714285714286rem;
}
.common_head_wrap2{
    width: 100%;
    height: 10.857142857142858rem;
    box-sizing: border-box;
    background: url('https://static.cattryapp.com/12static/new/img/heighDetail_head.png');
    background-size: 100% 100%;
    position: relative;
}
.waring{
    padding-top: 0.8571428571428571rem;
    font-size:0.8571428571428571rem;
    font-family:PingFangSC-Regular;
    color:rgba(84,84,84,1);
    display: flex;
    align-items: center;
}
.waring img{
    width: 1.0714285714285714rem;
    margin-right: 0.5714285714285714rem;
}
.step_wrap{
    width:25.071428571428573rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714285714285714rem;
    margin:7.142857142857143rem auto 0;
    position: relative;
    padding: 3.357142857142857rem 1.1428571428571428rem 2rem;
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
.red_dot_wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 0.5714285714285714rem;
}
.red_dot_wrap .red_dot{
    width:0.5714285714285714rem;
    height:0.5714285714285714rem;
    background:rgba(255,99,83,1);
    border-radius: 50%;
}
.red_dot_wrap .grey_line{
    width:0.07142857142857142rem;
    height:1.6428571428571428rem;
    background:rgba(220,220,220,1);
}
.step_word p{
    margin-left: 1rem;
    margin-bottom: 1.1428571428571428rem;
}
.btn{
    width:15.714285714285714rem;
    height:3.142857142857143rem;
    background:rgba(81,146,245,1);
    border-radius:1.5714285714285714rem;
    color: white;
    font-size:1.1428571428571428rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin: 1.4285714285714286rem auto 0;
}
.comment_content{
    width:25.071428571428573rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714285714285714rem;
    margin:2.5714285714285716rem auto 0;
    position: relative;
    padding: 2.857142857142857rem 1.1428571428571428rem 2rem;
    box-sizing: border-box;
}
.comment_tips{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:1.4rem;
}
.comment_tips span{
    color: #FF6353;
}
.red{
    color: #FF6353;
}
.comment_content img{
    width: 9.285714285714286rem;
    height: 10rem;
    margin: 0.8571428571428571rem 0 1.1428571428571428rem;
    margin-right: 0.7142857142857143rem;
}
.comment_item{
    margin-bottom: 0.8571428571428571rem;
}
.comment_item h2{
    white-space: nowrap;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(30,30,30,1);
}
.item_content{
    width:22.785714285714285rem;
    min-height:3.142857142857143rem;
    background:rgba(74,144,226,0.07);
    border-radius:0.2857142857142857rem;
    position: relative;
    padding: 0.7142857142857143rem 0.8571428571428571rem;
    box-sizing: border-box;
}
.item_content .right_copy_wrap{
    margin-left: 0.7142857142857143rem;
    padding-left: 0.42857142857142855rem;
    border-left: 0.07142857142857142rem solid rgba(74,144,226,0.2);
    font-size:1.1428571428571428rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(74,144,226,1);
    white-space: nowrap;
}
.key_word_wrap{
    margin-bottom: 0.7142857142857143rem;
    align-items: center;
}
.accept_word{
    padding: 0.2857142857142857rem 0.5714285714285714rem;
    border: 1px solid rgba(48,152,255,1);
    color: #4A90E2;
    border-radius: 7.142857142857143rem;
    white-space: nowrap;
}
.up_screen{
    width:25.071428571428573rem;
    height:19.857142857142858rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714285714285714rem;
    position: relative;
    margin: 2.5714285714285716rem auto 0;
    padding: 3.142857142857143rem 1.1428571428571428rem 1.7142857142857142rem;
    box-sizing: border-box;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
}
.up_screen span{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
}
.pic_wrap{
    margin-top: 0.78rem;
    display: flex;
}
.pic_wrap .pic{
    width: 7.38rem;
    height: 12.96rem;
    margin-right: 1.5rem;
}
.pic_wrap .pic form{
    width: 100%;
    height: 100%;
    position: relative;
}
.pic_wrap form input{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
}
.pic img{
    width: 100%;
    height: 100%;
}
.btn2{
    width:22.5rem;
    height:3.142857142857143rem;
    background:rgba(204,204,204,0.7);
    border-radius:1.5714285714285714rem;
    margin: 2.2857142857142856rem auto 0;
    color: white;
    font-size:1.1428571428571428rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
}
.giveup{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    margin-top: 1.7142857142857142rem;
}

</style>
