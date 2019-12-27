<template>
  <h3>mixins测试</h3>
</template>

<script>
import myMixin from '../mixins/my_mixins.js';

export default {
  name: 'mixin-page',
  mixins: [
    myMixin
  ],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>