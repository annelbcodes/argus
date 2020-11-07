<template lang="pug">

  base-popup(
    :type="type"
    :action="action"
    :title="title"
    :ctabtn="ctabtn"
  )
    template(#content)
      .field-area
        input(
          class="field-text mt-5"
          :type="type"
          :id="id"
          v-model.trim="hkey"
          required
          autofocus
        )
        small(
          v-if="$v.hkey.$error"
          class="field-alert-error"
          v-text="message_alert"
        )
    template(#footer="{ defaults }")
      a.link-secondary.mx-2(@click.stop.prevent="modalToggle()") {{ defaults.cancel }}
      a.btn.ml-2(@click.stop.prevent="validateKey()") {{ ctabtn ? ctabtn : defaults.btn }}

</template>

<script>
import { mType } from '@/store/mutationtypes'
import BasePopup from '@/components/layouts/BasePopup'
import {
  alphaNum,
  required,
  minLength,
} from "vuelidate/lib/validators"

export default {
  components: { BasePopup },
  props: [
    'action',
    'type',
    'title',
    'ctabtn',
    'id',
  ],
  data() {
    return {
      hkey: '',
      message_alert: 'Required key',
      default_texts: {
        cancel: 'cancel',
        btn: 'add API key',
        title: 'add a title about this popup',
      },
    }
  },
  validations: {
    hkey: {
      alphaNum,
      required,
      minLength: minLength(1),
    }
  },
  mounted() {
    document.getElementById(this.id).focus()
  },
  methods: {
    modalToggle() {
      this.$store.commit(mType.MODAL_TOGGLE)
    },
    validateKey() {
      this.$v.$touch()
      if (this.$v.hkey.$error) {
        return false
      }
      else this.saveKey()
    },
    saveKey() {
      this.$store.dispatch(mType.SAVE_KEY, this.hkey)
      this.modalToggle()
    },
  },
}
</script>