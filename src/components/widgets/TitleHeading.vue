<template>
  <div class="title-heading">
      <h2><slot></slot></h2>
  </div>
</template>

<script>
export default {

}
</script>

<style>
h2 {
    @apply text-base;
    @apply text-rockblue;
    @apply font-normal;
    @apply py-2;
}
</style>