<template>
    <div class="common_wrap">
        <div class="common_header_step" >
            <img src="https://static.cattryapp.com/12static/new/img/common_return.png" @click="back">
            <p >{{title}}</p>
            <p class="placeholder"></p>
        </div>  
        <div class="common_head_tips flex_ard_center">
            <div class="step flex" v-for="(item,index) in currnteStep" :key="index">
                <img :src=stepimg[index].img  >
                <i>{{item}}</i>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    props:["title","step"],
    data(){
        return {
            currnteStep:this.step,
            stepimg:[{img:"https://static.cattryapp.com/12static/new/img/common_step1.png"},{img:"https://static.cattryapp.com/12static/new/img/common_step2.png"},{img:"https://static.cattryapp.com/12static/new/img/common_step3.png"}]
        }
    },
    methods:{
        back(){
            if(this.$route.path.indexOf("List") !== -1){
                this.$router.replace('/')
            }else{
                window.history.length>1?  this.$router.go(-1) : this.$router.replace('/');
            }
        }
    }

}
</script>
<style>
.common_wrap{
     width: 100%;
     height: 5.28rem;
     background:linear-gradient(124deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
     padding-top: 3.21rem;
     box-sizing: border-box;
}
 .common_header_step{
     width: 100%;
     height: 3.214rem;
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 0 0.7rem;
     box-sizing: border-box;
     color: white;
     font-size:1.285rem;
     font-family:PingFangSC-Semibold;
     font-weight:600;
     z-index: 100;
     position: fixed;
     top: 0;
     left: 0;
     background:linear-gradient(124deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
}
 .common_header_step img{
     width: 0.7rem;
     padding: 0.5rem 0.8rem;
}
 .placeholder{
     width: 2.3rem;
     height: 1.2rem;
}
 .common_head_tips{
     padding: 0rem 2.5rem 0.928rem;
}
 .common_head_tips .step{
     font-size:0.857rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,255,255,1);
     display: flex;
     align-items: center;
     line-height:0.928rem;
}
 .common_head_tips .step img{
     width: 1.142rem;
     margin-right: 0.428rem 
}
 
</style>
