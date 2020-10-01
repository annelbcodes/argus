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
  },
  mounted() {
    window.ipcRenderer.send('requestStoreValue', 'hibpKey')
    window.ipcRenderer.on('replyStoreValue', (e,a) => {
      console.log(a)
    })
  },
}
</script>

<style>
body, html {
  @apply text-white;
  @apply font-sans;
  @apply select-none;
  @apply overflow-y-hidden;
}
button {
  -webkit-app-region: no-drag;
}
</style>