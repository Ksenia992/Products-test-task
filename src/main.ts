import { createApp } from 'vue'
import './scss/style.scss'
import store from './store'
import router from './router/router'
import App from './App.vue'

createApp(App).use(store).use(router).mount('#app')
