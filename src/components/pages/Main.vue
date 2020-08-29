<template>
  <div class="ui">
    <title-bar>EyesOnPwn</title-bar>
    <div class="ui-body">
      <modal v-if="modal">
        <monitor-popup
          action="add"
        ></monitor-popup>
      </modal>

      <div class="ui-content">
        <title-heading>Emails</title-heading>
        <monitor-list></monitor-list>

        <monitor-action
          type="email"
          action="add"
        >
        </monitor-action>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TitleBar from '../widgets/TitleBar'
import TitleHeading from '../widgets/TitleHeading'
import Modal from '../widgets/Modal'
import MonitorList from '../widgets/MonitorList'
import MonitorAction from '../widgets/MonitorAction'
import MonitorPopup from '../widgets/MonitorPopup'

export default {
  components: {
    TitleBar,
    TitleHeading,
    MonitorList,
    MonitorAction,
    Modal,
    MonitorPopup
  },
  computed: {
    ...mapState({
      modal: state => state.ui.modal
    })
  },
}
</script>

<style lang="scss">
.ui-body {
  @apply text-midgray;
  @apply overflow-y-auto;
}
.ui-content {
  @apply p-5;
  @apply pt-12;
  @apply h-screen;
}
</style>