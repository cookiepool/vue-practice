<template>
<div class="all_wrap">
    <app-header :title="'收徒赚钱'"></app-header>
    <div class="appre_head flex_btn_center"></div>
    <!-- 滚动轮播 -->

    <div class="scroll_wrap">
        <ul id="scroll_list" class="scroll_list flex_column">
            <li class="scroll_item flex_center" v-for="(item,index) in scroll_msg" :key="index">
                <img :src="item.avatar">
                <p>{{item.name}} 昨天收徒{{item.count}}人，获得现金{{item.money}}元</p>
            </li>
        </ul>
    </div>

    <!-- 顶部勋章模块 -->
    <div class="LV_wrap LV1" :class="[{LV2:user.level==2,LV3:user.level==3,LV4:user.level==4}]">
        <div class="flex_btn_center">
            <div class="flex">
                <img class="avatar" :src="user.avatar">
                <i id="nickname" class="nickname">{{user.name}}</i>
            </div>
            <div class="level_sm flex_all_center" @click="level_pop=true">
                等级说明
            </div>
        </div>
        <h2 class="vatality"> {{user.vitality}}</h2>
        <div class="vatality_progress flex_center">
            <img src="https://static.cattryapp.com/12static/new/img/appre_LV1.png">
            <div ref="V1_line" class="gray_line V1_line">
                <div :style="{width:V1_progress}" class="V1_redline"></div>
            </div>
            <div class="vatality_img_wrap">
                <img v-if="user.level<2" src="https://static.cattryapp.com/12static/new/img/appre_unLV2.png">
                <img v-else src="https://static.cattryapp.com/12static/new/img/appre_LV2.png">
                <div v-if="user.level<2" class="triangle_border_up">
                    <span></span>
                </div> 
            </div>
            <div ref="V2_line" class="gray_line V2_line">
                <div :style="{width:V2_progress}" class="V1_redline"></div>
            </div>  
            <div class="vatality_img_wrap">
                <img v-if="user.level<3" src="https://static.cattryapp.com/12static/new/img/appre_unLV3.png">
                <img v-else src="https://static.cattryapp.com/12static/new/img/appre_LV3.png">
                <div v-if="user.level<3&&user.level>1" class="triangle_border_up">
                    <span></span>
                </div> 
            </div>            
            <div ref="V3_line" class="gray_line V3_line">
                <div :style="{width:V3_progress}" class="V1_redline"></div>
            </div>   
            <div class="vatality_img_wrap"> 
                <img v-if="user.level<4" src="https://static.cattryapp.com/12static/new/img/appre_unLV4.png">
                <img v-else src="https://static.cattryapp.com/12static/new/img/appre_LV4.png">                               
                <div v-if="user.level<4&&user.level>2" class="triangle_border_up">
                    <span></span>
                </div> 
            </div>       
        </div>
    </div>
    <!--   活力值差距提示   -->
    <div v-if="user.level<4" class="headtips_wrap">
        <h2 class="lack_tips_word">距Lv{{user.nextLevel}}还差活力值 <span>{{user.lack}}</span>，再收徒<span>{{user.lack}}</span>人可升级</h2>
        <div class="head_bot_warp flex_btn_center">
            <h2 class="quanyi">Lv{{user.nextLevel}}福利</h2>
            <div class="flex_center">
                <img src="https://static.cattryapp.com/12static/new/img/appre_home_redPacketsmIcon.png">
                <i>{{user.redPacket}}元福利红包</i>
            </div>
            <div class="flex_center">
                <img src="https://static.cattryapp.com/12static/new/img/appre_home_sxsmIcon.png">
                <i>分成上限升至{{user.limit}}元</i>
            </div>            
        </div>
    </div>
    <!--   我的徒弟-我的权益   -->
    <div class="nav_wrap flex_btn_center">
        <img src="https://static.cattryapp.com/12static/new/img/appre_myappre_nav.png" @click="goMyappre">
        <img src="https://static.cattryapp.com/12static/new/img/appre_myquanyi_nav.png" @click="goMyrights">
    </div>
    <!--  我的成绩  -->
    <div class="my_result">
        <div class="result_title flex_center">
            <img src="https://static.cattryapp.com/12static/new/img/appre_myresult_icon.png">
            <h2>我的成绩</h2>
            <img style="width:0.85rem;margin-left:6px" @click="grade_pop=true" src="https://static.cattryapp.com/12static/new/img/appre_mygrade_status.png">
        </div>
        <div class="result_shouyi flex_ard_center">
            <div class="flex_column_center">
                <h2>{{user.today_money}}</h2>
                <i>今日收益(元)</i>
            </div>
            <div class="flex_column_center">
                <h2>{{user.total_money}}</h2>
                <i>累计收益(元)</i>
            </div>            
        </div>
        <div class="appreStatistics flex_btn_center">
            <div class="flex_column appreleft">
                <div class="flex_center"><i>今日徒弟(人)</i><span>{{user.today_tudi}}</span></div>
                <div class="flex_center"><i>累计徒弟(人)</i><span>{{user.all_tudi}}</span></div>
            </div>
            <div class="flex_column">
                <div class="flex_center"><i>今日徒孙(人)</i><span>{{user.today_tusun}}</span></div>
                <div class="flex_center"><i>累计徒孙(人)</i><span>{{user.all_tusun}}</span></div>
            </div>            
        </div>
    </div>
    <img class="bot_step_nav" src="https://static.cattryapp.com/12static/new/img/appre_bot_step.png">
    <div class="fixBtn flex_all_center" @click="startGetAppre">立即收徒赚钱</div>
    <!-- 分享收徒弹窗 -->
    <div v-if="getapprePop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="getApprePop">
            <div class="head_title flex_all_center">分享收徒</div>
            <div class="getMethods_icon flex_btn_center">
                <div class="flex_column_center">
                    <img src="https://static.cattryapp.com/12static/new/img/appre_circle.png" @click="goShare(share_popMsg.wx_pyq_fx,'朋友圈')">
                    <i>朋友圈</i>
                </div>
                <div class="flex_column_center">
                    <img src="https://static.cattryapp.com/12static/new/img/appre_wechat.png" @click="goShare(share_popMsg.wx_friend_fx,'微信')">
                    <i>微信</i>
                </div>
                <div class="flex_column_center">
                   <img src="https://static.cattryapp.com/12static/new/img/appre_qq.png" @click="goShare(share_popMsg.qqmsg_fx,'QQ')">
                   <i>QQ</i>
                </div>
                <div class="flex_column_center">
                    <img src="https://static.cattryapp.com/12static/new/img/appre_room.png" @click="goShare(share_popMsg.qqzone_fx,'QQ空间')">
                    <i>QQ空间</i>
                </div>
            </div>
            <div class="flex_btn_center">
                <img class="methods_img" @click="showSdImg" src="https://static.cattryapp.com/12static/new/img/appre_saidan_img.png">
                <img class="methods_img" @click="showSmImg" src="https://static.cattryapp.com/12static/new/img/appre_saoma_img.png">
                <img class="methods_img" @click.stop="showLinkPop" src="https://static.cattryapp.com/12static/new/img/appre_link_img.png">
            </div>
            <img class="opcity_cancel" @click="getapprePop=false" src="https://static.cattryapp.com/12static/new/img/common_opcity_cancel.png">    
        </div>
    </div>
    <!-- 晒单和扫码收徒弹窗 -->
    <div v-if="sdPop||smPop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="sd_pop">
            <img v-if="sdPop" class='sdImg' :src="share_popMsg.sd_img">
            <img v-else class='sdImg' :src="share_popMsg.sm_img">
            <img class="opcity_cancel topPosi" @click="cancelPop" src="https://static.cattryapp.com/12static/new/img/common_opcity_cancel.png"> 
            <div class="white_line"></div>
        </div>
        <div class="bot_msg_wrap">
            <div class="flex_btn_center">
                <i>分享到</i>
                <div class="flex_center">
                    <img class="save_icon" src="https://static.cattryapp.com/12static/new/img/appre_save_icon.png">
                    <p>长按图片保存到手机</p>
                </div>
            </div>
            <div class="bot_msg_icon flex_btn_center">  
                <img src="https://static.cattryapp.com/12static/new/img/appre_circle.png" @click="goShare(share_popMsg.wx_pyq_fx)">
                <img src="https://static.cattryapp.com/12static/new/img/appre_wechat.png" @click="goShare(share_popMsg.wx_friend_fx)">
                <img src="https://static.cattryapp.com/12static/new/img/appre_qq.png" @click="goShare(share_popMsg.qqmsg_fx)">
                <img src="https://static.cattryapp.com/12static/new/img/appre_room.png" @click="goShare(share_popMsg.qqzone_fx)">
            </div>            
        </div>                     
    </div>
    <!-- 链接收徒弹窗 -->
    <div v-if="linkPop" class="pop_wrap" @touchmove.prevent>
        <div class="shade"></div>
        <div class="pop flex_column_center">
            <p class="pop_content">{{share_popMsg.share_url}}</p>
            <i>将链接粘贴到任何地方，他人点击链接进入懒猫试玩，即可成为您的徒弟。</i>
            <div @click="copyLink" class="pop_btn flex_all_center">复制链接</div>
            <img class="close_pop" @click="cancelLinkPop" src="https://static.cattryapp.com/12static/new/img/appre_close.png">
        </div>
    </div>
    <!-- 等级说明弹窗 -->
    <div v-if="level_pop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="Level_description_pop flex_column_center">
            <h2>师傅等级说明</h2>
            <p class="Level_shuoming">活力值用于提升师父等级，每收一个有效徒弟活力值<span>+1</span>,活力值每日凌晨固定<i>-1</i></p>
            <table>
                <tr>
                    <th>师傅等级</th>
                    <th>对应活力值</th>
                </tr>  
                <tr>
                    <td>Lv1</td>
                    <td>0-20</td>
                </tr>   
                <tr>
                    <td>Lv2</td>
                    <td>21-70</td>
                </tr>                  
                <tr>
                    <td>Lv3</td>
                    <td>71-150</td>
                </tr>  
                <tr>
                    <td>Lv4</td>
                    <td>150以上</td>
                </tr>                  
            </table>  
            <div class="Level_sm_btn flex_all_center" @click="level_pop=false">我知道了</div>      
        </div>
    </div>
    <!-- 我的成绩说明弹窗 -->
    <div v-if="grade_pop"  @touchmove.prevent>
        <div class="shade"></div>
        <div class="myGrade flex_column_center">
            <h1>状态说明</h1>
            <div class="sy_wrap flex_column">
                <h2>今日收益</h2>
                <p>今日收徒产生的所有收益</p>
            </div>
            <div class="sy_wrap flex_column">
                <h2>累计收益</h2>
                <p>累计收徒产生的所有收益</p>
            </div>

            <div class="gradebtn flex_all_center" @click="grade_pop=false">我知道了</div>
        </div>
    </div>
    <!-- 升级弹窗 -->
    <div v-if="up_pop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="update_pop flex_column_center">
            <img v-if="rightsPop.rights.level==2" class="medal" src="https://static.cattryapp.com/12static/new/img/appre_medal2.png">
            <img v-if="rightsPop.rights.level==3" class="medal" src="https://static.cattryapp.com/12static/new/img/appre_medal3.png">
            <img v-if="rightsPop.rights.level==4" class="medal" src="https://static.cattryapp.com/12static/new/img/appre_medal4.png">
            <h2>恭喜您！ 升级到 <span>Lv{{rightsPop.rights.level}}</span></h2>
            <div class="fenge flex_btn_center">
                <div class="gray_line2"></div><i>您享受以下福利</i><div class="gray_line2"></div>
            </div>    
            <div class="flex_column">
                <div class="quanyi_tips flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/appre_home_redPacketsmIcon.png">    
                    <p>{{rightsPop.rights.red_pack}}元福利红包</p>
                </div> 
                <div class="quanyi_tips flex_center">
                    <img src="https://static.cattryapp.com/12static/new/img/appre_home_sxsmIcon.png">    
                    <p>分成上限升至{{rightsPop.rights.money_limit}}元</p>
                </div> 
            </div>   
            <img class="opcity_cancel" @click="cancel_downPop"  src="https://static.cattryapp.com/12static/new/img/common_opcity_cancel.png">    
        </div>
    </div>
    <!-- 降级弹窗 -->
    <div v-if="down_pop" @touchmove.prevent>
        <div class="shade"></div>
        <div class="update_pop down flex_column_center">
            <img v-if="rightsPop.rights.level==1" class="medal" src="https://static.cattryapp.com/12static/new/img/appre_downGrade1.png">
            <img v-if="rightsPop.rights.level==2" class="medal" src="https://static.cattryapp.com/12static/new/img/appre_downGrade2.png">
            <img v-if="rightsPop.rights.level==3" class="medal" src="https://static.cattryapp.com/12static/new/img/appre_downGrade3.png">
            <h2>等级下降到 <span>Lv{{rightsPop.rights.level}}</span></h2>
            <h3>加油！您的当前活力值为{{user.vitality}}</h3>
            <h4>再收{{user.lack}}名徒弟就能升级啦</h4>
            <img class="opcity_cancel" @click="cancel_downPop" src="https://static.cattryapp.com/12static/new/img/common_opcity_cancel.png">  
        </div>
    </div>
