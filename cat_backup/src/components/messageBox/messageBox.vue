<template>
<div v-if="alertShow||confirmShow" class="shade" @touchmove.prevent>
    <!-- alert弹窗 -->
    <div class="alert flex_column_center" :class="cancelBtn?'moreheight':''" v-if="alertShow">
        <h2 class="title">{{alertTitle}}</h2>
        <p v-html="alert_text"  class='content'></p>
        <div v-if="!cancelBtn" ref="alert_sure" class="btn_wrap flex_all_center" @click.stop="alertsure">
            {{confirmButtonText}}
        </div>
    </div>
    <!-- confirm弹窗 -->
    <div class="confirm flex_column_center" v-if="confirmShow">
        <h2>{{confirmTitle}}</h2>
        <p v-if="htmlfomat===false" class="content">{{confirm_text}}</p>
        <p v-else v-html="confirm_text" class="content">{{confirm_text}}</p>
        <div class="confirm_btn_warp">
            <div ref="confirm_cancel" class="flex_all_center left" @click.stop="confirmCancel">{{cancelButtonText}}</div>
            <div ref="confirm_sure" class="flex_all_center right" @click.stop="confirmSure">{{confirmButtonText}}</div>
        </div>    
    </div>
</div>
  
</template>

<script>
export default{
    data(){
        return {
            alertTitle:'',
            alertShow:false,
            cancelBtn:false,
            alert_text:'',
            confirmTitle:'',
            confirmShow:false,
            confirm_text:'',
            confirmButtonText:'',
            cancelButtonText:'',
            htmlfomat:false,
        }
    },
    methods:{
        //alert点击确认
        alertsure(){
            this.alertShow=false
        },

        //confirm点击确认
        confirmSure(){
            this.confirmShow = false
        },
        //confirm点击取消
        confirmCancel(){
            this.confirmShow = false
        },

        //显示alert弹窗
        showAlert(content){
            return new Promise((resolve,reject)=>{
                this.alertShow=true;
                this.alert_text = content;
                this.$nextTick(()=>{    
                    var alertSure = this.$refs.alert_sure;
                    alertSure.addEventListener("click",function(){
                       resolve()
                    })         
                })
            })
        },
        //confirm弹窗
        showConfirm(content){
            return new Promise((resolve,reject) => {
                this.confirmShow=true;
                this.confirm_text = content;
                this.$nextTick(()=>{    
                    var confirm_sure = this.$refs.confirm_sure;
                    var confirm_cancel = this.$refs.confirm_cancel;
                    confirm_sure.addEventListener("click",function(){
                       resolve()
                    });
                    confirm_cancel.addEventListener("click",function(){
                        reject()
                    })
                })
            })
        }
    }

}

</script>

<style scoped>
.all_wrap{
     width: 100%;
     height: 100vh;
}
 .shade{
     width: 100%;
     height: 100%;
     position: fixed;
     top: 0;
     left: 0;
     background: rgba(0, 0, 0, 0.6);
     z-index: 800;
}
.moreheight{
    height: 12rem;
}
 .alert{
     width: 74%;
     position: fixed;
     top: 30%;
     left: 50%;
     transform: translateX(-50%);
     background: white;
     z-index: 900;
     border-radius: 0.5714285714285714rem;
     padding: 2.2857142857142856rem 1.42rem 1.7142857142857142rem;
     box-sizing: border-box;
}
 .alert .title{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:600;
     color:rgba(51,51,51,1);
}
 .alert .btn_wrap{
     width:10rem;
     height:2.857142857142857rem;
     border-radius:1.5714285714285714rem;
     border:1px solid rgba(255,99,83,1);
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(255,99,83,1);
     margin-top: 2.2857142857142856rem;
}
 .confirm{
     width: 74%;
     background:rgba(255,255,255,1);
     border-radius:0.5714285714285714rem;
     position: fixed;
     top: 30%;
     left: 50%;
     transform: translateX(-50%);
     z-index: 900;
     padding: 2.2857142857142856rem 1.42rem 1.7142857142857142rem;
     box-sizing: border-box;
     position: fixed;
}
 .confirm h2{
     font-size:1.1428571428571428rem;
     font-family:PingFangSC-Medium;
     font-weight:600;
     color:rgba(51,51,51,1);
}
 .content {
     font-size:1.14rem;
     color:rgba(63,69,82,1);
     line-height:1.57rem;
     margin-top: 1.1428571428571428rem;
}
 .confirm_btn_warp{
     width: 100%;
     display: flex;
     justify-content: space-between;
     margin-top: 2.2857142857142856rem;
}
 .confirm_btn_warp div{
     width:7.857142857142857rem;
     height:2.857142857142857rem;
     border-radius:1.5714285714285714rem;
     border:1px solid rgba(153,153,153,1);
     font-size:1.14rem;
}
 .confirm_btn_warp .left{
     color: #999999;
}
 .confirm_btn_warp .right{
     color: white;
     background:rgba(255,99,83,1);
     font-weight: 500;
     border:1px solid rgba(255,99,83,1);
}
 
</style>