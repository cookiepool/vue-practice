<template>
<div class="all_wrap">
    <div class="common_bac_color"></div>
    <app-header-step :title="'试玩赚钱'" :step="['下载安装','按要求完成试玩','领取奖励']"></app-header-step>

    <div v-if="headUnionTips" class="union_tips flex_all_center">
        <div class="left_tips flex_center">
          <p>每天10:00、16:00、20:00有大量任务陆续上线</p>
        </div>
    </div>

    <div v-cloak  class="task_wrap" v-show="hastasking > 0" @click="taskitemclick(taskingdata)" >
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/fast_list_ing.png" >
                <p>进行中任务</p>
            </div>
            <p class="right_msg">
                总计{{taskingdata.tuser_price}}元
            </p>
        </div>
        <!-- 进行中列表 -->
        <div class="common_list_wrap">
            <div class="placeholder"></div>
            <div class="common_item flex_btn_center">
                <div class="left_msg flex">
                    <img :src="taskingdata.ico">
                    <div class="word_msg">
                        <h2>{{taskingdata.taskname}}</h2>
                        <!--<i>注册、下载、截图</i>-->
                        <div class='bot_msg flex'>
                            <!--<p class="price">免费</p>-->
                            <p class="surplus">剩{{taskingdata.remain_number}}份</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price">
                        +{{taskingdata.tuser_price}}<i>元</i>
                    </div>
                </div>
            </div>          
        </div>    
    </div>    
    <div v-cloak class="head_tips_wrap flex_btn_center" v-if="belongtaskdata.count != 0" @click="gobelongs">
        <div class="left_msg flex">
            <img src="https://static.cattryapp.com/12static/new/img/head_crown.png" >
            <p>有{{belongtaskdata.count}}个专属任务</p>
        </div>
        <p class="right_msg">+{{belongtaskdata.summoney}}<span>元</span></p>
    </div>

    <!-- 推荐任务 -->
    <div v-cloak class="task_wrap" v-if="prodatas.length > 0 && isQudao == 'false'">
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/fast_list_recommend.png" >
                <p>推荐任务</p>
            </div>
            <p class="right_msg">
                总计{{protask_totalmoney}}元
            </p>
        </div>
        <!-- 推荐列表 -->
        <div class="common_list_wrap">
            <div class="placeholder"></div>
            <div class="common_item flex_btn_center" v-for="(item,index) in prodatas" :key="index" @click="taskitemclick(item)" v-show="item.isShow==true">
                <div class="left_msg flex">
                    <div class="blur_wrap">
                        <img src='' class="common_blur" :data-original="item.ico">
                    </div>
                    <div class="word_msg">
                        <h2>{{item.taskname}}</h2>
                        <!--<i>注册、下载、截图</i>-->
                        <div class='bot_msg flex'>
                            <!--<p class="price">免费</p>-->
                            <p v-for="(it,index) in item.tags" :key="index" class="tag" :class="it.classname" >{{it.tagname}}</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price">
                        +{{item.tuser_price}}<i>元</i>
                    </div>
                </div>
            </div>
        </div>    
    </div>

    <!-- 投放任务 -->
    <div v-cloak class="task_wrap" v-if="fastnowdatacul.length >=0">
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/fast_list_thorw.png" >
                <p>投放任务</p>
            </div>
            <p class="right_msg">
                总计{{fastnowdata_totalmoney}}元
            </p>
        </div>
        <!-- 投放列表 -->
        <div class="common_list_wrap">
            <div class="placeholder"></div>
            <div class="common_item flex_btn_center" v-for="(item,index) in fastnowdatacul" :key="index" @click="taskitemclick(item)" v-show="item.isShow==true">
                <div class="left_msg flex">
                    <div class="blur_wrap">                   
                        <img class="common_blur" :data-original="item.ico">
                    </div>
                    <div class="word_msg">
                        <h2>{{item.taskname}}</h2>
                        <!--<i>注册、下载、截图</i>-->
                        <div class='bot_msg flex'>
                            <!--<p class="price">免费</p>-->
                            <p v-if="it.tagname!='专属'" v-for="(it,index) in item.tags" :key="index" class="tag" :class="it.classname" >{{it.tagname}}</p>
                            <img class="exclusive" v-else src="https://static.cattryapp.com/12static/new/img/fast_list_exclusive.png">
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price">
                        +{{item.tuser_price}}<i>元</i>
                    </div>
                </div>
            </div>
            <!-- 暂无快速任务，联盟任务引导 -->
            <div v-cloak v-show="fastnowdatacul.length==0" class="notask_lmGuide flex_column_center">
               <img src="https://static.cattryapp.com/12static/new/img/notask.png">
               <h2>暂无投放中任务</h2>
               <i>去玩联盟任务继续赚钱吧</i>
               <div class="noTask_btn flex_all_center" @click="goUnion">去玩联盟任务</div>
            </div>
        </div>    
    </div>    
    <!-- task<5展示联盟入口 -->
    <img v-cloak v-if="fastnowdatacul.length>0&&fastnowdatacul.length<5" class="unionBanner" src="https://static.cattryapp.com/12static/new/img/fastList_unionBanner.png" @click="goUnion">

    <!-- 即将开始任务 -->
    <div v-cloak class="task_wrap" v-if="fastafterdata.length > 0">
        <div class="task_head_tips flex_btn_center">
            <div class="left_msg flex">
                <img src="https://static.cattryapp.com/12static/new/img/fast_list_announce.png" >
                <p>即将开始</p>
            </div>
            <p class="right_msg">
                总计{{after_totalmoney}}元
            </p>
        </div>
        <!-- 即将开始列表 -->
        <div class="common_list_wrap">
            <div class="placeholder"></div>
            <div class="common_item flex_btn_center" v-for="(item,index) in fastafterdata" :key="index">
                <div class="left_msg flex">
                    <div class="time_wrap flex_column_center">
                        <p>{{item.day}}</p>
                        <p>{{item.start_time}}</p>
                    </div>
                    <div class="word_msg">
                        <h2>{{item.name}}</h2>
                        <div class='bot_msg flex'>
                            <p class="after_amount">共{{item.amount}}份</p>
                        </div>
                    </div>
                </div>
                <div class="right_msg">
                    <div class="right_price">
                        +{{item.tuser_price}}<i>元</i>
                    </div>
                </div>
            </div>

        </div>    
    </div> 

    <div v-cloak class="bottom_tips flex_all_center" v-if="fastafterdata.length > 0">
        没有更多了喵~
    </div>

    <div v-if="noTask">
        <div class="common_bac_color"></div>
        <div class="no_appre flex_column_center">
            <img src="https://static.cattryapp.com/12static/new/img/notask.png">
            <p class="tips1">暂没有任务</p>
            <i>下午三点后任务多多,请准时到场</i>
        </div>
    </div>

