var v5config = {};
v5config.doujinlisturl = v5config.clientBaseurl + "/lc_async_notification/v3DJTaskWallListData";
v5config.doujinstarturl = v5config.clientBaseurl + "/lc_async_notification/v3DJInstallAppByData";


v5config.loginindex = "/Guide/login.html";
v5config.serverdologin = "/Guide/dologin.html";
v5config.starttaskurl = '/Task/starttask.html';
v5config.youmifaskdetailurl = "/Unionapi/youmifastdetail/html?";
v5config.doujinfaskdetailurl = "/uniontask/doujinfastdetail.html?";

v5config.appinfourl = v5config.clientBaseurl + "/getappinfo";



v5config.youmifasturl = '/Unionapi/youmifastlist.html';
v5config.youxiaoadurl = v5config.clientBaseurl +'/kv3GetYouXiaoTaskDetail';
v5config.youxiaoreporturl = v5config.clientBaseurl +'/kv3YouXiaoTaskTrack';



v5config.wanpuredirecturl = "lazycat://lianmeng_sdk_open_action?";
v5config.openlanmao = "lazycat://";
import ajax from './ajax.js'
import consts from './consts'
export default  {
    //获取本地安装包
    getlocalinstalledboundleid(){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.allapps,
                type:'get',
                dataType:'json',
                timeout:3000,
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //向客户端发送任务进行中的标识
    taskIng(ing,id){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.tasking+'?proceeding='+ing+'&taskid='+id,
                type:'get',
                dataType:'json',
                timeout:3000,
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })

    },
    //获取助手信息
    getappinfo(){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.appinfourl,
                type:'get',
                dataType:'json',
                timeout:3000,
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //获取手机信息
    getv2deviceinfo(){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.v2deviceinfo,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //获取点入任务
    getdianrulisturl(){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.dianrulisturl,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //点入点击
    getdianruclick(par){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.dianruclick+"?adid="+par.adid+"&ip="+par.ip,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //点入检测点入安装
    getv2drinstallapp(par){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.v2drinstallapp+"?"+par,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })

    },
    //获取万普任务
    getwanpufastlisturl(){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.wanpufastlisturl,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },

    //检测应用是否安装ios10
    checktaskinstall(checkurl){
        return new Promise((resolve,reject)=>{
            ajax({
                url:checkurl,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //ios11检测已安装和打开应用
    ios11openurl(data){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.ios11openurl,
                data:data,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //快速任务详情打开应用
    fastDetailOpen(data){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.fastDetailOpenurl,
                data:data,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })        
    },
    //公共请求方法，传url即可，适用于并不通用的接口
    common_request(url){
        return new Promise((resolve,reject)=>{
            ajax({
                url:url,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },

    //复制关键词
    copykeyword(keyword){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.v2pasteboard + "?" + keyword,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //nulluser
    v2drnulltaskre(p){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.v2drnulltask + "?bundleid=" + p.bundleid+"&taskname=是否继续任务'"+p.title+"'",
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //本地推送
    localpush(data){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.localpush,
                data:data,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //快速任务开始任务
    v2cattrystarttask(data){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.v2cattrystarttask,
                data:data,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //v2dropentimeEnd
    v2dropentimeEnd(par){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.v2dropentime+"?"+par,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })

    },
    //点入callback
    v2drapicallback(p){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.v2drapicallback+"?adid=" + p.adid + "&ip=" + p.ip+"&bundleid=" + p.bundleid + "&needtime=" + p.runtime + "&taskname=" + p.title ,
                type:'get',
                data:p,
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //检测客户端是否启动,只做统一获取，逻辑判断由页面执行
    isClientLogin: function (){
        return new Promise((resolve,reject)=>{
        ajax({
            url:consts.clientloginurl,
            type:'get',
            dataType:'json',
            timeout:5000,
            async:false,
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                reject(err)
            }
        })
        })
    },
    //验证手机号
    pushTelController: function (params){
        return new Promise((resolve,reject)=>{
        ajax({
            url:consts.pushTelController+"?url=" + params,
            type:'get',
            dataType:'json',
            timeout:3000,
            async:false,
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                console.log(err)
                reject(err)
            }
        })
        })
    },
    //找回账号
    findoriginaccount(params){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.findoriginaccount+params,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    //领取奖励上报
    receiveAward_record(param){
        return new Promise((resolve,reject)=>{
            this.getappinfo().then((res)=>{
                var version = res.data.version
                version = version.replace(/\./g,"");
                if(version<=509) {
                    console.log('版本小于5.1.0');
                    resolve('版本小于5.1.0')
                    return
                }
                ajax({
                    url:consts.rewardRecord+"?ti=" + param.ti + "&tm=" + param.tm,
                    type:'get',
                    dataType:'json',
                    success: function (res) {
                        resolve(res)
                    },
                    error: function (err) {
                        console.log(err)
                        reject(err)
                    }
                }) 
            })   
        })
    },
    //帐号同步
    syncAccount(){
        return new Promise((resolve,reject)=>{
            ajax({
                url:consts.postInfoToServer,
                type:'get',
                dataType:'json',
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })       
    }
}