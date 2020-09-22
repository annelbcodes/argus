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
        cdw: 0,
        interval: 60, // 60s | 1m
    },
    emails: [
        // default { address: '', status: 0, uiid: 0  }
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
        state.cd.cdw += 1
    },
    [mType.CD_SETTIMEOUT](state, payload) {
        state.cd.t = payload
    },
    [mType.CD_STOP](state) {
        clearTimeout(state.cd.t)
        state.cd.cdw = 0
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
    // eslint-disable-next-line
    [mType.API_REQ_HIBP]({ commit }, payload) {
        return new Promise((reject) => {
            breachedAccount(payload.address, hibpSearchOptions)
                .then(data => {
                    let status
                    if (data) {
                        if (payload.status === 1) {
                            console.log('skipping re-writing to db')
                            return false
                        }
                        else { status = Number(true) }
                    }
                    else {
                        if (payload.status === 0) {
                            console.log('skipping re-writing to db')
                            return false
                        }
                        else { status = Number(false) }
                    }
                    let obj = {
                        status: status,
                        address: payload.address,
                        uiid: payload.uiid
                    }
                    console.log('re-writing to db with new updated values...')
                    commit(mType.ITEM_UPD_STATUS, obj)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    [mType.ITEM_UPD_STATUS]({ commit }, payload) {
        setTimeout(() => {
            commit(mType.ITEM_UPD_STATUS, payload)
        }, 2600)
    },
    [mType.CD_INTERVAL_CHECKS]({ commit, dispatch }) {
        commit(mType.CD_INTERVAL_CHECKS)
        dispatch(mType.CD_SETTIMEOUT)
    },
    [mType.CD_SETTIMEOUT]({ state, commit, dispatch }) {
        let timeoutID = setTimeout(() => {
            dispatch(mType.CD_START)
            // commit(mType.CD_STOP) // enable for temp force stop the interval
        }, 1000)
        commit(mType.CD_SETTIMEOUT, timeoutID)
        console.log(state.cd.cdw)
    },
    [mType.CD_START]({ state, commit, dispatch }) {
         (state.cd.cdw < state.cd.interval) ? dispatch(mType.CD_INTERVAL_CHECKS) : commit(mType.CD_STOP)
    },
    [mType.EMAILS_CHECK_ALL]({ state, dispatch }) {
        state.emails.forEach((n) => {
            console.log(n.uiid, n.address, n.status)
            let obj = {
                address: n.address,
                status: n.status,
                uiid: n.uiid,
            }
            dispatch(mType.API_REQ_HIBP, obj)
        })
        dispatch(mType.CD_INTERVAL_CHECKS)
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