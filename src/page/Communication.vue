<template>
<div>
    <ChildOne :title-parent="showText" v-on:get-child-msg="show_it"></ChildOne>
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
            showText: "欢迎来到首页-组件通讯测试",
            count: 0,
        }
    },
    filters: {

    },
    computed: {

    },
    components: {
        // 两种写法都可以
        // 'head-part': ChildOne,
        ChildOne,
        "foot-part": ChildTwo,
    },
    methods: {
        show_it(data){
            console.log(data);
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
