<template>
  <div class="all-wraper">
    <div ref="listWraper" 
      class="virtual-list-wraper"
      :style="{ transfrom: `translate3d(0, ${translateY}px, 0)` }"
    >
      
    </div>
  </div>
</template>

<script>
// 导入数据
import data from '../assets/data.json';

export default {
  data() {
    return {
      itemData: data
    }
  }
}
</script>

<style scoped>

</style>