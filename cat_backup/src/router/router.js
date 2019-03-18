import App from '../App.vue'

Vue.use(VueRouter)

const home = r => require.ensure([], () => r(require('../page/Home/Home')),'home');
const announcement = r => require.ensure([], () => r(require('../page/Home/Announcement')),'announcement');
const fastWithdraw = r => require.ensure([], () => r(require('../page/Home/fastWithdraw')),'fastWithdraw');
const abnormal = r => require.ensure([], () => r(require('../page/Home/abnormal')),'abnormal');
const MessageList = r => require.ensure([], () => r(require('../page/Message/MessageList')),'MessageList');
const fastList = r => require.ensure([], () => r(require('../page/Task/fast_Task/fast_List/fast_List')),'fastList');
const fastDetail = r => require.ensure([], () => r(require('../page/Task/fast_Task/fast_Detail/fast_Detail')),'fastDetail');
const belongsList = r => require.ensure([], () => r(require('../page/Task/fast_Task/belongs_List/belongs_List')),'belongsList');
const commentList = r => require.ensure([], () => r(require('../page/Task/comment_Task/comment_List/comment_List')),'commentList');
const commentDetail = r => require.ensure([], () => r(require('../page/Task/comment_Task/comment_Detail/comment_Detail')),'commentDetail');
const commentFail = r => require.ensure([], () => r(require('../page/Task/comment_Task/comment_fail/comment_fail')),'commentFail');
const callbackList = r => require.ensure([], () => r(require('../page/Task/callback_Task/callback_List/callback_List')),'callbackList');
const callbackDetail = r => require.ensure([], () => r(require('../page/Task/callback_Task/callback_Detail/callback_Detail')),'callbackDetail');
const heighList = r => require.ensure([], ()=>r(require('../page/Task/heigh_Task/heigh_List/heigh_List')),'heighList');
const heighDetail = r=> require.ensure([], ()=>r(require('../page/Task/heigh_Task/heigh_Detail/heigh_Deatil')),'heighDetail');
const heighSubmit = r=> require.ensure([], ()=>r(require('../page/Task/heigh_Task/heigh_Submit/heigh_Submit')),'heighSubmit');
const heighEdit = r=> require.ensure([], ()=>r(require('../page/Task/heigh_Task/heigh_Edit/heigh_Edit')),'heighEdit');
const heighComplaint = r=> require.ensure([], ()=>r(require('../page/Task/heigh_Task/heigh_Complaint/heigh_Complaint')),'heighComplaint');
const heighFail = r=> require.ensure([], ()=>r(require('../page/Task/heigh_Task/heigh_Fail/heigh_Fail')),'heighFail');
const gameList = r=> require.ensure([], ()=>r(require('../page/Task/game_Task/game_List/game_List')),'gameList');
const gameDetail = r=> require.ensure([], ()=>r(require('../page/Task/game_Task/game_Detail/game_Detail')),'gameDetail');
const unionList = r=> require.ensure([], ()=>r(require('../page/Task/union_Task/union_List/union_List')),'unionList');
const unionDetail = r=> require.ensure([], ()=>r(require('../page/Task/union_Task/union_Detail/union_Detail')),'unionDetail');
const dianruApiDetail = r=> require.ensure([], ()=>r(require('../page/Task/union_Task/union_Detail/dianruApi_Detail')),'dianruApiDetail');
const unionCallbackDetail = r=> require.ensure([], ()=>r(require('../page/Task/union_Task/union_Detail/callback_Detail')),'unionCallbackDetail');
const newUnionDetail = r=> require.ensure([], ()=>r(require('../page/Task/union_Task/union_Detail/newUnion_detail.vue')),'newUnionDetail');
const user = r=> require.ensure([], ()=>r(require('../page/User/index')),'user');
const userInfo = r=> require.ensure([], ()=>r(require('../page/User/userInfo')),'userInfo');
const userInvite = r=> require.ensure([], ()=>r(require('../page/User/userInvite')),'userInvite');
const shareList = r=> require.ensure([], ()=>r(require('../page/User/taskShare/shareList')),'shareList');
const myBill = r=> require.ensure([], ()=>r(require('../page/User/my_Bill/myBill')),'myBill');
const withdrawIng = r=> require.ensure([], ()=>r(require('../page/User/my_Bill/withdrawIng')),'withdrawIng');
const canclePhone = r=> require.ensure([], ()=>r(require('../page/User/canclePhone')),'canclePhone');
const wechatBind = r=> require.ensure([], ()=>r(require('../page/User/wechat_Bind/wechatBind')),'wechatBind');
const withdraw = r=> require.ensure([], ()=>r(require('../page/User/wechat_Withdraw/withdraw')),'withdraw');
const userhelp = r=> require.ensure([],()=>r(require('../page/User/help')),'userhelp');
const userhelpdetail = r=> require.ensure([],()=>r(require('../page/User/helpCommon')),'userhelpdetail');
const findAccountByPhone = r=> require.ensure([],()=>r(require('../page/User/findAccountByPhone')),'findAccountByPhone');
const business = r=> require.ensure([],()=>r(require('../page/User/business')),'business');
const aboutlm = r=> require.ensure([],()=>r(require('../page/User/aboutlm')),'aboutlm');
const user_protocol = r=> require.ensure([],()=>r(require('../page/User/userProtocol')),'user_protocol');
const identity = r=> require.ensure([], ()=>r(require('../page/User/wechat_Withdraw/withdraw_identity.vue')),'identity');
const reBindIdcard = r=> require.ensure([], ()=>r(require('../page/User/wechat_Withdraw/rebind_idcard.vue')),'reBindIdcard');
const appreHome = r=> require.ensure([],()=>r(require('../page/newApprentice/appreHome/appreHome.vue')),'appreHome');
const myAppre = r=> require.ensure([],()=>r(require('../page/newApprentice/myAppre/myAppre.vue')),'myAppre');
const myRights = r=> require.ensure([],()=>r(require('../page/newApprentice/myRights/myRights.vue')),'myRights');
const appreActivity = r=> require.ensure([],()=>r(require('../page/newApprentice/appreActivity.vue')),'appreActivity');
const zfbActivity = r=> require.ensure([],()=>r(require('../page/Activity/zfb_activity.vue')))
const routes = [{
  path:'/',
  component: App, //顶层路由，对于index.html
  children:[      //二级路由。对于App.vue
    //地址不对跳转home页面
    {path:'/home',redirect:'/'},
    //首页
    {
      path:'/',
      meta:{index:0,keepAlive:true},
      component:home
    },
    //支付宝活动页
    {
      path:'/zfbActivity',
      component:zfbActivity
    },
    //公告页
    {
      path:'/announcement',
      meta:{index:1},
      component:announcement
    },
    //快速提现
    {
      path:'/fastWithdraw',
      component:fastWithdraw
    },
    //异常处理中心
    {
      path:'/abnormal',
      component:abnormal
    },
    {
      path:'/MessageList',
      component:MessageList
    },
    //快速任务列表
    {
      path:'/fastList',
      meta:{index:1},
      component:fastList
    },
    //快速任务详情
    {
      path:'/fastDetail',
      meta:{index:2},
      component:fastDetail 
    },
    //评论任务列表
    {
      path:'/commentList',
      meta:{index:1},
      component:commentList 
    },
    //评论任务详情
    {
      path:'/commentDetail',
      meta:{index:2},
      component:commentDetail 
    },
    //评论任务失败
    {
      path:'commentFail',
      meta:{index:2},
      component:commentFail
    },
    //回调任务列表
    {
      path:'/callbackList',
      meta:{index:1},
      component:callbackList 
    },
    //回调任务详情
    {
      path:'/callbackDetail',
      meta:{index:2},
      component:callbackDetail 
    },
    //高额任务列表
    {
      path:'/heighList',
      meta:{index:1},
      component:heighList
    },
    //高额任务详情
    {
      path:'/heighDetail',
      meta:{index:2},
      component:heighDetail
    },
    //高额任务提交审核
    {
      path:'/heighSubmit',
      meta:{index:3},
      component:heighSubmit
    },
    //高额任务重新编辑
    {
      path:'/heighEdit',
      meta:{index:2},
      component:heighEdit
    },
    //高额任务申述
    {
      path:'/heighComplaint',
      meta:{index:3},
      component:heighComplaint
    },
    //高额任务失败详情
    {
      path:'/heighFail',
      meta:{index:2},
      component:heighFail
    },
    //游戏任务列表
    {
      path:'/gameList',
      meta:{index:1},
      component: gameList
    },
    //游戏任务详情
    {
      path:'/gameDetail',
      meta:{index:2},
      component: gameDetail
    },
    //用户中心
    {
      path:'/user',
      meta:{index:1,keepAlive:true},
      component: user
    },
    //个人资料
    {
      path:'/userInfo',
      meta:{index:2},
      component: userInfo
    },
    //我的账单
    {
      path:'/myBill',
      meta:{index:3},
      component:myBill
    },
    // 分享点赞
    {
      path:'/shareList',
      meta:{index:3},
      component:shareList
    },
    //微信提现中
    {
      path:'/withdrawIng',
      meta:{index:3},
      component:withdrawIng
    },
    //填写邀请码
    {
      path:'/userInvite',
      meta:{index:3},
      component: userInvite
    },
    // 取消绑定手机号
    {
      path:'/canclePhone',
      meta:{index:3},
      component: canclePhone
    },
    // 联盟任务
    {
      path:'/unionList',
      meta:{index:1},
      component: unionList
    },
    // 联盟任务详情
    {
      path:'/unionDetail',
      meta:{index:2},
      component: unionDetail
    },
    //新联盟任务详情
    {
      path:'/newUnionDetail',
      component:newUnionDetail
    },
    //新版微信验证
    {
      path:'/wechatBind',
      component:wechatBind
    },
    //微信提现身份验证
    {
      path:'/identity',
      component:identity
    },
    {
      path: '/reBindIdcard',
      component: reBindIdcard
    },
    //微信提现
    {
      path:'/withdraw',
      meta:{index:3},
      component:withdraw
    },
    //专属任务
    {
      path:'/belongsList',
      meta:{index:1},
      component:belongsList
    },
    {
      path:'/dianruApiDetail',
      meta:{index:2},
      component:dianruApiDetail
    },
    {
      path:'/userhelp',
      meta:{index:3},
      component:userhelp
    },
    {
      path:'/userhelpdetail',
      meta:{index:3},
      component:userhelpdetail
    },
    {
      path:'/findAccountByPhone',
      meta:{index:3},
      component:findAccountByPhone
    },
    {
      path:'/business',
      meta:{index:2},
      component:business
    },
    {
      path:'/aboutlm',
      meta:{index:2},
      component:aboutlm
    },
    {
      path:'/user_protocol',
      meta:{index:2},
      component:user_protocol
    },
    {
      path:'/unionCallbackDetail',
      meta:{index:2},
      component:unionCallbackDetail
    },

    //新师徒首页
    {
      path:'/appreHome',
      meta:{keepAlive:true},
      component:appreHome
    },
    //我的徒弟
    {
      path:'/myAppre',
      component:myAppre
    },
    //我的权益
    {
      path:'/myRights',
      component:myRights
    },
    //收徒活动
    {
      path:'/appreActivity',
      component:appreActivity
    },
  ]
}]

export default new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})