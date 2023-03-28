import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { auth } from "./firebase/index"

import App from './App.vue'
import router from './router'

import './assets/css/main.css'

let app

auth.onAuthStateChanged(user => {
    if (!app) {
        const app = createApp(App)

        const pinia = createPinia()

        pinia.use(({ store }) => {
            store.$router = markRaw(router)
        })

        app.use(pinia)

        app.use(router)

        app.mount('#app')
    }
})