</div>    
</template>

<script>
var scroll_interval;
import api from '@//api/api.js'
import { Toast } from 'mint-ui'
import common from '@//api/common.js'
export default {
    name:'APP',
    data(){
        return {
            user:'',
            rights:[],
            level_pop:false,
            grade_pop:false,        //我的成绩说明弹窗
            rightsPop:{},
            up_pop:false,
            down_pop:false,         
            getapprePop:false,      //立即收徒
            sdPop:false,             //晒单收徒弹窗
            smPop:false,            //扫码收徒弹窗    
            linkPop:false,          //链接收徒弹窗
            share_popMsg:{},        //收徒方式链接
            scroll_msg:[],          //顶部收徒滚动信息
        }
    },

    activated(){
        this.init()
        this.scroll_init().then(()=>{
            this.scroll_animation()
        })
    },
    deactivated(){        //离开页面清除定时器
        clearInterval(scroll_interval);
    },
    computed:{
        V1_progress(){
            if(!this.user) return
            if(this.user.level>1){
                return '100%'
            }
            var gray_dom = this.$refs.V1_line
            var need = this.rights[1].vitality;
            var current = this.user.vitality;
            var percentage = (current/need).toFixed(3);
            var total_width = gray_dom.clientWidth;
            var red_width = (total_width*percentage).toFixed(2)+'px';
            return red_width
        },
        V2_progress(){
            if(!this.user) return
            if(this.user.level>2){
                return '100%'
            }else if(this.user.level<2){
                return '0%'
            }
            var gray_dom = this.$refs.V2_line
            var need = this.rights[2].vitality - this.rights[1].vitality;
            var current = this.user.vitality - this.rights[1].vitality;
            var percentage = (current/need).toFixed(3);
            var total_width = gray_dom.clientWidth;
            var red_width = (total_width*percentage).toFixed(2)+'px';
            return red_width
        },
        V3_progress(){
            if(!this.user) return
            if(this.user.level>3){
                return '100%'
            }else if(this.user.level<3){
                return '0%'
            }
            var gray_dom = this.$refs.V3_line
            var need = this.rights[3].vitality - this.rights[2].vitality;
            var current = this.user.vitality - this.rights[2].vitality;
            var percentage = (current/need).toFixed(3);
            var total_width = gray_dom.clientWidth;
            var red_width = (total_width*percentage).toFixed(2)+'px';
            return red_width            
        }
    },
    methods:{
        scroll_init(){
            return new Promise((resolve,reject)=>{
                if(this.scroll_msg.length>0) return resolve()
                axios.post("TopTenMsg/index").then(res=>{
                    this.scroll_msg = res.data.data;
                    console.log(this.scroll_msg);
                    resolve()
                }).catch(err=>{
                    console.log(err)
                })
            })
        },
        scroll_animation(){
            if(this.scroll_msg.length==0){
                //document.getElementsByClassName("scroll_wrap")[0].style.display='none'
                return
            }
            document.getElementsByClassName("scroll_wrap")[0].style.opacity='1'
            var list = document.getElementById('scroll_list');
            list.style.transition = 'transform 0s'
            list.style.transform = 'translateY(0px)'
            var one_distance = document.getElementsByClassName('scroll_item')[0].clientHeight;
            console.log(one_distance);
            this.scroll_msg.push(this.scroll_msg[0]);
            var listHeight = list.clientHeight
            var times = 1;
            var cur_distance;
            list.addEventListener('webkitTransitionEnd',()=>{
                if(cur_distance>=listHeight){
                    list.style.transition = 'transform 0s'
                    list.style.transform = 'translateY(0px)'
                    times = 1                    
                }
            })            
            scroll_interval = setInterval(()=>{                      
                cur_distance = one_distance*times
                list.style.transition = 'transform 1s';
                list.style.transform = `translateY(-${cur_distance}px)`;
                times+=1
            },1800)
        },
        init(){
            if(!sessionStorage.appreCache) this.$loadding.open();
            api.appreHome().then((res)=>{
                console.log(res);
                this.$loadding.close()
                sessionStorage.appreCache = true
                var msg = res.data.data;
                this.user = msg.user;           
                this.rights = msg.rights;                                           
                this.rightsPop = msg.popup;                     //升降级弹窗信息
                if(msg.popup.type==1) this.up_pop=true;         //需展示升级弹窗
                if(msg.popup.type==2) this.down_pop=true;       //需展示降级弹窗
                if(msg.user.level>=4) return
                this.user.nextLevel =  msg.user.level-0+1;;                                 //下一等级
                this.user.limit = parseInt(msg.rights[msg.user.level].money_limit);         //分成上限
                this.user.redPacket = parseInt(msg.rights[msg.user.level].red_pack);        //下一等级红包
                this.user.lack = msg.rights[msg.user.level].vitality - msg.user.vitality;   //升级所缺活力值
            })
            api.appreGetMethods().then((res)=>{
                this.share_popMsg = res.data.data;
            })
        },
        //点击立即收徒赚钱
        startGetAppre(){
            _hmt.push(['_trackEvent', '收徒首页', '点击立即收徒赚钱', '展示收徒弹窗']);
             //未完善信息且sessionstorage未保存过完善信息提示
            if((!this.user.bindPhone||!this.user.bindwx) && !sessionStorage.appreTips){  
                this.$MessageBox.confirm('需完善个人资料后方可收徒')
                .then(()=>{
                    sessionStorage.appreTips = true
                    this.$router.push(`/userinfo?heighLight=${true}`)
                })
                .catch(()=>{
                    sessionStorage.appreTips = true
                })
                return
            }
            this.getapprePop=true;
        },
        //分享链接点击
        goShare(item,nav){
            _hmt.push(['_trackEvent', '收徒首页', '点击分享'+nav, '分享']);
            document.location.href = item;
        },
        //晒单收徒
        showSdImg(){
            _hmt.push(['_trackEvent', '收徒首页', '点击晒单收徒', '展示晒单弹窗']);
            this.sdPop=true
            this.getapprePop=false
        },
        //扫码收徒
        showSmImg(){
            _hmt.push(['_trackEvent', '收徒首页', '点击扫码收徒', '展示扫码弹窗']);
            this.smPop=true
            this.getapprePop=false
        },
        //关闭晒单收徒
        cancelPop(){
            this.sdPop=false
            this.smPop=false
            this.getapprePop=true
        },
        //链接收徒
        showLinkPop(){
            _hmt.push(['_trackEvent', '收徒首页', '点击链接收徒', '展示链接弹窗']);
            this.linkPop=true;
            this.getapprePop=false
        },
        //关闭链接收徒
        cancelLinkPop(){
            this.linkPop=false;
            this.getapprePop=true            
        },  
        //复制链接
        copyLink(){
            var linkUrl = this.share_popMsg.share_url;
            common.copy_word(linkUrl).then((res)=>{
                Toast("复制成功, 快去收徒吧");
            })
        },        
        //关闭升降级弹窗
        cancel_downPop(){
            var param={mid:this.rightsPop.id}
            api.apprehadRead(param).then((res)=>{
            })
            this.up_pop=false;
            this.down_pop=false
        },
        //去我的徒弟
        goMyappre(){
             _hmt.push(['_trackEvent', '收徒首页', '点击我的徒弟', '进入我的徒弟列表']);
            this.$router.push('/myAppre')
        },
        //我的权益
        goMyrights(){
            _hmt.push(['_trackEvent', '收徒首页', '点击我的福利', '进入我的福利页面']);
            this.$router.push('/myRights')
        }
    }
}
</script>

