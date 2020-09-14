import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

import { mType } from './mutationtypes'
// import { splice } from 'core-js/fn/array'

Vue.use(Vuex)

const ls = new SecureLS({ compression: false })

const psOptions = {
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
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
            return (email.id === payload) ? email.status = 0 : true
        })
    },
    [mType.ITEM_DEL](state, payload) {
        // using ID (index) to remove item
        state.emails.splice(payload, 1)
    },
}

const actions = {
    [mType.ITEM_PROCESS]({ state, commit }, payload) {
        return new Promise((resolve) => {
            if (payload.type === 'email') {
                commit(mType.DB_INCR_UIID)

                let obj = {
                    address: payload.item,
                    status: '',
                    id: state.db.uiid
                }
                commit(mType.ITEM_ADD, obj)
            }
            resolve(state.db)
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