import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    emails: [
        'john@appleseed.com',
        'whatsorceressisthis@wut.com'
    ]
}
const getters = {}
const mutations = {}
const actions = {}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations,
    actions,
})