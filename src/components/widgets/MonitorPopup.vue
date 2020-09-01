<template>
  <div class="email-popup">
    <div class="ui-popup">
      <h1 class="text-left text-sm py-1">{{ title_text }}</h1>
      <input
        class="field-text mt-5"
        type="email"
        v-model.lazy.trim="$v.item_name.$model"
        required
        autofocus
      >
      <small
          v-if="$v.item_name.$error"
          class=""
      >Error</small>
      <p class="mt-5 text-right">
        <a class="link-secondary mx-2" @click.stop.prevent="closeModal()">{{ btn_cancel }}</a>
        <a class="btn ml-2" @click.stop.prevent="validateFields()">{{ btn_text }}</a>
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { mType } from '../../store/mutationtypes'

import {
    required,
    alphaNum,
    email,
} from "vuelidate/lib/validators"

export default {
  props: ['action', 'type'],
  data() {
    return {
      btn_text: '',
      btn_cancel: 'cancel',
      title_text: '',
      item_name: '',
      item_action_obj: {},
    }
  },
  validations: {
    item_name: {
        email,
        required
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
    monitorAction() {
      this.item_action_obj = {
        item: this.item_name,
        type: this.type
      }
      this.$store
        .dispatch(mType.ITEM_PROCESS, this.item_action_obj)
        .then(() => {
          this.closeModal()
        })
    },
    validateFields() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return false
      }
      else {
        this.monitorAction()
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
  @apply bg-licorice;
  @apply rounded;
  @apply w-10/12;
  @apply mx-auto;
  @apply p-5;
  @apply shadow-md;
}
.field-text {
  @apply w-full;
  @apply appearance-none;
  @apply rounded-sm;
  @apply p-1;
  @apply px-2;
  @apply border;
  @apply border-valhalla;
  @apply text-sm;
  @apply text-mirage;
  transition: all 0.3s ease-in-out;

  &:hover {
    @apply shadow-outline;
  }

  &:focus {
    @apply outline-none;
    @apply shadow-outline;
    @apply border-brightbleudefrance;
  }
}
.link-secondary {
  @apply text-xs;
  @apply capitalize;
  @apply cursor-pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    @apply text-white;
  }
}
.btn {
  @apply inline-block;
  @apply p-2;
  @apply px-8;
  @apply rounded;
  @apply text-xs;
  @apply cursor-pointer;
  @apply capitalize;
  @apply text-white;
  @apply bg-bleudefrance;
  transition: all 0.3s ease-in-out;

  &:hover {
    @apply bg-bleudefrance;
  }
}
</style>