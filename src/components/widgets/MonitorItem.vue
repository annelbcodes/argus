<template>
  <li :class="['bg-licorice', textClass, { 'opacity-50': !$isLength(status) }]">
    <strong>{{ item }}</strong>
    <span :class="['self-center indicator', indicatorClass]"></span>
  </li>
</template>

<script>
export default {
  props: [
    'item',
    'status'
  ],
  data() {
    return {
      indicatorClass    : 'bg-',
      textClass         : 'text-',
      indicatorGood     : 'lightforestgreen',
      indicatorBad      : 'nightshadz',
      indicatorUndefined: 'bluebayoux',
    }
  },
  mounted() {
    this.updateClasses()
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
  }
}
</script>

<style lang="scss">
.list-monitor li strong {
  @apply not-italic;
  @apply inline-block;
  @apply w-10/12;
  @apply font-normal;
}
.indicator {
  height: 10px;
  width: 10px;
  @apply inline-block;
  @apply rounded-full;
  @apply ml-auto;
}
</style>