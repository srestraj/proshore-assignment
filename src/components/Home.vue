<template>
  <div>
    <site-nav :user="user" />
    <div class="container pt-5">
      <h2>Employee Table</h2>
      <div class="py-3">
        <button class="btn home-btn" @click="showModal"><span>Add User</span></button>
        <button class="btn sec-btn" @click="showSearch = !showSearch"><span>Search User</span></button>
      </div>
      <div class="py-3 position-relative row mb-3" v-if="showSearch">

        <div class="col-lg-4">
          <div class="form-group">
            <label for="search-name">Name</label>
            <input type="text" class="form-control mt-2" id="search-name" v-model="name" placeholder="Full name">
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label for="search-addr">Address</label>
            <input type="text" class="form-control mt-2" id="search-addr" v-model="address" placeholder="Address">
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label for="department">Department</label>
            <select class="form-select form-control mt-2" style="z-index: 1" v-model="department">
                <option selected value="hr">HR</option>
                <option value="dev">Development</option>
                <option value="helper">Helper</option>
                <option value="mgmt">Management</option>
            </select>
          </div>
        </div>

        <div class="col-lg-4 mt-2">
          <button class="btn sec-btn" @click="reset"><span>Reset Filters</span></button>
        </div>
      </div>         
      <users-table :users="users" />
    </div>
    <add-user-modal />
  </div>
</template>

<script>
import UsersTable from './UsersTable.vue'
import AddUserModal from './AddUserModal.vue'
import SiteNav from './Navbar.vue'

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Home',
    components: {
      SiteNav,
      UsersTable,
      AddUserModal
  },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      const department = ref(null)
      const name = ref('')
      const address = ref('')
      const showSearch = ref(false)

      const user = computed(() => store.state.login.user)
      const isAuthenticated = computed(() => store.state.login.isAuthenticated)
      const userToken = computed(() => store.state.login.token)

      const users = computed(() => {
        if(name.value != '') {
          return store.state.users.userList.filter(user => {
            return user.name.toLowerCase().includes(name.value.toLowerCase())
          })
        }
        if(department.value != null) {
          return store.state.users.userList.filter(user => {
            return user.department_id.toLowerCase().includes(department.value.toLowerCase())
          })
        }
        if(address.value != '') {
          return store.state.users.userList.filter(user => {
            return user.address.toLowerCase().includes(address.value.toLowerCase())
          })
        }

        return store.state.users.userList
      })

      onMounted((() => {
        store.dispatch('users/getUsers', userToken.value)
      }))

      const showModal = () => {
        const modal = document.querySelector('.modal')
        modal.classList.add('show')
        modal.style.display = 'block'
        modal.style.backgroundColor = '#101010ad'
      }

      const reset = () => {
        department.value = null
        name.value = ''
        address.value = ''
      }

      return {
        user,
        isAuthenticated,
        userToken,
        users,
        showModal,
        department,
        showSearch,
        name,
        address,
        reset
      }
    }
}
</script>

<style>

</style>