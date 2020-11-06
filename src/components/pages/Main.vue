<template lang="pug">

  .ui
    title-bar EyesOnPwn

    .ui-body
      modal(v-if="modal")
        popup-pref(
          v-if="ui.type === 'pref'"
          type="text"
          action="modify"
          title="Enter your API key"
          ctabtn="Save API key"
          id="pref"
        )
        popup-monitor(
          v-if="ui.type === 'email'"
          type="email"
          id="email"
          action="add"
          title="Add an email address to monitor"
          ctabtn="Add to monitor"
        )
      .ui-content
        monitor-list
        monitor-btn(
          type="email"
          action="add"
        )
      .ui-footer
        .left
          svg(
            v-show="status_checking"
            height="18"
            width="18"
            class="status-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="https://www.w3.org/2000/svg"
          )
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15")
          | {{ text_timeago }}
        .right
          svg(
            @click.stop.prevent="openPref()"
            class="pref-icon"
            height="18"
            width="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          )
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z")

</template>

<script>
import { mapState } from 'vuex'
import { mType }    from '@/store/mutationtypes'
import TitleBar     from '@/components/widgets/TitleBar'
import Modal        from '@/components/widgets/Modal'
import MonitorList  from '@/components/widgets/MonitorList'
import MonitorBtn   from '@/components/widgets/MonitorBtn'
import PopupMonitor from '@/components/widgets/PopupMonitor'
import PopupPref    from '@/components/widgets/PopupPreferences'
import moment       from 'moment'

export default {
  components: {
    TitleBar,
    MonitorList,
    MonitorBtn,
    Modal,
    PopupMonitor,
    PopupPref,
  },
  data() {
    return {
      text_timeago: '',
      status_checking: false,
      obj_action: {
        action: '',
        type: ''
      }
    }
  },
  mounted() {
    this.setInterval()
    window.ipcRenderer.send('REQ_API_STORE')
  },
  computed: {
    ...mapState({
      modal: state => state.ui.modal
    }),
    ...mapState([
      'cd',
      'ui',
    ]),
  },
  watch: {
    cd: {
      deep: true,
      handler() {
        this.setInterval()
      }
    },
  },
  methods: {
    setTimeAgo() {
      this.text_timeago = moment.duration(-(this.cd.interval), 'seconds').humanize(true)
    },
    setInterval() {
      if (this.cd.cdi === this.cd.interval) {
        this.text_timeago = ''
        this.status_checking = true
      }
      else {
        this.setTimeAgo()
        this.status_checking = false
      }
    },
    openPref() {
      this.obj_action = {
        action: 'add',
        type: 'pref',
      }
      this.$store.dispatch(mType.MODAL_TOGGLE, this.obj_action)
    },
  },
}
</script>

<style lang="sass">
.ui-body
  @apply text-rockblue
  @apply bg-valhalla

.ui-content
  @apply p-5
  @apply pt-12
  @apply h-screen
  @apply pb-12
  @apply overflow-y-auto

.ui-footer
  bottom: 0
  @apply p-2
  @apply fixed
  @apply flex
  @apply flex-wrap
  @apply w-full
  @apply text-midgray
  @apply text-xs

  .left, .right
    @apply w-6/12
    @apply text-left

  .right
    @apply text-right

.status-icon
  animate: loading-spinner 2s linear infinite
  @apply inline-block
  @apply text-left

.pref-icon
  @apply text-right
  @apply inline-block

  &:hover
    @apply cursor-pointer

@keyframes loading-spinner
  from
    transform: rotate(360deg)
  to
    transform: rotate(0deg)
</style>