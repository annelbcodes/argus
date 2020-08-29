<template>
  <div class="ui">
    <title-bar>EyesOnPwn</title-bar>
    <div class="ui-body">
      <modal>
        <monitor-popup-add></monitor-popup-add>
      </modal>

      <div class="ui-content">
        <title-heading>Emails</title-heading>
        <monitor-list></monitor-list>
        <monitor-add type="email"></monitor-add>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '../widgets/TitleBar'
import TitleHeading from '../widgets/TitleHeading'
import Modal from '../widgets/Modal'
import MonitorList from '../widgets/MonitorList'
import MonitorAdd from '../widgets/MonitorAdd'
import MonitorPopupAdd from '../widgets/MonitorPopupAdd'

export default {
  components: {
    TitleBar,
    TitleHeading,
    MonitorList,
    MonitorAdd,
    Modal,
    MonitorPopupAdd
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