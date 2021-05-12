<template lang="pug">

  .titlebar
    h1
      slot
    .btn-trigger
      slot(name="btn-trigger")

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
  @apply px-2
  @apply h-10
  @apply text-sm
  @apply relative
  @apply z-40
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

  .btn-trigger
    @apply cursor-pointer
    @apply absolute
    @apply right-1
    @apply top-2
    @apply z-50
</style>