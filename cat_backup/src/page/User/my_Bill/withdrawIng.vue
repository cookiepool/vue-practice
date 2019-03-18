<template>
<div v-cloak v-if="cashing.money">
    <div class="common_bac_color"></div>
    <app-header :title="'微信提现'"></app-header>
    <div class="head_msg_wrap flex_column_center">
        <div class="flex_center">
            <img src="https://static.cattryapp.com/12static/new/img/my_bill_wechat_icon.png">
            <h2>提现中</h2>
        </div>
        <p class="withdraw_data">
            ￥{{cashing.money}}
        </p>
    </div>

    <div class="time_wrap">
        <div class="item flex_btn_center">
            <h2>提现时间</h2>
            <i>{{cashing.submit_time}}</i>
        </div>
        <div class="item flex_btn_center">
            <h2>到账时间</h2>
            <i>{{cashing.dotime}}之前到账</i>
        </div>        
    </div>

    <div class="tips_wrap flex_btn_center">
        <div class="left_tips">
            <h2>温馨提示:</h2>
            <p><span>法定节假日不打款</span>,微信到账示实例图（如右图）,付款商户为<span>九吨科技或杭州九吨</span>。</p>
        </div>
        <img src="https://static.cattryapp.com/12static/new/img/my_bill_example.png">
    </div>
</div>    
</template>

<script>
    import api from '@//api/api.js'
    export default {
        name: "APP",
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
.head_msg_wrap{
    width: 100%;
    height: 164px;
    background: white;
    padding-top: 32px;
}
.head_msg_wrap img{
    width: 29px;
}
.head_msg_wrap h2{
    font-size:18px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    margin-left: 8px;
    line-height:25px;
}
.withdraw_data{
    font-size:42px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 16px;
    line-height:59px;
}
.time_wrap{
    background: white;
    margin-top: 12px
}
.time_wrap .item{
    padding: 12px 16px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(241,241,241,1);
}
.time_wrap .item h2{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:20px;
}
.time_wrap .item i{
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
}
.tips_wrap{
    margin-top: 32px;
    padding: 0 16px;
    box-sizing: border-box;
}
.tips_wrap img{
    width: 150px;
}
.left_tips{
    width: 174px;
}
.left_tips h2{
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    font-weight: bolder;
}
.left_tips p{
    color: #949494;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height:22px;
}
.left_tips span{
    color: #F24C4C;
}
</style>
