
import App from './App'
import router from './router/router'
import ajax from './api/ajax'
import consts from './api/consts'
import clientApi from './api/clientApi'
import common from './api/common'
import api from './api/api'
import header from './components/header/header' 
import header_step from './components/header_step/header_step'
import head_nav from './components/head_nav/head_nav'
import myloadding from './components/loadding/commonLoadding/index.js'
import divMessageBox from './components/messageBox'
import pop from './components/pop/unOpen_pop/divpop.js'     //pop.show() 弹出打开助手提示框pop.close() 关闭
import updatePop from './components/pop/update_pop/divpop.js'
import pop_submit from './components/pop/submit_pop/submit_pop.js'
import certificatePop from './components/pop/certificate_pop/certificatePop.js'
import wxBindPop from './components/pop/wxBind_pop/wxBindPop.js'
import phoneBindPop from './components/pop/phoneBind_pop/phoneBindPop.js'
import '../static/css/reset.css'
Vue.prototype.$pop_submit = pop_submit
Vue.prototype.$loadding = myloadding
Vue.prototype.$MessageBox = divMessageBox   

Vue.component("app-header",header)
Vue.component("app-header-step",header_step)
Vue.component("app-headnav",head_nav)
Vue.config.productionTip = false

axios.interceptors.request.use(
  config=>{
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // 获取本地是否点击过更新弹窗的取消记录，如存在后端不会返回需更新弹窗信息 （注：针对非强制更新)
      var x_click = localStorage.x_click;               
      if(config.method=='post'){
        config.data = {
            ...config.data,
            x_click:x_click,
        }

    }else if(config.method=='get'){
        config.params = {
            ...config.params,
            x_click:x_click,
        }
    }
      return config
  }
);
axios.interceptors.response.use((res)=>{
    // 对响应数据做点什么
    if(res.data.status===false){
      if(res.data.update==1||res.data.update==2){
          var msg = res.data; 
          updatePop.show(msg.version,msg.content,msg.update,msg.down_url)
          .then(()=>{
            localStorage.x_click = 1        //存取点击取消记录
            window.location.reload()        //再次请求页面 
          })
      }else if(res.data.code==1014){
          pop.show()
      }else if(res.data.code == 1007){
            window.location.reload()
      }else if(res.data.code == 1017){  //验证设备弹窗
            ajax({
                url:consts.clientBaseurl+'/v4startss',
                dataType: 'json',
                success: function(data) {
                }
            })          
            certificatePop.show()   
            return res
      }else if(res.data.code === 1015){ //需绑定微信
            wxBindPop.show()
            return res
      }else if(res.data.code ===1016){   //需绑定手机
            phoneBindPop.show()
            return res
      }
      else {
          return res
      }
    }else{
      return res
    }
   
});

//百度统计
var _hmt = _hmt || [];
window._hmt = _hmt;
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?4e59fe7ecf391e2ed338b79b20423cae";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    
    // window.addEventListener('error', (err) => {
    //     console.log(err);
    //     var error = JSON.stringify(err+'----all-catch');
    //     var param = {err:error}
    //     api.clientErrlog(param)           
    // }, true);
})();


_hmt.push(['_setAutoPageview', false]);
//全局检测是否开启助手
router.beforeEach((to,from,next) => {
    if(to.path == '/'){
        next()
    }else{
        next()
        common.commonClientLogin(3)
        .then(()=>{
            pop.close()
        })
        .catch(()=>{
            pop.show() 
        })
    }
    if(_hmt) {
        if (to.path) {
            _hmt.push(['_trackPageview', '/#' + to.fullPath]);
        }
    }    
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
