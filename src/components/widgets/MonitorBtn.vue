<template lang="pug">

  .monitor-btn
    a.btn-action.cursor-pointer(@click.stop.prevent="itemAction()" v-html="this.btn_text")

</template>

<script>
import { mType } from '@/store/mutationtypes'
import { mapActions } from 'vuex'

export default {
  props: [
    'type',
    'action'
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
    this.checkAction()
  },
  methods: {
    ...mapActions({
      addEmail: mType.MODAL_TOGGLE
    }),
    checkAction() {
      if (this.action === 'add') {
        this.btn_text = 'Add &#x002B;'
      }
    },
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
  @apply p-2
  @apply border
  @apply border-solid
  @apply border-steelgray
  @apply border-dashed
  @apply rounded
  @apply text-center
  @apply text-xs
  transition: all 0.3s ease-in-out

  &:hover
    @apply border-solid
    @apply border-rockblue
    @apply text-rockblue
</style>