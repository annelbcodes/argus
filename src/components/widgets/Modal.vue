<template lang="pug">

  .modal
    slot

</template>

<script>
export default {

}
</script>

<style lang="sass">
.modal
  @apply h-screen
  @apply w-screen
  @apply bg-mirage
  @apply bg-opacity-90
  @apply absolute
  @apply overflow-y-hidden
  @apply z-40
</style>