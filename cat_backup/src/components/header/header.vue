<template>
    <div class="place_holder">
        <div class="detail_head" >
            <img src="https://static.cattryapp.com/12static/new/img/common_return.png" @click="back">
            <p>{{title}}</p>
            <p class="placeholder"></p>
        </div>  
    </div>
</template>

<script>
export default {
    props:["title"],
    data(){
        return {
         
        }
    },
    methods:{
        back(){
            window.history.length>1?  this.$router.go(-1) : this.$router.replace('/')
           
        }
    }

}
</script>
<style>
.place_holder{
    width: 100%;
    height: 3.214rem;
}
.detail_head{
    width: 100%;
    height: 3.214rem;
    background:linear-gradient(124deg,rgba(255,119,87,1) 0%,rgba(246,59,83,1) 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  0 .5rem;
    box-sizing: border-box;
    color: white;
    font-size:1.285rem;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    z-index: 101;
    position: fixed;
    top:0;
    left: 0;
}
.detail_head img{
    width: 0.7rem;
    padding: 0.5rem 0.8rem 0.5rem 0.8rem;
}
.placeholder{
    width: 2.3rem;
    height: 1.2rem;
}
</style>
