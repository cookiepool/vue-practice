<template>
  <h4>commonjs\es6模块测试</h4>
</template>

<script>
let obj = require('../module_test/commonjs_1.js');
console.log(obj.add(2, 3));
export default {
  
}
</script>