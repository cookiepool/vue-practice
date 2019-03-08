<template>
    <div v-if="msgboxShow" class="msg-content">
        <div class="msg-box">
            <h1>{{ title }}</h1>
            <p>{{ content }}</p>
            <div class="btn-box">
                <div class="cancle btn-common" v-on:click.stop="msgboxCancle">取消</div>
                <div class="confirm btn-common" @click.stop="msgboxConfirm">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'msgbox',
    data: function () {
        return {
            msgboxShow: true,
            title: '',
            content: '',
        }
    },
    methods: {
        msgboxCancle: function() {
            this.msgboxShow = false;
        },
        msgboxConfirm: function(){
            this.msgboxShow = false;
        }
    }
}
</script>

<style>
    .msg-content{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .msg-box{
        width: 300px;
        height: 500px;
        background-color: #fff;
    }
    .btn-box{
        display: flex;
        justify-content: space-between;
    }
    .btn-common{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 60px;
    }
</style>
