<template>
  <div class="monitor-add">
    <a class="btn-add" href="#" @click.stop.prevent="">Add &#x002B;</a>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.btn-add {
  @apply w-full;
  @apply inline-block;
  @apply p-2;
  @apply border;
  @apply border-solid;
  @apply border-steelgray;
  @apply border-dashed;
  @apply rounded;
  @apply text-center;
  @apply text-xs;
  transition: all 0.3s ease-in-out;

  &:hover {
    @apply border-solid;
    @apply border-waterloo;
    @apply text-waterloo;
  }
}
</style>