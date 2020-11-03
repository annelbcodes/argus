<template lang="pug">

  .flex-popup
    base-popup(
      title="Enter your HIBP API key"
    )
      template(#content)
        .field-area
          input(
            class="field-text mt-5"
            type="text"
            id="pref"
            v-model.trim="obj_payload.hkey"
            required
            autofocus
          )
          small(
            v-if="$v.obj_payload.required"
            class="field-alert-error"
            v-text="message_alert"
          )
      template(#footer="{ defaults }")
          a.link-secondary.mx-2(@click.stop.prevent="closePopup()") {{ defaults.cancel }}
          a.btn.ml-2(@click.stop.prevent="saveHkey()") Save

</template>

<script>
import BasePopup from '@/components/layouts/BasePopup'
import {
  alphaNum,
  required,
  minLength,
} from "vuelidate/lib/validators"

export default {
  components: { BasePopup },
  data() {
    return {
      obj_payload: {},
      message_alert: 'Required key'
    }
  },
  validations: {
    obj_payload: {
        hkey: {
          alphaNum,
          required,
          minLength: minLength(1),
        }
    }
  },
  mounted() {
    document.getElementById('pref').focus()
  },
  watch: {
    hibp: function(n) {
      (n) ? this.obj_payload.hkey = n : this.obj_payload = ''
    },
  },
  methods: {
    closePopup() {
      window.ipcRenderer.send('POPUP_CLOSE')
    },
    saveHkey() {
      this.$v.$touch()

      if(this.obj_payload.hkey) {
        console.log(this.obj_payload)
      }
      else return false
    }
  },
}
</script>