<template>
    <div>
        <button @click.stop.prevent="popDialog">点击弹出窗口</button>
    </div>
</template>

<script>
import msgBox from '../components/messagebox/index';
// import MsgBox from '../components/messagebox/MessageBox';
export default {
    name: 'Test',
    components: {
        // 'msg-box': MsgBox
    },
    methods: {
        popDialog(){
            msgBox.showIt("这是个测试弹框", "Hello Customized Vue Dialog")
        }
    }
}
</script>

<style>

</style>
