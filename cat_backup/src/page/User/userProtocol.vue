<template>
    <div class="user_protocol">
        <app-header :title="'用户协议'"></app-header>
        <div class="protocol_detail" v-html="this.useragreement"></div>
    </div>
</template>

<script>
    import api from '@//api/api.js'
    export default {
        name: "userrotocol",
        data(){
            return {
                useragreement:'',
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                //获取首页用户信息
                this.$loadding.open()
                api.common_request('/Help/useragreement.html').then((res)=>{
                    this.$loadding.close()
                    if(res.data.status == true){
                        this.useragreement = res.data.data.useragreement;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .protocol_detail{text-indent: 2em; line-height: 2.1429rem; padding: 0.7143rem 1.0714rem 0.7143rem;color: #444444!important;}
</style>