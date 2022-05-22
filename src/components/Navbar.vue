<template>
  <nav class="navbar navbar-light bg-light">
      <div class="container py-2">
          <router-link to="/" class="navbar-brand">LOGO</router-link>
          <div class="col-md-auto ml-auto position-relative">
              <ul id="right-nav" class="navbar-nav right-nav">
                  <li class="nav-item">
                      <div @click="openDropdown" style="cursor: pointer" aria-current="page" class="nav-link px-3 home-nav-link nuxt-link-exact-active nuxt-link-active">
                          <span class="username">{{ user.name }}</span> <img class="avatar rounded-circle" src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp">
                      </div>
                  </li>
                  <ul class="dropdown-menu">
                        <li><router-link class="dropdown-item" :to="'/user/' + user.id">My Profile</router-link></li>
                        <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
                    </ul>
              </ul>
          </div>
      </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'

export default {
    name: 'Navbar',
    props: ['user'],
    setup() {
        const store = useStore()

        const logout = () => {
            store.dispatch('login/logout')
        }

        const openDropdown = () => {
            document.querySelector('.dropdown-menu').classList.toggle('show')
        }

        return {
            logout,
            openDropdown
        }
    }
}
</script>

<style scoped>
#right-nav:hover .dropdown-menu, .dropdown-menu.show {
    position: absolute;
    inset: 0px auto auto 0px;
    margin-top: 1rem;
    transform: translate(0px, 40px);
    display: block;
    right: 0;
}
</style>