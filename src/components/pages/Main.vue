<template>
  <div class="ui">
    <title-bar>EyesOnPwn</title-bar>

    <div class="ui-body">
      <title-heading>Emails</title-heading>

      <monitor-list></monitor-list>

      <monitor-add></monitor-add>
    </div>
  </div>
</template>

<script>
import TitleBar from '../widgets/TitleBar'
import TitleHeading from '../widgets/TitleHeading'
import MonitorList from '../widgets/MonitorList'
import MonitorAdd from '../widgets/MonitorAdd'

export default {
  components: {
    TitleBar,
    TitleHeading,
    MonitorList,
    MonitorAdd
  },
}
</script>

<style lang="scss">
.ui-body {
  @apply p-5;
  @apply text-midgray;
}
</style>