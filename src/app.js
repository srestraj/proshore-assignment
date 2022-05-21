import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'

import './assets/style.css'
import 'vue-toastification/dist/index.css'

store.dispatch('login/checkAuthentication')

createApp(App).use(router).use(store).use(Toast, { position: 'bottom-right' }).mount('#app')