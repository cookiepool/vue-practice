<template>
    <!-- 响应式失效 -->
    <div class="all-wraper">
<h3>响应式失效演示</h3>
<ul>
    <li v-for="item in list">{{ item }}</li>
</ul>
<hr>
<button @click="changeData">修改-1</button>
<button @click="changeDataOk">修改-2</button>
        <hr>
        <h4>使用v-model.number可以把输入的值转换成number类型，默认它是string</h4>
        <input type="number" v-model.number="numberVal" @change="handleChange">
        <h4>去掉用户输入的开始和结尾的空格v-model.trim</h4>
        <input type="text" v-model.trim="userVal" @change="handleChange2">
    </div>
</template>

<script>
export default {
    name: 'responsenull',
    data() {
        return {
            list: [0, 1, 2, 3, {haha: 'hahahaha'}],
            numberVal: 12,
            userVal: 'hello'
        }
    },
    methods: {
        changeData() {
            // this.list[0] = 10;
            // this.list[4].haha = 'nope' //我不写这句话的话响应数据不会及时更新到view上，实际上上面的值已经改了，同时你写this.list.length = 0;这种也不会及时响应。
            // 这个方法可以做到及时响应
            // this.$set(this.list, 0, 10); // 修改值
            // this.list.splice(0, this.list.length); // 修改长度（清空数组）
            // push和pop可以响应
            this.list.pop();
            this.list.push(4);
        },
        changeDataOk() {
            this.list[4].haha = 'nope';
        },
        handleChange() {
            console.log(this.numberVal);
        },
        handleChange2() {
            console.log(this.userVal);
        }
    }
}
</script>

<style scoped>

</style>