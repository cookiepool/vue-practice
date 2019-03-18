<template>
<div>
    <div v-if="show" @touchmove.prevent>
        <div class="shade"></div>
        <div class="pop">
            <img class="san" src="https://static.cattryapp.com/12static/new/img/internet_pop_bac.png">
            <h2>首次打开应用时请允许</h2>
            <h1>“无线局域网与蜂窝移动网络”</h1>
            <p v-if="msg">{{msg}}</p>
            <i>否则无法获取奖励</i>
            <div class="btn_wrap flex_all_center">
                <div ref='btn' class="btn right flex_all_center" @click="closepop">我知道了</div>
            </div>            
        </div>
    </div>
</div>    
</template>

<script>
export default{
    data(){
        return {
            show:false,
            msg:'',
        }
    },
    methods:{
        showpop(){
            return new Promise((resolve,reject)=>{
                this.show=true;
                this.$nextTick(()=>{
                    var btn = this.$refs.btn;
                    btn.addEventListener('click',()=>{
                        resolve()
                    })
                })
            })
        },
        closepop(){
            this.show=false
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
     background: rgba(0, 0, 0, 0.6);
     z-index: 700;
}
 .pop{
     width:21.071428571428573rem;
     background:rgba(255,255,255,1);
     border-radius:0.43rem;
     position: fixed;
     top: 24%;
     left: 50%;
     color: #333333;
     transform: translateX(-50%);
     display: flex;
     flex-direction: column;
     align-items: center;
     z-index: 801;
     padding-bottom: 2rem;
}
 .san{
     width:12.714285714285714rem;
     margin-top: 1.8571428571428572rem;
}
 h2{
     margin-top: 1.1428571428571428rem;
     line-height:1.7142857142857142rem;
     font-family:PingFangSC-Regular;
}
 h1{
     font-weight: 600;
     line-height:1.7142857142857142rem;
     font-family:PingFangSC-Regular;
}
 p{
     width: 62%;
     text-align: center;
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     margin-top: 0.8571428571428571rem 
}
 .pop i{
     font-size:0.8571428571428571rem;
     font-family:PingFangSC-Regular;
     color:rgba(255,99,83,1);
     margin-top: 0.8571428571428571rem;
}
 .btn_wrap{
     width: 100%;
     margin-top: 2rem;
     padding: 0 1.4285714285714286rem;
     box-sizing: border-box;
}
 .btn{
    font-family:PingFangSC-Medium;
    font-weight:500;
    width:220px;
    height:44px;
    border-radius:22px;
    border:1px solid rgba(255,99,83,1);
    color:rgba(255,99,83,1);
}
 
</style>
