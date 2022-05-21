<template>
  <nav class="navbar navbar-light bg-light">
      <div class="container py-2">
          <router-link to="/" class="navbar-brand">LOGO</router-link>
          <div class="col-md-auto ml-auto">
              <ul id="right-nav" class="navbar-nav right-nav">
                  <li class="nav-item">
                      <router-link to="/" aria-current="page" class="nav-link px-3 home-nav-link nuxt-link-exact-active nuxt-link-active">
                          <span class="username">{{ user.name }}</span> <img class="avatar rounded-circle" src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp">
                      </router-link>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['user']
}
</script>

<style>

</style>