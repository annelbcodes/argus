<template>
  <div class="ui">
    <title-bar>EyesOnPwn</title-bar>
    <div class="ui-body">
      <modal v-if="modal">
        <monitor-popup
          type="email"
          action="add"
        ></monitor-popup>
      </modal>

      <div class="ui-content">
        <monitor-list></monitor-list>

        <monitor-btn
          type="email"
          action="add"
        >
        </monitor-btn>

      </div>

      <div class="ui-footer">
        <small class="text-midgray">{{ text_timeago }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TitleBar from '../widgets/TitleBar'
import Modal from '../widgets/Modal'
import MonitorList from '../widgets/MonitorList'
import MonitorBtn from '../widgets/MonitorBtn'
import MonitorPopup from '../widgets/MonitorPopup'
import moment from 'moment'

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
      text_timeago: ''
    }
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
      handler(n) {
        (n.cdi !== 0) ? this.set_text_timeago() : this.text_timeago = 'Checking...'
      }
    },
  },
  methods: {
    set_text_timeago() {
      this.text_timeago = moment.duration(-(this.cd.interval), 'seconds').humanize(true)
    }
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
</style>