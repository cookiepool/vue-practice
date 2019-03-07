<template>
    <div>
        <h1>一个头部</h1>
        <header>{{ title }}</header>
        <h1>一个按钮</h1>
        <button @click="handleClick">点我</button>
        <p>数量变化：{{ total }}</p>
        <p>
            <button @click="sendToFoot">给footer发消息</button>
            <span>{{ getMsg }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'child',
    props: ["title-parent"],
    data: function () {
        return {
            title: this.titleParent,
            total: 0,
            getMsg: ""
        }
    },
    methods: {
        handleClick(){
            this.$emit("getChildMsg", [1, 2, 3]);
            this.total++;
        },
        sendToFoot(){
            this.bus.$emit("fromHead", "我是来自head消息");
        }
    },
    mounted: function () {
        this.bus.$on('fromFoot', (data)=>{
            this.getMsg = data;
        })
    }
}
</script>
<style>

</style>
