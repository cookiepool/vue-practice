<template>
    <div class="cashing">
        <app-header :title="'微信提现'"></app-header>
        <div class="cashing_top">
            <div class="cashing_top_text flex_all_center">
                <img src="https://static.cattryapp.com/12static/new/img/wechat.png"/>
                <span>提现中</span>
            </div>
            <div class="cashing_top_money flex_all_center">￥30.00</div>
        </div>
        <div class="cashing_middle">
            <div class="cashing_middle_item flex_btn_center">
                <span>提现时间</span>
                <p>2018-08-08 14:44</p>
            </div>
            <div class="cashing_middle_item flex_btn_center">
                <span>到账时间</span>
                <p>2018-08-11之前到账</p>
            </div>
        </div>
        <div class="cashing_bottom flex_btn_center">
            <div class="cashing_bottom_tips">
                <div class="cashing_bottom_tips_title">温馨提示:</div>
                <div class="cashing_bottom_tips_text">
                    <span>法定节假日不打款</span>
                    ,微信到账示例图（如右图），付款商户为
                    <span>九吨科技或杭州九吨</span>。
                </div>
            </div>
            <img src="https://static.cattryapp.com/12static/new/img/wechat_pay_demo.png"/>
        </div>
    </div>

</template>

<script>
    import api from '@//api/api.js'
    export default {
        name: "cashing",
        data(){
            return {
                cashing:[],
            }
        },

        mounted(){
            this.init()
        },

        methods:{
            init(){
                api.common_request('/cash/cashing.html').then((res)=>{
                    if(res.data.status == true){
                        this.cashing = res.data.data.cashing;
                    }else{
                        this.$MessageBox.alert(res.data.msg).then(()=>{
                            return this.$router.push('/withdraw');
                        });
                    }
                });
            },
        }

    }
</script>

<style scoped>
    .cashing{width: 100%;height: 100%;background-color: #F6F6F6;}
    .cashing_top{height: 164px;background-color: #fff;display: flex;justify-content: center;flex-direction: column;font-weight:bolder;}
    .cashing_top_text{font-size: 18px;height: 25px; }
    .cashing_top_text span{margin-left: 8px; }
    .cashing_top_money{font-size: 42px;height: 59px;}
    .cashing_middle{margin-top: 12px;background-color: #fff;}
    .cashing_middle_item{height: 44px;padding: 0 16px;box-sizing: border-box;}
    .cashing_middle_item p{color: #666666;}
    .cashing_bottom{margin-top: 32px;padding: 0 16px;box-sizing: border-box;}
    .cashing_bottom_tips_title{font-size: 16px;font-weight: bolder;line-height: 22px;}
    .cashing_bottom_tips_text{color: #949494;font-size: 14px;line-height: 22px;margin-top: 10px;}
    .cashing_bottom_tips_text span{color: #F24C4C;}
    .cashing_bottom img{width: 150px;height: 170px;}

</style>