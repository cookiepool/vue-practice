<template>
    <div>
        <div class="shade" v-if="show" @click="close_model"></div>
        <transition name="fade">
        <div class="model_wrap" v-if="show">
            <div class="model_head flex_btn_center">
                <div class="placeholder"></div>
                <p class="title">{{title}}</p>
                <img class="cancel" @click="close_model" src="https://static.cattryapp.com/12static/new/img/dialog_close.png">
            </div>

            <div class="model"> 
                <div class="content" v-html="content"></div>
            </div>
        </div>
        </transition>
    </div> 
</template>

<script>
export default {
    name:'APP',
    data(){
        return {
            show: false,
            title: "",
            content: "",
        }
    },

    methods: {
        close_model(){
            this.show = false
        }
    }
}
</script>

<style scoped>
body{
     height: none;
}
 .placeholder{
     width: 1.1428rem;
     height: 1.142rem;
}
 .model_wrap{
     width: 100%;
     position: fixed;
     height: 80%;
     z-index: 999;
     left:0;
     bottom:0;
     overflow-y:scroll;
     overflow-x:hidden;
     background: #FFF !important;
     -webkit-overflow-scrolling:touch;
     border-radius: 0.571rem 0.571rem 0 0;
     padding-top: 4rem;
     box-sizing: border-box;
}
 .title{
     font-size:1.142rem;
     font-family:PingFangSC-Medium;
     font-weight:500;
     color:rgba(51,51,51,1);
     line-height:1.142rem;
     text-align: center;
}
 .cancel{
     width: 1rem;
     right: 1.142rem;
     padding: 0.42rem 
}
 .model_head{
     width: 100%;
     height: 4.14rem;
     padding: 0.571rem 1.142rem 0;
     box-sizing: border-box;
     position: fixed;
     top: 20%;
     background: white;
     z-index: 200;
}
 .content{
     padding:0 1.142rem 1.5rem;
     box-sizing: border-box;
     line-height: 1.285rem;
     text-indent: 2em 
}
 
 .fade-enter-active, .fade-leave-active {
     transition: bottom .2s;
}
 .fade-enter, .fade-leave-to{
     bottom: -70%;
}
 .protocol_detail{
     text-indent: 2em;
     line-height: 2.142rem;
     padding: 0.714rem 1.071rem 0.714rem;
     color: #444444!important;
}
 
</style>
