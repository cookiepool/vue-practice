<template>
    <div class="head_nav2 flex_ard_center">
        <div class="head_nav_item flex_all_center" v-for="(item,index) in head_nav" :key="index"  @click="choise_nav(index)">
            <p :class="current_nav==index? 'selected':''">{{item}}</p>
            <div v-show="current_nav==index" class="bot_line"></div>
        </div>            
    </div>
</template>

<script>
export default {
    props:["navItem","current_nav"],
    data(){
        return {
            head_nav:this.navItem,
            current_nav:this.current_nav,
        }
    },
    mounted(){
    
    },
    methods:{
        choise_nav(e){
            this.current_nav = e;
            this.$emit('navIndex',e)
        },
    }

}
</script>
<style scoped>
.head_nav2{
     width: 100%;
     height:3.142rem;
     background:rgba(255,255,255,1);
     font-size:1.142rem;
     font-family:PingFangSC-Regular;
     border-bottom: 1px solid #f1f1f1;
}
 .head_nav_item{
     height: 100%;
     width: 33.33%;
     position: relative;
     color:rgba(102,102,102,1);
}
 .head_nav_item .bot_line{
     width:1.71rem;
     height:0.214rem;
     background:rgba(240,91,91,1);
     border-radius:0.285rem;
     position: absolute;
     left: 50%;
     transform: translateX(-50%);
     bottom: 0;
}
 .head_nav_item .selected{
     font-weight:500;
     color:rgba(51,51,51,1);
}
 
</style>
