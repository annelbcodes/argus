<template>
  <div class="email-popup">
    <div class="ui-popup">
      <h1 class="text-left text-xs py-1">{{ title_text }}</h1>
      <div class="field-area">
        <input
          class="field-text mt-5"
          type="email"
          id="email"
          v-model.lazy.trim="$v.item_name.$model"
          @change="validationFieldTexts()"
          required
          autofocus
        >
        <small
            v-if="$v.item_name.required"
            class="field-alert-error"
            v-text="text_error"
        ></small>
      </div>
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
    email,
    minLength,
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
      text_error: '',
    }
  },
  validations: {
    item_name: {
        email,
        required,
        minLength: minLength(1),
    }
  },
  mounted() {
    this.checkPopupAction()
    document.getElementById('email').focus();
  },
  methods: {
    checkPopupAction() {
      if (this.action === 'add') {
        this.title_text = 'Add an email to monitor'
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
        .then(data => {
          this.closeModal()
          // setTimeout(() => {
          //   console.log(data.uiid)
          //   this.$store.commit(mType.ITEM_UPD_STATUS, data.uiid)
          // }, 2600)
        })
    },
    validateFields() {
      this.$v.$touch()

      if (this.$v.item_name.$invalid) {
        this.validationFieldTexts()
      }
      else {
        this.monitorAction()
      }
    },
    validationFieldTexts() {
      if (this.$v.item_name.$invalid) {
        this.text_error = 'Must be a valid email address'
      }
      else this.text_error = ''
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
.field-area {
  @apply pb-2;
  @apply mb-8;
  @apply relative;
  @apply flex;
  @apply flex-wrap;
}
.field-alert-error {
  @apply text-orange-400;
  @apply text-xs;
  @apply text-left;
  @apply rounded-sm;
  @apply inline-block;
  @apply w-full;
  @apply absolute;
  @apply inset-x-auto;
  bottom: -20px;
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