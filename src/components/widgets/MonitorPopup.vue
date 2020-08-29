<template>
  <div class="email-popup">
    <div class="ui-popup">
      <h1 class="text-left py-1">{{ title_text }}</h1>
      <input class="field mt-5" type="email" name="" id="">
      <p class="mt-5 text-right">
        <a class="btn" @click.stop.prevent="closeModal()">{{ btn_cancel }}</a>
        <a class="btn ml-2">{{ btn_text }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mType } from '../../store/mutationtypes'

export default {
  props: ['action'],
  data() {
    return {
      btn_text: '',
      btn_cancel: 'cancel',
      title_text: '',
    }
  },
  mounted() {
    this.checkPopupAction()
  },
  methods: {
    checkPopupAction() {
      if (this.action === 'add') {
        this.title_text = 'Add an item to monitor'
        this.btn_text = 'Add'
      }
    },
    closeModal() {
      this.$store.commit(mType.MODAL_TOGGLE)
    }
  }
}
</script>

<style lang="scss">
.email-popup {
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
  @apply cursor-pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    @apply text-waterloo;
  }
}
</style>