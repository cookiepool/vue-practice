<template>
<div>
    <head-part :title-parent="showText" v-on:getChildMsg="show_it"></head-part>
    <hr>
    <p>来自子组件的数量消息：{{ count }}</p>
    <hr>
    <foot-part></foot-part>
</div>
    
</template>

<script>
import ChildOne from "../components/ChildOne";
import ChildTwo from "../components/ChildTwo";

export default {
    name: "parent",
    data: function () {
        return {
            showText: "欢迎来到首页",
            count: 0,
        }
    },
    components: {
        'head-part': ChildOne,
        "foot-part": ChildTwo,
    },
    methods: {
        show_it(data){
            this.count++;
        },
        handleClick(){
            console.log('组件上绑定事件')
        }
    }
}
</script>

<style>

</style>
