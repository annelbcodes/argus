<template lang="pug">

  .item-container.relative
    em(@click.stop.prevent="removeItem()")
      svg(xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="#a0aec0")
        path(fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd")
    li(:class="[textClass, { 'opacity-50': !$isLength(status) }]")
      strong {{ item }}
      span(:class='[`self-center indicator`, { "animate-pulse": status === 2 }, indicatorClass]')

</template>

<script>
import { mType } from '@/store/mutationtypes'

export default {
  props: [
    'item',
    'status',
    'id',
  ],
  data() {
    return {
      indicatorClass     : 'bg-',
      textClass          : 'text-',
      indicatorGood      : 'green-500',
      indicatorBad       : 'red-500',
      indicatorUndefined : 'bluebayoux',
      indicatorProcessing: 'energyyellow',
      rootClass          : {
        indicatorClass   : 'bg-',
        textClass        : 'text-',
      },
    }
  },
  mounted() {
    this.updateClasses()
  },
  watch: {
    status: function(n, o) {
      this.indicatorClass = this.rootClass.indicatorClass
      this.textClass      = this.rootClass.textClass
      this.updateClasses(o)
    }
  },
  methods: {
    updateClasses(oldValue) {
      console.log('status changed...',this.status)
      switch(this.status) {
        case 0:
          this.textClass      += this.indicatorGood
          this.indicatorClass += this.indicatorGood
          break
        case 1:
          this.textClass      += this.indicatorBad
          this.indicatorClass += this.indicatorBad
          break
        case 2:
          (oldValue === 1)
            ? this.textClass += this.indicatorBad
            : this.textClass += this.indicatorGood
          this.indicatorClass += this.indicatorProcessing
          break
        default:
          this.textClass      += this.indicatorUndefined
          this.indicatorClass += this.indicatorUndefined
      }
    },
    removeItem() {
      this.$store.commit(mType.ITEM_DEL, this.id)
    },
  }
}
</script>

<style lang="sass">
.list-monitor li strong
  @apply not-italic
  @apply inline-block
  @apply w-10/12
  @apply font-normal
  transition: all 0.2s ease-in-out

.item-container
  @apply flex
  @apply items-center
  @apply w-full

  &:hover strong
    @apply ml-6

  &:hover em
    @apply visible
    @apply opacity-100

.item-container em
  left: 10px
  transition: all 0.3s ease-in-out
  @apply absolute
  @apply z-50
  @apply cursor-pointer
  @apply inline-block
  @apply opacity-0
  @apply invisible
  @apply text-white
  @apply text-xxs
  @apply uppercase
  @apply not-italic
  @apply tracking-wider
  @apply w-auto

.indicator
  height: 10px
  width: 10px
  @apply inline-block
  @apply rounded-full
  @apply ml-auto
</style>