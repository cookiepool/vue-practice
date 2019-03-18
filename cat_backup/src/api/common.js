import ajax from './ajax.js'
import api from './api.js'
import clientApi from './clientApi'
import consts from './consts'
import CryptoJS from 'crypto-js/crypto-js'
import Vue from 'vue';
var thekey0="ADfj3kcadc2349akvm1CPFFCD84f";
var thekey1="0880076B18D7EE81";
var thekey2="CB3EC842D7C69578";
export default {
    inArray : function (item,arr) {
        var i = 0,
            len = arr.length;
        for ( ; i < len; i++ ) {
            if ( arr[i] === item ) {
                return true;
            }
        }
        return false;
    },
    //判断开启客户端是否成功
    checkClient(){
        var param = {
            type:1,
            err:''
        }
        return new Promise((resolve,reject)=>{
            clientApi.isClientLogin()
            .then((res)=>{
                if (res.status == 1) {
                    if(res.data.newlogin != true){
                        reject(2)          //助手连接失败
                        var err = JSON.stringify(res.data);
                        param.err = err;
                        api.clientErrlog(param)
                    }else {
                        resolve()       //成功
                    }
                }else {
                    //助手连接失败
                    reject()
                    var err = JSON.stringify(res.data);
                    param.err = err;
                    api.clientErrlog(param)
                }
            })
            .catch((err)=>{
                //助手连接失败
                reject()
                var err = JSON.stringify(err+'----catch');
                param.err = err
                api.clientErrlog(param)
            }) 
        })
    },
    //失败后n次请求客户端是否成功
    commonClientLogin(n){
        console.log(n);
        return new Promise((resolve,reject)=>{
            this.checkClient()
            .then(()=>{
                resolve()
            })
            .catch((err)=>{
                if(n==0){
                    reject(err)
                }else{
                    this.commonClientLogin(n-1).then(()=>{
                        resolve()
                    }).catch(()=>{
                        reject(err)
                    })
                }
            })
        })
    },
    encryption(data) {
        let strs=[];
        for(let i in data){
            strs.push(i+'='+data[i]);
        }
        strs.sort();  // 数组排序
        strs=strs.join('&'); // 数组变字符串
        let endData=strs+'&sign='+CryptoJS.MD5(strs+thekey0)
        .toString(); // MD5加密
        let key = CryptoJS.enc.Utf8.parse(thekey1); // 加密秘钥
        let iv = CryptoJS.enc.Utf8.parse(thekey2);  //  矢量
        let encryptResult = CryptoJS.AES.encrypt(endData,key, {   //  AES加密
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7  // 后台用的是pad.Pkcs5,前台对应为Pkcs7
        });
        return encodeURIComponent(CryptoJS.enc.Base64.stringify(encryptResult.ciphertext));  // Base64加密再 encode;
    },

     decryption(data) {
        let key = CryptoJS.enc.Utf8.parse(thekey1);  // 加密秘钥
        let iv = CryptoJS.enc.Utf8.parse(thekey2);   //  矢量
        let baseResult=CryptoJS.enc.Base64.parse(data);   // Base64解密
        let ciphertext=CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
        let decryptResult = CryptoJS.AES.decrypt(ciphertext,key, {    //  AES解密
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let resData=decryptResult.toString(CryptoJS.enc.Utf8).toString();
    
        return JSON.parse(resData);
        
    },

    //截取Url参数
    getUrlParam(param){
        var param = param;
        var i = param.indexOf('?');
        if(i==-1) return;
        var Index1 = param.indexOf('=');
        var Index2 = param.indexOf('#');
        Index1++;
        var par =  param.substring(Index1,Index2)
        return par
    },  
    
    //时间戳转时间
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var D ='-'+ (date.getDate()+1<10? '0'+(date.getDate()):date.getDate());
        var H = date.getHours() + ':';
        return Y+M+D
    },
    //复制关键词
    copy_word(param){
        return new Promise((resolve,reject)=>{
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', param);
            document.body.appendChild(input);
               input.setSelectionRange(0, 9999);
               if (document.execCommand('copy')) {
                   document.execCommand('copy');
                   console.log('复制成功');
                   resolve()
               }else{
                   console.log('复制失败');
               }
            document.body.removeChild(input);
        })
    },
    //设置cookie(过期分钟)
    setCookie(cname,cvalue,min){
        var d = new Date();
        d.setTime(d.getTime()+(min*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },  
    //获取cookie
    getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    },    
    //验证设备
    authDevice(that){
        var _this = this;
        ajax({
            url: consts.clientBaseurl+'/CheckIphoneProxy',
            dataType: 'json',
            success: function(data) {
                if (data.data == 1) {
                    api.common_request('/Task/proxyLog.html');
                    that.$MessageBox.alert('网络环境异常,请关闭代理').then(()=>{
                        document.location.href = "lazycat://";
                    });
                }else {
                    // if(_this.user.isnewbid=='true'){
                       location.href="https://cattry-static.oss-cn-hangzhou.aliyuncs.com/12static/v5/signed_testtt.mobileconfig"
                    // }else {
                    //     location.href="https://cattry-static.oss-cn-hangzhou.aliyuncs.com/12static/v5/signed_testtt.mobileconfig";
                    // }
                }
            }
        });      
    }
  
}
