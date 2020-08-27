<template>
  <div :class='"widget-monitor-list-"+_uid'>
    <ul v-for="(n,i) in emails" :key="n+i" class="list-monitor">
      <li class="border-steelgray">{{ n }} <span class="indicator bg-steelgray"></span></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'emails'
    ])
  }
}
</script>

<style lang="scss">
.list-monitor {
  @apply my-2;
  @apply text-xs;

  li {
    @apply p-4;
    @apply border;
    @apply border-solid;
    @apply rounded;
  }
}
.indicator {
  height: 10px;
  width: 10px;
  @apply mt-1;
  @apply inline-block;
  @apply rounded-full;
  @apply float-right;
}
</style>