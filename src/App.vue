<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {}
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
