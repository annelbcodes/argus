<template>
  <div class="monitor-action">
    <a class="btn-action cursor-pointer" @click.stop.prevent="itemAction()" v-html="this.btn_text"></a>
  </div>
</template>

<script>
import { mType } from '../../store/mutationtypes'

export default {
  props: [
    'type',
    'action'
  ],
  data() {
    return {
      btn_text: ''
    }
  },
  mounted() {
    this.checkAction()
  },
  methods: {
    checkAction() {
      if (this.action === 'add') {
        this.btn_text = 'Add &#x002B;'
      }
    },
    itemAction() {
      if (this.action === 'add') {
        this.$store.commit(mType.MODAL_TOGGLE)
      }
    }
  }
}
</script>

<style lang="scss">
.btn-action {
  @apply w-full;
  @apply inline-block;
  @apply p-2;
  @apply border;
  @apply border-solid;
  @apply border-steelgray;
  @apply border-dashed;
  @apply rounded;
  @apply text-center;
  @apply text-xs;
  transition: all 0.3s ease-in-out;

  &:hover {
    @apply border-solid;
    @apply border-rockblue;
    @apply text-rockblue;
  }
}
</style>