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
  @apply m-auto
  @apply p-0
  // @apply text-center
  @apply h-10
  @apply text-sm
  @apply fixed
  @apply w-screen
  @apply bg-gradient-to-b
  @apply from-white
  @apply to-gray-100
  @apply shadow-default
  @apply flex
  @apply items-center
  @apply content-center

  h1
    @apply self-center
    @apply m-auto
    @apply text-center
</style>