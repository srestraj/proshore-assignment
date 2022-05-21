<template>
  <div>
      <site-nav :user="loggedInUser" />
      <div style="display: block; background: radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.6) 100%), url('https://source.unsplash.com/1600x200/?office') rgb(0, 0, 0); width: 100%; overflow: hidden;">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-8 text-center  pt-5 pb-5">
                        <h1 class="h2 text-center   " style="color: rgb(237, 237, 237); font-size: 3em;">
                        {{ name }}
                        </h1>
                        <p class="text-center  " style="color: rgb(237, 237, 237);">{{ address }} • Joined {{ moment(joining_date).fromNow() }}</p>
                    </div>
                </div>
            </div>
        </div>
      <div class="container py-3">
          <div class="edit-form mx-auto">
              <form method="PATCH" @submit.prevent="editUser">
                    <div class="form-group mb-3">
                        <label for="name" class="sr-only">Full Name</label>
                        <input type="text" name="name" id="name" class="form-control mt-2" v-model="name" placeholder="Full Name" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="email" class="sr-only">Email</label>
                        <input type="email" name="email" id="email" class="form-control mt-2" v-model="email" placeholder="Email" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="address" class="sr-only">Address</label>
                        <input type="text" name="address" id="address" class="form-control mt-2" v-model="address" placeholder="Address" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="date" class="sr-only">Joining Date</label>
                        <input type="date" name="date" id="date" class="form-control mt-2" v-model="joining_date" placeholder="Joining Date" required>
                    </div>
                    <div class="form-group mb-3 position-relative">
                        <label for="department" class="dept-label" v-if="department_id == null || department_id == 'null' || department_id == ''">Department</label>
                        <select class="form-select form-control position-relative" style="z-index: 1" v-model="department_id">
                            <option selected value="hr">HR</option>
                            <option value="dev">Development</option>
                            <option value="helper">Helper</option>
                            <option value="mgmt">Management</option>
                        </select>
                    </div>
                    <div class="form-group mb-3 position-relative">
                        <label for="manager" class="dept-label" v-if="manager_id == null || manager_id == ''">Manager</label>
                        <select class="form-select form-control position-relative" style="z-index: 1" v-model="manager_id">
                            <option v-for="manager in managers" :key="manager.id" :value="manager.id">{{ manager.name }}</option>
                            <option value="null">N/A</option>
                        </select>
                    </div>
                    <div class="form-group mb-3 position-relative">
                        <label for="manager" class="dept-label" v-if="role == null || role == ''">Role</label>
                        <select class="form-select form-control position-relative" style="z-index: 1" v-model="role">
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <div class="form-group mt-5">
                      <button type="submit" class="btn home-btn">
                          <div class="spinner-border d-inline-block mr-2" v-if="loading" style="vertical-align: middle" role="status"></div> <span v-else>Save</span>
                      </button>
                   </div>
                      </form>
              
                      <div class="py-5" v-if="role == 'manager'">
                        <h5 class="mb-3">Users managed by {{ name }}</h5>
                        <div class="list-group">
                            <div class="list-group-item" v-for="user in managedUsers" :key="user.id">
                                {{ user.name}}
                            </div>
                        </div>
                      </div>
          </div>
      </div>
  </div>
</template>

<script>
import SiteNav from './Navbar.vue'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'

export default {
    name: 'User',
    components: {
        SiteNav
    },
    created() {
        this.moment = moment
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        const store = useStore()

        const loggedInUser = computed(() => {
            return store.state.login.user
        })

        const loading = computed(() => {
            return store.state.users.loading
        })

        const managers = computed(() => {
            return store.state.users.managers
        })

        const managedUsers = computed(() => {
            return store.state.users.userList.filter((user) => {
                return user.manager_id == route.params.id
            })
        })

        const name = computed({
            get() {
                return store.state.users.singleUserData.name
            },
            set(name) {
                store.commit('users/storeSingleUserData', {name})
            }
        })
        const email = computed({
            get() {
                return store.state.users.singleUserData.email
            },
            set(email) {
                store.commit('users/storeSingleUserData', {email})
            }
        })
        const address = computed({
            get() {
                return store.state.users.singleUserData.address
            },
            set(address) {
                store.commit('users/storeSingleUserData', {address})
            }
        })
        const department_id = computed({
            get() {
                return store.state.users.singleUserData.department_id
            },
            set(department_id) {
                store.commit('users/storeSingleUserData', {department_id})
            }
        })
        const manager_id = computed({
            get() {
                return store.state.users.singleUserData.manager_id
            },
            set(manager_id) {
                store.commit('users/storeSingleUserData', {manager_id})
            }
        })
        const role = computed({
            get() {
                return store.state.users.singleUserData.role
            },
            set(role) {
                store.commit('users/storeSingleUserData', {role})
            }
        })
        const joining_date = computed({
            get() {
                return store.state.users.singleUserData.joining_date
            },
            set(joining_date) {
                store.commit('users/storeSingleUserData', {joining_date})
            }
        })

        onMounted((() => {
            store.dispatch('users/getUserDetails', route.params.id)
        }))

        const editUser =  () => {
            store.dispatch('users/editUser', {
                id: route.params.id,
                name: name.value,
                email: email.value,
                address: address.value,
                department_id: department_id.value,
                manager_id: manager_id.value,
                role: role.value,
                joining_date: joining_date.value
            })
        }

        return {
            loading,
            managers,
            managedUsers,
            name,
            email,
            address,
            department_id,
            manager_id,
            role,
            joining_date,
            loggedInUser,
            editUser
        }
    }
}
</script>

<style>

</style>