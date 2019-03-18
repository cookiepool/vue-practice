<template>
<div v-if="show">
    <div class="shade" @touchmove.prevent></div>
    <div class="update_pop flex_column_center" @touchmove.prevent>
        <img class="cat" src="https://static.cattryapp.com/12static/new/img/home_update_cat.png">
        <h2>发现新版本</h2>
        <h3>最新版本V{{version}}</h3>
        <div class="update_content">
            <h4>更新内容:</h4>
            <div class="update_word">
                <p v-for="(item,index) in content">{{index+1}}.{{item}}</p>
            </div>
        </div>
        <div class="update_btn flex_all_center" @click="startUpdate">开始更新</div>
        <p class="tips">请在桌面上查看安装进度</p>
        <img id="mytest" ref="cancel" v-if="update==1" class="update_cancel" @click="closepop" src="https://static.cattryapp.com/12static/new/img/common_opcity_cancel.png">
    </div>
</div>  
</template>

<script>
import common from '../../../api/common.js'
export default{
    data(){
        return {
            show:false,
            version:'',
            content:[],
            update:0,
            down_url:''
        }
    },
    mounted(){
     
    },
    methods:{
        showpop(){
            return new Promise((resolve,reject)=>{
                this.show=true;
                var cancel = this.$refs.cancel;
                if(!cancel) return
                cancel.addEventListener("click",()=>{
                       resolve()
                })
             
            })
        },
        closepop(){
            return new Promise((resolve,reject)=>{
                this.show=false
                resolve()
            })
        },
        startUpdate(){
            window.location.href=this.down_url
        }
    }

}

</script>

<style scoped>
.tips{
    margin-top: 1.1429rem;
    text-align: center;
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,99,83,1);
}
.shade{
     width: 100%;
     height: 100%;
     position: fixed;
     top: 0;
     left: 0;
     background: rgba(0, 0, 0, 0.6);
     z-index: 200;
}
 .update_cancel{
    width: 2rem;
    position: absolute;
    bottom: -3.5714rem;
    left: 50%;
    transform: translateX(-50%);
}
.update_btn{
    width:15.7143rem;
    height:3.2143rem;
    background:linear-gradient(100deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    border-radius:1.7857rem;  
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);  
}
.update_pop{
    width:20rem;
    background:rgba(255,255,255,1);
    border-radius:0.5714rem;  
    z-index: 899;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 5rem 1.4286rem 2.2857rem;
    box-sizing: border-box;
}
.update_pop .cat{
    position: absolute;
    width: 11.4286rem;
    top: -3.1429rem;
    left: 60%;
    transform: translateX(-50%)
}
.update_pop h2{
    font-size:1.2857rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.update_pop h3{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1.4286rem;  
    margin: 0.5714rem 0 1.7143rem
}
.update_content{
    width: 100%;
}
.update_word{
    margin: 0.5714rem 0 2rem;
}
.update_content h4{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:1.4286rem; 
}
.update_content p{
    font-size:0.8571rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1.3571rem;
}
</style>
