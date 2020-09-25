<template>
  <div :class='"widget-monitor-list-"+_uid'>
    <ul class="list-monitor">
      <monitor-item
        v-for="(n,i) in emails"
        :key="n+i"
        :item="n.address"
        :status="n.status"
        :id="i"
      ></monitor-item>
    </ul>
  </div>
</template>

<script>
import { mType } from '../../store/mutationtypes'
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
  mounted() {
    this.checkAllEmails()
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
          console.log('interval ends, checking again...')
          // this.$store.dispatch(mType.EMAILS_CHECK_ALL) //disabled: options with manual check (refresh all) or auto check (with interval)
        }
      }
    }
  },
  methods: {
    checkAllEmails() {
      this.$store.dispatch(mType.EMAILS_CHECK_ALL)
    }
  },
}
</script>

<style lang="scss">
.list-monitor {
  @apply text-xs;

  li {
    @apply my-2;
    @apply p-2;
    @apply px-3;
    @apply rounded;
    @apply break-words;
    @apply flex;
    // @apply self-stretch;
    @apply w-full;
  }
}
</style>