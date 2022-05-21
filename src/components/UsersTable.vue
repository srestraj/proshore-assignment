<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
        <tr>
            <th>
                <span @click="sortByName" class="sort d-block">Name<i class="fas fa-sort float-right"></i></span>
            </th>
            <th>
                <span @click="sortByEmail" class="sort d-block">Email<i class="fas fa-sort float-right"></i></span>
            </th>
            <th>
                <span @click="sortByAddress" class="sort d-block">Address<i class="fas fa-sort float-right"></i></span>
            </th>
            <th>
                <span @click="sortByDept" class="sort d-block">Department ID<i class="fas fa-sort float-right"></i></span></th>
            <th>
                <span @click="sortByRole" class="sort d-block">Role<i class="fas fa-sort float-right"></i></span>
            </th>
            <th>Manager ID</th>
            <th>
                <span @click="sortByDate" class="sort d-block">Date Joined<i class="fas fa-sort float-right"></i></span>
                </th>
        </tr>
        </thead>
        <tbody>
            <tr v-if="loading">
                <td colspan="9" class="text-center">
                    <div class="spinner-border d-inline-block my-2" style="vertical-align: middle" role="status"></div>
                </td>
            </tr>
            <tr v-if="users.length == 0 && !loading">
                <td colspan="9" class="text-center">No records found</td>
            </tr>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.department_id }}</td>
                <td>{{ user.role }}</td>
                <td v-if="user.role == 'manager'">{{ user.id }}</td>
                <td v-else>Null</td>
                <td>{{ moment(user.joining_date).fromNow() }}</td>
                <td><router-link :to="'/user/' + user.id" class="admin-icon"><i class="fas fa-pencil-alt text-muted"></i></router-link></td>
                <td @click="deleteUser(user.id)"><i class="fas fa-trash text-muted admin-icon"></i></td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import moment from 'moment'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'UsersTable',
    props: ['users'],
    created() {
        this.moment = moment
    },
    setup() {
        const store = useStore()
        const order = ref(null)

        const loading = computed(() => {
            return store.state.users.loading
        })

        const deleteUser = (id) => {
            store.dispatch('users/deleteUser', id)
        }

        const sortByName = () => {
            if(order.value == 'asc') {
                store.commit('users/sortByName', 'desc')
                order.value = 'desc'
            } else {
                store.commit('users/sortByName', 'asc')
                order.value = 'asc'
            }
        }

        const sortByEmail = () => {
            if(order.value == 'asc') {
                store.commit('users/sortByEmail', 'desc')
                order.value = 'desc'
            } else {
                store.commit('users/sortByEmail', 'asc')
                order.value = 'asc'
            }
        }

        const sortByAddress = () => {
            if(order.value == 'asc') {
                store.commit('users/sortByAddress', 'desc')
                order.value = 'desc'
            } else {
                store.commit('users/sortByAddress', 'asc')
                order.value = 'asc'
            }
        }

        const sortByDept = () => {
            if(order.value == 'asc') {
                store.commit('users/sortByDept', 'desc')
                order.value = 'desc'
            } else {
                store.commit('users/sortByDept', 'asc')
                order.value = 'asc'
            }
        }

        const sortByRole = () => {
            if(order.value == 'asc') {
                store.commit('users/sortByRole', 'desc')
                order.value = 'desc'
            } else {
                store.commit('users/sortByRole', 'asc')
                order.value = 'asc'
            }
        }

        const sortByDate = () => {
            if(order.value == 'asc') {
                store.commit('users/sortByDate', 'desc')
                order.value = 'desc'
            } else {
                store.commit('users/sortByDate', 'asc')
                order.value = 'asc'
            }
        }

        return {
            loading,
            order,
            sortByName,
            sortByEmail,
            sortByAddress,
            sortByDept,
            sortByRole,
            sortByDate,
            deleteUser
        }
    }
}
</script>

<style>

</style>