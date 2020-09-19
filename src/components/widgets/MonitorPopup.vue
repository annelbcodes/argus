<template>
  <div class="email-popup">
    <div class="ui-popup">
      <h1 class="text-left text-xs py-1">{{ default_texts.title }}</h1>
      <div class="field-area">
        <input
          class="field-text mt-5"
          type="email"
          id="email"
          v-model.trim="$v.item_name.$model"
          @keyup="onEnterKey($event)"
          required
          autofocus
        >
        <small
            v-if="$v.item_name.required"
            class="field-alert-error"
            v-text="message_alert"
        ></small>
      </div>
      <p class="mt-5 text-right">
        <a class="link-secondary mx-2" @click.stop.prevent="closeModal()">{{ default_texts.cancel }}</a>
        <a class="btn ml-2" @click.stop.prevent="validateFields()">{{ default_texts.btn }}</a>
      </p>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

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
      item_name: '',
      item_action_obj: {
        item: '',
        type: '',
      },
      message_alert: '',
      messages: {
        default: '',
        error_added: 'Email already added',
        error_invalid: 'Must be a valid email address'
      },
      default_texts: {
        cancel: 'cancel',
        btn: 'add',
        title: 'Add an email to monitor',
      },
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
    document.getElementById('email').focus();
  },
  watch: {
    item_name: function() {
      this.item_name = (this.item_name).toLowerCase()
      this.findDuplicates()
    }
  },
  computed: {
    get_duplicates() { return this.$store.getters.item_get(this.item_name) }
  },
  methods: {
    monitorAction() {
      this.item_action_obj.item = (this.item_name).toLowerCase()
      this.item_action_obj.type = this.type

      this.$store.dispatch(mType.ITEM_PROCESS, this.item_action_obj)
      this.closeModal()
    },
    findDuplicates() {
      if(this.get_duplicates.length) {
        this.message_alert = this.messages.error_added
        return false
      } else {
        this.message_alert = this.messages.default
        return true
      }
    },
    validateFields() {
      if(this.findDuplicates()) {
        this.$v.$touch()
      } else {
        return false
      }

      if (this.$v.item_name.$invalid) {
        this.message_alert = this.messages.error_invalid
      }
      else {
        this.message_alert = this.messages.default
        this.monitorAction()
      }
    },
    onEnterKey(e) {
      // if triggered key is Enter
      if(e.key === 'Enter' || e.keyCode === 13) {
        this.validateFields()
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