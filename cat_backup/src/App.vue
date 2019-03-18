<template>
<div id="app">
      <keep-alive>
        <!-- <transition :name="transitionName"> -->
            <!-- <navigation> -->
              <router-view v-if="$route.meta.keepAlive">
                  <!-- 这里是会被缓存的视图组件，比如 Home！ -->
              </router-view>
            <!-- </navigation> -->
        <!-- </transition> -->
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不会被缓存的视图组件，比如 Home！ -->
      </router-view>

  <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      <!-- <transition :name="transitionName">
        <navigation>
          <router-view v-if="!$route.meta.keepAlive">
              
          </router-view>
        </navigation>
      </transition> -->
</div>
</template>

<script>
export default {

}
</script>

<style>
html,body,#app{
  width: 100%;
  min-height: 100%;
  height: 100%;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