<style scoped>
.scroll_wrap{
    width: 25rem;
    height: 34px;
    background: url('https://static.cattryapp.com/12static/new/img/appreHome_scroll_bac.png');
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    z-index: 10;
    padding-left: 1rem;
    box-sizing: border-box;
    overflow: hidden;
    opacity: 0;
}
.scroll_item{
    height: 34px;
}
.scroll_wrap img{
    width: 1.2857rem;
    height: 1.2857rem;
    border-radius: 50%;
    margin-right: 0.5714rem;
    line-height: 2.5714rem
}
.scroll_wrap p{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.triangle_border_up{
    width:0;
    height:0;
    border-width:0 0.3571rem 0.4286rem;
    border-style:solid;
    border-color:transparent transparent white;/*透明 透明  灰*/
    position:absolute;
    bottom: -0.7143rem;
    left: 0.4286rem;
}
.vatality_img_wrap{
    width: 1.7143rem;
    height: 1.1429rem;
    position: relative;
}
.gradebtn{
    width:10rem;
    height:2.8571rem;
    border-radius:1.5714rem;
    border:0.0714rem solid rgba(255,99,83,1); 
    background: white;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
    margin-top: 2rem;
}
.myGrade{
    width:20rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem; 
    padding: 2rem 1.4286rem 2.2857rem; 
    box-sizing: border-box; 
    z-index: 800;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translateX(-50%)
}
.myGrade h1{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height: 1.7143rem
}
.sy_wrap{
    width: 100%;
    margin-top: 1.7143rem;
}
.sy_wrap h2{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.sy_wrap p{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.4286rem;
    margin-top: 0.7143rem;
}
.bot_msg_wrap{
    width: 100%;
    height:9.8571rem;
    background:rgba(245,245,245,1);
    position: fixed;
    bottom: 0;
    z-index: 900;
    padding: 1.2857rem;
    box-sizing: border-box;
}
.bot_msg_wrap i{
    color:rgba(153,153,153,1);
}
.bot_msg_wrap p{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
}
.bot_msg_icon{
    margin-top: 2rem;
    padding: 0 1.0714rem;
    box-sizing: border-box;
}
.bot_msg_icon img{
    width: 3.5714rem
}
.save_icon{
    width: 1.1429rem;
    margin-right: 0.5714rem
}
.white_line{
    width: 0.0714rem;
    height: 1.4286rem;
    background: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -1.4286rem
}
.sd_pop{
    width:19.2857rem;
    height:24.2857rem;
    position: fixed;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 900;
}
.sd_pop .sdImg{
    width: 100%;
    height: 100%;
}
 .pop{
     width:21.428rem;
     height:18.714rem;
     background:rgba(255,255,255,1);
     border-radius:0.571rem;
     position: fixed;
     top: 20%;
     left: 50%;
     transform: translateX(-50%);
     z-index: 900;
     padding: 1.96rem 1.142rem;
     box-sizing: border-box;
}
 .pop i{
     font-size:1rem;
     font-family:PingFangSC-Regular;
     color:rgba(153,153,153,1);
     line-height:1.42rem;
     margin-top: 1.142rem;
}
 .pop_content{
     padding:0.714rem 1rem;
     box-sizing: border-box;
     width:19.142rem;
     height:5.571rem;
     background:rgba(235,242,253,1);
     border-radius:0.142rem;
     border:1px dashed rgba(81,146,245,1);
     font-size:1.21rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(0,0,0,1);
     line-height:1.714rem;
     word-break: break-all 
}
 .pop_btn{
     width:15.714rem;
     height:3.142rem;
     background:rgba(255,99,83,1);
     border-radius:1.571rem;
     font-size:1.142rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,255,255,1);
     margin: 2.142rem auto 0;
}
 .close_pop{
     width: 2rem;
     position: fixed;
     bottom: -4.142857142857143rem;
     left: 50%;
     transform: translateX(-50%) 
}
.methods_img{
    width: 6.2857rem;
}
.getApprePop{
    width:22.8571rem;
    height:18.7143rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem 0.2143rem 0.7857rem 0rem rgba(0,0,0,0.12);
    border-radius:0.5714rem;   
    position: fixed;
    top: 24%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 800; 
    padding: 0 1.1429rem 2.2857rem;
    box-sizing: border-box;
}
.getApprePop .head_title{
    width: 100%;
    height: 3.9286rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    border-bottom: 1px solid #F1F1F1
}
.getMethods_icon{
    margin: 1.7143rem 0;
}
.getMethods_icon img{
    width: 3.5714rem;
    margin-bottom: 0.7143rem
}
.getMethods_icon i{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
}
.opcity_cancel{
    width: 2rem;
    padding: 0.2143rem;
    position: absolute;
    bottom: -4.1429rem;
    left: 50%;
    transform: translateX(-50%);
}
.topPosi{
    top: -3.5714rem!important
}
.quanyi_tips{
    margin-bottom: 0.8571rem;
    color:rgba(51,51,51,1);
    font-family:PingFangSC-Regular;
}
.quanyi_tips img{
    width: 1.1429rem;
    margin-right: 0.2857rem
}
.fenge{
    width: 100%;
    margin: 2.9286rem 0 1.7143rem;
}
.gray_line2{
    width:4.7143rem;
    height:0.0714rem;
    background:rgba(216,216,216,1);
}
.update_pop{
    width:20rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    z-index: 800;
    position: fixed;
    top: 18%;
    left: 50%;
    transform: translateX(-50%);
    padding:  0 0.9286rem 3.4286rem;
    box-sizing: border-box;
}
.update_pop .medal{
    width: 12rem;
    display: block;
    margin: -0.5714rem auto 0;
}
.down .medal{
    width: 6.4286rem;
    display: block;
    margin: -0.4286rem auto 1.7143rem; 
}
.update_pop h2{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.update_pop h2 span{
    color: #FF6353;
    font-size: 1.7143rem
}
.update_pop h3{
    font-size: 1.0714rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin: 2.8571rem 0 1rem
}
.update_pop h4{
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
}
.update_pop i{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1); 
}
.Level_sm_btn{
    width:10rem;
    height:2.8571rem;
    border-radius:1.5714rem;
    border:0.0714rem solid rgba(255,99,83,1); 
    margin-top: 2rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
}
table{
    margin-top: 1.1429rem;
}
tr{
    display: flex;
}
th{
    width: 8.5714rem;
    height: 2.8571rem;
    background:rgba(225,237,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
}
td{
    width: 8.5714rem;
    height: 2.2857rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
tr:nth-child(even){
   background:rgba(250,250,250,1);
}
tr:nth-child(odd){
    background:rgba(245,245,245,1);
}
.Level_description_pop{
    width:20rem;
    height:29.4286rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem; 
    position: fixed;
    top: 16%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 800;
    padding: 2rem 1.4286rem 0;
    box-sizing: border-box;
}
.Level_description_pop h2{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 1.7143rem;
}
.Level_shuoming {
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.4286rem;
}
.Level_shuoming span{
    color:rgba(255,99,83,1); 
}
.Level_shuoming i{
    color: #00CC00;
}
.fixBtn{
    width:22.5rem;
    height:3.1429rem;
    background:linear-gradient(124deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    box-shadow:0rem 0.1429rem 0.5714rem 0rem rgba(0,0,0,0.2);
    border-radius:1.5714rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    position: fixed;
    bottom: 1.15rem;
    left: 50%;
    transform: translateX(-50%);
}
.bot_step_nav{
    width: 100%;
}
.appreleft{
    border-right: 0.0714rem solid rgba(235,235,235,1);
}
.appreStatistics{
    padding: 0 1.7143rem;
    box-sizing: border-box;
}
.appreStatistics .flex_column{
    width: 50%;
    padding-left: 1.7143rem;
    box-sizing: border-box;
}
.appreStatistics i{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:2rem;
    margin-right: 0.82rem;
}
.appreStatistics span{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1); 
}
.result_shouyi{
    padding: 1.0714rem 1.4286rem;
    box-sizing: border-box;
}
.result_shouyi h2{
    font-size:1.7143rem;
    font-family:HelveticaNeue-Medium;
    font-weight:500;
    color:rgba(255,99,83,1); 
    line-height:2.2857rem;
}
.result_shouyi i{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);  
    margin-top: 0.5rem;
}
.all_wrap{
    min-height: 100%;
    background:rgba(246,246,246,1);
    padding-bottom: 5rem;
}
.appre_head{
    width: 100%;
    height: 10.8571rem;
    box-sizing: border-box;
    background: url('https://static.cattryapp.com/12static/new/img/newAppreHome_head_wrap.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.LV1{
    background: url('https://static.cattryapp.com/12static/new/img/Appre_LV1_bac.png')
}
.LV2{
    background: url('https://static.cattryapp.com/12static/new/img/Appre_LV2_bac.png')
}
.LV3{
    background: url('https://static.cattryapp.com/12static/new/img/Appre_LV3_bac.png')
}
.LV4{
    background: url('https://static.cattryapp.com/12static/new/img/Appre_LV4_bac.png')
}
.LV_wrap{
    width: 25.0714rem;
    height: 10.78rem;
    margin: .2rem auto 0;
    background-size: 100% 100%;
    position: relative;
    z-index: 10;
    padding: 1rem 0 0.8571rem 0.8571rem;
    box-sizing: border-box;
}
.avatar{
    width: 2.7143rem;
    height: 2.7143rem;
    border:0.1429rem solid rgba(255,255,255,1);
    border-radius: 50%;
    margin-right: 0.5714rem;
}
.nickname{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.level_sm{
    width:6rem;
    height:2.5714rem;
    background:rgba(0,0,0,1);
    border-radius:1.2857rem 0rem 0rem 1.2857rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    opacity: 0.396;
}
.vatality{
    margin-top: 2.67rem;
    padding-left: 5.5143rem;
    font-size:1.1429rem;
    font-family:HelveticaNeue-Medium;
    font-weight:500;
    color:rgba(255,99,83,1);
}
.vatality_progress{
   position: absolute;
   bottom: 0.7143rem;
}
.vatality_progress img{
    width: 1.7143rem;
}
.vatality_progress .V1_line{
    width:2.8571rem;
    height:0.2143rem;
    background:rgba(0,0,0,0.2);
    border-radius:0.3571rem;
    position: relative;
}
.V2_line{
    width:5.7143rem;
    height:0.2143rem;
    background:rgba(0,0,0,0.2);
    border-radius:0.3571rem;
    position: relative;
}
.V3_line{
    width:7.5714rem;
    height:0.2143rem;
    background:rgba(0,0,0,0.2);
    border-radius:0.3571rem;
    position: relative; 
}
.V1_redline{
    position: absolute;
    height:0.2143rem;
    background:rgba(255,99,83,1);
    border-radius:0.3571rem;
    top: 0;
    left: 0;
}
.lack_tips_word{
    font-size:1.0714rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    line-height:1.5rem;
    margin: 0 auto .85rem;
    text-align: center;
}
.lack_tips_word span{
    color: #FF6353
}
.headtips_wrap{
    width:24.7857rem;
    background:rgba(255,255,255,1);
    border-radius:0rem 0rem 0.2857rem 0.2857rem;
    padding: 1rem;
    box-sizing: border-box;
    margin: 0 auto;
}
.quanyi{
    font-size:1rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    padding: 0.2857rem 0.5714rem;
    background:rgba(255,99,83,1);
    border-radius:4px;
    color:white; 
    margin-right: 0.3rem
}
.head_bot_warp img{
    width: 1.1429rem;
    margin-right: 0.1429rem;
}
.head_bot_warp i{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
}
.nav_wrap{
    padding: 0 0.8571rem;
    box-sizing: border-box;
    margin: 1rem auto;
}
.nav_wrap img{
    width: 12.1429rem;
}
.my_result{
    width:25.0714rem;
    height:14.5rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;
    margin: 0 auto 1.1429rem;
}
.result_title{
    padding: 0 1.1429rem;
    box-sizing: border-box;
    height: 2.8571rem;
    width: 100%;
    border-bottom: 0.0714rem solid #F1F1F1;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.result_title img{
    width: 1.1429rem;
    margin-right: 0.88rem;
}
</style>
