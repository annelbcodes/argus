<template lang="pug">
.flex-popup
    .ui-popup
        h1.text-left.text-xs.py-1 {{ title ? title : defaults.title }}
        slot(name='content')

        p.mt-5.text-right
            slot(name='footer' :defaults='defaults')
</template>

<script>
export default {
    props: ['type', 'action', 'title'],
    data() {
        return {
            defaults: {
                cancel: 'Cancel',
                title: 'Default title',
                btn: 'Add',
            },
        }
    },
    methods: {},
}
</script>
