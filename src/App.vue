<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  }
}
</script>

<style>
body, html {
  @apply text-white;
  @apply font-sans;
}
button {
  -webkit-app-region: no-drag;
}
</style>