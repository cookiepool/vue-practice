<template>
  <div class="backto-top">
    <div ref="wraper" class="box">
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
      <p>Hello, Backtotop</p>
      <br/>
    </div>
    <p @click="handleBackToTop" class="backto-top-btn">滚动按钮</p>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    handleBackToTop() {
      // 回到顶部-1
      // window.scrollTo(0, 0)

      // 滚到底部-1
      // window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight);

      // 回到顶部-2
      // this.$refs.wraper.scrollIntoView(true);
      // 滚到底部-2
      // this.$refs.wraper.scrollIntoView(false);

      // 回到顶部-3
      // this.scrollToTop(0);
      // 滚到底部-3
      this.scrollToTop(document.documentElement.scrollHeight - window.innerHeight);
    },
    // 封装一个回到底部或者顶部的函数
    scrollToTop(position) {
      // 使用requestAnimationFrame，如果没有则使用setTimeOut模拟
      if(!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
          return setTimeout(callback, 20)
        }
      }

      // 获取当前元素滚动的距离
      let scrollTopDistance = document.documentElement.scrollTop || document.body.scrollTop;

      function smoothScroll() {
        // 如果你要滚到顶部，那么position传过来的就是0，下面这个distance肯定就是负值。
        let distance = position - scrollTopDistance;
        // 每次滚动的距离要不一样，制造一个缓冲效果
        scrollTopDistance = scrollTopDistance + distance / 5;
        console.log(scrollTopDistance)
        // 判断条件
        if(Math.abs(distance) < 1) {
          window.scrollTo(0, position);
        }else {
          window.scrollTo(0, scrollTopDistance);
          requestAnimationFrame(smoothScroll);
        }
      }

      smoothScroll();


      // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
      // if (!window.requestAnimationFrame) {
      //   window.requestAnimationFrame = function (cb) {
      //     return setTimeout(cb, 17);
      //   };
      // }
      // // 当前滚动高度
      // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // // step
      // var step = function () {
      //   var distance = position - scrollTop;
      //   scrollTop = scrollTop + distance / 3;
      //   if (Math.abs(distance) < 1) {
      //     window.scrollTo(0, position);
      //   } else {
      //     window.scrollTo(0, scrollTop);
      //     requestAnimationFrame(step);
      //   }
      // };
      // step();
    }
  }
}
</script>

<style scoped>
  .backto-top {
    position: relative;
  }
  .backto-top-btn {
    position: fixed;
    right: 20px;
    bottom: 50px;
    font-size: 16px;
  }
</style>