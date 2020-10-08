<template lang="pug">

  popup
    template(#content)
      h1.text-left.text-xs.py-1 {{ title ? title : default_texts.title }}

</template>

<script>
import Popup from '@/components/layouts/Popup'

export default {
  components: { Popup },
  props: [
    'title'
  ],
  data() {
    return {
      default_texts: {
        cancel: 'cancel',
        btn: 'add API key',
        title: 'Add a title about this popup',
      },
    }
  }
}
</script>

<style>

</style>