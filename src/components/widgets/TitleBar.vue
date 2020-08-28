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
  border-bottom: 1px solid;
  @apply text-center;
  @apply py-2;
  @apply border-steelgray;
  @apply bg-gradient-to-b;
  @apply from-charade;
  @apply to-darkcharade;
}
</style>