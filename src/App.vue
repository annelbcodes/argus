<template lang="pug">

  #app
    router-view

</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
body, html
  @apply text-white
  @apply font-sans
  @apply select-none
  @apply overflow-y-hidden

button
  -webkit-app-region: no-drag
</style>