<template>
  <div class="titlebar">
    <h1 class="font-bold text-xs text-governorbay"><slot></slot></h1>
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
  @apply border-solid;
  @apply border-b;
  @apply border-vulcan;
  @apply text-center;
  @apply py-2;
  @apply bg-gradient-to-b;
  @apply from-charade;
  @apply to-darkcharade;
  @apply fixed;
  @apply z-50;
  @apply w-screen;
}
</style>