import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import { breachedAccount } from 'hibp'

import { mType } from './mutationtypes'

Vue.use(Vuex)

const ls = new SecureLS({ compression: false })

const psOptions = {
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
}

const hibpSearchOptions = {
    apiKey: process.env.VUE_APP_APIHIBP,
    userAgent: 'eyesonpwn-0.0.1',
    truncate: true,
}

const state = {
    ui: {
        modal: false,
    },
    db: {
        uiid: 100000,
    },
    cd: {
        t: 0,
        cdw: 0, // countdown to 0
        cdi: 20, // countdown interval in s
        cde: 4000, // countdown each (email) in ms
        interval: 20, // static: 60s|1m - change this and cdi if modifying interval checks
    },
    emails: [
        // { address: '', status: 0, uiid: 0  }
    ]
}
const getters = {
    item_get: (state) => (payload) => {
        return state.emails.filter(email => {
            return (email.address === payload) ? true : false
        })
    }
}

const mutations = {
    [mType.MODAL_TOGGLE](state) {
        state.ui.modal = !state.ui.modal
    },
    [mType.ITEM_ADD](state, payload) {
        state.emails.push(payload)
    },
    [mType.DB_INCR_UIID](state) {
        state.db.uiid += 1
    },
    [mType.ITEM_UPD_STATUS](state, payload) {
        // using UIID (unique assigned id) to filter email and update status
        return state.emails.filter(email => {
            return (email.uiid === payload.uiid) ? email.status = payload.status : true
        })
    },
    [mType.ITEM_DEL](state, payload) {
        // using ID (index) to remove item
        state.emails.splice(payload, 1)
    },
    [mType.CD_INTERVAL_CHECKS](state) {
        state.cd.cdi -= 1
    },
    [mType.CD_SETTIMEOUT](state, payload) {
        state.cd.t = payload
    },
    [mType.CD_STOP](state) {
        clearTimeout(state.cd.t)
        state.cd.cdi = state.cd.interval
    },
}

const actions = {
    [mType.ITEM_PROCESS]({ state, commit, dispatch }, payload) {
        return new Promise(() => {
            let obj
            if (payload.type === 'email') {
                commit(mType.DB_INCR_UIID)

                obj = {
                    address: payload.item,
                    status: '',
                    uiid: state.db.uiid
                }
                commit(mType.ITEM_ADD, obj)
            }
            dispatch(mType.API_REQ_HIBP, obj)
        })
    },
    // Request API
    // eslint-disable-next-line
    [mType.API_REQ_HIBP]({ commit }, payload) {
        return new Promise((resolve, reject) => {
            breachedAccount(payload.address, hibpSearchOptions)
            .then(data => {
                let status
                if (data) {
                    if (payload.status === 1) {
                        console.log('skipping re-writing to state')
                        resolve()
                        return false
                    }
                    else { status = Number(true) }
                }
                else {
                    if (payload.status === 0) {
                        console.log('skipping re-writing to state')
                        resolve()
                        return false
                    }
                    else { status = Number(false) }
                }
                let obj = {
                    status: status,
                    address: payload.address,
                    uiid: payload.uiid
                }
                console.log('re-writing to state, with new updated values...')
                commit(mType.ITEM_UPD_STATUS, obj)
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    // Primary event of adding an email; updating the status of the recent addition
    [mType.ITEM_UPD_STATUS]({ commit }, payload) {
        setTimeout(() => {
            commit(mType.ITEM_UPD_STATUS, payload)
        }, 2600)
    },

    // Countdown before checking _all_ emails
    [mType.CD_INTERVAL_CHECKS]({ commit, dispatch }) {
        dispatch(mType.CD_SETTIMEOUT)
        commit(mType.CD_INTERVAL_CHECKS)
    },
    [mType.CD_SETTIMEOUT]({ commit, dispatch }) {
        let timeoutID = setTimeout(() => {
            dispatch(mType.CD_START)
        }, 1000)
        commit(mType.CD_SETTIMEOUT, timeoutID)
    },
    [mType.CD_START]({ state, commit, dispatch }) {
        (state.cd.cdi !== state.cd.cdw) ? dispatch(mType.CD_INTERVAL_CHECKS) : commit(mType.CD_STOP)
        console.log(state.cd.cdi)
    },

    /**
     * ASYNC IN FOREACH
     * Timeout in between checking of each emails
     * Default: 4s
     */
    [mType.CD_EA_EMAIL]({ state }) {
        return new Promise(r => { setTimeout(r, state.cd.cde) })
    },
    async [mType.REQUEST_EA_EMAIL]({ state, commit, dispatch }) {
        if (state.emails.length) {
            for (let i = 0; i < state.emails.length; i++) {
                let obj = {
                    address: state.emails[i].address,
                    status: state.emails[i].status,
                    uiid: state.emails[i].uiid
                }
                await dispatch(mType.API_REQ_HIBP, obj)
                await dispatch(mType.CD_EA_EMAIL)
            }
            console.log('DONE')
            dispatch(mType.CD_INTERVAL_CHECKS)
        }
        else {
            commit(mType.CD_STOP)
            dispatch(mType.CD_INTERVAL_CHECKS)
        }
    },
    async [mType.EMAILS_CHECK_ALL]({ dispatch }) {
        await dispatch(mType.REQUEST_EA_EMAIL)
    },
}

export default new Vuex.Store({
    plugins: [createPersistedState(psOptions)],
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations,
    actions,
})