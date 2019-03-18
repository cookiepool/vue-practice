<template>
<div class="all_wrap"> 
    <app-header :title="'我的福利'"></app-header>
    <img v-if="user.level==1" class="current_level" src="https://static.cattryapp.com/12static/new/img/myRights_LV1.png">
    <img v-if="user.level==2" class="current_level" src="https://static.cattryapp.com/12static/new/img/myRights_LV2.png">
    <img v-if="user.level==3" class="current_level" src="https://static.cattryapp.com/12static/new/img/myRights_LV3.png">
    <img v-if="user.level==4" class="current_level" src="https://static.cattryapp.com/12static/new/img/myRights_LV4.png">

    <div v-for="(item,index) in rights" :key="index" class="rights_packet flex_center mt12">
        <img v-if="!item.js" :src="item.unjsMedal">
        <img v-else :src="item.jsMedal">
        <div class="flex_column">
            <h2>LV{{item.level}} 
                <span v-if="index==0">/活力值21~70</span>
                <span v-if="index==1">/活力值71~150</span>
                <span v-if="index==2">/活力值150以上</span>
            </h2>
            <h3>分成上限{{item.money_limit}}元</h3>
        </div>
        <div class="pack_status flex_column_center" :class="item.status==1?'red_bac':''">
            <h1 :class="item.status==1?'red_word':''">¥{{item.red_pack}}</h1>
            <p :class="item.status==1?'red_word':''">福利红包</p>
            <div v-if="item.status==0" class="js_btn flex_all_center">
                未解锁
            </div>
            <div v-if="item.status==1" class="js_btn flex_all_center red_btn" @click="getPacket(item)">
                待领取
            </div>
            <img v-if="item.status==2" class="hadget" src="https://static.cattryapp.com/12static/new/img/myRights_hadGet.png">
        </div>
    </div>
    <!-- 福利说明 -->
    <h1 class="quanyi">福利说明</h1>
    <div class="quanyi_sm">
        <p>1. 师父等级提升，可解锁更<span>高额福利红包</span>，师父等级对应的福利<span>红包</span>只能领取一次，<span>不可重复领取</span></p>
        <p>2. 平台规则请严格遵守。如徒弟作弊，<span>师父分成将被扣除</span></p>
        <p>3. 徒弟每完成<span>1</span>次任务，师父可获得任务奖励的<span>50%</span></p>
        <p>4. 师父等级随活力值变化，福利随师父等级变化</p>
        <p>5. 师父等级提升，分成上限提升，最高可达<span>20元/人</span>，反之下降</p>
        <p>6. 徒孙每完成1次任务，师祖可获得0.05%奖励，最高可达<span>1.5元/人</span></p>
        <p>7. 收徒无上限</p>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js' 
export default {
    name:'APP',
    data(){
        return {
            level:'1',
            status:'1',
            js:0,
            user:{},
            rights:[{},{},{}]
        }
    },

    created(){
        
    },
    mounted(){
       this.init()
    },

    methods:{
        init(){
            this.$loadding.open()
            api.myRights().then((res)=>{
                this.$loadding.close()
                console.log(res.data.data);
                var rights =JSON.parse(JSON.stringify(res.data.data.rights));
                var user = res.data.data.myLevel
                this.user = user
                rights.map((item,index)=>{
                    item.jsMedal = `https://static.cattryapp.com/12static/new/img/myRights_medal${index+2}.png`;
                    item.unjsMedal = `https://static.cattryapp.com/12static/new/img/myRights_graymedal${index+2}.png`;
                   if(item.js==0){
                        item.status = 0
                    }else if(item.js==1&&item.lj==0){
                        item.status = 1
                    }else{
                        item.status = 2
                    }
                })
                this.rights = rights;
            })
        },

        getPacket(item){
            console.log(item);
            var getlevel = item.level;
            var param={level:getlevel};
            this.$loadding.open('领取中')
            api.myRightsGetpacket(param).then((res)=>{
                this.$loadding.close()
                console.log(res);
                if(!!res.data.status){
                    this.$MessageBox.alert(res.data.msg).then(()=>{
                        this.init()
                    })
                }else{
                    this.$MessageBox.alert(res.data.msg)
                }
            })
        }
    }


}
</script>

<style scoped>
.all_wrap{
    min-height: 100%;
    background:rgba(246,246,246,1);
    padding-bottom: 4rem;
}
.current_level{
    width: 25rem;
    display: block;
    margin: 1.4286rem auto 2rem;
}
.rights_packet{
    width:25rem;
    height:7.8571rem;
    background: white;
    margin:  0 auto 0;
    padding-left: 1.1429rem;
    box-sizing: border-box;
    position: relative;
}
.rights_packet img{
    width: 4.5714rem;
    margin-right: 1.1429rem
}
.rights_packet span{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:#999999;
}
.mt28{
    margin-top: 2rem
}
.mt12{
    margin-top: 0.8571rem;
}
.rights_packet h2{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:1.7857rem;
    margin-bottom: 0.7143rem;
}
.rights_packet h3{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.4286rem;
}
.pack_status{
    width:7.4286rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 0.8571rem;
    box-sizing: border-box;
    background:rgba(235,235,235,1);
}
.pack_status h1{
    font-size:1.5714rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:2.1429rem;
}
.pack_status p{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:1.2143rem;   
    margin: 0rem 0 0.5714rem
}
.red_bac{
    background:rgba(255,230,227,1)!important;
}
.red_word{
    color:rgba(255,99,83,1)!important;
}
.red_btn{
    background:rgba(255,99,83,1)!important;
}
.js_btn{
    width:5.1429rem;
    height:2.2857rem;
    border-radius:1.2857rem;
    background:rgba(204,204,204,1);
    color: white;
}
.hadget{
    width: 4.4286rem;
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 0!important
}
.quanyi{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin: 2rem 0 0 1.1429rem;
}
.quanyi_sm{
    width:25rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem; 
    margin: 1.1429rem auto;
    padding: 1.4286rem 1.1429rem;
    box-sizing: border-box;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:1.7143rem;
}
.quanyi_sm p{
    margin-bottom: 0.7143rem;
}
.quanyi_sm span{
    color:rgba(255,99,83,1);
    font-weight: 600
}
</style>
