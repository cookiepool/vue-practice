<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body,html,p,div {
    margin: 0;
    padding: 0;
  }
  body,html,#app {
    height: 100%;
  }
</style>
