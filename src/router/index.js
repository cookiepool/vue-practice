import Vue from 'vue'
import Router from 'vue-router'
import Parent from '@/page/Parent'
import TestBox from '@/page/TestBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Parent',
      component: Parent
    },
    {
      path: '/test',
      name: 'TestBox',
      component: TestBox
    }
  ]
})
