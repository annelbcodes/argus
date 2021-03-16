<template lang="pug">

  .modal(@keyup.esc="escKey()" tabindex="0" v-focus)
    slot

</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    escKey() {

    }
  }
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