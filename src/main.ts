import { createApp } from 'vue'
import './scss/style.scss'
import store from '../src/store'
import router from '../src/router/router'
import App from './App.vue'

createApp(App).use(store).use(router).mount('#app')
