<template>
<div class="all_wrap">
    <app-header :title="'公告'"></app-header>
    <div class="announcement">
        <div class="circle"></div>
        <h4 v-html="title" id="title"></h4>
        <p v-html="content" id="content"></p>
    </div>
</div>    
</template>

<script>
export default {
    name:'APP',
    data(){
        return {
            title:'',
            content:''
        }
    },

    mounted(){
        this.init()
    },

    methods:{
        init(){
           this.title = this.$route.query.title;
           this.content = this.$route.query.content;
        }
    }


}
</script>

<style>
.announcement{padding: 20px;float: left;}
.circle{width: 8px;height: 8px;background-color: #FF6353;border-radius: 8px;margin-top: 7px;float: left;}
#title{margin-bottom: 12px;font-size: 16px;font-weight: bolder;line-height: 22px;margin-left: 14px;}
.announcement p{text-indent: 2em;line-height: 25px;}
</style>
