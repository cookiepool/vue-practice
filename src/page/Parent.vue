<template>
<div>
    <head-part :title-parent="showText" v-on:getChildMsg="show_it"></head-part>
    <hr>
    <p>来自子组件的数量消息：{{ count }}</p>
    <hr>
    <foot-part></foot-part>
    <hr>
    <button v-on:click="testLoading">点击测试加载动画</button>
    <hr>
    <test-box></test-box>
    <hr>
    <h1>插槽测试</h1>
    <test-slot>
        <p>插槽分发的内容</p>
        {{soltTest}}
    </test-slot>
    <ul>
        <li>
            <h2>具名插槽</h2>
            <name-slot>
                <template v-slot:header>
                    <p>this is header!</p>
                </template>
                <template v-slot:default>
                    <p>this is main content!</p>
                </template>
                <template v-slot:footer>
                    <p>this is footer!</p>
                </template>
            </name-slot>
        </li>
        <li>
            <h2>作用域插槽</h2>

        </li>
    </ul>
</div>
    
</template>

<script>
import ChildOne from "../components/ChildOne";
import ChildTwo from "../components/ChildTwo";
import TestBox from "../page/TestBox";
import TestSlot from "../components/TestSlot";
import NameSlot from "../components/NameSlot";
import ScopeSlot from "../components/ScopeSlot";

export default {
    name: "parent",
    data: function () {
        return {
            showText: "欢迎来到首页",
            count: 0,
            soltTest: '插槽'
        }
    },
    components: {
        'head-part': ChildOne,
        "foot-part": ChildTwo,
        "test-box": TestBox,
        "test-slot": TestSlot,
        "name-slot": NameSlot,
        "scope-slot": ScopeSlot
    },
    methods: {
        show_it(data){
            this.count++;
        },
        testLoading(){
            this.$loading.open();
            var timer = setTimeout(()=>{
                this.$loading.close();
                clearTimeout(timer);
            }, 5000);
        }
    }
}
</script>

<style>

</style>
