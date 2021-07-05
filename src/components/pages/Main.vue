<template lang="pug">
.ui(@keydown.ctrl.65='addKey()' tabindex='0')
    .ui-body
        modal(v-if='modal')
            popup-pref#pref(
                v-if='ui.type === "pref"'
                type='text'
                action='modify'
                title='Enter your API key'
                ctabtn='Save API key'
            )
            popup-monitor#email(
                v-if='ui.type === "email"'
                type='email'
                action='add'
                title='Add an email address to monitor'
                ctabtn='Add to monitor'
                has-input
            )
            popup-monitor#email-remove(
                v-if='ui.type === `email`'
                type='email'
                action='remove'
                title='You are about to remove the email from the list'
                ctabtn='Yes, remove the email address'
            )
        .ui-content
            .sidebar
                .ui-footer
                    svg.status-icon.animate-spin(
                        v-show='status_checking'
                        height='18'
                        width='18'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='https://www.w3.org/2000/svg'
                    )
                        circle.opacity-25(
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            stroke-width='4'
                        )
                        path.opacity-75(
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        )
                    | {{ text_timeago }}
            .content
                title-bar
                    | Argus
                    template(#btn-trigger)
                        monitor-btn(type='email' action='add' text='+')
                monitor-list
                .ui-footer
                    .right
                        svg.pref-icon(
                            @click.stop.prevent='openPref()'
                            height='18'
                            width='18'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        )
                            path(
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                            )
                            path(
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            )
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import { mType } from '@/store/mutationtypes'
import Modal from '@/components/widgets/Modal'
import TitleBar from '@/components/widgets/TitleBar'
import MonitorBtn from '@/components/widgets/MonitorBtn'
import MonitorList from '@/components/widgets/MonitorList'
import PopupMonitor from '@/components/widgets/PopupMonitor'
import PopupPref from '@/components/widgets/PopupPreferences'

export default {
    components: {
        Modal,
        TitleBar,
        PopupPref,
        MonitorBtn,
        MonitorList,
        PopupMonitor,
    },
    data() {
        return {
            text_timeago: '',
            status_checking: false,
            obj_action: {
                action: '',
                type: '',
            },
        }
    },
    mounted() {
        this.setInterval()
        window.ipcRenderer.send('REQ_API_STORE')
    },
    computed: {
        ...mapState({
            modal: (state) => state.ui.modal,
        }),
        ...mapState(['cd', 'ui']),
    },
    watch: {
        cd: {
            deep: true,
            handler() {
                this.setInterval()
            },
        },
    },
    methods: {
        ...mapActions({
            toggleModal: mType.MODAL_TOGGLE,
        }),

        setTimeAgo() {
            moment.updateLocale('en', {
                relativeTime: {
                    ss: this.cd.cdi + 's',
                },
            })
            // moment.relativeTimeThreshold('ss', 3)
            let timeago = this.cd.interval - this.cd.cdi

            switch (true) {
                case this.cd.interval < 60:
                    this.text_timeago = timeago + 's ago'
                    break
                case this.cd.interval >= 60:
                    this.text_timeago = moment
                        .duration(-this.cd.interval, 'seconds')
                        .humanize(true)
                    break
            }
        },

        setInterval() {
            if (this.cd.cdi === this.cd.interval) {
                this.text_timeago = ''
                this.status_checking = true
            } else {
                this.setTimeAgo()
                this.status_checking = false
            }
        },

        pauseIntervalChecks() {},

        openPref() {
            this.obj_action = {
                action: 'add',
                type: 'pref',
            }
            this.toggleModal(this.obj_action)
        },

        addKey() {
            this.obj_action = {
                action: 'add',
                type: 'email',
            }
            this.toggleModal(this.obj_action)
        },
    },
}
</script>

<style lang="sass">
:focus
    outline: none

.ui-body
    @apply text-rockblue
    @apply bg-gradient-to-b
    @apply from-valhalla
    @apply to-mirage

.ui-content
    // @apply p-5
    // @apply pt-10
    // @apply h-screen
    // @apply pb-12
    @apply overflow-y-auto
    @apply flex

.ui-footer
    bottom: 0
    @apply p-2
    @apply fixed
    @apply w-full
    @apply text-xs
    @apply text-midgray

    .left, .right
        @apply w-6/12
        @apply text-left

    .right
        @apply text-right

.status-icon
    animate: loading-spinner 2s linear infinite
    @apply text-left
    @apply inline-block

.pref-icon
    @apply text-right
    @apply inline-block

    &:hover
        @apply cursor-pointer

@keyframes loading-spinner
    from
        transform: rotate(360deg)
    to
        transform: rotate(0deg)

.sidebar
    @apply w-3/12
    @apply h-screen
    @apply flex-none
    @apply bg-transparent

.content
    @apply w-9/12
    @apply h-screen
    @apply flex-auto
    @apply from-white
    @apply to-gray-100
    @apply bg-gradient-to-b
</style>
