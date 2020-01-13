<template>
    <div class="wraper">
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>
        <p>Hello</p>
        <br/>

        <img data-src="static/img/1.jpg" alt="">
        <img data-src="static/img/2.jpg" alt="">
        <img data-src="static/img/3.jpg" alt="">
        <img data-src="static/img/4.jpg" alt="">
        <img data-src="static/img/5.jpg" alt="">
        <img data-src="static/img/6.jpg" alt="">
        <img data-src="static/img/7.jpg" alt="">
        <img data-src="static/img/8.jpg" alt="">
        <img data-src="static/img/9.jpg" alt="">
    </div>
</template>

<script>
import lazyLoad from '../utils/lazyload.js';

export default {
    data: function(){
        return {

        }
    },
    mounted: function(){
        lazyLoad.lazyLoadPolyfill('img');
    },
    methods: {
        getTop: function(elm){
            var tempTop = elm.offsetTop;
            //如果包裹img的父元素离顶部也有距离，那么也要把它加上
            while(elm = elm.offsetParent) { //注意这儿offsetParent返回的是元素不是数值，同时这儿是赋值语句
                tempTop += elm.offsetTop;
            }
            return tempTop;
        },
        lazyLoad: function(imgs){
            //获取可视区域高度
            var viewHeight = document.documentElement.clientHeight;
            //获取滚动高度
            var scrollTopVal = document.documentElement.scrollTop || document.body.scrollTop;
            console.log(viewHeight, scrollTopVal)
            for(var i = 0; i < imgs.length; i++){
                if((viewHeight + scrollTopVal) > this.getTop(imgs[i])){
                    imgs[i].src = imgs[i].getAttribute('data-src')
                }
            }
        }
    },
}
</script>

<style>
    img{
        width: 100%;
        /* height: 300px; */
        margin-bottom: 50px;
        border: none;
        outline: none;
    }
    img[src=""], img:not([src]){
        opacity: 0;
    }
</style>

