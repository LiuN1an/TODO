import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './App.vue'
import store from './stores/index'
import './index.css'

const routes = []
const history = createMemoryHistory()
const router = createRouter({ history, routes })
const app = createApp(App)
app.use(store)
app.mount('#app')
