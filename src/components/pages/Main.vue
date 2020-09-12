<template>
  <div class="ui">
    <title-bar>Monitor Emails</title-bar>
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

export default {
  components: {
    TitleBar,
    MonitorList,
    MonitorBtn,
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
</style>