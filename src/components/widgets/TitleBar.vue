<template lang="pug">
.titlebar
    h1
        slot
    .btn-trigger
        slot(name='btn-trigger')
</template>

<script>
export default {}
</script>

<style lang="sass">
.titlebar
  -webkit-user-select: none
  -webkit-app-region: drag
  @apply p-0
  @apply px-2
  @apply h-10
  @apply z-30
  @apply flex
  @apply text-sm
  @apply relative
  @apply font-bold
  @apply from-white
  @apply to-gray-100
  @apply text-center
  @apply text-midgray
  @apply shadow-default
  @apply bg-gradient-to-b

  h1
    @apply m-auto

  .btn-trigger
    @apply z-50
    @apply top-2
    @apply right-1
    @apply absolute
    @apply cursor-pointer
</style>
