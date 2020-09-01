import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

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

const state = {
    ui: {
        modal: false,
    },
    emails: [
        {
            address: 'empty@status.com',
            status: '',
            id: 1,
        },
        {
            address: 'null@status.com',
            status: undefined,
            id: 2,
        },
        {
            address: 'john@appleseed.com',
            status: 0, //1-positive, 0-negative
            id: 3,
        },
        {
            address: 'whatsorceressisthis@wut.com',
            status: 1,
            id: 4,
        },
    ]
}
const getters = {}

const mutations = {
    [mType.MODAL_TOGGLE](state) {
        state.ui.modal = !state.ui.modal
    },
    [mType.ITEM_ADD](state, payload) {
        state.emails.push(payload)
    },
}

const actions = {
    [mType.ITEM_PROCESS]({ commit }, payload) {
        return new Promise((resolve) => {
            if (payload.type === 'email') {
                let obj = {
                    address: payload.item,
                    status: ''
                }
                commit(mType.ITEM_ADD, obj)
            }
            resolve()
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