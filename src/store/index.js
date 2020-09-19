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
    emails: [
        {
            address: 'empty@status.com',
            status: '',
        },
        {
            address: 'null@status.com',
            status: undefined,
        },
        {
            address: 'good@status.com',
            status: 0, //1-positive, 0-negative
        },
        {
            address: 'bad@status.com',
            status: 1,
        },
    ]
}
const getters = {
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
            return (email.id === payload.uiid) ? email.status = payload.status : true
        })
    },
    [mType.ITEM_DEL](state, payload) {
        // using ID (index) to remove item
        state.emails.splice(payload, 1)
    },
}

const actions = {
    [mType.ITEM_PROCESS]({ state, commit, dispatch }, payload) {
        return new Promise(resolve => {
            if (payload.type === 'email') {
                commit(mType.DB_INCR_UIID)

                let obj = {
                    address: payload.item,
                    status: '',
                    id: state.db.uiid
                }
                commit(mType.ITEM_ADD, obj)
            }
            dispatch(mType.API_REQ_HIBP, payload.item)
                .then(data => {
                    let dataReply = {
                        uiid: state.db.uiid,
                        status: data
                    }
                    setTimeout(() => {
                        commit(mType.ITEM_UPD_STATUS, dataReply)
                    }, 2600)
                    resolve()
                })
        })
    },
    // eslint-disable-next-line
    [mType.API_REQ_HIBP]({}, payload) {
        return new Promise((resolve, reject) => {
            breachedAccount(payload, hibpSearchOptions)
                .then(data => {
                    let status = (data) ? 1 : 0
                    resolve(status)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default new Vuex.Store({
    plugins: [createPersistedState(psOptions)],
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations,
    actions,
})