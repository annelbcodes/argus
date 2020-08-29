<template>
  <div class="email-popup-add">
    <div class="ui-popup">
      <h1 class="text-left py-1">Add an item to monitor</h1>
      <input class="field mt-5" type="email" name="" id="">
      <p class="mt-5 text-right"><a href="#" class="btn">Add</a></p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.email-popup-add {
  @apply flex;
  @apply text-center;
  @apply items-center;
  @apply h-screen;
  @apply w-screen;
}
.ui-popup {
  @apply content-center;
  @apply bg-charade;
  @apply rounded;
  @apply w-10/12;
  @apply mx-auto;
  @apply p-5;
  @apply shadow-outline;
}
.field {
  @apply w-full;
  @apply appearance-none;
  @apply rounded-sm;
  @apply p-1;
  @apply px-2;

  &:focus {
    @apply outline-none;
  }
}
.btn {
  @apply inline-block;
  @apply p-1;
  @apply px-5;
  @apply bg-gradient-to-b;
  @apply from-charade;
  @apply to-darkcharade;
  @apply rounded;
  @apply border;
  @apply border-solid;
  @apply border-vulcan;
  @apply text-sm;
  transition: all 0.3s ease-in-out;

  &:hover {
    @apply text-waterloo;
  }
}
</style>