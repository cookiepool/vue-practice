import Vue from 'vue';
import Router from 'vue-router';

import App from '../App';
import Home from '../page/Home.vue';

import Communication from '@/page/Communication.vue';
import DialogBox from '@/page/DialogBox.vue';
import LazyLoad from '@/page/LazyLoad';
import SlotPage from '../page/SlotPage.vue';
import ResponseNull from '../page/ResponseNull.vue';
import ModulesTest from '../page/ModulesTest.vue';
import MixinsPage from '../page/MixinsPages.vue';
import TestiOSPop from '../page/TestiOSInput.vue';
import CryptoTest from '../page/CryptoTest.vue';
import VirtualList from '../page/VirtualListTest.vue';
import VirtualListSelf from '../page/VirtualListSelf.vue';
import BackToTop from '../page/BackToTop.vue';

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/home',
        redirect: "/" //路径输入home的话从定向到根路经
      },
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/communication',
        name: 'communication',
        component: Communication
      },
      {
        path: '/lazyload',
        name: 'lazyload',
        component: LazyLoad
      },
      {
        path: '/dialogbox',
        name: 'dialogbox',
        component: DialogBox
      },
      {
        path: 'slotpage',
        name: 'slotpage',
        component: SlotPage
      },
      {
        path: 'responsenull',
        name: 'responsenull',
        component: ResponseNull
      },
      {
        path: 'modulestest',
        name: 'modulestest',
        component: ModulesTest
      },
      {
        path: 'mixinpage',
        name: 'mixinpage',
        component: MixinsPage
      },
      {
        path: 'testpop',
        name: 'testpop',
        component: TestiOSPop
      },
      {
        path: 'cryptotest',
        name: 'cryptotest',
        component: CryptoTest
      },
      {
        path: 'virtuallist',
        name: 'virtuallist',
        component: VirtualList
      },
      {
        path: 'virtuallistself',
        name: 'virtuallistself',
        component: VirtualListSelf
      },
      {
        path: 'backtotop',
        name: 'backtotop',
        component: BackToTop
      }
    ]
  }
]

export default new Router({
  routes: routes
})