</div>    
</template>

<script>
import api from "@//api/api.js";
import clientApi from "@//api/clientApi.js";
import common from "@//api/common.js";
import {LazyLoad} from "@//api/LazyLoad.js";
import consts from "@//api/consts.js";
import fix from "@//api/fix.js";
import { Toast } from 'mint-ui';
export default {
  name: "APP",
  data() {
    return {
      localboundleids: [], //本地已安装的包名
      fastnowdata: [], //快速任务投放中的
      fastafterdata: [], //未开始的
      profasktasks: [], //推荐任务的快速任务
      completedata: [], //已完成的
      proctasks: [], //推荐 回调任务
      provolmtasks: [], //推荐 高额任务
      getreportdataed: false, //判断是否执行上报
      isGetDianru: "false", //是否获取点入任务
      belongtaskdata: { count: 0, summoney: 0 }, //专属任务信息
      idfa: "",
      hastasking: 0, //是否有正在进行中的任务
      isQudao: "false", //是否为渠道用户
      is_ios11: false,
      checktaskinstall: "",
      taskingdata: [], //进行中的任务数据
      noTask: false,
      headUnionTips:true,         //顶部联盟任务tips
      bindWx:null,
      bindPhone:null,       
      showAppreActivity:false
    };
  },
  components:{

  },
  mounted() {
      this.$loadding.open()
      this.init().then(()=>{
          this.$loadding.close()
      })
  },
  updated(){
    const lazy = new LazyLoad('.common_blur')
  },
  methods: {
    init() {
      //checklogin
      //获取本地已安装的包
      return new Promise((resolve, reject) => {
        clientApi.getlocalinstalledboundleid()
        .then((response)=> {
          var localboundleids = [];
          for (var i = 0; i < response.data.length; i++) {
            localboundleids.push(response.data[i].app_identifier);
          }
          this.localboundleids = localboundleids;
          this.synccompletetask();
        })
        .catch(function(err) {
 
        });
        var fast = this.get_tasklist_data;
        Promise.all([fast()]).then(() => {
            this.$loadding.close()
            resolve()
        });
        this.getproconfig();
      });
    },  
    getproconfig: function() {
      var timestamp = Date.parse(new Date());
      api.get_operate_task()
        .then(response => {
          response.data = response.data.data;
          if (response.data.tasks.length > 0) {
            for (var i = 0; i < response.data.tasks.length; i++) {
              switch (response.data.tasks[i].type) {
                case 1:
                  this.profasktasks.push({
                    taskid: response.data.tasks[i].id,
                    listorder: response.data.tasks[i].weight
                  });
                  break;
                case 2:
                  var additem = {};
                  additem.taskid = response.data.tasks[i].id;
                  additem.taskname = response.data.tasks[i].adname;
                  additem.tuser_price = response.data.tasks[i].price_tuser;
                  additem.tags = [];
                  additem.tags.push({
                    tagname: "回调任务",
                    classname: "type_tips"
                  });
                  if (response.data.tasks[i].remain_number < 0) {
                    response.data.tasks[i].remain_number = 0;
                  }
                  additem.tags.push({
                    tagname: "有剩余",
                    classname: "surplus"
                  });
                  additem.remain_number = response.data.tasks[i].remain_number;
                  additem.ico = response.data.tasks[i].icon;
                  additem.listorder = response.data.tasks[i].weight;
                  additem.type = "ctask";
                  additem.isShow = true;
                  this.proctasks.push(additem);
                  break;
                case 3:
                  var additem = {};
                  additem.taskid = response.data.tasks[i].id;
                  additem.taskname = response.data.tasks[i].name;
                  additem.tuser_price = response.data.tasks[i].price_tuser;
                  additem.tags = [];
                  additem.tags.push({
                    tagname: "高额任务",
                    classname: "type_tips"
                  });
                  additem.tags.push({
                    tagname: "有剩余",
                    classname: "surplus"
                  });
                  additem.remain_number = response.data.tasks[i].remain_number;
                  additem.ico = response.data.tasks[i].icon;
                  additem.listorder = response.data.tasks[i].weight;
                  additem.type = "voltask";
                  additem.isShow = true;
                  this.provolmtasks.push(additem);
                  break;
              }
            }
          }

          //6无需报告,另外getreportdataed,用于判断是否拿到配置文件,如果没有拿到则后续的上报先不进行
          this.getreportdataed = true;
        })
        .catch(err => {
          console.log("获取推荐任务有误");
        });
    },
    synccompletetask: function() {
      for (var i = this.fastnowdata.length - 1; i >= 0; i--) {
        if (this.fastnowdata[i].tasking == 1) {
          continue;
        }
        if (common.inArray(this.fastnowdata[i].boundid, this.localboundleids)) {
          this.completedata.push(this.fastnowdata.splice(i, 1)[0]);
        }
      }
    },
    // 获取自家快速任务
    get_tasklist_data: function() {
      return new Promise((resolve, reject) => {
        var timestamp = Date.parse(new Date());
        api.get_tasklist_data(timestamp)
          .then(response => {
            var resData = response.data.data.data;
            response.data.data = common.decryption(resData);
            this.bindWx = response.data.data.bindWx;
            this.bindPhone = response.data.data.bindPhone;
            if(response.data.data.length==0){
                resolve();
                return;
            }
            this.idfa = response.data.data.idfa;
            this.is_ios11 = response.data.data.is_ios11;
            this.osversion = response.data.data.osversion;
            this.isQudao = response.data.data.isQudao;
            this.isGetDianru = response.data.data.isGetDianru;
            //处理任务的标签等问题
            if (response.data.status == true) {
              //处理专属任务
              this.belongtaskdata = response.data.data.belongtask;
              //处理进行中任务
              var nowLength = response.data.data.now.length;
              if (nowLength > 0) {
                for (var i = 0; i < nowLength; i++) {
                  var adddata = {};
                  adddata.taskid = response.data.data.now[i].id;
                  adddata.taskname = response.data.data.now[i].name;
                  adddata.tags = [];
                  adddata.remain_number =
                    response.data.data.now[i].remaining_number;
                  adddata.tags.push({
                    tagname: "有剩余",
                    classname: "surplus"
                  });
                  if (response.data.data.now[i].is_charge == 1) {
                    adddata.tags.push({
                      tagname: "付费",
                      classname: "tag-purple"
                    });
                  } else {
                    //adddata.tags.push({tagname:"免费",classname:"tag-yellow"});
                  }
                  if (response.data.data.now[i].has_belongtask) {
                    adddata.tags.push({
                      tagname: "专属",
                      classname: "tag-yellow"
                    });
                  }
                  adddata.app_price = response.data.data.now[i].app_price;
                  adddata.tuser_price = response.data.data.now[i].tuser_price;
                  adddata.appstoreId = response.data.data.now[i].appstoreId;
                  adddata.boundid = response.data.data.now[i].boundid;
                  adddata.ico = response.data.data.now[i].icon;
                  adddata.type = "fasktask";
                  adddata.isShow = true;
                  adddata.listordertype = 99;
                  if (response.data.data.now[i].tasking == 1) {
                    adddata.tasking = 1;
                    this.hastasking = 1;
                    this.taskingdata = adddata;
                  } else {
                    adddata.tasking = 0;
                  }
                  if (response.data.data.now[i].tasking != 1) {
                    this.fastnowdata.push(adddata);
                  }
                }
              }
              //处理完成了的任务
              if (response.data.data.complete.length > 0) {
                for (var i = 0; i < response.data.data.complete.length; i++) {
                  var adddata = {};
                  adddata.taskid = response.data.data.complete[i].id;
                  adddata.taskname = response.data.data.complete[i].name;
                  adddata.tags = [];
                  adddata.tags.push({
                    tagname:
                      "剩余" +
                      response.data.data.complete[i].remaining_number +
                      "份",
                    classname: "tag-pink"
                  });
                  if (response.data.data.complete[i].is_charge == 1) {
                    adddata.tags.push({
                      tagname: "付费",
                      classname: "tag-purple"
                    });
                  } else {
                    //adddata.tags.push({tagname:"免费",classname:"tag-yellow"});
                  }
                  adddata.app_price = response.data.data.complete[i].app_price;
                  adddata.tuser_price =
                    response.data.data.complete[i].tuser_price;
                  adddata.appstoreId =
                    response.data.data.complete[i].appstoreId;
                  adddata.boundid = response.data.data.complete[i].boundid;
                  adddata.ico = response.data.data.complete[i].icon;
                  adddata.type = "fasktask";
                  this.completedata.push(adddata);
                }
              }
              this.synccompletetask();
              //处理未开始任务
              if (response.data.data.after.length > 0) {
                this.fastafterdata = response.data.data.after;
              }
              resolve();
            }
          })
          .catch(err => {
            resolve();
          });
      });
    },

    gobelongs: function() {
      this.$router.push({ path: "./belongsList" });
    },

    canceltask: function(item) {
      api.untask()
      .then(response => {
        if (response.data.status == 1) {
          for (var i = 0; i < this.fastnowdata.length; i++) {
            this.fastnowdata[i].tasking = 0;
          }
          this.hastasking = 0;
          this.checkisinstall(item);
        } else {
          //放弃任务错误
          this.$MessageBox.alert(response.data.msg);
        }
      })
      .catch(err => {
        this.$MessageBox.alert("服务器繁忙,请稍后再试");
      });
    },

    //开始任务前检测是否安装应用
    checkisinstall: function(data) {
        if(this.osversion==12) { //IOS12检测是否安装
            clientApi.ios11openurl({bundleid: data.boundid})
            .then(response => {
                if(response.data == 1){
                    api.localInstalled({params: {boundid:data.boundid, taskid:data.taskid}})
                    .then( (res)=> {
                        if(res.data.status == 1){
                        //删除当前块，由于后端已去重，刷新后不会再次展示
                            data.isShow=false;
                        Toast({message: '你已经安装了该应用,请抢其他任务吧~',duration: 2000});
                        }else{
                            this.$MessageBox.alert(res.data.msg);
                        }
                    })
                    .catch( (error)=> {
                          data.isShow=false;
                          Toast({message: '你已经安装了该应用,请抢其他任务吧~',duration: 2000});
                    });
                }else {
                    //记录点击事件
                    var nowDate = new Date();
                    var nowTime = nowDate.getTime();
                    var code = fix.fix(nowTime.toString() + data.taskid);
                    var clickDatas = {taskid: data.taskid,type:'start',code:code,'time':nowTime};
                    api.taskProcessLog(clickDatas).then((ret)=>{
                    });
                    this.starttask(data);
                }
            })
            .catch(function(err) {

            });
        }else {
          //ios12以下检测应用是否已安装
          var can_reload = false;
              clientApi.checktaskinstall(consts.V4installapp + "?bundleid=" + data.boundid)
              .then(response => {
                if (response.status == 1) {
                  Toast({message: '你已经安装了该应用',duration: 2000});
                  data.isShow = false;
                } else {
                  this.starttask(data);
                }
              })
              .catch(function(err) {

              });
        }
    },
    taskitemclick: function(data) {
      switch (data.type) {
        case "fasktask":
          var taskid = data.taskid;
          if (data.tasking == 1) {
            //当前任务在进行中，直接跳转
            this.$router.push({
              path: "./fastDetail",
              query: { taskid: taskid }
            });
            //跳转到详情页面
          } else if (this.hastasking == 1) {
            this.$MessageBox
              .confirm(
                "当前有进行中的任务，确定放弃之前任务开始此任务吗？",
                "温馨提示",
                {
                  confirmButtonText: "继续任务",
                  cancelButtonText: "放弃任务",
                  closeOnClickModal: false
                }
              )
              .then(res => {
                this.$router.push({
                  path: "./fastDetail",
                  query: { taskid: this.taskingdata.taskid }
                });
              })
              .catch(res => {
                //放弃任务开始新任务
                this.canceltask(data);
              });
          } else {
            //开始任务前先检测是否安装应用
            this.checkisinstall(data);
          }
          break;
        case "ctask":
          this.start_callbacktask(data);
          break;
        case "voltask":
          this.startvoltask(data);
          break;
      }
    },
    starttask: function(item) {
      this.dostarttask(item, 10);
    },
    dostarttask: function(item, times) {
      this.$loadding.open("抢任务中..");
      var nowDate = new Date();
      var nowTime = nowDate.getTime();
      var code = fix.fix(nowTime.toString() + item.taskid);
      var taskid = item.taskid;
      var data = { taskid: item.taskid, time: nowTime, code: code };
      api.starttask(data)
        .then(response => {
            this.$loadding.close();
            console.log(response);
          if (response.data.status === true) {
            this.$loadding.open('抢任务中..');
            this.hastasking = 1;
            item.tasking = 1;
            this.hastasking = 1;
            this.taskingdata = item;
            var clickData = { taskid: item.taskid };
            api.remarkClickEvent({ params: clickData })
            .then(res => {
              console.log(res);
              this.$loadding.close();
              this.$router.push({
                path: "./fastDetail",
                query: { taskid: taskid }
              });
            })
            .catch(err=>{
              this.$MessageBox.alert('remarkClickEvent出错，请联系客服');
            })
          } else {
            if (response.data.code == 1005) {
              if (times > 1) {
                this.dostarttask(item, times - 1);
              } else {
                  Toast({message: '抢任务的小伙伴太多啦，换一个试试吧~',duration: 2000});
              }
            }else {
              if(response.data.code==1015||response.data.code==1016||response.data.code==1017){
                return
              }
              Toast({message: response.data.msg,duration: 2000});
              item.isShow = false;
            }
          }
        })
        .catch(err => {
          this.$loadding.close();
          //网络错误
          this.$MessageBox.alert("服务器繁忙,请稍后再试");
          item.hastasking = 0;
          item.isShow = false;
          item.hastasking = 0;
        });
    },
    start_callbacktask: function(data) {
      api.callbackcomplete({ taskid: data.taskid })
        .then(response => {
          if (response.data.status == 1) {
            this.$router.push({
              path: "./unionCallbackDetail",
              query: { taskid: data.taskid }
            });
          } else {
            data.isShow = false;
            this.$MessageBox.alert(response.data.msg);
          }
        })
        .catch(function(err) {
          this.$MessageBox.alert("服务器繁忙,请稍后再试");
        });
    },
    startvoltask: function(data) {
      api.heightTaskStart({ taskid: data.taskid })
      .then(res => {
        var _this = this;
        if (res.data.status == true) {
          this.$router.push({
            path: "/heighDetail",
            query: { id: data.taskid }
          });
        } else {
          if (res.data.code == 1000) {
            this.$MessageBox.alert(res.data.msg);
          } else if (res.data.code == 2001) {
            this.$MessageBox
              .confirm("有其他进行中的任务,是否放弃")
              .then(res => {
                if (res == "confirm") {
                  api.heightTaskAbandon({}).then(ret => {
                    if (ret.data.status == true) {
                      _this.start(id);
                    } else {
                      this.$MessageBox.alert(res.data.msg);
                    }
                  });
                }
              })
              .catch(err => {
                if (err == "cancel") {
                }
              });
          }
        }
      })
      .catch(err => {
        this.$MessageBox.alert("服务器繁忙,请稍后再试");
      });
    },

    //联盟任务列表
    goUnion(){
      _hmt.push(['_trackEvent', '快速任务', '点击联盟任务banner', '点击']);
      this.$router.push('/unionList')
    },
    //取消顶部联盟任务tips
    cancelTips(){
      this.headUnionTips = false
    },
  },
  computed: {
    prodatas: function() {
      //推荐任务和快速、联盟任务排序
      var returndata = [];
      if (this.proctasks.length > 0) {
        //推荐任务
        for (var i = 0; i < this.proctasks.length; i++) {
          this.proctasks[i].isShow = true;
          if (
            this.proctasks[i].remain_number &&
            this.proctasks[i].remain_number > 0
          ) {
            returndata.push(this.proctasks[i]);
          }
        }
      }
      if (this.provolmtasks.length > 0) {
        for (var i = 0; i < this.provolmtasks.length; i++) {
          if (
            this.provolmtasks[i].remain_number &&
            this.provolmtasks[i].remain_number > 0
          ) {
            returndata.push(this.provolmtasks[i]);
          }
        }
      }
      if (this.profasktasks.length > 0 && this.fastnowdata.length > 0) {
        for (var i = 0; i < this.profasktasks.length; i++) {
          for (var j = this.fastnowdata.length - 1; j >= 0; j--) {
            if (this.fastnowdata[j].taskid == this.profasktasks[i].taskid) {
              this.fastnowdata[j].listorder = this.profasktasks[i].listorder;
              if (
                this.fastnowdata[j].remain_number &&
                this.fastnowdata[j].remain_number > 0
              ) {
                returndata.push(this.fastnowdata[j]);
              }
            }
          }
        }
      }
      returndata.sort(function(a, b) {
        return parseInt(b.listorder) - parseInt(a.listorder);
      });
      return returndata;
    },
    fastnowdatacul: function() {
      //快速和联盟排序
      var returndata = [];
      var dealtaskids = [];
      if (this.profasktasks.length > 0 && this.fastnowdata.length > 0) {
        var profasktskids = [];
        for (var i = 0; i < this.profasktasks.length; i++) {
          profasktskids.push(this.profasktasks[i].taskid);
        }
        for (var j = this.fastnowdata.length - 1; j >= 0; j--) {
          if (
            profasktskids.length > 0 &&
            !common.inArray(this.fastnowdata[j].taskid, profasktskids)
          ) {
            returndata.push(this.fastnowdata[j]);
          } else {
            if (this.fastnowdata[j].remain_number <= 0) {
              returndata.push(this.fastnowdata[j]);
            }
          }
        }
      } else if (this.fastnowdata.length > 0) {
        for (var j = this.fastnowdata.length - 1; j >= 0; j--) {
          returndata.push(this.fastnowdata[j]);
        }
      }
      returndata.sort(function(a, b) {
        if (a.listordertype == b.listordertype) {
          if (a.type == "fasktask" && b.type == "fasktask") {
            if (a.tasking == b.tasking) {
              return parseInt(b.remain_number) - parseInt(a.remain_number);
            } else {
              return b.tasking - a.tasking;
            }
          } else {
            return b.listordertype - a.listordertype;
          }
        } else {
          //处理快速任务排序
          if (a.type == "fasktask" && b.type != "fasktask") {
            if (parseInt(a.remain_number) == 0) {
              return 1;
            } else {
              return -1;
            }
          }
          if (a.type != "fasktask" && b.type == "fasktask") {
            if (parseInt(b.remain_number) == 0) {
              return -1;
            } else {
              return 1;
            }
          }
          return b.listordertype - a.listordertype;
        }
      });
      return returndata;
    },

    fastnowdata_totalmoney: function() {
      var total = 0;
      for (var i = 0; i < this.fastnowdatacul.length; i++) {
        total += parseFloat(this.fastnowdatacul[i].tuser_price);
      }
      return total.toFixed(2);
    },
    after_totalmoney: function() {
      var total = 0;
      for (var i = 0; i < this.fastafterdata.length; i++) {
        total += parseFloat(this.fastafterdata[i].tuser_price);
      }
      return total.toFixed(2);
    },
    protask_totalmoney: function() {
      var total = 0;
      for (var i = 0; i < this.prodatas.length; i++) {
        total += parseFloat(this.prodatas[i].tuser_price);
      }
      return total.toFixed(2);
    }
  }
};
</script>

