<template lang="pug">

  .flex-popup
    .ui-popup
      slot(name="content")

      p.mt-5.text-right
        slot(name="footer")

</template>

<script>
export default {

}
</script>

<style>

</style>