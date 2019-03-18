<template>
    <div id="slider" class="swiper_wrap">
        <div class="window" >
            <!-- 轮播图 -->
            <ul class="container" :style="translateStyle" @touchstart="startTouch" @touchend="endTouch">
                <!-- <li><img class="slide_item" :src="imgArr[imgArr.length-1]"></li> -->
                <!-- <li v-for="(item,index) in imgArr" :key="index">
                    <img class="slide_item" :src="item">
                </li> -->
                <slot></slot>
                <!-- <li><img class="slide_item" :src="imgArr[0]"></li> -->
            </ul>
            <!-- 左右箭头 -->
            <ul class="direction">
                <li class="arrow left" @click="move(width,1)">
                    <img src="https://static.cattryapp.com/12static/new/img/arrow_left.png">
                </li>
                <li class="arrow right" @click="move(width,-1)">
                    <img src="https://static.cattryapp.com/12static/new/img/arrow_right.png">
                </li>
            </ul> 
            <!-- 圆点 -->
            <ul class="dot_wrap">
                <li v-for="(item,index) in imgArr" :key="index" :class="index+1==currentIndex?'dotted':''" @click="jump(index)"></li>
            </ul>
        </div>
    </div> 
</template>

<script>
import api from '@//api/api.js'
export default {
    props:["index"],
    data(){
        return {
            clickStop:false,
            distance:-0,
            currentIndex:'',
            startX:'',
            endX:'',
            width:'',
            len:'',
            imglen:'',
            index:this.index,
        }
    },

    mounted(){
        this.currentIndex=this.index+1;
        console.log(this.currentIndex)
       var width = document.getElementById("slider").clientWidth;
       this.distance = -width;
       this.width = width;
       var ul_wrap = document.getElementsByTagName("ul")[0]
       var domArr = Array.from(ul_wrap.children)
       this.len = domArr.length+2;
       this.imglen=domArr.length;
       var newfirst = domArr[0].cloneNode(true)
       var newlast = domArr[domArr.length-1].cloneNode(true)
       ul_wrap.appendChild(newfirst)
        ul_wrap.insertBefore(newlast,ul_wrap.childNodes[0])
        this.jump(this.currentIndex)

    },
    computed:{
        translateStyle(){
            return {
                transform:`translate(${this.distance}px,0)`
            }
        }
    },
    methods:{
      startTouch(e){
          var startX = e.touches[0].clientX;
            this.startX = startX;
      },
      endTouch(e){
          var endX = e.changedTouches[0].clientX;
            var startX = this.startX;
            if(startX-endX>60){
                this.move(this.width,-1)
            }
            if(endX-startX>60){
                this.move(this.width,1)
            }
      },
        move(offset,direction){
            if(this.clickStop) return
            this.clickStop=true;    //防止动画未完成 连续点击
            var index = this.currentIndex;
            direction===1?index--:index++; 
            if(index>=this.imglen) index=0;
            if(index<0) index=this.imglen-1;
            this.currentIndex = index
            const des = this.distance+offset*direction;
            this.animate(des,direction)
            var emitIndex = this.currentIndex;
            this.$emit('change',emitIndex+1)
        },
        animate(des,direc){
            if((this.distance>des&&direc===-1)||(this.distance<des&&direc===1)){
                this.distance+=(Math.round(this.width/10))*direc;
                window.setTimeout(()=>{
                    this.animate(des,direc)
                },20)
            }else{
                this.distance = des;
                if(des<-this.width*this.imglen-1) this.distance=-this.width;
                if(des>-this.width) this.distance = -this.width*this.imglen-1;
                this.clickStop=false;
            }
        },
        jump(e){
            this.currentIndex=e-1;
            this.distance = -this.width + -this.width*(e-1)
        },
        
    }


}
</script>

<style scoped>
.window{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.container{
  display:flex;
  position:absolute;
  height: 100%;
}
.slide_item{
    height: 100%;
}
.arrow{
    position: absolute;
    top:50%;
    transform:translateY(-50%);
    width:20px;
}
.arrow img{
    width: 18px;
}
.left{
    left:3%;
}
.right{
    right: 3%;
}
.dot_wrap{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
.dot_wrap li{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 6px;
    border: 1px solid white;
    border-radius: 50%;
    background: #333
}
.dotted{
  background:orange!important;
}
</style>
