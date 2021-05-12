<template lang="pug">

  .monitor-btn
    a.btn-action(@click.stop.prevent="itemAction()" v-html="text ? text : ``")

</template>

<script>
import { mType } from '@/store/mutationtypes'
import { mapActions } from 'vuex'

export default {
  props: [
    'type',
    'action',
    'text',
  ],
  data() {
    return {
      btn_text: '',
      obj_action: {
        action: '',
        type: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      addEmail: mType.MODAL_TOGGLE
    }),
    itemAction() {
      this.obj_action = {
        action: 'add',
        type: 'email',
      }
      this.addEmail(this.obj_action)
    }
  }
}
</script>

<style lang="sass">
.btn-action
  @apply w-full
  @apply inline-block
  @apply px-2
  @apply py-0
  // @apply bg-gray-200
  // @apply border
  // @apply border-solid
  // @apply border-gray-300
  // @apply border-dashed
  @apply rounded-sm
  @apply text-center
  @apply text-lg
  transition: all 0.3s ease-in-out

  &:hover
    @apply cursor-pointer
    // @apply border-solid
    // @apply border-rockblue
    @apply text-rockblue
</style>