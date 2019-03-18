<template>
<div>
    <div v-if="show" @touchmove.prevent>
        <div class="shade"></div>
        <div class="pop">
            <!--<p class="tips1">关键词复制成功</p>-->
            <!--<p class="tips2">前往APP Store粘贴搜索<span>“{{name}}”</span>下载与任务图标相同的应用</p> -->
            <p class="tips1">温馨提示</p>
            <p class="tips2">前往APP Store搜索<span style="color: red">“{{name}}”</span>下载与任务图标相同的应用</p>
            <div class="app_msg flex_column_center">
                <img :src="icon">
                <p>搜索列表约第<span>{{rank}}</span>位</p>
            </div>
            <!--<div class="start_up flex_all_center" :class="showdjs?'gray':''" @click="open">前往APP Store <span v-if="showdjs">({{djs}}s)</span></div>-->
            <div class="start_up flex_all_center" :class="showdjs?'gray':''" @click="notopen">确认</div>
        </div>
    </div>
</div>    
</template>

<script>
var copytimer
import clientApi from '@//api/clientApi.js'
export default{
    data(){
        return {
            show:false,
            name:'',
            icon:'',
            rank:null,
            showdjs:false,
            djs:3,
            isqudao:'',         //渠道
        }
    },
    methods:{
        showpop(){
            return new Promise((resolve,reject)=>{
                this.show=true
                resolve()
                copytimer = setInterval(() => {
                    var djs = this.djs-1;
                    this.djs=djs;
                    if(djs<0){
                        clearInterval(copytimer)
                        this.showdjs=false
                    }
                }, 1000);
            })
        },
        closepop(){
            return new Promise((resolve,reject)=>{
                this.show=false
                resolve()
            })
        },
        open(){
            if(this.showdjs) return
            this.show = false
            var appurl = `https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?mt=8&submit=edit&term=${this.name}#software`;
            window.location.href=encodeURI(`https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?mt=8&submit=edit&term=${this.name}#software`);
       },
        notopen(){
            this.show = false
       },
    }

}

</script>

<style scoped>
.shade{
     width: 100%;
     height: 100%;
     position: fixed;
     top: 0;
     left: 0;
     background: rgba(0, 0, 0, 0.8);
     z-index: 200;
}
 .pop{
     width:20rem;
     height:22.28rem;
     background:rgba(255,255,255,1);
     border-radius:0.43rem;
     position: fixed;
     top: 24%;
     left: 50%;
     transform: translateX(-50%);
     display: flex;
     flex-direction: column;
     align-items: center;
     z-index: 201;
}
 .cencel{
     position: absolute;
     width: 1.1rem;
     height: 1.1rem;
     right: 0.8rem;
     top: 0.7rem;
}
 .san{
     width:7.3rem;
     margin-top: -2.05rem 
}
 .tips1{
     font-size:1.28rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(51,51,51,1);
     margin-top: 2rem;
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
.start_up span{
    margin-left: 6px
}
 .tips2{
     width: 17.14rem;
     font-size:1rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:gray;
     line-height:1.428rem;
     margin-top: 1.14rem;
     text-align: center;
     line-height:1.53rem;
}
 .tips2 span{
     color: #333333;
     font-size: 1rem;
     font-weight: 600 
}
 .app_msg{
     font-size:0.857rem;
     font-family:PingFangSC-Regular;
     color:rgba(84,84,84,1);
     line-height:1.21rem;
     margin-top: 1.428rem;
}
 .app_msg img{
     width: 3.428rem;
     height: 3.428rem;
     margin-bottom: 0.671rem;
}
 .app_msg span{
     font-size: 1.1429rem;
     font-weight: 600;
     color: #FF6353;
     margin: 0 0.142rem;
}
.gray{
    background:rgba(255,99,83,1);
    opacity: 0.6;
}
</style>
