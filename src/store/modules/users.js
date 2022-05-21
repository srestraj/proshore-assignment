import axios from 'axios'
import _ from 'lodash'
import { useToast } from 'vue-toastification'

const toast = useToast()

const accessToken = window.localStorage.getItem('userToken')
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

const state = {
    userList: [],
    loading: false,
    apiURL: 'https://quiet-badlands-45450.herokuapp.com/https://fakeserverapi.herokuapp.com',
    successMessage: '',
    managers: [],
    error: '',
    singleUserData: {},
}

const mutations = {
    setLoading(state, payload) {
        state.loading = payload
    },
    storeUsers(state, payload) {
        state.userList = payload
        state.managers = _.filter(payload, { 'role': 'manager' })
    },
    sortByName(state, payload) {
        state.userList = _.orderBy(state.userList, ['name'], [payload])
    },
    sortByEmail(state, payload) {
        state.userList = _.orderBy(state.userList, ['email'], [payload])
    },
    sortByRole(state, payload) {
        state.userList = _.orderBy(state.userList, ['role'], [payload])
    },
    sortByAddress(state, payload) {
        state.userList = _.orderBy(state.userList, ['address'], [payload])
    },
    sortByDate(state, payload) {
        state.userList = _.orderBy(state.userList, ['joining_date'], [payload])
    },
    sortByDept(state, payload) {
        state.userList = _.orderBy(state.userList, ['department_id'], [payload])
    },
    setMessage(state, payload) {
        state.successMessage = payload
    },
    storeSingleUserData(state, payload) {
        state.singleUserData = Object.assign({}, state.singleUserData, payload)
    }
}

const actions = {
    async getUsers({ commit, state }, payload) {
        commit('setLoading', true)
        await axios.get(`${state.apiURL}/users`, {
            headers: {
                Authorization: `Bearer ${payload}`
            }
        }).then((res) => {
            // console.log(res.data)
            commit('storeUsers', res.data)
            commit('setLoading', false)
        }).catch((err) => {
            console.log(err.response.status)
            if(err.response.status === 401) {
                const token = window.localStorage.removeItem('userToken')
                const user = window.localStorage.removeItem('user')
                window.location.assign("/login")
            }
            commit('setLoading', false)
        })
    },

    // add user
    async addUser({ commit, state, dispatch }, { name, email, password, address, department, manager, role, joiningDate }) {
        commit('setLoading', true)
        const token = window.localStorage.getItem('userToken')
        await axios.post(`${state.apiURL}/users/register`, {
            name: name,
            email: email,
            password: password,
            address: address,
            department_id: department,
            manager_id: manager,
            role: role,
            joining_date: joiningDate
        }).then((res) => {
            // console.log(res)
            commit('setLoading', false)
            commit('setMessage', res.data.statusText)
            toast.success('User added successfully')
            dispatch('getUsers', token)
            const modal = document.querySelector('.modal')
            modal.classList.remove('show')
            modal.style.display = 'none'
            modal.style.backgroundColor = 'unset'
        }).catch((err) => {
            console.log(err.response.data)
            commit('setLoading', false)
            toast.error(err.response.data)
        })
    },

    // delete user
    async deleteUser({ commit, dispatch }, payload) {
        const token = window.localStorage.getItem('userToken')
        await axios.delete(`${state.apiURL}/users/${payload}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            id: payload
        }).then((res) => {
            // console.log(res)
            toast.success('User deleted successfully')
            dispatch('getUsers', token)
        }).catch((err) => {
            console.log(err.response.data)
            toast.error(err.response.data)
        })
    },

    // get single user
    async getUserDetails({ commit, state }, payload) {
        const token = window.localStorage.getItem('userToken')
        await axios.get(`${state.apiURL}/users/${payload}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            // console.log(res)
            commit('storeSingleUserData', res.data)
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data)
        })
    },

    // update user
    async editUser({ commit, dispatch }, payload) {
        commit('setLoading', true)
        await axios.patch(`${state.apiURL}/users/${payload.id}`, {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            department_id: payload.department_id,
            manager_id: payload.manager_id,
            role: payload.role,
            joining_date: payload.joining_date
        }).then((res) => {
            // console.log(res)
            commit('setLoading', false)
            dispatch('getUsers', accessToken)
            toast.success('User updated')
        }).catch((err) => {
            console.log(err)
            commit('setLoading', false)
            toast.error(err.response.data)
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}