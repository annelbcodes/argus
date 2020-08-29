<template>
  <div class="monitor-add">
    <a class="btn-add" href="#" @click.stop.prevent="itemAction()">Add &#x002B;</a>
  </div>
</template>

<script>
import {
  ADD_ITEM
}
from '../../store/mutationtypes'

export default {
  props: [
    'type',
    'action'
  ],
  methods: {
    itemAction() {
      console.log('clicked')
      this.$store.commit(ADD_ITEM)
    }
  }
}
</script>

<style lang="scss">
.btn-add {
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
    @apply border-waterloo;
    @apply text-waterloo;
  }
}
</style>