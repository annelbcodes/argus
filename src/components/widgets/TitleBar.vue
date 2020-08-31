<template>
  <div class="titlebar">
    <h1 class="text-xs"><slot></slot></h1>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  @apply text-center;
  @apply py-3;
  @apply text-bleudefrance;
  @apply bg-valhalla;
  @apply fixed;
  @apply z-50;
  @apply w-screen;
}
</style>