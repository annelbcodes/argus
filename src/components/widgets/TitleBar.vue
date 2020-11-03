<template lang="pug">

  .titlebar
    h1.text-xs
      slot

</template>

<script>
export default {

}
</script>

<style lang="sass">
.titlebar
  -webkit-user-select: none
  -webkit-app-region: drag
  @apply text-center
  @apply py-3
  @apply text-bleudefrance
  @apply bg-valhalla
  @apply fixed
  @apply z-50
  @apply w-screen
</style>