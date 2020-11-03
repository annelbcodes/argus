<template lang="pug">

  .item-container.relative
    em(@click.stop.prevent="removeItem()")
    li(:class="['bg-licorice', textClass, { 'opacity-50': !$isLength(status) }]")
      strong {{ item }}
      span(:class="['self-center indicator', indicatorClass]")

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
      indicatorClass    : 'bg-',
      textClass         : 'text-',
      indicatorGood     : 'lightforestgreen',
      indicatorBad      : 'nightshadz',
      indicatorUndefined: 'bluebayoux',
      rootClass         : {
        indicatorClass  : 'bg-',
        textClass       : 'text-',
      },
    }
  },
  mounted() {
    this.updateClasses()
  },
  watch: {
    status: function() {
      this.indicatorClass = this.rootClass.indicatorClass
      this.textClass = this.rootClass.textClass
      this.updateClasses()
    }
  },
  methods: {
    updateClasses() {
      switch(this.status) {
        case 0:
          this.textClass      += this.indicatorGood
          this.indicatorClass += this.indicatorGood
          break
        case 1:
          this.textClass      += this.indicatorBad
          this.indicatorClass += this.indicatorBad
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
  height: 18px
  width: 18px
  left: 10px
  transition: all 0.3s ease-in-out
  @apply bg-nightshadz
  @apply rounded-full
  @apply absolute
  @apply z-10
  @apply cursor-pointer
  @apply inline-block
  @apply opacity-0
  @apply invisible

  &:before
    content: "-"
    height: 18px
    width: 18px
    @apply text-white
    @apply absolute
    @apply inset-0
    @apply text-center

.indicator
  height: 10px
  width: 10px
  @apply inline-block
  @apply rounded-full
  @apply ml-auto
</style>