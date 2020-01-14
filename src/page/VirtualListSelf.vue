<template>
  <div class="all-wraper">

    <!-- 容器，这儿我以整个视窗的大小为容器的大小 -->
    <!-- 并且列表里面子项、容器这些的高度一定 -->
    <div ref="list" class="virtual-list-container" 
      @scroll="handleScroll"
      :style="{height: screenHeight + 'px'}"
    >
      <!-- 这个用来占位，让页面形成滚动条，这个占位的高度为所有内容渲染完时容器本应有的高度 -->
      <div :style="{'height': listHeight + 'px'}" class="virtual-list-placehold"></div>

      <!-- 内容的渲染区域 -->
      <div :style="{'transform': getTranslate3d}" class="virtual-list-list">
        <p class="virtual-list-item"
          v-for="item in visibleData"
          :key="item._id"
          :style="{'height': itemHeight + 'px', 'line-height': itemHeight + 'px'}"
        >
        {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// 导入数据5000条
import data from '../assets/data.json';

export default {
  data() {
    return {
      itemData: data, // 要渲染的数据
      itemHeight: 40, // 渲染的列表里面的单个项目的高度

      screenHeight: 0, // 可视区域的高度
      startIndex: 0, // 起始索引
      endIndex: 0, // 结束索引
      offSetValue: 0, // 偏移量，如果不偏移列表，你会发现你往下面滚动的时候看不到内容了
    }
  },
  computed: {
    // 列表的总高度
    listHeight() {
      return this.itemData.length * this.itemHeight;
    },
    // 可视区能显示的列表项目的数量
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemHeight);
    },
    // 获取可视区域要显示的数据
    visibleData() {
      // Math.min那个地方这么写是判断滚动到底部时候
      return this.itemData.slice(this.startIndex, Math.min(this.endIndex, this.itemData.length));
    },
    // 计算偏移量的样式
    getTranslate3d() {
      return `translate3d(0, ${this.offSetValue}px, 0)`;
    }
  },
  mounted() {
    this.screenHeight = window.innerHeight;
    this.startIndex = 0;
    this.endIndex = this.startIndex + this.visibleCount;
  },
  methods: {
    handleScroll() {
      // 当前列表滚动的位置
      let scrollTop = this.$refs.list.scrollTop;
      // 这时起始的索引
      this.startIndex = Math.floor(scrollTop / this.itemHeight);
      // 这时结束的索引
      this.endIndex = this.startIndex + this.visibleCount;
      // 偏移量
      this.offSetValue = scrollTop - (scrollTop % this.itemHeight);
    }
  }
}
</script>

<style scoped>
  .virtual-list-container {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }
  .virtual-list-placehold {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }
  .virtual-list-list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    text-align: center;
  }
</style>