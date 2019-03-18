<template>
    <div class="user_business">
        <div class="common_bac_color"></div>
        <app-header :title="'商务合作'"></app-header>
        <img class="user_business_qqicon" src="https://static.cattryapp.com/12static/new/img/QQ.png" alt="">
        <div class="user_business_qq">353023240</div>
        <div class="user_business_msg">此QQ仅限于商务合作</div>
        <div class="user_business_btn flex_all_center" @click="copy_qq">复制QQ号</div>

    </div>
</template>

<script>
    import clientApi from '@//api/clientApi.js'
    export default {
        name: "business",
        methods:{
            copy_qq(){
                clientApi.copykeyword('353023240').then((res)=>{
                    if(res.status == 1){
                        this.$MessageBox.confirm('已复制QQ号,是否跳转到QQ？').then( () => {
                            document.location.href = 'mqq://';
                        });
                    }else {
                        this.$MessageBox.alert('复制QQ号失败');
                    }
                }).catch(() => {this.$MessageBox.alert('复制QQ号失败!');});
            }
        }
    }
</script>

<style scoped>
  .user_business{
     width: 100%;
     height: 100%;
     background-color: #F6F6F6;
}
 .user_business_qqicon{
     display: block;
     width: 4.857142857142857rem;
     margin: 5.5rem auto 0;
}
 .user_business_qq{
     margin-top: 1.7142857142857142rem;
     font-size: 1.2857142857142858rem;
     text-align: center;
     font-weight: bolder;
     line-height: 1.7857142857142858rem;
}
 .user_business_msg{
     font-size: 0.8571428571428571rem;
     text-align: center;
     margin-top: 1.1428571428571428rem;
     color: #999999;
}
 .user_business_btn{
     margin: 4.571428571428571rem auto 0;
     width: 22.5rem;
     height: 3.142857142857143rem;
     background-color: #FF6353;
     border-radius: 1.5714285714285714rem;
     color: #FFFFFF;
     font-size: 1.1428571428571428rem;
}
 

</style>