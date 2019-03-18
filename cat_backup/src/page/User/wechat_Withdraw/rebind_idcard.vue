<template>
<div class="pd60">
    <div class="common_bac_color"></div>
    <app-header :title="'身份验证'"></app-header>
    <div class="content_wrap">
        <div class="content_head flex_btn_center">
            <h2 class="content_h2">ID:{{userid}}</h2>
            <i>请按照要求填写信息</i>
        </div>
        <div class="input_wrap flex_center">
            <h2 class="content_h2 mr_36">姓名</h2>
            <input v-model="Name" type="text" placeholder="请输入您的真实姓名" disabled>
        </div>
        <div class="input_wrap flex_center">
            <h2 class="content_h2">身份证号</h2>
            <input v-model="IdCard" type="text" placeholder="请输入您的身份证号" disabled>
        </div>    
    </div>
    <div class="content_wrap">
        <h2 class="content_h2 mb12">上传照片</h2>
        <p>1.请确保照片完整、清晰可见、无图改，否则将影响您的审核进度。</p>
        <p>2.在白纸上写上您的<span>ID（{{userid}}</span>和<span>
            当前日期（{{date}}）</span>,并与您的身份证（带有个人信息的一年）一同拍照。示例图片如下:
        </p>
        <img class="example" src="./img/withdraw_identity_example.png">
        <form action="" enctype="multipart/form-data">
            <input type="file"  @change="changeImg($event)" ref="file" id="file" accept="image/*">
            <img id="img_content" class="add" src="./img/withdraw_identity_add.png">
        </form>
        
    </div>
    <div class="btn flex_all_center" @click="submit">提交验证</div>

</div>    
</template>

<script>
import api from '@//api/api.js'
export default {
    name:'APP',
    data(){
        return {
            Name:'',
            IdCard:'',
            img:'',
            userid: '',
            date: '',
            status: null
        }
    },

    mounted(){
        this.init();
    },

    methods:{
        init(){
            api.userIndex().then(res => {
                this.userid = res.data.data.tuser.id;
            })
            api.idcardInfo().then(res =>{
                if(res.data.data.length == 0 || res.data.data.is_usable == 1){
                    this.$router.push({path: '/user'});
                } else if(res.data.data.length != 0) {
                    this.Name = res.data.data.name;
                    this.IdCard = res.data.data.idcard;
                    document.getElementById("img_content").setAttribute('src',res.data.data.image);
                }
            })
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.date = year + "-" + month + "-" + strDate;

        },
        changeImg(e){
            var img = document.getElementById("file");
            var fr = new FileReader();
            fr.readAsDataURL(img.files[0]);
            var _this = this;
            fr.onload = function(){
                _this.img = this.result;
                document.getElementById("img_content").setAttribute('src',this.result);     //显示图片
            }
            
        },
        submit(){
            var params = {
                name: this.Name,
                img: this.img,
                idcard: this.IdCard
            };
            this.$loadding.open("上传中");
            api.rebindIdcard(params).then(res => {
                this.$loadding.close();
                if(res.data.status == true){
                    this.$MessageBox.alert("上传成功,审核通过后即可开始赚钱");
                    this.$router.push({path: '/user'});
                } else {
                    this.$MessageBox.alert(res.data.msg);
                }
            })
        }
    }


}
</script>

<style scoped>
form{
    display: block;
    width: 270px;
    height: 170px;
    margin: 24px auto 0;   
    position: relative;
}
form input{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
form img{
    width: 100%;
    height: 100%;
}
input{
    font-size: 14px;
    border: none;
    background: none;
    outline: none;
    line-height: 16px;
    width: 60%;
}
input::-webkit-input-placeholder{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(204,204,204,1);
    line-height: 16px;
}
.content_wrap{
    width: 351px;
    margin: 12px auto 0;
    padding: 20px 16px;
    box-sizing: border-box;
    background: white;
}
.content_h2{
    font-size:16px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:16px; 
    width: 70px;;
}
.content_head i{
    font-size:13px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);    
}
.input_wrap{
    width:319px;
    height:44px;
    background:rgba(246,246,246,1);
    border-radius:2px;    
    padding-left: 16px;
    box-sizing: border-box;
    margin: 12px auto 0;
}
.content_wrap p{
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(102,102,102,1);
    line-height:20px;   
}
.mb12{
    margin-bottom: 12px
}
.content_wrap span{
    color: #FF6353;
}
.example{
    display: block;
    width: 270px;
    height: 170px;
    margin: 16px auto 0;
}
.btn{
    width:315px;
    height:44px;
    background:rgba(255,99,83,1);
    border-radius:22px;  
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1); 
    margin: 32px auto;
}
.pd60{
    padding-bottom: 60px;

}
</style>
