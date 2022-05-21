<template>
<div class="container-fluid">
   <div class="row">
      <div class="col-sm-6 col-md-7 intro-section">
         <div class="brand-wrapper">
            <h1>Logo</h1>
         </div>
         <div class="intro-content-wrapper">
            <h1 class="intro-title">Welcome back!</h1>
            <p class="intro-text">Please sign in to your account to access the dashboard.</p>
         </div>
         <div class="intro-section-footer">
            <nav class="footer-nav">
               <a href="https://github.com/srestraj" target="_blank">GitHub</a>
               <a href="https://twitter.com/srestraj" target="_blank">Twitter</a>
               <a href="https://linkedin.com/in/srestraj" target="_blank">LinkedIn</a>
               <a href="https://instagram.com/srestraj" target="_blank">Instagram</a>
            </nav>
         </div>
      </div>
      <div class="col-sm-6 col-md-5 form-section">
         <div class="login-wrapper">
            <h2 class="login-title">Sign in</h2>
            <!-- <div class="alert alert-danger mt-2" role="alert" v-if="error != '' || null">
              {{ error }}
            </div> -->
            <form method="POST" @submit.prevent="userLogin">
               <div class="form-group">
                  <label for="email" class="sr-only">Email</label>
                  <input type="email" name="email" id="email" class="form-control mt-2" v-model="email" placeholder="Email" required>
               </div>
               <div class="form-group mb-3">
                  <label for="password" class="sr-only">Password</label>
                  <input type="password" name="password" id="password" class="form-control mt-2" v-model="password" required placeholder="Password">
               </div>
               <div class="d-flex justify-content-between align-items-center my-5">
                  <button type="submit" class="btn login-btn w-100">
                      <div class="spinner-border d-inline-block mr-2" v-if="loading" style="vertical-align: middle" role="status"></div> <span v-else>Login</span>
                  </button>
               </div>
            </form>
            <p class="login-wrapper-footer-text">Need an account? <a href="#" class="text-reset">Signup here</a></p>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Login',
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()

      const email = ref('')
      const password = ref('')
      
      const loading = computed(() => store.state.login.loading)
      const error = computed(() => store.state.login.error)
      const user = computed(() => store.state.login.user)
      const isAuthenticated = computed(() => store.state.login.isAuthenticated)
      const userToken = computed(() => store.state.login.token)

      const userLogin = () => {
         store.dispatch('login/userLogin', { email: email.value, password: password.value })
         setTimeout(() => {
            if (isAuthenticated.value) {
               router.push({ name: 'home' })
            }
         }, 2500)
      }

      return {
        email,
        password,
        loading,
        error,
        user,
        isAuthenticated,
        userToken,
        userLogin  
      }
    }
}
</script>

<style>

</style>