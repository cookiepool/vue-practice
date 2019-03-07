<template>
<div>
    <h1>这是页面底部</h1>
    <p>
        <button @click="sendToHead">给header发消息</button>
        <span>{{ getMsg }}</span>
    </p>
</div>
</template>
<script>
export default {
    name: "childTwo",
    data: function () {
        return {
            getMsg: ""
        }
    },
    created: function () {
        this.bus.$on('fromHead',(data)=>{ //这里要用箭头函数，否则this的指向会有问题
            this.getMsg = data;
            console.log(data)
        })
    },
    methods: {
        sendToHead(){
            this.bus.$emit('fromFoot', "一条来自Foot的消息");
        }
    }
}
</script>

