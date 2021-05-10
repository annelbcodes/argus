<template lang="pug">

  .ui(@keydown.ctrl.65="addKey()" tabindex="0")

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
        .sidebar
        .content
          title-bar Emails

        //- monitor-list
        //- monitor-btn(
        //-   type="email"
        //-   action="add"
        //- )
      .ui-footer
        .left
          svg(
            v-show="status_checking"
            height="18"
            width="18"
            class="status-icon animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="https://www.w3.org/2000/svg"
          )
            circle(class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4")
            path(class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")
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
import { mapState, mapActions } from 'vuex'
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
    ...mapActions({
      toggleModal: mType.MODAL_TOGGLE
    }),

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
      this.toggleModal(this.obj_action)
    },

    addKey() {
      this.obj_action = {
        action: 'add',
        type: 'email'
      }
      this.toggleModal(this.obj_action)
    },
  },
}
</script>

<style lang="sass">
:focus
  outline: none

.ui-body
  @apply text-rockblue
  @apply bg-gradient-to-b
  @apply from-valhalla
  @apply to-mirage

.ui-content
  // @apply p-5
  // @apply pt-10
  // @apply h-screen
  // @apply pb-12
  @apply overflow-y-auto
  @apply flex

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

.sidebar
  @apply w-3/12
  @apply bg-transparent
  @apply flex-none
  @apply h-screen

.content
  @apply flex-auto
  @apply h-screen
  @apply bg-gradient-to-b
  @apply from-white
  @apply to-gray-100
</style>