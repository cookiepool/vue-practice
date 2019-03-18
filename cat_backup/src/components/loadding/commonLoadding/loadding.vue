<template>
<div class="loadding_all_wrap" v-if="show">
    <div class="box">
        <div class="loader"></div>
        <p class='content'>{{content}}</p>
    </div>
</div>   
</template>

<script>
 export default{
    data(){
        return {
            show:false,
            content:'加载中',
        }
    },
 }
 
</script>


<style scoped>
.loadding_all_wrap{
     width: 100%;
     height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     position: fixed;
     top: 0;
     left: 0;
     z-index: 999;
     background: transparent;
}
 .content{
     font-size: 1.3rem;
     margin-top: 1.4rem;
}
 .box {
     display: flex;
     flex-direction: column;
     align-items: center;
     min-width: 26%;
     min-height: 16vh;
     border: 1px solid currentcolor;
     border-radius: 0.42857142857142855rem;
     font-size: 2.14rem;
     color: white;
     padding: 1.4rem 0.5rem;
     margin-bottom: .25em;
     vertical-align: top;
     -webkit-transition: .3s color, .3s border;
     transition: .3s color, .3s border;
     box-sizing: border-box;
     background: rgba(51,51,51,0.7);
}
 .loader {
     display: inline-block;
     width: 1em;
     height: 1em;
     color: inherit;
     vertical-align: middle;
     pointer-events: none;
     border: .12em solid currentcolor;
     border-bottom-color: transparent;
     border-radius: 50%;
     -webkit-animation: 1s loader linear infinite;
     animation: 1s loader linear infinite;
     position: relative;
}
 


@keyframes loader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
