<template lang="pug">

  .titlebar
    h1
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
  @apply p-0
  @apply h-10
  @apply text-sm
  @apply bg-gradient-to-b
  @apply from-white
  @apply to-gray-100
  @apply shadow-default
  @apply text-center
  @apply text-midgray
  @apply font-bold
  @apply flex

  h1
    @apply m-auto
</style>