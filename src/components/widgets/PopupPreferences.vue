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
          type="text"
          id="pref"
          v-model.trim="item_name"
          required
          autofocus
        )
    template(#footer="{ defaults }")
      a.link-secondary.mx-2(@click.stop.prevent="modalToggle()") {{ defaults.cancel }}
      a.btn.ml-2(@click.stop.prevent="") {{ ctabtn ? ctabtn : defaults.btn }}

</template>

<script>
import { mType } from '@/store/mutationtypes'
import BasePopup from '@/components/layouts/BasePopup'

export default {
  components: { BasePopup },
  props: [
    'action',
    'type',
    'title',
    'ctabtn',
  ],
  data() {
    return {
      item_name: '',
      item_action_obj: {
        item: '',
        type: '',
      },
      default_texts: {
        cancel: 'cancel',
        btn: 'add API key',
        title: 'add a title about this popup',
      },
    }
  },
  mounted() {
    document.getElementById('pref').focus()
  },
  methods: {
    modalToggle() {
      this.$store.commit(mType.MODAL_TOGGLE)
    }
  },
}
</script>

<style>

</style>