<template>
  <div class="all-wraper">
    <!-- vfor-mode -->
    <div class="box">
      <virtual-list :size="32" :remain="10">
        <div class="item" v-for="item in userInfo" :key="item._id">{{ item.name }}</div>
      </virtual-list>
    </div>
  </div>
</template>

<script>
import userInfo from '../assets/data.json';

export default {
  data() {
    return {
      userInfo: userInfo
    }
  },
  mounted() {

  },
  methods: {
    getItemprops() {

    }
  }
}
</script>

<style scoped>
  .all-wraper {
    height: 100%;
  }
  .item {
    height: 32px;
  }
</style>