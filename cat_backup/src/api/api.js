

axios.defaults.baseURL = 'http://wwwcs.cattryapp.com/';
axios.defaults.withCredentials=true;

//懒猫接口
export default  {
    //APP数据检测
    appCheck(param){
        return new Promise((resolve,reject)=>{
            axios.post("/task/abnormalTask",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //助手掉线错误日志上传
    clientErrlog(param){
        return new Promise((resolve,reject)=>{
            axios.post("/Share/errorLog",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //收徒首页
    appreHome(){
        return new Promise((resolve,reject)=>{
            axios.get("Apprentice/apprentice").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //弹窗已读记录
    apprehadRead(param){
        return new Promise((resolve,reject)=>{
            axios.post("Apprentice/popup",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //收徒方式
    appreGetMethods(){
        return new Promise((resolve,reject)=>{
            axios.get("Apprentice/share").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //我的权益
    myRights(){
        return new Promise((resolve,reject)=>{
            axios.get("Apprentice/myRights").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //我的权益领取红包
    myRightsGetpacket(param){
        return new Promise((resolve,reject)=>{
            axios.post("Apprentice/redPackets",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //有效徒弟列表
    getvalidApprentice(param){
        return new Promise((resolve,reject)=>{
            axios.post("apprentice/validApprentice",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //收徒任务列表
    getAppreList(param){
        return new Promise((resolve,reject)=>{
            axios.post("apprentice/apprenticeList",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    //大虾统计
    dxcount(){
        return new Promise((resolve,reject)=>{
            axios.get("Task/share").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //一元提现页信息展示
    fsmsg(){
        return new Promise((resolve,reject)=>{
            axios.get("Activity/yytx").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //一元提现
    fstWithdraw(param){
        return new Promise((resolve,reject)=>{
            axios.get("Activity/doyytx",{'params':param}).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //样式类型统计
    typecount(){
        return new Promise((resolve,reject)=>{
            axios.post("Activity/yytxtj").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //错误信息统计
    posterrlog(param){
        return new Promise((resolve,reject)=>{
            axios.post("Share/errorLog",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //首页详情
    getHomeMsg(){
        return new Promise((resolve,reject)=>{
            axios.get("index/index").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //获取高额列表
    heighList(){
      return new Promise((resolve,reject)=>{
        axios.post("VolumeTask/list").then(res=>{
            resolve(res)
        }).catch(err=>{
            console.log(err)
            reject(err)
        })
      })
    },
    //高额详情
    heighDetail(param){
        return new Promise((resolve,reject)=>{
          axios.post("VolumeTask/detail",param).then(res=>{
              resolve(res)
          }).catch(err=>{
              reject(err)
          })
        })
    },
    //高额任务玩法
    heighGuide(params){
        return new Promise((resolve,reject)=>{
            axios.post("VolumeTask/guide",params).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },

    //获取快速任务列表
    get_tasklist_data(timestamp){
        return new Promise((resolve,reject)=>{
            axios.post('/Task/tasklistdata.html?time='+ timestamp).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //获取专属任务列表
    get_belong_data(){
        return new Promise((resolve,reject)=>{
            axios.post('/Task/taskbelongs.html').then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //获取伙伴云回调任务列表
    gethuobanserverreturnlist(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/gethuobanserverreturnlist',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //联盟任务上报
    reporttask(params){
        return new Promise((resolve,reject)=>{
            axios.get('/OperateTask/reporttask',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    //高额任务抢任务
    heightTaskStart(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/start',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    //高额任务放弃
    heightTaskAbandon(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/abandon',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    //高额任务点我已明白
    heightTaskClick(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/click',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //高额任务提交页
    heignTaskSubmit(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/submit_detail',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //高额任务提交页
    heignTaskSubmitData(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/submit_data',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //高额任务编辑展示数据
    heignTaskEditDetail(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/edit_detail',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //高额任务提交编辑
    heignTaskSubmitEdit(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/submit_edit',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //高额任务申述提交
    heignTaskSubmitComplaint(params){
        return new Promise((resolve,reject)=>{
            axios.post('/VolumeTask/submit_complaint',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //获取圆圆圆任务列表
    getyuanyuanlist(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/getyuanyuanlist',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    localInstalled(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Task/localInstalled',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
//检测回调是否可完成
    check_can_complete(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Task/checkCanComplete',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    remarkClickEvent(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Task/remarkClickEvent',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    taskProcessLog(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Task/taskProcessLog',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    starttask(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Task/starttask',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //快速抢任务入口初始化
    grapFastTaskInit(){
        return new Promise((resolve, reject)=>{
            axios.get("/Task/isActive").then((res)=>{
                resolve(res);
            }).catch((err)=>{
                console.log(err);
                reject(err);
            })
        });
    },
    //没有任务时需要请求任务
    goGetFastTask(){
        return new Promise((resolve, reject)=>{
            axios.get("/Task/quickStartTask").then((res)=>{
                resolve(res);
            }).catch((err)=>{
                console.log(err);
                reject(err);
            })
        });
    },
    //快速任务详情数据
    detailData(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Task/detailData',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //提供于是否为首次安装
    appqccreate(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Task/appqccreate',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //放弃任务
    untask(){
        return new Promise((resolve,reject)=>{
            axios.post('/Task/untask').then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //
    common_request(url){
        return new Promise((resolve,reject)=>{
            axios.get(url).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    get_operate_task(){
        return new Promise((resolve,reject)=>{
            axios.get("OperateTask/gettasklist").then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //评论任务列表
    commentList(){
        return new Promise((resolve,reject)=>{
            axios.post("Comment/list").then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    //评论抢任务
    commentStart(params){
        return new Promise((resolve,reject)=>{
            axios.post("Comment/start",params).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    //评论详情
    commentDetail(params){
        return new Promise((resolve,reject)=>{
            axios.post("Comment/detail",params).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    //评论放弃
    commentAbandon(params){
        return new Promise((resolve,reject)=>{
            axios.post("Comment/abandon",params).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    //评论提交
    commentSubmit(params){
        return new Promise((resolve,reject)=>{
            axios.post("Comment/submit",params).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    //评论审核详情
    commentFaild(params){
        return new Promise((resolve,reject)=>{
            axios.post("Comment/faild",params).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    gameTasklist(){
        return new Promise((resolve,reject)=>{
            axios.get("GameTask/gametasklist").then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    getTaoJinDetail(idTask){
        return new Promise((resolve,reject)=>{
            axios.get("GameTask/getTaoJinDetail?idTask=" + idTask).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    getTaoJinList(){
        return new Promise((resolve,reject)=>{
            axios.get("GameTask/getTaoJinList?page=1").then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 用户中心首页
    userIndex(){
        return new Promise((resolve,reject)=>{
            axios.get('user/profile.html').then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 个人资料
    userInfo(){
        return new Promise((resolve,reject)=>{
            axios.get('user/getuserinfos.html').then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 填写邀请码
    inviteCode(params){
        return new Promise((resolve,reject)=>{
            axios.post('/user/writefather.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    // 发送验证码
    sendPhoneCode(params){
        return new Promise((resolve,reject)=>{
            axios.get('/user/sendcode.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    // 发送验证码
    sendPhoneCodeTx(){
        return new Promise((resolve,reject)=>{
            axios.get('/user/authPhone.html').then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 找回账号 发送验证码
    sendPhoneCodeYc(params){
        return new Promise((resolve,reject)=>{
            axios.get('/user/sendcodeyc.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    // 提现验证
    authPhone(params){
        return new Promise((resolve,reject)=>{
            axios.post('/cash/authPhone.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    // 绑定手机号
    bindPhone(params){
        return new Promise((resolve,reject)=>{
            axios.post('/user/savephone.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    // 取消绑定手机号
    canclePhone(params){
        return new Promise((resolve,reject)=>{
            axios.post('/user/cancelbindphone.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    // 绑定微信
    saveWx(params){
        return new Promise((resolve,reject)=>{
            axios.post('/User/savewx.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    // 保存用户信息
    saveUserInfo(params){
        return new Promise((resolve,reject)=>{
            axios.post('/User/saveInfo.html',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //获取我的账单列表
    getBillList(param){
        return new Promise((resolve,reject)=>{
            axios.post('/user/incomelist.html',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //提现记录
    getCashList(param){
        return new Promise((resolve,reject)=>{
            axios.post('/user/cashList.html',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //当天账单查看更多
    daymoreMsg(param){
        return new Promise((resolve,reject)=>{
            axios.post('/user/dailyincome.html',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //游戏任务详情
    gameDetail(params){
        return new Promise((resolve,reject)=>{
            axios.get('/GameTask/detail',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //游戏任务捕鱼领奖
    getRewardpuyu(params){
        return new Promise((resolve,reject)=>{
            axios.get('/GameTask/getRewardpuyu',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //游戏任务火拼麻将领奖
    getRewardhpmajiang(params){
        return new Promise((resolve,reject)=>{
            axios.get('/GameTask/getRewardhpmajiang',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //游戏任务爱玩斗地主领奖
    getRewardaiwan(params){
        return new Promise((resolve,reject)=>{
            axios.get('/GameTask/getRewardaiwan',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //游戏任务爱玩斗地主领奖
    getRewardredbaoshi(params){
        return new Promise((resolve,reject)=>{
            axios.get('/GameTask/getRewardredbaoshi',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    //游戏任务领奖
    getReward(params){
        return new Promise((resolve,reject)=>{
            axios.get('/GameTask/getReward',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //游戏任务点击
    gameClick(params){
        return new Promise((resolve,reject)=>{
            axios.get('/GameTask/click',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入点击
    dainruClick(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/fastdianruapidetail',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入api点击
    dainrucheckNeedClick(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/checkNeedClick',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入api记录点击日志
    adddianruclicklog(params){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/adddianruclicklog',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入测试列表
    daurutestList(){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/test').then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入测试列表
    getinstallappurl(data){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/getinstallappurl',data).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    //微信提现
    dowxpay(param){
        return new Promise((resolve,reject)=>{
            axios.post('/cash/dowxpay.html',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入上报api服务器上报
    dianrucanActive(param){
        return new Promise((resolve,reject)=>{
            axios.get('/Unionapi/canActive',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //圆圆圆测试数据
    yuanyuantest(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/yuanyuantest',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //圆圆圆详情
    yuanyuandetail(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/yuanyuandetail',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //圆圆圆提交点击
    yuanyuanclick(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/yuanyuanclick',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //圆圆圆点击
    yuanyuanactive(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/yuanyuanactive',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //伙伴云详情
    huobancallbackdetail(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/huobancallbackdetail',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //伙伴云点击
    huobanclick(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/huobanclick',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //伙伴云激活
    huobanactive(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/huobanactive',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    }, //服务端登录
    serverdologin(param){
        return new Promise((resolve,reject)=>{
            axios.post("/Guide/dologin.html",param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //自家回调任务
    callbacklist(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/callbacklist',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //回调任务排重
    callbackcomplete(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/check_can_complete',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //回调任务排重
    callbackdetail(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/callbackdetail',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //回调任务打开应用
    callbackopen(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/callbackopen',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //回调任务打开应用
    checkCanSub(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/checkCanSub',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //回调任务领奖
    callbackActive(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/callbackActive',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //圆圆圆测试数据
    huobantest(param){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/huobantest',param).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //上传身份证
    uploadIdcard(params){
        return new Promise((resolve,reject)=>{
            axios.post('/User/idcard',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    rebindIdcard(params){
        return new Promise((resolve,reject)=>{
            axios.post('/User/rebindIdcard',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //获取身份信息
    idcardInfo(params){
        return new Promise((resolve,reject)=>{
            axios.post('/User/idcardInfo',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入api测试
    getdianruApitestlist(){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/dianrutest').then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入api点击
    getdianruApiClick(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/dianrushowclick',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //点入api列表
    getdianruApilist(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Unionapi/dianruApilist',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //一起打怪兽
    getRewardguaishou(params){
        return new Promise((resolve,reject)=>{
            axios.post('/GameTask/getRewardguaishou',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //深知
    getDeepknow(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Deepknow/sence',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //聚享玩
    juxiangApi(params){
        return new Promise((resolve,reject)=>{
            axios.post('/GameTask/juxiangApi',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //聚享玩注册
    juxiangApiZhuce(params){
        return new Promise((resolve,reject)=>{
            axios.post('/GameTask/juxiangZhuce',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    //系统消息列表
    SystemMessage(params){
        return new Promise((resolve,reject)=>{
            axios.post('/Message/SystemList',params).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

}
