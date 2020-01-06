<template>
  <!-- 测试弹窗输入光标移位 -->
  <div class="all-wraper">
    <div class="ttttt">
      <button @click="openPop">打开弹窗</button>
      <a href="http://www.chjtx.com/JRoll/demos/">jroll</a>

      <button @click="focusIt">获取焦点</button>
      <input ref="testFocus" type="text">

      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>为反馈数据发fsl</p><br/>
      <p>dadasadasd</p>
    </div>
    
    <div class="fixed-test">
      <input type="text">
    </div>
    <test-pop :pop-show="show"></test-pop>
  </div>
</template>

<script>
import Pop from '../components/TestiOSInputPop.vue';

export default {
  data() {
    return {
      show: false
    }
  },
  components: {
    'test-pop': Pop
  },
  methods: {
    openPop() {
      this.show = true;
    },
    focusIt() {
      this.$refs.testFocus.focus()
    }
  }
}
</script>

<style>
  html, body, #app, .all-wraper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .ttttt {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* 使用absolute替换fixed方案 */
  .fixed-test {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>