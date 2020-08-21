<template>
  <div id="app" class="flex p-5">
    {{ mydata }}
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      mydata: 'YES',
    }
  }
}
</script>

<style>
body, html {
  @apply bg-white;
}
</style>