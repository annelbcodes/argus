<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.modal {
  @apply h-screen;
  @apply w-screen;
  @apply bg-vulcan;
  @apply bg-opacity-90;
  @apply absolute;
  @apply overflow-y-hidden;
}
</style>