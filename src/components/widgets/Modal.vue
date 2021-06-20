<template lang="pug">
.modal(@keydown.27='escKey()' tabindex='0')
    slot
</template>

<script>
import { mapMutations } from 'vuex'
import { mType } from '@/store/mutationtypes'

export default {
    data() {
        return {}
    },

    methods: {
        ...mapMutations({
            toggleModal: mType.MODAL_TOGGLE,
        }),
        escKey() {
            this.toggleModal()
        },
    },
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
