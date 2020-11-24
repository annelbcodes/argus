<template lang="pug">

  div(:class='"widget-monitor-list-"+_uid')
    ul.list-monitor
      monitor-item(
        v-for="(n,i) in emails"
        :key="n+i"
        :item="n.address"
        :status="n.status"
        :id="i"
      )

</template>

<script>
import MonitorItem  from './MonitorItem'
import { mType }    from '@/store/mutationtypes'
import { mapState } from 'vuex'

export default {
  components: {
    MonitorItem
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit(mType.CD_STOP)
    this.$store.dispatch(mType.CD_INTERVAL_CHECKS) // start interval timer
  },
  computed: {
    ...mapState([
      'emails',
      'cd',
    ]),
  },
  watch: {
    cd: {
      deep: true,
      handler(n) {
        if(n.cdi === 0) {
          console.info('interval ends, checking all emails...')
          this.$store.dispatch(mType.EMAILS_CHECK_ALL)
        }
      }
    }
  },
}
</script>

<style lang="sass">
.list-monitor
  @apply text-xs

  li
    @apply my-2
    @apply p-2
    @apply px-3
    @apply rounded
    @apply break-words
    @apply flex
    @apply w-full
</style>