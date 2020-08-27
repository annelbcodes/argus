<template>
  <div :class='"widget-monitor-list-"+_uid'>
    <ul class="list-monitor">
      <monitor-item
        v-for="(n,i) in emails"
        :key="n+i"
        :item="n.address"
        :status="n.status"
      ></monitor-item>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MonitorItem from './MonitorItem'

export default {
  components: {
    MonitorItem
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'emails'
    ]),
  }
}
</script>

<style lang="scss">
.list-monitor {
  @apply text-xs;

  li {
    @apply my-2;
    @apply p-2;
    @apply border;
    @apply border-solid;
    @apply rounded;
    @apply font-bold;
    @apply break-words;
    @apply flex;
    @apply self-stretch;
  }
}
</style>