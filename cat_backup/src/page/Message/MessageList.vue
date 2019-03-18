<template>
<div class="all_wrap">
    <app-header :title="'消息中心'"></app-header>
    <ul id="TheList" class="list_wrap">
        <li v-for="(item,index) in list" :key="index" class="list_item flex_column_center">
            <div v-if="!item.is_read" class="red_dot"></div>
            <div class="msg_time flex_all_center">
                {{item.create_time}}
            </div>
            <div class="msg_content">
                <h2>{{item.source}}</h2>
                <div class="word"><p>{{item.content}}</p></div>
                <!-- <div class="detail_entry flex_btn_center">
                    <h3>查看详情</h3>
                    <img src="https://static.cattryapp.com/12static/new/img/forward.png" alt="">
                </div> -->
            </div>
        </li>
        <p v-if="!nomore" class="check_more" @click="checkMore">点击查看更多</p>
        <p v-else class="check_more">没有更多了</p>
    </ul>
    <div v-if="list.length<=0" class="no_msg flex_column_center">
        <img src="https://static.cattryapp.com/12static/new/img/Message_no_msg.png">
        <p>暂无消息</p>
    </div>
</div>    
</template>

<script>
import api from '@//api/api.js'
export default {
    name:'APP',
    data(){
        return {
            list:[],
            page:1,
            nomore:false
        }
    },

    mounted(){
        this.init();
    },

    methods:{
        init(){
            this.$loadding.open()
            api.SystemMessage({}).then(res=>{
                this.$loadding.close()
                console.log(res);
                if(res.data.status == true){
                    this.list = res.data.data;
                } else {

                }
            })
        },
        //查看更多
        checkMore(){
            var page = this.page+1;
            var param = {page:page}
            this.$loadding.open()
            api.SystemMessage(param).then(res=>{
                this.$loadding.close()
                var newList = res.data.data
                if(newList.length==0){
                    this.nomore = true
                    return
                }
                this.page = page
                if(newList.length<20){
                    this.nomore = true
                }
                this.list = this.list.concat(newList)
                var sTop = document.documentElement.scrollTop || document.body.scrollTop;
                this.newsTop = sTop+300
                var scrollTimer = setInterval(()=>{
                    sTop = sTop + 10
                    window.scrollTo(0,sTop)
                    if(sTop>this.newsTop){
                        clearInterval(scrollTimer)
                    }
                },8)
            })
        }
    }


}
</script>

<style scoped>
.check_more{
    text-align: center;
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    margin-top: 28px
}
.red_dot{
    width:0.5714rem;
    height:0.5714rem;
    background:rgba(255,99,83,1);   
    border-radius: 50%;
    position: absolute;
    right: 1.1429rem;
    top: 4.7143rem
}
.all_wrap{
    min-height: 100%;
    background:rgba(246,246,246,1);
}
.list_wrap{
    padding: 0 0.8571rem;
    padding-bottom: 2.1429rem;
    box-sizing: border-box;
}
.list_item{
    margin-top: 1.1429rem;
    position: relative;
}
.msg_time{
    padding: 0 0.5714rem;
    height:2.2857rem;
    background:rgba(220,222,225,1);
    border-radius:1.2143rem;
    color: white;
    font-size:0.8571rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.msg_content{
    width:25.0714rem;
    background:rgba(255,255,255,1);
    margin-top: 0.8571rem;
    padding: 1.1429rem 1.1429rem 0.57rem;
    box-sizing: border-box;
}
.msg_content h2{
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:1.5714rem;
    margin-bottom: 0.5714rem;
}
.msg_content .word{
    width: 100%;
    height: 4.1429rem;
    padding-bottom:0.8571rem;
    box-sizing: border-box;
    /* border-bottom: 0.0714rem solid rgba(241,241,241,1); */
}
.msg_content .word p{
    font-size:0.9286rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1.6429rem;
}
.detail_entry{
    width: 100%;
    height: 3.1429rem;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
}
.detail_entry img{
    width: 0.5714rem;
}
.no_msg{
    margin-top: 14.2857rem;
    font-size:1.1429rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
}
.no_msg img{
    width: 8.7857rem;
    margin-bottom: 1.4286rem
}
</style>
