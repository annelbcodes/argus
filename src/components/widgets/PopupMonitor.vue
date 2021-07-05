<template lang="pug">
base-popup(:type='type' :action='action' :title='title')
    template(#content)
        .field-area(v-if='hasInput')
            input.field-text.mt-5(
                :type='type'
                :id='id'
                v-model.trim='$v.item_name.$model'
                @keyup.enter='onEnterKey()'
                @keyup.27='toggleModal()'
                required
                autofocus
            )
            small.field-alert-error(
                v-if='$v.item_name.required'
                v-text='message_alert'
            )
    template(#footer='{ defaults }')
        a.link-secondary.mx-2(@click.stop.prevent='toggleModal()') {{ defaults.cancel }}
        a.btn.ml-2(@click.stop.prevent='validateFields()') {{ ctabtn ? ctabtn : defaults.btn }}
</template>

<script>
import BasePopup from '@/components/layouts/BasePopup'
import { mType } from '@/store/mutationtypes'
import { mapMutations } from 'vuex'

import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
    components: { BasePopup },
    props: ['action', 'type', 'title', 'ctabtn', 'id', 'has-input'],
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
                error_invalid: 'Must be a valid email address',
            },
        }
    },
    validations: {
        item_name: {
            email,
            required,
            minLength: minLength(1),
        },
    },
    mounted() {
        if (this.hasInput) document.getElementById(this.id).focus()
    },
    watch: {
        item_name: function () {
            this.item_name = this.item_name.toLowerCase()
            this.findDuplicates()
        },
    },
    computed: {
        get_duplicates() {
            return this.$store.getters.item_get(this.item_name)
        },
    },
    methods: {
        ...mapMutations({
            toggleModal: mType.MODAL_TOGGLE,
        }),

        monitorAction() {
            this.item_action_obj.item = this.item_name.toLowerCase()
            this.item_action_obj.type = this.type

            this.$store.dispatch(mType.ITEM_PROCESS, this.item_action_obj)
            this.toggleModal()
        },
        findDuplicates() {
            if (this.get_duplicates.length) {
                this.message_alert = this.messages.error_added
                return false
            } else {
                this.message_alert = this.messages.default
                return true
            }
        },
        validateFields() {
            if (this.findDuplicates()) {
                this.$v.$touch()
            } else {
                return false
            }

            if (this.$v.item_name.$invalid) {
                this.message_alert = this.messages.error_invalid
            } else {
                this.message_alert = this.messages.default
                this.monitorAction()
            }
        },
        onEnterKey() {
            this.validateFields()
        },
    },
}
</script>

<style lang="sass">
.flex-popup
    @apply flex
    @apply text-center
    @apply items-center
    @apply h-screen
    @apply w-screen

.ui-popup
    @apply content-center
    @apply bg-licorice
    @apply rounded
    @apply w-10/12
    @apply mx-auto
    @apply p-5
    @apply shadow-md

.field-area
    @apply pb-2
    @apply mb-8
    @apply relative
    @apply flex
    @apply flex-wrap
    @apply w-full

.field-alert-error
    bottom: -20px
    @apply text-orange-400
    @apply text-xs
    @apply text-left
    @apply rounded-sm
    @apply inline-block
    @apply w-full
    @apply absolute
    @apply inset-x-auto

.field-text
    transition: all 0.3s ease-in-out
    @apply w-full
    @apply appearance-none
    @apply rounded-sm
    @apply p-1
    @apply px-2
    @apply border
    @apply border-valhalla
    @apply text-sm
    @apply text-mirage

    &:hover
        @apply shadow-outline

    &:focus
        @apply outline-none
        @apply shadow-outline
        @apply border-brightbleudefrance

.link-secondary
    transition: all 0.3s ease-in-out
    @apply text-xs
    @apply capitalize
    @apply cursor-pointer

    &:hover
        @apply text-white

.btn
    transition: all 0.3s ease-in-out
    @apply inline-block
    @apply p-2
    @apply px-8
    @apply rounded
    @apply text-xs
    @apply cursor-pointer
    @apply capitalize
    @apply text-white
    @apply bg-bleudefrance

    &:hover
        @apply bg-bleudefrance
</style>
