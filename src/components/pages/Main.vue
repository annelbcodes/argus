<template lang="pug">

  .ui
    title-bar EyesOnPwn

    .ui-body
      modal(v-if="modal")
        monitor-popup(
          type="email"
          action="add"
        )
      .ui-content
        monitor-list
        monitor-btn(
          type="email"
          action="add"
        )
      .ui-footer
        small.text-midgray
          svg(
            v-show="status_checking"
            height="18"
            width="18"
            class="refresh-status"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="https://www.w3.org/2000/svg"
          )
            path(
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            )
          | {{ text_timeago }}

</template>

<script>
import { mapState } from 'vuex'
import TitleBar     from '../widgets/TitleBar'
import Modal        from '../widgets/Modal'
import MonitorList  from '../widgets/MonitorList'
import MonitorBtn   from '../widgets/MonitorBtn'
import MonitorPopup from '../widgets/MonitorPopup'
import moment       from 'moment'

export default {
  components: {
    TitleBar,
    MonitorList,
    MonitorBtn,
    Modal,
    MonitorPopup
  },
  data() {
    return {
      text_timeago: '',
      status_checking: false,
    }
  },
  mounted() {
    this.set_interval_status()
  },
  computed: {
    ...mapState({
      modal: state => state.ui.modal
    }),
    ...mapState([
      'cd',
    ]),
  },
  watch: {
    cd: {
      deep: true,
      handler() {
        this.set_interval_status()
      }
    },
  },
  methods: {
    set_text_timeago() {
      this.text_timeago = moment.duration(-(this.cd.interval), 'seconds').humanize(true)
    },
    set_interval_status() {
      if (this.cd.cdi === this.cd.interval) {
        this.text_timeago = ''
        this.status_checking = true
      }
      else {
        this.set_text_timeago()
        this.status_checking = false
      }
    },
  },
}
</script>

<style lang="scss">
.ui-body {
  @apply text-rockblue;
  @apply bg-valhalla;
}
.ui-content {
  @apply p-5;
  @apply pt-12;
  @apply h-screen;
  @apply pb-12;
  @apply overflow-y-auto;
}
.ui-footer {
  bottom: 0;
  @apply p-2;
  @apply fixed;
  @apply w-full;
}
.refresh-status {
  animation: loading-spinner 2s linear infinite;
  @apply inline-block;
}
@keyframes loading-spinner {
  from {
    transform: rotate(360deg)
  }
  to {
    transform: rotate(0deg)
  }
}
</style>