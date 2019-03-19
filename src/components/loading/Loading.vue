<template>
    <div class="shade" v-if="show">
        <div class="case-blanche">
            <div class="round">
                <div class="round-point"></div>
            </div>
            <div class="load-text">
                <p>{{ title }}</p>
            </div>
        </div>
    </div>
   
</template>

<script>
export default {
    data: function(){
        return {
            show: false,
            title: '加载中'
        }
    }
}
</script>

<style scoped>
    .shade{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .case-blanche{
        background-color: #C2C2C2;
        height: 140px;
        width: 150px;
        padding-top: 10px;
        float: left;
        position: relative;
    }
    .round{
        height: 100px;
        width: 100px;
        border: 1px solid #fff;
        border-radius: 50%;
        position: absolute;
        top: 20px;
        left: 15px;
        animation: rond 2s infinite; 
    }
    .round-point{
        height: 10px;
        width: 10px;
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        top: 0px;
        left: 20px;
    }
    .load-text{
        color: #fff;
        font-family: calibri;
        text-align: center;
        position: absolute;
        top: 45px;
        left: 45px;
        font-size: 14px;
    }
    @keyframes rond {
        0% {
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>

