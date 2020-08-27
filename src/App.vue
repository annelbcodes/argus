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
  @apply select-none;
}
button {
  -webkit-app-region: no-drag;
}
</style>