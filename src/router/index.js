import Vue from 'vue';
import Router from 'vue-router';
import Parent from '@/page/Parent';
import TestBox from '@/page/TestBox';
import LazyLoad from '@/page/LazyLoad';

import App from '../App';
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    children: [
      {
        path: '/home',
        redirect: "/" //路径输入home的话从定向到根路经
      },
      {
        path: '/',
        name: 'communication',
        component: Parent
      },
      {
        path: '/test',
        name: 'test',
        component: TestBox
      },
      {
        path: '/lazyload',
        name: 'lazyload',
        component: LazyLoad
      }
    ]
  }
]

export default new Router({
  routes: routes
})
