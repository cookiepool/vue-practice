<template>
    <div>
        <button @click.stop.prevent="popDialog">点击弹出窗口</button>
        <hr>
        <button @click.stop.prevent="showLoading">点击弹出加载动画</button>
    </div>
</template>

<script>
import msgBox from '../components/messagebox/index';
export default {
    name: 'Test',
    components: {

    },
    methods: {
        popDialog(){
            msgBox.showIt("这是个测试弹框", "Hello Customized Vue Dialog");
        },
        showLoading() {
            this.$loading.open();
            setTimeout(() => {
                this.$loading.close();
            }, 3000)
        }
    }
}
</script>

<style>

</style>
