import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const state = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: '',
    apiURL: 'https://quiet-badlands-45450.herokuapp.com/https://fakeserverapi.herokuapp.com'
}

const mutations = {
    setLoading(state, payload) {
        state.loading = payload
    },
    setErrorMessage(state, payload) {
        state.error = payload
    },
    setUser(state, payload) {
        state.user = payload
    },
    setAccessToken(state, payload) {
        state.token = payload
    },
    setAuthentication(state, payload) {
        state.isAuthenticated = payload
    }
}

const actions = {
    async userLogin({ commit, state }, { email, password }) {
        commit('setLoading', true)
        await axios.post(`${state.apiURL}/login`, {
            email: email,
            password: password
        }).then((res) => {
            // console.log(res.data.user)
            commit('setLoading', false)
            commit('setUser', res.data.user)
            commit('setAccessToken', res.data.accessToken)
            window.localStorage.setItem('userToken', res.data.accessToken)
            window.localStorage.setItem('user', JSON.stringify(res.data.user))
            commit('setAuthentication', true)
            toast.success('Logged in successfully')
            window.location.replace("/")
        }).catch((err) => {
            console.log(err)
            commit('setErrorMessage', err.response.data)
            commit('setLoading', false)
            toast.error(err.response.data)
        })
    },

    // check if already authenticated
    checkAuthentication({ commit }) {
        const token = window.localStorage.getItem('userToken')
        const user = window.localStorage.getItem('user')
        if (token) {
            commit('setAccessToken', token)
            commit('setAuthentication', true)
            commit('setUser', JSON.parse(user))
        } else {
            commit('setAccessToken', null)
            commit('setAuthentication', false)
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}