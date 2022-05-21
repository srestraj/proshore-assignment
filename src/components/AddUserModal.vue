<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Enter User Details</h5>
                <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <form method="POST" id="user-form">
                    <div class="form-group mb-3">
                        <label for="name" class="sr-only">Full Name</label>
                        <input type="text" name="name" id="name" class="form-control mt-2" v-model="name" placeholder="Full Name" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="email" class="sr-only">Email</label>
                        <input type="email" name="email" id="email" class="form-control mt-2" v-model="email" placeholder="Email" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="password" class="sr-only">Password</label>
                        <input type="password" name="password" id="password" class="form-control mt-2" v-model="password" placeholder="Set password for user" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="address" class="sr-only">Address</label>
                        <input type="text" name="address" id="address" class="form-control mt-2" v-model="address" placeholder="Address" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="date" class="sr-only">Joining Date</label>
                        <input type="date" name="date" id="date" class="form-control mt-2" v-model="joiningDate" placeholder="Joining Date" required>
                    </div>
                    <div class="form-group mb-3 position-relative">
                        <label for="department" class="dept-label" v-if="department == null || department == ''">Department</label>
                        <select class="form-select form-control position-relative" style="z-index: 1" v-model="department">
                            <option selected value="hr">HR</option>
                            <option value="dev">Development</option>
                            <option value="helper">Helper</option>
                            <option value="mgmt">Management</option>
                        </select>
                    </div>
                    <div class="form-group mb-3 position-relative">
                        <label for="manager" class="dept-label" v-if="manager == '' || manager == null">Manager</label>
                        <select class="form-select form-control position-relative" style="z-index: 1" v-model="manager">
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
                    
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn sec-btn" @click="closeModal">Close</button>
                <button type="submit" class="btn home-btn" @click.prevent="addUser">
                    <div class="spinner-border d-inline-block spinner-border-sm" v-if="buttonLoading" style="vertical-align: middle" role="status"></div> <span v-else>Submit</span>
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        const email = ref('')
        const password = ref('')
        const name = ref('')
        const address = ref('')
        const department = ref('')
        const manager = ref('')
        const role = ref('')
        const joiningDate = ref(null)
        const loading = ref(false)

        const buttonLoading = computed(() => {
            return store.state.users.loading
        })

        const managers = computed(() => {
            return store.state.users.managers
        })

        const addUser = () => {
            store.dispatch('users/addUser', { name: name.value, email: email.value, password: password.value, address: address.value, joiningDate: joiningDate.value, department: department.value, manager: manager.value, role: role.value })
        }

        const closeModal = () => {
            const modal = document.querySelector('.modal')
            modal.classList.remove('show')
            modal.style.display = 'none'
            modal.style.backgroundColor = 'unset'
        }

        return {
            name,
            address,
            department,
            email,
            password,
            loading,
            manager,
            managers,
            joiningDate,
            role,
            addUser,
            closeModal,
            buttonLoading
        }
    }
}
</script>

<style>

</style>