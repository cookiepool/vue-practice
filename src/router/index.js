import Vue from 'vue';
import Router from 'vue-router';

import App from '../App';
import Home from '../page/Home.vue';

const Communication = r => require.ensure([], () => r(require('@/page/Communication.vue')),'communication');
const DialogBox = r => require.ensure([], () => r(require('@/page/DialogBox.vue')),'dialogbox');
const LazyLoad = r => require.ensure([], () => r(require('@/page/LazyLoad')),'lazyload');
const SlotPage = r => require.ensure([], () => r(require('../page/SlotPage.vue')),'slotpage');

const ResponseNull = r => require.ensure([], () => r(require('../page/ResponseNull.vue')),'responsenull');
const ModulesTest = r => require.ensure([], () => r(require('../page/ModulesTest.vue')),'modulestest');
const MixinsPage = r => require.ensure([], () => r(require('../page/MixinsPages.vue')),'mixinpage');
const TestiOSPop = r => require.ensure([], () => r(require('../page/TestiOSInput.vue')),'testpop');

const CryptoTest = r => require.ensure([], () => r(require('../page/CryptoTest.vue')),'cryptotest');
const VirtualList = r => require.ensure([], () => r(require('../page/VirtualListTest.vue')),'virtuallist');
const VirtualListSelf = r => require.ensure([], () => r(require('../page/VirtualListSelf.vue')),'virtuallistself');
const BackToTop = r => require.ensure([], () => r(require('../page/BackToTop.vue')),'backtotop');

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