<style scoped>
.zfb_banner{
  width: 100%;
  margin: -.7rem 0 .3rem
}
.appreBanner{
    width: 26.7857rem;
    height: 6rem;
    background: url('https://static.cattryapp.com/12static/new/img/fastList_appreBanner.png');
    background-size: 100% 100%;
    margin-bottom: 0.8571rem;
    position: relative;
}
.appreBanner p{
  font-size:0.7857rem;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
  position: absolute;
  right: 0.5714rem;
  top: 0.2857rem
}
.union_tips{
  width: 100%;
  height:2.7143rem;
  background:rgba(255,252,238,1);
  font-size:0.9286rem;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,163,64,1);
  padding: 0 1rem 0 1.1429rem;
  box-sizing: border-box;
  margin-bottom: 0.8571rem;
}
.union_tips img{
  width: 0.7143rem;
  padding: 0.1429rem
}
.union_tips .left_tips img{
  width: 1.1429rem;
  margin-right: 0.5714rem
}
.unionBanner{
  width: 100%;
  margin-bottom: 0.8571rem;
}
.notask_lmGuide{
  padding: 2.8571rem 0 4rem;
  box-sizing: border-box;
}
.notask_lmGuide img{
  width:4rem;
}
.notask_lmGuide h2{
  font-size:1.1429rem;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(102,102,102,1);
  margin: 1.4286rem 0 0.8571rem;
}
.notask_lmGuide i{
  font-size:0.8571rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(153,153,153,1);
}
.noTask_btn{
  width:15.7143rem;
  height:3.1429rem;
  border-radius:1.5714rem;
  border:0.0714rem solid #FF6353;
  margin-top: 2rem;
  font-size:1rem;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,99,83,1);
}
.blur_wrap {
  width: 3.22rem;
  height: 3.22rem;
  border-radius: 0.5714285714285714rem;
  margin-right: 0.7142857142857143rem;
  overflow: hidden;
}
.all_wrap {
  width: 100%;
  height: 100%;
  padding-bottom: 1.4285714285714286rem;
}
.head_tips_wrap {
  width: 100%;
  height: 5.142857142857143rem;
  background: rgba(255, 255, 255, 1);
  padding: 1rem 1.1428571428571428rem;
  box-sizing: border-box;
  margin-bottom: 0.7142857142857143rem;
}
.head_tips_wrap .left_msg {
  align-items: center;
}
.head_tips_wrap .left_msg p {
  font-size: 1.1428571428571428rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.head_tips_wrap img {
  width: 3.2142857142857144rem;
  margin-right: 0.7142857142857143rem;
}
.head_tips_wrap .right_msg {
  font-size: 1.4285714285714286rem;
  font-family: HelveticaNeue-Medium;
  font-weight: 500;
  color: rgba(255, 99, 83, 1);
  line-height: 1.7857142857142858rem;
}
.head_tips_wrap .right_msg span {
  font-size: 1rem;
}
.task_wrap {
  margin-bottom: 0.7142857142857143rem;
}
.task_head_tips {
  padding: 0 1.1428571428571428rem;
  width: 100%;
  height: 2.857142857142857rem;
  background: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-bottom: 0.07142857142857142rem solid rgba(241, 241, 241, 1);
}
.task_head_tips img {
  width: 1.1428571428571428rem;
  height: 1.1428571428571428rem;
  margin-right: 0.5714285714285714rem;
}
.task_head_tips .left_msg {
  font-size: 1rem;
  font-family: PingFangSC-Regular;
  color: rgba(102, 102, 102, 1);
  display: flex;
  align-items: center;
}
.task_head_tips .right_msg {
  font-size: 0.8571428571428571rem;
  font-family: PingFangSC-Regular;
  color: rgba(102, 102, 102, 1);
}
.bottom_tips {
  width: 100%;
  height: 4rem;
  background: rgba(246, 246, 246, 1);
  font-size: 0.7857142857142857rem;
  font-family: PingFangSC-Regular;
  color: rgba(153, 153, 153, 1);
}
.word_msg {
  position: relative;
}
.common_item .left_msg .exclusive {
  width: 3.9285714285714284rem !important;
  height: 1.4285714285714286rem;
  position: absolute;
  right: -5.428571428571429rem;
  top: 0rem;
}
.type_tips {
  padding: 0.14285714285714285rem 0.42857142857142855rem;
  font-size: 0.7857142857142857rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(81, 146, 245, 1);
  border-radius: 0.14285714285714285rem;
  border: 1px solid rgba(81, 146, 245, 1);
  margin-right: 0.5714285714285714rem;
}
.time_wrap {
  width: 3.2142857142857144rem;
  height: 3.2142857142857144rem;
  background: rgba(255, 163, 64, 1);
  border-radius: 0.5714285714285714rem;
  margin-right: 0.7142857142857143rem;
  padding-top: 0.42857142857142855rem;
  box-sizing: border-box;
  font-size: 0.8571428571428571rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.time_wrap p {
  margin-bottom: 0.2857142857142857rem;
}
.after_amount {
  padding: 0.14285714285714285rem 0.42857142857142855rem;
  font-size: 0.7857142857142857rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 99, 83, 1);
  border-radius: 0.14285714285714285rem;
  border: 1px solid rgba(255, 99, 83, 1);
}

.tag-purple{
    padding: 0.14285714285714285rem 0.2857142857142857rem;
    color:rgba(225,104,208,1);
    background:rgba(196,102,241,0.2);
    border-radius: 0.14285714285714285rem;
    margin-right: 0.5714285714285714rem;
    margin-left: 0.3rem
}
</style>
