<template>
  <li :class="[itemClass, textClass]">
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
      itemClass: 'border-',
      indicatorClass: 'bg-',
      textClass: 'text-'
    }
  },
  mounted() {
    this.updateClasses()
  },
  methods: {
    updateClasses() {
      switch(this.status) {
        case 0:
          this.itemClass      += 'darkgreencopper'
          this.textClass      += 'darkgreencopper'
          this.indicatorClass += 'darkgreencopper'
          break
        case 1:
          this.itemClass      += 'nightshadz'
          this.textClass      += 'nightshadz'
          this.indicatorClass += 'nightshadz'
          break
        default:
          this.itemClass      += 'steelgray'
          this.textClass      += 'steelgray'
          this.indicatorClass += 'steelgray'
      }
    },
  }
}
</script>

<style lang="scss">
strong {
  @apply not-italic;
  @apply inline-block;
  @apply w-10/12;
}
.indicator {
  height: 10px;
  width: 10px;
  @apply inline-block;
  @apply rounded-full;
  @apply ml-auto;
}
</style>